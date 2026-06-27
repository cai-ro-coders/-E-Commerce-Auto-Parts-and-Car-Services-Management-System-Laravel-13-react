<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class CollectionController extends Controller
{
    public function index(Request $request, string $slug)
    {
        $perPage = 12;

        if ($slug === 'all') {
            $category = (object) [
                'id' => 0,
                'name' => 'All Products',
                'slug' => 'all',
                'image' => null,
                'description' => null,
                'parent_id' => null,
            ];

            $products = Product::where('status', true)
                ->with(['images' => fn ($q) => $q->orderBy('sort_order'), 'category', 'brand'])
                ->withCount('reviews')
                ->orderBy('name')
                ->paginate($perPage)
                ->withQueryString();

            $subcategories = Category::where('status', true)
                ->whereNull('parent_id')
                ->withCount(['products' => fn ($q) => $q->where('status', true)])
                ->get(['id', 'name', 'slug', 'image', 'description']);

            $allCategories = Category::where('status', true)->get(['id', 'name', 'slug', 'image', 'description']);

            $brands = Brand::where('status', true)
                ->whereIn('id', Product::where('status', true)->select('brand_id')->distinct())
                ->orderBy('name')
                ->get(['id', 'name', 'slug']);

            $priceRange = Product::where('status', true)
                ->selectRaw('MIN(selling_price) as min_price, MAX(selling_price) as max_price')
                ->first();

            return inertia('collections/index', [
                'category' => $category,
                'products' => $products,
                'subcategories' => $subcategories,
                'allCategories' => $allCategories,
                'brands' => $brands,
                'priceRange' => $priceRange ? ['min' => (float) $priceRange->min_price, 'max' => (float) $priceRange->max_price] : ['min' => 0, 'max' => 1000],
            ]);
        }

        $category = Category::where('slug', $slug)->where('status', true)->firstOrFail();

        $products = Product::where('category_id', $category->id)
            ->where('status', true)
            ->with(['images' => fn ($q) => $q->orderBy('sort_order'), 'category', 'brand'])
            ->withCount('reviews')
            ->orderBy('name')
            ->paginate($perPage)
            ->withQueryString();

        $subcategories = Category::where('parent_id', $category->id)
            ->where('status', true)
            ->withCount(['products' => fn ($q) => $q->where('status', true)])
            ->get(['id', 'name', 'slug', 'image', 'description']);

        $allCategories = Category::where('status', true)->get(['id', 'name', 'slug', 'image', 'description']);

        $brands = Brand::where('status', true)
            ->whereIn('id', Product::where('category_id', $category->id)->where('status', true)->select('brand_id')->distinct())
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        $priceRange = Product::where('category_id', $category->id)->where('status', true)
            ->selectRaw('MIN(selling_price) as min_price, MAX(selling_price) as max_price')
            ->first();

        return inertia('collections/index', [
            'category' => $category,
            'products' => $products,
            'subcategories' => $subcategories,
            'allCategories' => $allCategories,
            'brands' => $brands,
            'priceRange' => $priceRange ? ['min' => (float) $priceRange->min_price, 'max' => (float) $priceRange->max_price] : ['min' => 0, 'max' => 1000],
        ]);
    }
}
