<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReviewController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $rating = $request->input('rating');
        $status = $request->input('status');

        $reviews = Review::with(['customer:id,full_name', 'product:id,name'])
            ->when($search, fn($q) => $q->where(function ($q) use ($search) {
                $q->whereHas('customer', fn($q) => $q->where('full_name', 'like', "%{$search}%"))
                  ->orWhereHas('product', fn($q) => $q->where('name', 'like', "%{$search}%"))
                  ->orWhere('review', 'like', "%{$search}%");
            }))
            ->when($rating !== null && $rating !== '', fn($q) => $q->where('rating', $rating))
            ->when($status !== null && $status !== '', fn($q) => $q->where('status', $status === 'active' ? 1 : 0))
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString()
            ->through(fn($review) => [
                'id' => $review->id,
                'customer_name' => $review->customer?->full_name,
                'product_name' => $review->product?->name,
                'rating' => $review->rating,
                'review' => $review->review,
                'status' => (bool) $review->status,
                'created_at' => $review->created_at->format('Y-m-d'),
            ]);

        return Inertia::render('admin/reviews/index', [
            'reviews' => $reviews,
            'filters' => [
                'search' => $search,
                'rating' => $rating,
                'status' => $status,
            ],
        ]);
    }

    public function edit($id)
    {
        $review = Review::with(['customer:id,full_name', 'product:id,name'])->findOrFail($id);

        return Inertia::render('admin/reviews/edit', [
            'review' => [
                'id' => $review->id,
                'customer_name' => $review->customer?->full_name,
                'product_name' => $review->product?->name,
                'rating' => $review->rating,
                'review' => $review->review,
                'status' => (bool) $review->status,
            ],
        ]);
    }

    public function update(Request $request, $id)
    {
        $review = Review::findOrFail($id);

        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'nullable|string|max:1000',
            'status' => 'required|boolean',
        ]);

        $review->update($validated);

        return redirect()->route('admin.reviews.index')
            ->with('toast', ['type' => 'success', 'message' => 'Review updated successfully.']);
    }

    public function destroy($id)
    {
        $review = Review::findOrFail($id);
        $review->delete();

        return redirect()->route('admin.reviews.index')
            ->with('toast', ['type' => 'success', 'message' => 'Review deleted successfully.']);
    }
}
