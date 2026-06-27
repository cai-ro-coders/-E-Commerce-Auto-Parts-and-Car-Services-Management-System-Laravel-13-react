<?php

namespace Database\Seeders;

use App\Models\Coupon;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class CouponSeeder extends Seeder
{
    public function run(): void
    {
        $coupons = [
            [
                'code' => 'WELCOME10',
                'discount_type' => 'percentage',
                'discount_value' => 10,
                'start_date' => Carbon::now()->subDays(30),
                'end_date' => Carbon::now()->addDays(60),
                'usage_limit' => 100,
            ],
            [
                'code' => 'SAVE20',
                'discount_type' => 'percentage',
                'discount_value' => 20,
                'start_date' => Carbon::now()->subDays(15),
                'end_date' => Carbon::now()->addDays(45),
                'usage_limit' => 50,
            ],
            [
                'code' => 'FLAT5OFF',
                'discount_type' => 'fixed',
                'discount_value' => 5.00,
                'start_date' => Carbon::now()->subDays(10),
                'end_date' => Carbon::now()->addDays(30),
                'usage_limit' => 200,
            ],
            [
                'code' => 'FLAT15OFF',
                'discount_type' => 'fixed',
                'discount_value' => 15.00,
                'start_date' => Carbon::now()->subDays(5),
                'end_date' => Carbon::now()->addDays(90),
                'usage_limit' => 75,
            ],
            [
                'code' => 'SUMMER25',
                'discount_type' => 'percentage',
                'discount_value' => 25,
                'start_date' => Carbon::now()->subDays(20),
                'end_date' => Carbon::now()->addDays(10),
                'usage_limit' => 30,
            ],
            [
                'code' => 'VIP50',
                'discount_type' => 'fixed',
                'discount_value' => 50.00,
                'start_date' => Carbon::now()->subDays(60),
                'end_date' => Carbon::now()->addDays(120),
                'usage_limit' => 10,
            ],
            [
                'code' => 'FREESHIP',
                'discount_type' => 'fixed',
                'discount_value' => 0.00,
                'start_date' => Carbon::now()->subDays(7),
                'end_date' => Carbon::now()->addDays(7),
                'usage_limit' => null,
            ],
            [
                'code' => 'SPRING15',
                'discount_type' => 'percentage',
                'discount_value' => 15,
                'start_date' => Carbon::now()->subDays(45),
                'end_date' => null,
                'usage_limit' => 150,
            ],
            [
                'code' => 'NEWUSER',
                'discount_type' => 'fixed',
                'discount_value' => 10.00,
                'start_date' => null,
                'end_date' => Carbon::now()->addDays(365),
                'usage_limit' => 500,
            ],
            [
                'code' => 'EXPIRED50',
                'discount_type' => 'percentage',
                'discount_value' => 50,
                'start_date' => Carbon::now()->subDays(90),
                'end_date' => Carbon::now()->subDays(1),
                'usage_limit' => 20,
                'status' => false,
            ],
        ];

        foreach ($coupons as $coupon) {
            Coupon::create($coupon);
        }
    }
}
