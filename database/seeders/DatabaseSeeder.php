<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            CategorySeeder::class,
            BrandSeeder::class,
            VehicleMakeSeeder::class,
            VehicleModelSeeder::class,
            CustomerSeeder::class,
            ProductSeeder::class,
            ServicePackageSeeder::class,
            SettingSeeder::class,
            UserSeeder::class,
            AdditionalProductSeeder::class,
            CouponSeeder::class,
            OrderSeeder::class,
            ReviewSeeder::class,
        ]);
    }
}
