<?php

namespace Database\Seeders;

use App\Models\VehicleMake;
use App\Models\VehicleModel;
use Illuminate\Database\Seeder;

class VehicleModelSeeder extends Seeder
{
    public function run(): void
    {
        $models = [
            ['make' => 'Toyota', 'models' => ['Camry', 'Corolla', 'RAV4', 'Hilux', 'Land Cruiser']],
            ['make' => 'Honda', 'models' => ['Civic', 'Accord', 'CR-V', 'City', 'HR-V']],
            ['make' => 'Ford', 'models' => ['Mustang', 'F-150', 'Focus', 'Explorer', 'Ranger']],
            ['make' => 'BMW', 'models' => ['3 Series', '5 Series', 'X3', 'X5', 'M4']],
            ['make' => 'Mercedes-Benz', 'models' => ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE']],
            ['make' => 'Audi', 'models' => ['A3', 'A4', 'A6', 'Q5', 'Q7']],
            ['make' => 'Volkswagen', 'models' => ['Golf', 'Passat', 'Tiguan', 'Jetta', 'Polo']],
            ['make' => 'Nissan', 'models' => ['Altima', 'Sentra', 'Rogue', 'Pathfinder', 'Navara']],
            ['make' => 'Hyundai', 'models' => ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'i30']],
            ['make' => 'Chevrolet', 'models' => ['Silverado', 'Camaro', 'Malibu', 'Equinox', 'Tahoe']],
        ];

        foreach ($models as $item) {
            $make = VehicleMake::where('name', $item['make'])->first();
            if ($make) {
                foreach ($item['models'] as $modelName) {
                    VehicleModel::create([
                        'make_id' => $make->id,
                        'name' => $modelName,
                    ]);
                }
            }
        }
    }
}
