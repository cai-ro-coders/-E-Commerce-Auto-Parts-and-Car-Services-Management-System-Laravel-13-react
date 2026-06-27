<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    public function run(): void
    {
        $brands = [
            ['name' => 'Bosch', 'slug' => 'bosch', 'description' => 'German automotive parts manufacturer'],
            ['name' => 'NGK', 'slug' => 'ngk', 'description' => 'Spark plugs and ignition components'],
            ['name' => 'Denso', 'slug' => 'denso', 'description' => 'Japanese automotive components manufacturer'],
            ['name' => 'Castrol', 'slug' => 'castrol', 'description' => 'Engine oils and lubricants'],
            ['name' => 'Brembo', 'slug' => 'brembo', 'description' => 'High-performance brake systems'],
            ['name' => 'Michelin', 'slug' => 'michelin', 'description' => 'Premium tires and wheels'],
            ['name' => 'Mobil 1', 'slug' => 'mobil-1', 'description' => 'Synthetic motor oils'],
            ['name' => 'ACDelco', 'slug' => 'acdelco', 'description' => 'General Motors genuine parts'],
        ];

        foreach ($brands as $brand) {
            Brand::create($brand);
        }
    }
}
