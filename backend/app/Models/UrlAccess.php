<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UrlAccess extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'url_id',
        'ip',
        'user_agent',
        'accessed_at',
    ];

    protected function casts(): array
    {
        return [
            'accessed_at' => 'datetime',
        ];
    }

    public function url(): BelongsTo
    {
        return $this->belongsTo(Url::class);
    }
}
