<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    public function run(): void
    {
        $customers = Customer::pluck('id')->toArray();
        $products = Product::pluck('id')->toArray();

        if (empty($customers) || empty($products)) {
            return;
        }

        $reviews = [
            ['rating' => 5, 'review' => 'Excellent product! Highly recommend.', 'status' => true],
            ['rating' => 4, 'review' => 'Very good quality, fast shipping.', 'status' => true],
            ['rating' => 3, 'review' => 'Decent product for the price.', 'status' => true],
            ['rating' => 2, 'review' => 'Not as described, but acceptable.', 'status' => true],
            ['rating' => 1, 'review' => 'Very disappointed with the quality.', 'status' => false],
            ['rating' => 5, 'review' => 'Perfect! Exceeded my expectations.', 'status' => true],
            ['rating' => 4, 'review' => 'Great product, would buy again.', 'status' => true],
            ['rating' => 3, 'review' => null, 'status' => true],
            ['rating' => 4, 'review' => 'Good value for money.', 'status' => true],
            ['rating' => 5, 'review' => 'Amazing quality and fast delivery!', 'status' => true],
        ];

        foreach ($reviews as $review) {
            Review::create([
                'customer_id' => $customers[array_rand($customers)],
                'product_id' => $products[array_rand($products)],
                'rating' => $review['rating'],
                'review' => $review['review'],
                'status' => $review['status'],
            ]);
        }
    }
}
