<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Engine & Drivetrain', 'slug' => 'engine-drivetrain', 'description' => 'Engine components, transmissions, and drivetrain parts'],
            ['name' => 'Brakes & Suspension', 'slug' => 'brakes-suspension', 'description' => 'Brake pads, rotors, shock absorbers, and suspension parts'],
            ['name' => 'Electrical & Lighting', 'slug' => 'electrical-lighting', 'description' => 'Batteries, alternators, starters, and lighting components'],
            ['name' => 'Exhaust & Cooling', 'slug' => 'exhaust-cooling', 'description' => 'Exhaust systems, radiators, and cooling system parts'],
            ['name' => 'Body & Interior', 'slug' => 'body-interior', 'description' => 'Body panels, interior trim, and accessories'],
            ['name' => 'Tires & Wheels', 'slug' => 'tires-wheels', 'description' => 'Tires, rims, and wheel accessories'],
            ['name' => 'Fluids & Chemicals', 'slug' => 'fluids-chemicals', 'description' => 'Engine oil, coolant, brake fluid, and chemicals'],
            ['name' => 'Tools & Equipment', 'slug' => 'tools-equipment', 'description' => 'Automotive tools and workshop equipment'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
