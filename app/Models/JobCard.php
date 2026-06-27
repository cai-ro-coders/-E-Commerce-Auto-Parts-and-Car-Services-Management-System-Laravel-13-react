<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JobCard extends Model
{
    protected $fillable = [
        'booking_id', 'vehicle_id', 'customer_id', 'job_number',
        'vehicle_name', 'vehicle_plate',
        'inspection_notes', 'estimated_cost', 'status',
    ];

    protected function casts(): array
    {
        return [
            'estimated_cost' => 'decimal:2',
        ];
    }

    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class);
    }

    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function mechanicAssignments(): HasMany
    {
        return $this->hasMany(MechanicAssignment::class);
    }

    public function repairOrders(): HasMany
    {
        return $this->hasMany(RepairOrder::class);
    }

    public function inspections(): HasMany
    {
        return $this->hasMany(VehicleInspection::class);
    }

    public function servicePackages(): BelongsToMany
    {
        return $this->belongsToMany(ServicePackage::class, 'job_card_service_package')
            ->withTimestamps();
    }
}
