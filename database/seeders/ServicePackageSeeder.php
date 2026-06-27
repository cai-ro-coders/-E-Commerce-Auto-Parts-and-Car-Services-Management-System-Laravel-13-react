<?php

namespace Database\Seeders;

use App\Models\ServicePackage;
use Illuminate\Database\Seeder;

class ServicePackageSeeder extends Seeder
{
    public function run(): void
    {
        $packages = [
            [
                'name' => 'Basic Oil Change',
                'description' => 'Engine oil change with genuine oil filter replacement',
                'price' => 49.99,
                'duration' => 30,
            ],
            [
                'name' => 'Standard Service',
                'description' => 'Oil change, filter replacement, and multi-point inspection',
                'price' => 89.99,
                'duration' => 60,
            ],
            [
                'name' => 'Full Service',
                'description' => 'Comprehensive service including oil, filters, spark plugs, and fluid check',
                'price' => 199.99,
                'duration' => 120,
            ],
            [
                'name' => 'Brake Service',
                'description' => 'Brake pad replacement, rotor inspection, and brake fluid check',
                'price' => 149.99,
                'duration' => 90,
            ],
            [
                'name' => 'AC Service',
                'description' => 'Air conditioning recharge and system inspection',
                'price' => 79.99,
                'duration' => 60,
            ],
            [
                'name' => 'Tire Rotation & Balance',
                'description' => 'Tire rotation, balancing, and pressure check',
                'price' => 39.99,
                'duration' => 30,
            ],
            [
                'name' => 'Major Service',
                'description' => 'Complete vehicle overhaul including timing belt, water pump, and full inspection',
                'price' => 599.99,
                'duration' => 360,
            ],
        ];

        foreach ($packages as $package) {
            ServicePackage::create($package);
        }
    }
}
