<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Employee extends Model
{
    protected $fillable = [
        'userid',
        'phone',
        'address',
        'employee_id',
        'profile_image',
        'status',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'userid');
    }
}
