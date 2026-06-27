<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VehicleInspection extends Model
{
    protected $fillable = [
        'job_card_id', 'inspector_id', 'inspection_date', 'report', 'status',
    ];

    protected function casts(): array
    {
        return [
            'inspection_date' => 'datetime',
        ];
    }

    public function jobCard(): BelongsTo
    {
        return $this->belongsTo(JobCard::class);
    }

    public function inspector(): BelongsTo
    {
        return $this->belongsTo(User::class, 'inspector_id');
    }
}
