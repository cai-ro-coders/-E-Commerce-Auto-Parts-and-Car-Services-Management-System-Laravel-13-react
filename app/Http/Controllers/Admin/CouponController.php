<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CouponController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $status = $request->input('status');

        $coupons = Coupon::withCount('orders')
            ->when($search, fn($q) => $q->where('code', 'like', "%{$search}%"))
            ->when($status !== null && $status !== '', fn($q) => $q->where('status', $status === 'active' ? 1 : 0))
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString()
            ->through(fn($coupon) => [
                'id' => $coupon->id,
                'code' => $coupon->code,
                'discount_type' => $coupon->discount_type,
                'discount_value' => (float) $coupon->discount_value,
                'start_date' => $coupon->start_date?->format('Y-m-d'),
                'end_date' => $coupon->end_date?->format('Y-m-d'),
                'usage_limit' => $coupon->usage_limit,
                'used_count' => $coupon->orders_count,
                'status' => (bool) $coupon->status,
                'created_at' => $coupon->created_at->format('Y-m-d'),
            ]);

        return Inertia::render('admin/coupons/index', [
            'coupons' => $coupons,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/coupons/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:50|unique:coupons,code',
            'discount_type' => 'required|in:percentage,fixed',
            'discount_value' => 'required|numeric|min:0',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'usage_limit' => 'nullable|integer|min:1',
            'status' => 'required|boolean',
        ]);

        Coupon::create($validated);

        return redirect()->route('admin.coupons.index')
            ->with('toast', ['type' => 'success', 'message' => 'Coupon created successfully.']);
    }

    public function edit($id)
    {
        $coupon = Coupon::findOrFail($id);

        return Inertia::render('admin/coupons/edit', [
            'coupon' => [
                'id' => $coupon->id,
                'code' => $coupon->code,
                'discount_type' => $coupon->discount_type,
                'discount_value' => (float) $coupon->discount_value,
                'start_date' => $coupon->start_date?->format('Y-m-d'),
                'end_date' => $coupon->end_date?->format('Y-m-d'),
                'usage_limit' => $coupon->usage_limit,
                'status' => (bool) $coupon->status,
            ],
        ]);
    }

    public function update(Request $request, $id)
    {
        $coupon = Coupon::findOrFail($id);

        $validated = $request->validate([
            'code' => 'required|string|max:50|unique:coupons,code,' . $id,
            'discount_type' => 'required|in:percentage,fixed',
            'discount_value' => 'required|numeric|min:0',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'usage_limit' => 'nullable|integer|min:1',
            'status' => 'required|boolean',
        ]);

        $coupon->update($validated);

        return redirect()->route('admin.coupons.index')
            ->with('toast', ['type' => 'success', 'message' => 'Coupon updated successfully.']);
    }

    public function destroy($id)
    {
        $coupon = Coupon::findOrFail($id);
        $coupon->delete();

        return redirect()->route('admin.coupons.index')
            ->with('toast', ['type' => 'success', 'message' => 'Coupon deleted successfully.']);
    }
}
