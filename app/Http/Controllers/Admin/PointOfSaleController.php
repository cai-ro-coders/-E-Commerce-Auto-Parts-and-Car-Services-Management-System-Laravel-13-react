<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PointOfSaleController extends Controller
{
    public function index()
    {
        $products = Product::with(['images' => fn($q) => $q->orderBy('sort_order')->limit(1)])
            ->where('status', true)
            ->orderBy('name')
            ->get()
            ->map(fn($p) => [
                'id' => $p->id,
                'name' => $p->name,
                'sku' => $p->sku,
                'selling_price' => (float) $p->selling_price,
                'image' => $p->images->first()?->image,
                'stock' => $p->minimum_stock,
            ]);

        $customers = Customer::select('id', 'full_name', 'phone', 'email')
            ->where('status', true)
            ->orderBy('full_name')
            ->get()
            ->map(fn($c) => [
                'id' => $c->id,
                'name' => $c->full_name,
                'phone' => $c->phone,
                'email' => $c->email,
            ]);

        return Inertia::render('admin/point-of-sales', [
            'products' => $products,
            'customers' => $customers,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'nullable|exists:customers,id',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
            'payment_method' => 'required|string|in:cash,card,bank,e-wallet',
            'discount' => 'nullable|numeric|min:0',
            'tax' => 'nullable|numeric|min:0',
            'notes' => 'nullable|string|max:500',
        ]);

        $subtotal = collect($validated['items'])->sum(fn($item) => $item['quantity'] * $item['unit_price']);
        $discount = $validated['discount'] ?? 0;
        $tax = $validated['tax'] ?? 0;
        $total = $subtotal - $discount + $tax;

        $order = Order::create([
            'customer_id' => $validated['customer_id'],
            'order_number' => 'POS-' . now()->format('Ymd') . '-' . strtoupper(Str::random(6)),
            'subtotal' => $subtotal,
            'discount' => $discount,
            'tax' => $tax,
            'shipping_fee' => 0,
            'total' => $total,
            'payment_status' => 'paid',
            'order_status' => 'completed',
        ]);

        foreach ($validated['items'] as $item) {
            $order->items()->create([
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'unit_price' => $item['unit_price'],
                'total' => $item['quantity'] * $item['unit_price'],
            ]);
        }

        $customerName = null;
        if ($validated['customer_id']) {
            $customer = Customer::find($validated['customer_id']);
            $customerName = $customer?->full_name;
        }

        $products = Product::with(['images' => fn($q) => $q->orderBy('sort_order')->limit(1)])
            ->where('status', true)
            ->orderBy('name')
            ->get()
            ->map(fn($p) => [
                'id' => $p->id,
                'name' => $p->name,
                'sku' => $p->sku,
                'selling_price' => (float) $p->selling_price,
                'image' => $p->images->first()?->image,
                'stock' => $p->minimum_stock,
            ]);

        $customers = Customer::select('id', 'full_name', 'phone', 'email')
            ->where('status', true)
            ->orderBy('full_name')
            ->get()
            ->map(fn($c) => [
                'id' => $c->id,
                'name' => $c->full_name,
                'phone' => $c->phone,
                'email' => $c->email,
            ]);

        return Inertia::render('admin/point-of-sales', [
            'products' => $products,
            'customers' => $customers,
            'receipt' => [
                'order_number' => $order->order_number,
                'customer_name' => $customerName,
                'items' => $order->items->map(fn($i) => [
                    'product_name' => $i->product?->name,
                    'quantity' => $i->quantity,
                    'total' => (float) $i->total,
                ]),
                'subtotal' => (float) $subtotal,
                'discount' => (float) $discount,
                'tax' => (float) $tax,
                'total' => (float) $total,
                'payment_method' => $validated['payment_method'],
                'notes' => $validated['notes'],
                'created_at' => $order->created_at->format('Y-m-d H:i:s'),
            ],
        ]);
    }
}
