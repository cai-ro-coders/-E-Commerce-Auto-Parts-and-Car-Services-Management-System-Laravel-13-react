<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->input('q', '');

        $products = collect();
        $categories = collect();

        if (strlen($query) >= 2) {
            $products = Product::where('status', true)
                ->where(function ($q) use ($query) {
                    $q->where('name', 'like', "%{$query}%")
                      ->orWhere('description', 'like', "%{$query}%")
                      ->orWhere('sku', 'like', "%{$query}%");
                })
                ->with(['images' => function ($q) { $q->orderBy('sort_order'); }, 'category', 'brand'])
                ->withCount('reviews')
                ->orderBy('name')
                ->get(['id', 'category_id', 'brand_id', 'name', 'slug', 'description', 'selling_price', 'discount_type', 'discount_value']);

            $categories = Category::where('status', true)
                ->where(function ($q) use ($query) {
                    $q->where('name', 'like', "%{$query}%")
                      ->orWhere('description', 'like', "%{$query}%");
                })
                ->get(['id', 'name', 'slug', 'image', 'description']);
        }

        $allCategories = Category::where('status', true)
            ->orderBy('name')
            ->get(['id', 'name', 'slug', 'image', 'description']);

        return inertia('search', [
            'query' => $query,
            'products' => $products,
            'categories' => $categories,
            'allCategories' => $allCategories,
        ]);
    }
}
