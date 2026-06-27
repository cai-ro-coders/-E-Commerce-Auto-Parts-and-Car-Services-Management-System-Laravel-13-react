<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\Request;

class ProductDetailsController extends Controller
{
    public function show(Request $request, string $slug)
    {
        $product = Product::where('slug', $slug)
            ->where('status', true)
            ->with([
                'images' => function ($q) { $q->orderBy('sort_order'); },
                'category',
                'brand',
                'specifications',
                'compatibilities.make',
                'compatibilities.model',
                'reviews' => function ($q) { $q->where('status', true)->with('customer:id,full_name'); },
            ])
            ->withCount('reviews')
            ->firstOrFail();

        $relatedProducts = Product::where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->where('status', true)
            ->with(['images' => function ($q) { $q->orderBy('sort_order'); }, 'category'])
            ->withCount('reviews')
            ->orderByDesc('reviews_count')
            ->take(4)
            ->get(['id', 'category_id', 'name', 'slug', 'description', 'selling_price', 'discount_type', 'discount_value']);

        $allCategories = Category::where('status', true)
            ->get(['id', 'name', 'slug', 'image', 'description']);

        $avgRating = $product->reviews->avg('rating');

        $canReview = false;
        $hasReviewed = false;

        if ($request->user() && $customer = $request->user()->customer) {
            $canReview = Order::where('customer_id', $customer->id)
                ->where('order_status', 'completed')
                ->whereHas('items', fn($q) => $q->where('product_id', $product->id))
                ->exists();

            $hasReviewed = Review::where('customer_id', $customer->id)
                ->where('product_id', $product->id)
                ->exists();
        }

        return inertia('product-details', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
            'allCategories' => $allCategories,
            'avgRating' => $avgRating ? round($avgRating, 1) : 0,
            'canReview' => $canReview,
            'hasReviewed' => $hasReviewed,
        ]);
    }
}
