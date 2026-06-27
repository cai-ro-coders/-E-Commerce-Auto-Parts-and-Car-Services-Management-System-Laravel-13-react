<?php

namespace Database\Seeders;

use App\Models\Customer;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    public function run(): void
    {
        $customers = [
            [
                'customer_code' => 'CUST-001',
                'full_name' => 'John Smith',
                'email' => 'john.smith@email.com',
                'phone' => '+1-555-0101',
                'address' => '123 Main Street, New York, NY 10001',
            ],
            [
                'customer_code' => 'CUST-002',
                'full_name' => 'Sarah Johnson',
                'email' => 'sarah.j@email.com',
                'phone' => '+1-555-0102',
                'address' => '456 Oak Avenue, Los Angeles, CA 90001',
            ],
            [
                'customer_code' => 'CUST-003',
                'full_name' => 'Mike Williams',
                'email' => 'mike.w@email.com',
                'phone' => '+1-555-0103',
                'address' => '789 Pine Road, Chicago, IL 60601',
            ],
            [
                'customer_code' => 'CUST-004',
                'full_name' => 'Emily Davis',
                'email' => 'emily.d@email.com',
                'phone' => '+1-555-0104',
                'address' => '321 Elm Street, Houston, TX 77001',
            ],
            [
                'customer_code' => 'CUST-005',
                'full_name' => 'David Brown',
                'email' => 'david.b@email.com',
                'phone' => '+1-555-0105',
                'address' => '654 Birch Lane, Phoenix, AZ 85001',
            ],
        ];

        foreach ($customers as $customer) {
            Customer::create($customer);
        }
    }
}
