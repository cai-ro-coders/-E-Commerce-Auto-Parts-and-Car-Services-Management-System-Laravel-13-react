<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RepairOrder extends Model
{
    protected $fillable = [
        'job_card_id', 'labor_cost', 'parts_cost', 'total_cost',
        'notes', 'status',
    ];

    protected function casts(): array
    {
        return [
            'labor_cost' => 'decimal:2',
            'parts_cost' => 'decimal:2',
            'total_cost' => 'decimal:2',
        ];
    }

    public function jobCard(): BelongsTo
    {
        return $this->belongsTo(JobCard::class);
    }

    public function parts(): HasMany
    {
        return $this->hasMany(RepairOrderPart::class);
    }
}
