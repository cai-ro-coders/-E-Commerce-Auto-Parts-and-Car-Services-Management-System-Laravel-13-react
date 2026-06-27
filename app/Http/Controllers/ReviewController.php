<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'nullable|string|max:1000',
        ]);

        $customer = $request->user()->customer;

        if (!$customer) {
            return redirect()->back()->with('error', 'You must be a customer to leave a review.');
        }

        $hasCompletedOrder = Order::where('customer_id', $customer->id)
            ->where('order_status', 'completed')
            ->whereHas('items', fn($q) => $q->where('product_id', $request->product_id))
            ->exists();

        if (!$hasCompletedOrder) {
            return redirect()->back()->with('error', 'You can only review products you have purchased and received.');
        }

        $existing = Review::where('customer_id', $customer->id)
            ->where('product_id', $request->product_id)
            ->first();

        if ($existing) {
            return redirect()->back()->with('error', 'You have already reviewed this product.');
        }

        Review::create([
            'customer_id' => $customer->id,
            'product_id' => $request->product_id,
            'rating' => $request->rating,
            'review' => $request->review,
            'status' => false,
        ]);

        return redirect()->back()->with('success', 'Your review has been submitted and is pending approval.');
    }
}
