<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            ['name' => 'Alice Cooper', 'email' => 'alice.cooper@email.com', 'customer_code' => 'CUST-006', 'phone' => '+1-555-0106', 'address' => '100 Maple Drive, Boston, MA 02101'],
            ['name' => 'Bob Martin', 'email' => 'bob.martin@email.com', 'customer_code' => 'CUST-007', 'phone' => '+1-555-0107', 'address' => '200 Cedar Lane, Denver, CO 80201'],
            ['name' => 'Carol White', 'email' => 'carol.white@email.com', 'customer_code' => 'CUST-008', 'phone' => '+1-555-0108', 'address' => '300 Walnut Street, Seattle, WA 98101'],
            ['name' => 'Dan Wilson', 'email' => 'dan.wilson@email.com', 'customer_code' => 'CUST-009', 'phone' => '+1-555-0109', 'address' => '400 Ash Avenue, Portland, OR 97201'],
            ['name' => 'Eve Taylor', 'email' => 'eve.taylor@email.com', 'customer_code' => 'CUST-010', 'phone' => '+1-555-0110', 'address' => '500 Spruce Court, Miami, FL 33101'],
            ['name' => 'Frank Harris', 'email' => 'frank.harris@email.com', 'customer_code' => 'CUST-011', 'phone' => '+1-555-0111', 'address' => '600 Birch Road, Atlanta, GA 30301'],
            ['name' => 'Grace Lee', 'email' => 'grace.lee@email.com', 'customer_code' => 'CUST-012', 'phone' => '+1-555-0112', 'address' => '700 Willow Way, Dallas, TX 75201'],
            ['name' => 'Henry Clark', 'email' => 'henry.clark@email.com', 'customer_code' => 'CUST-013', 'phone' => '+1-555-0113', 'address' => '800 Poplar Lane, San Diego, CA 92101'],
            ['name' => 'Ivy Lewis', 'email' => 'ivy.lewis@email.com', 'customer_code' => 'CUST-014', 'phone' => '+1-555-0114', 'address' => '900 Cypress Blvd, Philadelphia, PA 19101'],
            ['name' => 'Jack Turner', 'email' => 'jack.turner@email.com', 'customer_code' => 'CUST-015', 'phone' => '+1-555-0115', 'address' => '1000 Palm Drive, Orlando, FL 32801'],
            ['name' => 'Karen Walker', 'email' => 'karen.walker@email.com', 'customer_code' => 'CUST-016', 'phone' => '+1-555-0116', 'address' => '1100 Pine Street, Nashville, TN 37201'],
            ['name' => 'Leo Adams', 'email' => 'leo.adams@email.com', 'customer_code' => 'CUST-017', 'phone' => '+1-555-0117', 'address' => '1200 Elm Avenue, Austin, TX 73301'],
            ['name' => 'Mia Scott', 'email' => 'mia.scott@email.com', 'customer_code' => 'CUST-018', 'phone' => '+1-555-0118', 'address' => '1300 Oak Circle, Charlotte, NC 28201'],
            ['name' => 'Noah Young', 'email' => 'noah.young@email.com', 'customer_code' => 'CUST-019', 'phone' => '+1-555-0119', 'address' => '1400 Fir Terrace, Detroit, MI 48201'],
            ['name' => 'Olivia King', 'email' => 'olivia.king@email.com', 'customer_code' => 'CUST-020', 'phone' => '+1-555-0120', 'address' => '1500 Hickory Drive, Minneapolis, MN 55401'],
            ['name' => 'Paul Wright', 'email' => 'paul.wright@email.com', 'customer_code' => 'CUST-021', 'phone' => '+1-555-0121', 'address' => '1600 Beech Street, St. Louis, MO 63101'],
            ['name' => 'Quinn Baker', 'email' => 'quinn.baker@email.com', 'customer_code' => 'CUST-022', 'phone' => '+1-555-0122', 'address' => '1700 Dogwood Lane, Tampa, FL 33601'],
            ['name' => 'Rachel Green', 'email' => 'rachel.green@email.com', 'customer_code' => 'CUST-023', 'phone' => '+1-555-0123', 'address' => '1800 Redwood Road, San Antonio, TX 78201'],
            ['name' => 'Sam Nelson', 'email' => 'sam.nelson@email.com', 'customer_code' => 'CUST-024', 'phone' => '+1-555-0124', 'address' => '1900 Sycamore Court, Kansas City, MO 64101'],
            ['name' => 'Tina Mitchell', 'email' => 'tina.mitchell@email.com', 'customer_code' => 'CUST-025', 'phone' => '+1-555-0125', 'address' => '2000 Aspen Way, Columbus, OH 43201'],
        ];

        foreach ($users as $data) {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => bcrypt('password'),
                'role' => 'customer',
            ]);

            Customer::create([
                'user_id' => $user->id,
                'customer_code' => $data['customer_code'],
                'full_name' => $data['name'],
                'email' => $data['email'],
                'phone' => $data['phone'],
                'address' => $data['address'],
                'loyalty_points' => fake()->numberBetween(50, 500),
                'wallet_balance' => fake()->randomFloat(2, 10, 200),
            ]);
        }
    }
}
