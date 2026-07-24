<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AnalyticsResource extends JsonResource
{
    public static $wrap = null;

    public function toArray(Request $request): array
    {
        return [
            'total_clicks' => $this->resource['total_clicks'],
            'last_7_days' => $this->resource['last_7_days'],
        ];
    }
}
