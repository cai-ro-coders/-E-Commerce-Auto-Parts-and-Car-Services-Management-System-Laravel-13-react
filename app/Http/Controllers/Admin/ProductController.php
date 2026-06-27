<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreProductRequest;
use App\Http\Requests\Admin\UpdateProductRequest;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\VehicleMake;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $categoryId = $request->input('category_id');
        $brandId = $request->input('brand_id');
        $status = $request->input('status');

        $products = Product::with(['category:id,name', 'brand:id,name', 'images'])
            ->when($search, fn($q) => $q->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('sku', 'like', "%{$search}%");
            }))
            ->when($categoryId, fn($q) => $q->where('category_id', $categoryId))
            ->when($brandId, fn($q) => $q->where('brand_id', $brandId))
            ->when($status !== null, fn($q) => $q->where('status', $status))
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString()
            ->through(fn($product) => [
                'id' => $product->id,
                'sku' => $product->sku,
                'name' => $product->name,
                'category' => $product->category?->name,
                'brand' => $product->brand?->name,
                'selling_price' => (float) $product->selling_price,
                'cost_price' => (float) $product->cost_price,
                'status' => (bool) $product->status,
                'minimum_stock' => $product->minimum_stock,
                'image' => $product->images()->first()?->image,
                'created_at' => $product->created_at->format('Y-m-d'),
            ]);

        return Inertia::render('admin/products/index', [
            'products' => $products,
            'filters' => [
                'search' => $search,
                'category_id' => $categoryId,
                'brand_id' => $brandId,
                'status' => $status,
            ],
            'categories' => Category::select('id', 'name')->orderBy('name')->get(),
            'brands' => Brand::select('id', 'name')->orderBy('name')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/products/create', [
            'categories' => Category::select('id', 'name')->orderBy('name')->get(),
            'brands' => Brand::select('id', 'name')->orderBy('name')->get(),
            'vehicleMakes' => VehicleMake::with('models')->orderBy('name')->get()->map(fn($m) => [
                'id' => $m->id,
                'name' => $m->name,
                'models' => $m->models->map(fn($md) => ['id' => $md->id, 'name' => $md->name]),
            ]),
        ]);
    }

    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();
        if (($data['discount_type'] ?? '') === 'none') {
            $data['discount_type'] = null;
        }
        $data['slug'] = Str::slug($data['name']) . '-' . Str::random(5);

        $product = Product::create($data);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $i => $file) {
                $path = $file->store('products', 'public');
                $product->images()->create([
                    'image' => $path,
                    'sort_order' => $i,
                ]);
            }
        }

        if ($data['has_vehicle_compatibility'] ?? true) {
            if ($request->has('compatibilities')) {
                foreach ($request->input('compatibilities') as $comp) {
                    if (!empty($comp['make_id']) && !empty($comp['model_id'])) {
                        $product->compatibilities()->create([
                            'make_id' => $comp['make_id'],
                            'model_id' => $comp['model_id'],
                            'year_from' => $comp['year_from'] ?? null,
                            'year_to' => $comp['year_to'] ?? null,
                        ]);
                    }
                }
            }
        }

        return redirect()->route('admin.products.index')
            ->with('toast', ['type' => 'success', 'message' => 'Product created successfully.']);
    }

    public function show($id)
    {
        $product = Product::with(['category', 'brand', 'images', 'specifications', 'compatibilities.make', 'compatibilities.model'])
            ->findOrFail($id);

        return Inertia::render('admin/products/show', [
            'product' => [
                'id' => $product->id,
                'sku' => $product->sku,
                'name' => $product->name,
                'description' => $product->description,
                'category' => $product->category?->name,
                'brand' => $product->brand?->name,
                'cost_price' => (float) $product->cost_price,
                'selling_price' => (float) $product->selling_price,
                'discount_type' => $product->discount_type,
                'discount_value' => (float) $product->discount_value,
                'tax_rate' => (float) $product->tax_rate,
                'minimum_stock' => $product->minimum_stock,
                'weight' => $product->weight,
                'status' => (bool) $product->status,
                'images' => $product->images->map(fn($img) => ['id' => $img->id, 'image' => $img->image]),
                'specifications' => $product->specifications,
                'compatibilities' => $product->compatibilities->map(fn($c) => [
                    'id' => $c->id,
                    'make_id' => $c->make_id,
                    'make_name' => $c->make?->name,
                    'model_id' => $c->model_id,
                    'model_name' => $c->model?->name,
                    'year_from' => $c->year_from,
                    'year_to' => $c->year_to,
                ]),
                'created_at' => $product->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $product->updated_at->format('Y-m-d H:i:s'),
            ],
        ]);
    }

    public function edit($id)
    {
        $product = Product::with(['images', 'compatibilities'])->findOrFail($id);

        return Inertia::render('admin/products/edit', [
            'product' => [
                'id' => $product->id,
                'category_id' => $product->category_id,
                'brand_id' => $product->brand_id,
                'sku' => $product->sku,
                'barcode' => $product->barcode,
                'name' => $product->name,
                'description' => $product->description,
                'cost_price' => (float) $product->cost_price,
                'selling_price' => (float) $product->selling_price,
                'discount_type' => $product->discount_type,
                'discount_value' => (float) $product->discount_value,
                'tax_rate' => (float) $product->tax_rate,
                'minimum_stock' => $product->minimum_stock,
                'weight' => $product->weight,
                'status' => (bool) $product->status,
                'has_vehicle_compatibility' => (bool) $product->has_vehicle_compatibility,
                'images' => $product->images->map(fn($img) => ['id' => $img->id, 'image' => $img->image]),
                'compatibilities' => $product->compatibilities->map(fn($c) => [
                    'id' => $c->id,
                    'make_id' => $c->make_id,
                    'model_id' => $c->model_id,
                    'year_from' => $c->year_from,
                    'year_to' => $c->year_to,
                ]),
            ],
            'categories' => Category::select('id', 'name')->orderBy('name')->get(),
            'brands' => Brand::select('id', 'name')->orderBy('name')->get(),
            'vehicleMakes' => VehicleMake::with('models')->orderBy('name')->get()->map(fn($m) => [
                'id' => $m->id,
                'name' => $m->name,
                'models' => $m->models->map(fn($md) => ['id' => $md->id, 'name' => $md->name]),
            ]),
        ]);
    }

    public function update(UpdateProductRequest $request, $id)
    {
        $product = Product::findOrFail($id);
        $data = $request->validated();
        if (($data['discount_type'] ?? '') === 'none') {
            $data['discount_type'] = null;
        }

        if (isset($data['name']) && $data['name'] !== $product->name) {
            $data['slug'] = Str::slug($data['name']) . '-' . Str::random(5);
        }

        $product->update($data);

        if ($request->has('deleted_images')) {
            $deletedImages = ProductImage::whereIn('id', $request->input('deleted_images'))
                ->where('product_id', $product->id)
                ->get();
            foreach ($deletedImages as $image) {
                Storage::disk('public')->delete($image->image);
                $image->delete();
            }
        }

        if ($request->hasFile('images')) {
            $maxOrder = $product->images()->max('sort_order') ?? 0;
            foreach ($request->file('images') as $file) {
                $path = $file->store('products', 'public');
                $maxOrder++;
                $product->images()->create([
                    'image' => $path,
                    'sort_order' => $maxOrder,
                ]);
            }
        }

        if ($request->has('compatibilities') && $data['has_vehicle_compatibility']) {
            $product->compatibilities()->delete();
            foreach ($request->input('compatibilities') as $comp) {
                if (!empty($comp['make_id']) && !empty($comp['model_id'])) {
                    $product->compatibilities()->create([
                        'make_id' => $comp['make_id'],
                        'model_id' => $comp['model_id'],
                        'year_from' => $comp['year_from'] ?? null,
                        'year_to' => $comp['year_to'] ?? null,
                    ]);
                }
            }
        } elseif (!$data['has_vehicle_compatibility']) {
            $product->compatibilities()->delete();
        }

        return redirect()->route('admin.products.index')
            ->with('toast', ['type' => 'success', 'message' => 'Product updated successfully.']);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        foreach ($product->images as $image) {
            Storage::disk('public')->delete($image->image);
            $image->delete();
        }

        $product->delete();

        return redirect()->route('admin.products.index')
            ->with('toast', ['type' => 'success', 'message' => 'Product deleted successfully.']);
    }

    public function export(Request $request)
    {
        $type = $request->input('type', 'csv');

        $products = Product::with(['category', 'brand'])->orderBy('created_at', 'desc')->get();

        if ($type === 'json') {
            $data = $products->map(fn($p) => [
                'sku' => $p->sku,
                'name' => $p->name,
                'category' => $p->category?->name,
                'brand' => $p->brand?->name,
                'selling_price' => (float) $p->selling_price,
                'cost_price' => (float) $p->cost_price,
                'stock' => $p->minimum_stock,
                'status' => $p->status ? 'active' : 'inactive',
            ]);

            return response()->json($data, 200, [
                'Content-Disposition' => 'attachment; filename=products.json',
                'Content-Type' => 'application/json',
            ]);
        }

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename=products.csv',
        ];

        $callback = function () use ($products) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, ['SKU', 'Name', 'Category', 'Brand', 'Selling Price', 'Cost Price', 'Stock', 'Status']);

            foreach ($products as $p) {
                fputcsv($handle, [
                    $p->sku,
                    $p->name,
                    $p->category?->name,
                    $p->brand?->name,
                    number_format((float) $p->selling_price, 2),
                    number_format((float) $p->cost_price, 2),
                    $p->minimum_stock,
                    $p->status ? 'active' : 'inactive',
                ]);
            }

            fclose($handle);
        };

        return response()->stream($callback, 200, $headers);
    }
}
