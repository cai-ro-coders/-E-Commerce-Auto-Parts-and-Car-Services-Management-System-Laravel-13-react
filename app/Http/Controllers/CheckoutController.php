<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Customer;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class CheckoutController extends Controller
{
    public function create(Request $request)
    {
        $cart = $request->session()->get('cart', []);

        if (empty($cart)) {
            return redirect()->route('home')->with('error', 'Your cart is empty.');
        }

        $items = collect($cart)->values()->map(function ($item) {
            $price = $item['selling_price'];
            if (($item['discount_value'] ?? 0) > 0) {
                $price = ($item['discount_type'] ?? '') === 'percentage'
                    ? $price - ($price * $item['discount_value'] / 100)
                    : $price - $item['discount_value'];
            }
            return [
                'product_id' => $item['product_id'],
                'name' => $item['name'],
                'slug' => $item['slug'],
                'selling_price' => (float) $item['selling_price'],
                'discount_type' => $item['discount_type'] ?? null,
                'discount_value' => (float) ($item['discount_value'] ?? 0),
                'image' => $item['image'] ?? null,
                'quantity' => (int) $item['quantity'],
                'price' => round(max($price, 0), 2),
            ];
        });

        $subtotal = $items->sum(fn ($i) => $i['price'] * $i['quantity']);
        $tax = round($subtotal * 0.1, 2);
        $total = round($subtotal + $tax, 2);

        Stripe::setApiKey(config('services.stripe.secret'));

        $paymentIntent = PaymentIntent::create([
            'amount' => (int) ($total * 100),
            'currency' => 'usd',
            'payment_method_types' => ['card'],
            'metadata' => [
                'user_id' => $request->user()->id,
            ],
        ]);

        $customer = $request->user()->customer;
        $allCategories = Category::where('status', true)
            ->get(['id', 'name', 'slug', 'image', 'description']);

        return Inertia::render('checkout', [
            'cartItems' => $items,
            'subtotal' => round($subtotal, 2),
            'tax' => $tax,
            'total' => $total,
            'customerData' => $customer ? $customer->only(['full_name', 'email', 'phone', 'address']) : [
                'full_name' => $request->user()->name,
                'email' => $request->user()->email,
                'phone' => '',
                'address' => '',
            ],
            'allCategories' => $allCategories,
            'stripeKey' => config('services.stripe.key'),
            'clientSecret' => $paymentIntent->client_secret,
        ]);
    }

    public function store(Request $request)
    {
        $cart = $request->session()->get('cart', []);

        if (empty($cart)) {
            return redirect()->route('home')->with('error', 'Your cart is empty.');
        }

        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'required|string|max:500',
            'payment_method' => 'required|in:cod,card',
            'payment_intent_id' => 'nullable|string',
        ]);

        if ($validated['payment_method'] === 'card') {
            if (empty($validated['payment_intent_id'])) {
                return redirect()->back()->with('error', 'Payment reference is missing.');
            }

            Stripe::setApiKey(config('services.stripe.secret'));

            $paymentIntent = PaymentIntent::retrieve($validated['payment_intent_id']);

            if ($paymentIntent->status !== 'succeeded') {
                return redirect()->back()->with('error', 'Payment has not been completed.');
            }
        }

        $customer = $request->user()->customer;

        if (!$customer) {
            $customer = Customer::create([
                'user_id' => $request->user()->id,
                'customer_code' => 'CUS-' . now()->format('Ymd') . '-' . strtoupper(Str::random(6)),
                'full_name' => $validated['full_name'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'address' => $validated['address'],
                'status' => true,
            ]);
        } else {
            $customer->update([
                'full_name' => $validated['full_name'],
                'email' => $validated['email'],
                'phone' => $validated['phone'] ?? $customer->phone,
                'address' => $validated['address'],
            ]);
        }

        $items = collect($cart)->values()->map(function ($item) {
            $price = $item['selling_price'];
            if (($item['discount_value'] ?? 0) > 0) {
                $price = ($item['discount_type'] ?? '') === 'percentage'
                    ? $price - ($price * $item['discount_value'] / 100)
                    : $price - $item['discount_value'];
            }
            return [
                'product_id' => $item['product_id'],
                'name' => $item['name'],
                'price' => round(max($price, 0), 2),
                'quantity' => (int) $item['quantity'],
            ];
        });

        $subtotal = $items->sum(fn ($i) => $i['price'] * $i['quantity']);
        $tax = round($subtotal * 0.1, 2);
        $total = round($subtotal + $tax, 2);

        $paymentMethod = $validated['payment_method'];
        $paymentStatus = $paymentMethod === 'card' ? 'paid' : 'pending';

        $order = DB::transaction(function () use ($customer, $items, $subtotal, $tax, $total, $paymentStatus, $paymentMethod) {
            $order = Order::create([
                'customer_id' => $customer->id,
                'order_number' => 'ORD-' . now()->format('Ymd') . '-' . strtoupper(Str::random(6)),
                'subtotal' => $subtotal,
                'discount' => 0,
                'tax' => $tax,
                'shipping_fee' => 0,
                'total' => $total,
                'payment_status' => $paymentStatus,
                'payment_method' => $paymentMethod,
                'order_status' => 'pending',
            ]);

            foreach ($items as $item) {
                $order->items()->create([
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['price'],
                    'total' => $item['price'] * $item['quantity'],
                ]);
            }

            return $order;
        });

        $request->session()->forget('cart');

        return redirect()->route('my-account')
            ->with('success', 'Order placed successfully! Order #' . $order->order_number);
    }
}
