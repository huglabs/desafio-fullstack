<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Url */
class UrlResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'original_url' => $this->original_url,
            'slug' => $this->slug,
            'short_url' => rtrim(config('app.url'), '/').'/'.$this->slug,
            'expires_at' => $this->expires_at?->toIso8601String(),
            'has_password' => $this->password !== null,
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
