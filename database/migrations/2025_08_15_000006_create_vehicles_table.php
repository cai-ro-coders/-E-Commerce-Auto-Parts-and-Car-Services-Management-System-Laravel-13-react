<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained('customers')->cascadeOnDelete();
            $table->foreignId('make_id')->constrained('vehicle_makes')->cascadeOnDelete();
            $table->foreignId('model_id')->constrained('vehicle_models')->cascadeOnDelete();
            $table->year('year')->nullable();
            $table->string('vin', 17)->nullable()->unique();
            $table->string('registration_number')->nullable();
            $table->string('engine_type')->nullable();
            $table->integer('mileage')->nullable();
            $table->string('fuel_type')->nullable();
            $table->string('color')->nullable();
            $table->boolean('status')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
