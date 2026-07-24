<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Url extends Model
{
    protected $fillable = [
        'user_id',
        'original_url',
        'slug',
        'expires_at',
        'password',
    ];

    protected $hidden = [
        'password',
    ];

    protected function casts(): array
    {
        return [
            'expires_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function urlAccesses(): HasMany
    {
        return $this->hasMany(UrlAccess::class);
    }
}
