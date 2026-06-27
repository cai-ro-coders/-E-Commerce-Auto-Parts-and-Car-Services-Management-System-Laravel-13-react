<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            ['key' => 'site_name', 'value' => 'AutoParts & Car Services', 'group' => 'general'],
            ['key' => 'site_logo', 'value' => null, 'group' => 'general'],
            ['key' => 'support_email', 'value' => 'support@autoparts.com', 'group' => 'general'],
            ['key' => 'support_phone', 'value' => '+1-555-000-0000', 'group' => 'general'],
            ['key' => 'currency', 'value' => 'USD', 'group' => 'general'],
            ['key' => 'tax_rate', 'value' => '8.25', 'group' => 'general'],
            ['key' => 'shipping_fee', 'value' => '10.00', 'group' => 'general'],
            ['key' => 'stripe_publishable_key', 'value' => 'pk_test', 'group' => 'payment'],
            ['key' => 'stripe_secret_key', 'value' => 'sk_test', 'group' => 'payment'],
            ['key' => 'paypal_client_id', 'value' => 'test', 'group' => 'payment'],
            ['key' => 'paypal_client_secret', 'value' => 'test', 'group' => 'payment'],
        ];

        foreach ($settings as $setting) {
            Setting::create($setting);
        }
    }
}
