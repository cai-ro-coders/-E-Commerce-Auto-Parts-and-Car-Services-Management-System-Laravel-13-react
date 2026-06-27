<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index(Request $request)
    {
        $cart = $request->session()->get('cart', []);

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
        $count = $items->sum('quantity');

        return response()->json([
            'items' => $items,
            'subtotal' => round($subtotal, 2),
            'count' => $count,
        ]);
    }

    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $productId = $request->input('product_id');
        $quantity = (int) $request->input('quantity');

        $cart = $request->session()->get('cart', []);

        if (isset($cart[$productId])) {
            $cart[$productId]['quantity'] += $quantity;
        } else {
            $product = Product::find($productId);
            $cart[$productId] = [
                'product_id' => $productId,
                'name' => $product->name,
                'slug' => $product->slug,
                'selling_price' => (float) $product->selling_price,
                'discount_type' => $product->discount_type,
                'discount_value' => (float) $product->discount_value,
                'image' => ($img = $product->images()->orderBy('sort_order')->first()) ? '/storage/'.$img->image : null,
                'quantity' => $quantity,
            ];
        }

        $request->session()->put('cart', $cart);

        return back()->with('success', 'Product added to cart!');
    }

    public function remove(Request $request, $productId)
    {
        $cart = $request->session()->get('cart', []);

        if (isset($cart[$productId])) {
            unset($cart[$productId]);
            $request->session()->put('cart', $cart);
        }

        return response()->json(['success' => true]);
    }

    public function updateQuantity(Request $request, $productId)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $quantity = (int) $request->input('quantity');
        $cart = $request->session()->get('cart', []);

        if (isset($cart[$productId])) {
            $cart[$productId]['quantity'] = $quantity;
            $request->session()->put('cart', $cart);
        }

        return response()->json(['success' => true]);
    }
}
