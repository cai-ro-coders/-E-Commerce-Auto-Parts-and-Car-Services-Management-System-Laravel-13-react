<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Warehouse extends Model
{
    protected $fillable = [
        'name', 'slug', 'address', 'phone', 'email', 'status',
    ];

    public function sales(): HasMany
    {
        return $this->hasMany(Sale::class);
    }
}
