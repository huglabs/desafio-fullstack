<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DashboardResource extends JsonResource
{
    public static $wrap = null;

    public function toArray(Request $request): array
    {
        return [
            'total_urls' => $this->resource['total_urls'],
            'total_clicks' => $this->resource['total_clicks'],
            'clicks_today' => $this->resource['clicks_today'],
            'last_7_days' => $this->resource['last_7_days'],
        ];
    }
}
