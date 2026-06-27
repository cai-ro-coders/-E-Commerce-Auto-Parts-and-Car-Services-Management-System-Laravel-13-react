<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        $customers = Customer::all();
        $products = Product::all();

        $statuses = ['pending', 'processing', 'completed', 'cancelled'];
        $paymentStatuses = ['pending', 'paid', 'failed', 'refunded'];

        for ($i = 1; $i <= 50; $i++) {
            $customer = $customers->random();
            $itemCount = rand(1, 5);
            $subtotal = 0;
            $items = [];

            $selectedProducts = $products->random($itemCount);

            foreach ($selectedProducts as $product) {
                $qty = rand(1, 3);
                $unitPrice = $product->selling_price;
                $total = $qty * $unitPrice;
                $subtotal += $total;

                $items[] = [
                    'product_id' => $product->id,
                    'quantity' => $qty,
                    'unit_price' => $unitPrice,
                    'total' => $total,
                ];
            }

            $discount = round($subtotal * (rand(0, 15) / 100), 2);
            $tax = round(($subtotal - $discount) * 0.0825, 2);
            $shippingFee = rand(0, 1) ? round(rand(500, 2000) / 100, 2) : 0;
            $total = round($subtotal - $discount + $tax + $shippingFee, 2);

            $status = $statuses[array_rand($statuses)];
            $paymentStatus = $paymentStatuses[array_rand($paymentStatuses)];

            $createdAt = Carbon::now()->subDays(rand(0, 60))->addHours(rand(0, 23))->addMinutes(rand(0, 59));

            $orderNumber = 'ORD-' . str_pad($i, 5, '0', STR_PAD_LEFT);

            $order = Order::create([
                'customer_id' => $customer->id,
                'order_number' => $orderNumber,
                'subtotal' => $subtotal,
                'discount' => $discount,
                'tax' => $tax,
                'shipping_fee' => $shippingFee,
                'total' => $total,
                'payment_status' => $paymentStatus,
                'order_status' => $status,
                'created_at' => $createdAt,
                'updated_at' => $createdAt,
            ]);

            foreach ($items as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['unit_price'],
                    'total' => $item['total'],
                ]);
            }
        }
    }
}
