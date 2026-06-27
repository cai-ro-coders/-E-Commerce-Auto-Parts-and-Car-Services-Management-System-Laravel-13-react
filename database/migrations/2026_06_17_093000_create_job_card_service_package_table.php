<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('job_card_service_package', function (Blueprint $table) {
            $table->id();
            $table->foreignId('job_card_id')->constrained('job_cards')->cascadeOnDelete();
            $table->foreignId('service_package_id')->constrained('service_packages')->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['job_card_id', 'service_package_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('job_card_service_package');
    }
};
