<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            // Engine & Drivetrain (category 1)
            ['category_id' => 1, 'brand_id' => 3, 'sku' => 'DEN-003', 'name' => 'Denso Oxygen Sensor', 'slug' => 'denso-oxygen-sensor', 'description' => 'Oxygen sensor for precise air-fuel ratio monitoring', 'cost_price' => 28.00, 'selling_price' => 64.99, 'minimum_stock' => 10],
            ['category_id' => 1, 'brand_id' => 8, 'sku' => 'ACD-001', 'name' => 'ACDelco Timing Belt Kit', 'slug' => 'acdelco-timing-belt-kit', 'description' => 'Complete timing belt kit including tensioner and pulleys', 'cost_price' => 55.00, 'selling_price' => 129.99, 'minimum_stock' => 8],
            ['category_id' => 1, 'brand_id' => 1, 'sku' => 'BOS-003', 'name' => 'Bosch Mass Air Flow Sensor', 'slug' => 'bosch-mass-air-flow-sensor', 'description' => 'Direct replacement MAF sensor for precise engine management', 'cost_price' => 65.00, 'selling_price' => 149.99, 'minimum_stock' => 5],
            ['category_id' => 1, 'brand_id' => 2, 'sku' => 'NGK-002', 'name' => 'NGK Spark Plug Wire Set', 'slug' => 'ngk-spark-plug-wire-set', 'description' => 'Premium silicone spark plug wire set for improved ignition', 'cost_price' => 18.00, 'selling_price' => 42.99, 'minimum_stock' => 15],
            ['category_id' => 1, 'brand_id' => 3, 'sku' => 'DEN-004', 'name' => 'Denso Fuel Pump Module', 'slug' => 'denso-fuel-pump-module', 'description' => 'Complete fuel pump assembly with fuel level sensor', 'cost_price' => 95.00, 'selling_price' => 219.99, 'minimum_stock' => 5],
            ['category_id' => 1, 'brand_id' => 8, 'sku' => 'ACD-002', 'name' => 'ACDelco Engine Coolant Thermostat', 'slug' => 'acdelco-engine-coolant-thermostat', 'description' => 'OE-quality engine coolant thermostat for precise temperature control', 'cost_price' => 8.00, 'selling_price' => 19.99, 'minimum_stock' => 20],

            // Brakes & Suspension (category 2)
            ['category_id' => 2, 'brand_id' => 1, 'sku' => 'BOS-004', 'name' => 'Bosch ABS Wheel Speed Sensor', 'slug' => 'bosch-abs-wheel-speed-sensor', 'description' => 'Wheel speed sensor for anti-lock braking system', 'cost_price' => 22.00, 'selling_price' => 52.99, 'minimum_stock' => 12],
            ['category_id' => 2, 'brand_id' => 5, 'sku' => 'BRM-003', 'name' => 'Brembo Brake Caliper', 'slug' => 'brembo-brake-caliper', 'description' => 'High-performance aluminum brake caliper', 'cost_price' => 85.00, 'selling_price' => 199.99, 'minimum_stock' => 6],
            ['category_id' => 2, 'brand_id' => 8, 'sku' => 'ACD-003', 'name' => 'ACDelco Shock Absorber', 'slug' => 'acdelco-shock-absorber', 'description' => 'Gas-charged shock absorber for smooth ride comfort', 'cost_price' => 32.00, 'selling_price' => 74.99, 'minimum_stock' => 10],
            ['category_id' => 2, 'brand_id' => 1, 'sku' => 'BOS-005', 'name' => 'Bosch Brake Master Cylinder', 'slug' => 'bosch-brake-master-cylinder', 'description' => 'Aluminum brake master cylinder for reliable braking', 'cost_price' => 45.00, 'selling_price' => 104.99, 'minimum_stock' => 8],
            ['category_id' => 2, 'brand_id' => 5, 'sku' => 'BRM-004', 'name' => 'Brembo Performance Brake Line Kit', 'slug' => 'brembo-performance-brake-line-kit', 'description' => 'Stainless steel braided brake lines for improved pedal feel', 'cost_price' => 38.00, 'selling_price' => 89.99, 'minimum_stock' => 10],
            ['category_id' => 2, 'brand_id' => 8, 'sku' => 'ACD-004', 'name' => 'ACDelco Control Arm Kit', 'slug' => 'acdelco-control-arm-kit', 'description' => 'Front lower control arm with ball joint and bushings', 'cost_price' => 55.00, 'selling_price' => 129.99, 'minimum_stock' => 7],

            // Electrical & Lighting (category 3)
            ['category_id' => 3, 'brand_id' => 1, 'sku' => 'BOS-006', 'name' => 'Bosch Battery 12V 60Ah', 'slug' => 'bosch-battery-12v-60ah', 'description' => 'Maintenance-free car battery with 12V 60Ah capacity', 'cost_price' => 65.00, 'selling_price' => 149.99, 'minimum_stock' => 10],
            ['category_id' => 3, 'brand_id' => 3, 'sku' => 'DEN-005', 'name' => 'Denso AC Compressor', 'slug' => 'denso-ac-compressor', 'description' => 'High-efficiency AC compressor for automotive HVAC systems', 'cost_price' => 140.00, 'selling_price' => 329.99, 'minimum_stock' => 4],
            ['category_id' => 3, 'brand_id' => 8, 'sku' => 'ACD-005', 'name' => 'ACDelco Ignition Coil Pack', 'slug' => 'acdelco-ignition-coil-pack', 'description' => 'Direct ignition coil pack for enhanced spark energy', 'cost_price' => 35.00, 'selling_price' => 84.99, 'minimum_stock' => 12],
            ['category_id' => 3, 'brand_id' => 1, 'sku' => 'BOS-007', 'name' => 'Bosch Alternator 120A', 'slug' => 'bosch-alternator-120a', 'description' => '120-amp alternator for SUVs and light trucks', 'cost_price' => 110.00, 'selling_price' => 259.99, 'minimum_stock' => 5],
            ['category_id' => 3, 'brand_id' => 2, 'sku' => 'NGK-003', 'name' => 'NGK Glow Plug Set', 'slug' => 'ngk-glow-plug-set', 'description' => 'Ceramic glow plug set for diesel engines', 'cost_price' => 24.00, 'selling_price' => 56.99, 'minimum_stock' => 10],
            ['category_id' => 3, 'brand_id' => 3, 'sku' => 'DEN-006', 'name' => 'Denso Wiper Blade Set', 'slug' => 'denso-wiper-blade-set', 'description' => 'Hybrid wiper blade set for all-season visibility', 'cost_price' => 10.00, 'selling_price' => 24.99, 'minimum_stock' => 30],

            // Exhaust & Cooling (category 4)
            ['category_id' => 4, 'brand_id' => 1, 'sku' => 'BOS-008', 'name' => 'Bosch Catalytic Converter', 'slug' => 'bosch-catalytic-converter', 'description' => 'Universal catalytic converter for emission control', 'cost_price' => 120.00, 'selling_price' => 289.99, 'minimum_stock' => 4],
            ['category_id' => 4, 'brand_id' => 8, 'sku' => 'ACD-006', 'name' => 'ACDelco Radiator', 'slug' => 'acdelco-radiator', 'description' => 'Aluminum core radiator for efficient engine cooling', 'cost_price' => 75.00, 'selling_price' => 179.99, 'minimum_stock' => 6],
            ['category_id' => 4, 'brand_id' => 3, 'sku' => 'DEN-007', 'name' => 'Denso Engine Cooling Fan', 'slug' => 'denso-engine-cooling-fan', 'description' => 'Electric engine cooling fan with shroud assembly', 'cost_price' => 50.00, 'selling_price' => 119.99, 'minimum_stock' => 8],
            ['category_id' => 4, 'brand_id' => 1, 'sku' => 'BOS-009', 'name' => 'Bosch Exhaust Gas Recirculation Valve', 'slug' => 'bosch-exhaust-gas-recirculation-valve', 'description' => 'EGR valve for reducing NOx emissions', 'cost_price' => 45.00, 'selling_price' => 109.99, 'minimum_stock' => 6],
            ['category_id' => 4, 'brand_id' => 8, 'sku' => 'ACD-007', 'name' => 'ACDelco Water Pump', 'slug' => 'acdelco-water-pump', 'description' => 'Mechanical water pump for engine coolant circulation', 'cost_price' => 35.00, 'selling_price' => 84.99, 'minimum_stock' => 8],
            ['category_id' => 4, 'brand_id' => 1, 'sku' => 'BOS-010', 'name' => 'Bosch Oxygen Sensor', 'slug' => 'bosch-oxygen-sensor', 'description' => 'Planar oxygen sensor for precise exhaust gas monitoring', 'cost_price' => 30.00, 'selling_price' => 72.99, 'minimum_stock' => 10],

            // Body & Interior (category 5)
            ['category_id' => 5, 'brand_id' => 3, 'sku' => 'DEN-008', 'name' => 'Denso Cabin Air Filter', 'slug' => 'denso-cabin-air-filter', 'description' => 'HEPA cabin air filter with activated carbon layer', 'cost_price' => 7.00, 'selling_price' => 18.99, 'minimum_stock' => 30],
            ['category_id' => 5, 'brand_id' => 8, 'sku' => 'ACD-008', 'name' => 'ACDelco Side Mirror Glass', 'slug' => 'acdelco-side-mirror-glass', 'description' => 'Replacement side mirror glass with anti-glare coating', 'cost_price' => 15.00, 'selling_price' => 36.99, 'minimum_stock' => 15],
            ['category_id' => 5, 'brand_id' => 1, 'sku' => 'BOS-011', 'name' => 'Bosch Horn Set', 'slug' => 'bosch-horn-set', 'description' => 'Dual-tone electric horn set for vehicles', 'cost_price' => 12.00, 'selling_price' => 29.99, 'minimum_stock' => 20],
            ['category_id' => 5, 'brand_id' => 2, 'sku' => 'NGK-004', 'name' => 'NGK Ignition Coil Wire', 'slug' => 'ngk-ignition-coil-wire', 'description' => 'Silicone ignition wire with high-temperature insulation', 'cost_price' => 9.00, 'selling_price' => 22.99, 'minimum_stock' => 25],

            // Tires & Wheels (category 6)
            ['category_id' => 6, 'brand_id' => 6, 'sku' => 'MIC-001', 'name' => 'Michelin Pilot Sport 4S 225/45R17', 'slug' => 'michelin-pilot-sport-4s-225-45r17', 'description' => 'Ultra-high performance summer tire', 'cost_price' => 120.00, 'selling_price' => 279.99, 'minimum_stock' => 8],
            ['category_id' => 6, 'brand_id' => 6, 'sku' => 'MIC-002', 'name' => 'Michelin Defender 205/55R16', 'slug' => 'michelin-defender-205-55r16', 'description' => 'All-season touring tire with long tread life', 'cost_price' => 85.00, 'selling_price' => 199.99, 'minimum_stock' => 10],
            ['category_id' => 6, 'brand_id' => 6, 'sku' => 'MIC-003', 'name' => 'Michelin Latitude Tour 235/65R17', 'slug' => 'michelin-latitude-tour-235-65r17', 'description' => 'Highway all-season tire for SUVs and crossovers', 'cost_price' => 105.00, 'selling_price' => 249.99, 'minimum_stock' => 6],
            ['category_id' => 6, 'brand_id' => 6, 'sku' => 'MIC-004', 'name' => 'Michelin X-Ice 195/65R15', 'slug' => 'michelin-x-ice-195-65r15', 'description' => 'Studless winter tire for superior snow traction', 'cost_price' => 95.00, 'selling_price' => 229.99, 'minimum_stock' => 8],
            ['category_id' => 6, 'brand_id' => 6, 'sku' => 'MIC-005', 'name' => 'Michelin Agilis 215/70R15', 'slug' => 'michelin-agilis-215-70r15', 'description' => 'Light truck tire for commercial vans and delivery vehicles', 'cost_price' => 95.00, 'selling_price' => 219.99, 'minimum_stock' => 8],

            // Fluids & Chemicals (category 7)
            ['category_id' => 7, 'brand_id' => 7, 'sku' => 'MOB-001', 'name' => 'Mobil 1 Synthetic 0W-20 5L', 'slug' => 'mobil-1-synthetic-0w20-5l', 'description' => 'Advanced full synthetic engine oil 0W-20 (5 liters)', 'cost_price' => 22.00, 'selling_price' => 54.99, 'minimum_stock' => 25],
            ['category_id' => 7, 'brand_id' => 7, 'sku' => 'MOB-002', 'name' => 'Mobil 1 Synthetic 5W-30 5L', 'slug' => 'mobil-1-synthetic-5w30-5l', 'description' => 'Advanced full synthetic engine oil 5W-30 (5 liters)', 'cost_price' => 22.00, 'selling_price' => 54.99, 'minimum_stock' => 25],
            ['category_id' => 7, 'brand_id' => 7, 'sku' => 'MOB-003', 'name' => 'Mobil 1 Synthetic 10W-40 5L', 'slug' => 'mobil-1-synthetic-10w40-5l', 'description' => 'Advanced full synthetic engine oil 10W-40 (5 liters)', 'cost_price' => 22.00, 'selling_price' => 54.99, 'minimum_stock' => 20],
            ['category_id' => 7, 'brand_id' => 4, 'sku' => 'CAS-002', 'name' => 'Castrol GTX 15W-40 5L', 'slug' => 'castrol-gtx-15w40-5l', 'description' => 'Conventional engine oil 15W-40 for older engines (5 liters)', 'cost_price' => 15.00, 'selling_price' => 36.99, 'minimum_stock' => 20],
            ['category_id' => 7, 'brand_id' => 4, 'sku' => 'CAS-003', 'name' => 'Castrol Transmax ATF Dexron VI', 'slug' => 'castrol-transmax-atf-dexron-vi', 'description' => 'Synthetic automatic transmission fluid (1 liter)', 'cost_price' => 8.00, 'selling_price' => 19.99, 'minimum_stock' => 20],
            ['category_id' => 7, 'brand_id' => 4, 'sku' => 'CAS-004', 'name' => 'Castrol Brake Fluid DOT 4', 'slug' => 'castrol-brake-fluid-dot-4', 'description' => 'High-performance brake fluid DOT 4 (500ml)', 'cost_price' => 5.00, 'selling_price' => 12.99, 'minimum_stock' => 30],
            ['category_id' => 7, 'brand_id' => 4, 'sku' => 'CAS-005', 'name' => 'Castrol Antifreeze Coolant Concentrate', 'slug' => 'castrol-antifreeze-coolant-concentrate', 'description' => 'Universal ethylene glycol coolant concentrate (1 liter)', 'cost_price' => 7.00, 'selling_price' => 16.99, 'minimum_stock' => 25],
            ['category_id' => 7, 'brand_id' => 7, 'sku' => 'MOB-004', 'name' => 'Mobil 1 Synthetic Gear Oil 75W-90', 'slug' => 'mobil-1-synthetic-gear-oil-75w90', 'description' => 'Synthetic gear and differential oil (1 liter)', 'cost_price' => 10.00, 'selling_price' => 24.99, 'minimum_stock' => 15],

            // Tools & Equipment (category 8)
            ['category_id' => 8, 'brand_id' => 1, 'sku' => 'BOS-012', 'name' => 'Bosch Automotive Multimeter', 'slug' => 'bosch-automotive-multimeter', 'description' => 'Professional digital multimeter for automotive diagnostics', 'cost_price' => 35.00, 'selling_price' => 84.99, 'minimum_stock' => 10],
            ['category_id' => 8, 'brand_id' => 1, 'sku' => 'BOS-013', 'name' => 'Bosch Diagnostic Scan Tool', 'slug' => 'bosch-diagnostic-scan-tool', 'description' => 'OBD2 code reader with live data stream', 'cost_price' => 60.00, 'selling_price' => 149.99, 'minimum_stock' => 5],
            ['category_id' => 8, 'brand_id' => 2, 'sku' => 'NGK-005', 'name' => 'NGK Spark Plug Gap Tool', 'slug' => 'ngk-spark-plug-gap-tool', 'description' => 'Precision spark plug gap measuring and adjustment tool', 'cost_price' => 3.00, 'selling_price' => 7.99, 'minimum_stock' => 50],
            ['category_id' => 8, 'brand_id' => 8, 'sku' => 'ACD-009', 'name' => 'ACDelco Fuel Pressure Tester', 'slug' => 'acdelco-fuel-pressure-tester', 'description' => 'Fuel pressure testing kit for gasoline engines', 'cost_price' => 40.00, 'selling_price' => 94.99, 'minimum_stock' => 6],
            ['category_id' => 8, 'brand_id' => 1, 'sku' => 'BOS-014', 'name' => 'Bosch Mechanic Tool Set 42-Piece', 'slug' => 'bosch-mechanic-tool-set-42-piece', 'description' => 'Complete socket and wrench set for automotive repairs', 'cost_price' => 55.00, 'selling_price' => 129.99, 'minimum_stock' => 8],
            ['category_id' => 8, 'brand_id' => 3, 'sku' => 'DEN-009', 'name' => 'Denso AC Service Kit', 'slug' => 'denso-ac-service-kit', 'description' => 'AC recharge kit with pressure gauge and hose', 'cost_price' => 30.00, 'selling_price' => 69.99, 'minimum_stock' => 8],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
