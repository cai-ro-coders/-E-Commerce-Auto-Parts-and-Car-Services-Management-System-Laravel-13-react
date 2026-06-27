<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class AdditionalProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            ['category_id' => 5, 'brand_id' => 6, 'sku' => 'MIC-006', 'name' => 'Michelin Tire Inflator', 'slug' => 'michelin-tire-inflator', 'description' => '12V digital tire inflator with auto shut-off', 'cost_price' => 18.00, 'selling_price' => 42.99, 'minimum_stock' => 15],
            ['category_id' => 7, 'brand_id' => 7, 'sku' => 'MOB-005', 'name' => 'Mobil 1 Oil Filter M1-102', 'slug' => 'mobil-1-oil-filter-m1-102', 'description' => 'Premium oil filter compatible with synthetic motor oil', 'cost_price' => 6.00, 'selling_price' => 14.99, 'minimum_stock' => 30],
            ['category_id' => 1, 'brand_id' => 2, 'sku' => 'NGK-006', 'name' => 'NGK Oxygen Sensor NTK', 'slug' => 'ngk-oxygen-sensor-ntk', 'description' => 'NTK wideband oxygen sensor for air-fuel ratio control', 'cost_price' => 32.00, 'selling_price' => 76.99, 'minimum_stock' => 8],
        ];

        foreach ($products as $product) {
            Product::firstOrCreate(['sku' => $product['sku']], $product);
        }
    }
}
