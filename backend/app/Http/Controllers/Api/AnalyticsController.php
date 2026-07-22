<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class AnalyticsController extends Controller
{
    public function show(int $url): JsonResponse
    {
        return response()->json(['message' => 'Not implemented'], 501);
    }
}
