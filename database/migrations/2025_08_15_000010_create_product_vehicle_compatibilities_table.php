<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('product_vehicle_compatibilities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
            $table->foreignId('make_id')->constrained('vehicle_makes')->cascadeOnDelete();
            $table->foreignId('model_id')->constrained('vehicle_models')->cascadeOnDelete();
            $table->year('year_from')->nullable();
            $table->year('year_to')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_vehicle_compatibilities');
    }
};
