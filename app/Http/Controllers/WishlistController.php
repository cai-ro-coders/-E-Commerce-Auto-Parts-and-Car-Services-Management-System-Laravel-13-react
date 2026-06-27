<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class WishlistController extends Controller
{
    private function getOrCreateCustomer(Request $request): ?Customer
    {
        $user = $request->user();
        if (!$user) return null;

        if ($user->customer) return $user->customer;

        $customer = Customer::create([
            'user_id' => $user->id,
            'customer_code' => 'CUST-' . strtoupper(uniqid()),
            'full_name' => $user->name,
            'email' => $user->email,
        ]);

        return $customer;
    }

    public function index(Request $request): JsonResponse
    {
        $customer = $this->getOrCreateCustomer($request);
        if (!$customer) {
            return response()->json(['wishlist_ids' => [], 'count' => 0, 'items' => []]);
        }
        $wishlists = $customer->wishlists()->with(['product' => function ($q) {
            $q->with(['images' => function ($iq) { $iq->orderBy('sort_order'); }]);
        }])->latest()->get();

        $items = $wishlists->map(fn ($w) => [
            'id' => $w->id,
            'product_id' => $w->product_id,
            'product' => $w->product ? [
                'id' => $w->product->id,
                'name' => $w->product->name,
                'slug' => $w->product->slug,
                'selling_price' => (float) $w->product->selling_price,
                'discount_type' => $w->product->discount_type,
                'discount_value' => (float) $w->product->discount_value,
                'image' => ($img = $w->product->images()->first()) ? '/storage/'.$img->image : null,
            ] : null,
        ]);

        $ids = $items->pluck('product_id')->toArray();

        return response()->json([
            'wishlist_ids' => $ids,
            'count' => count($ids),
            'items' => $items,
        ]);
    }

    public function toggle(Request $request, Product $product): JsonResponse
    {
        $customer = $this->getOrCreateCustomer($request);
        if (!$customer) {
            return response()->json(['wishlist_ids' => [], 'count' => 0, 'items' => [], 'wishlisted' => false]);
        }
        $existing = $customer->wishlists()->where('product_id', $product->id)->first();

        if ($existing) {
            $existing->delete();
            $wishlisted = false;
        } else {
            $customer->wishlists()->create(['product_id' => $product->id]);
            $wishlisted = true;
        }

        $wishlists = $customer->wishlists()->with(['product' => function ($q) {
            $q->with(['images' => function ($iq) { $iq->orderBy('sort_order'); }]);
        }])->latest()->get();

        $items = $wishlists->map(fn ($w) => [
            'id' => $w->id,
            'product_id' => $w->product_id,
            'product' => $w->product ? [
                'id' => $w->product->id,
                'name' => $w->product->name,
                'slug' => $w->product->slug,
                'selling_price' => (float) $w->product->selling_price,
                'discount_type' => $w->product->discount_type,
                'discount_value' => (float) $w->product->discount_value,
                'image' => ($img = $w->product->images()->first()) ? '/storage/'.$img->image : null,
            ] : null,
        ]);

        $ids = $items->pluck('product_id')->toArray();

        return response()->json([
            'wishlisted' => $wishlisted,
            'wishlist_ids' => $ids,
            'count' => count($ids),
            'items' => $items,
        ]);
    }
}
