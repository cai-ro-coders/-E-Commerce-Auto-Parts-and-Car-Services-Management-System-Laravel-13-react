<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('job_cards', function (Blueprint $table) {
            $table->string('vehicle_name')->nullable()->after('vehicle_id');
            $table->string('vehicle_plate')->nullable()->after('vehicle_name');

            $table->foreignId('vehicle_id')->nullable()->change();
            $table->foreignId('booking_id')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('job_cards', function (Blueprint $table) {
            $table->dropColumn(['vehicle_name', 'vehicle_plate']);

            $table->foreignId('vehicle_id')->nullable(false)->change();
            $table->foreignId('booking_id')->nullable(false)->change();
        });
    }
};
