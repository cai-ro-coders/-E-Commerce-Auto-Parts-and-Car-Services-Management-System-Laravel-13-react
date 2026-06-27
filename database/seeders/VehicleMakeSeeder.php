<?php

namespace Database\Seeders;

use App\Models\VehicleMake;
use Illuminate\Database\Seeder;

class VehicleMakeSeeder extends Seeder
{
    public function run(): void
    {
        $makes = [
            ['name' => 'Toyota'],
            ['name' => 'Honda'],
            ['name' => 'Ford'],
            ['name' => 'BMW'],
            ['name' => 'Mercedes-Benz'],
            ['name' => 'Audi'],
            ['name' => 'Volkswagen'],
            ['name' => 'Nissan'],
            ['name' => 'Hyundai'],
            ['name' => 'Chevrolet'],
        ];

        foreach ($makes as $make) {
            VehicleMake::create($make);
        }
    }
}
