<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AnalyticsResource;
use App\Services\AnalyticsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AnalyticsController extends Controller
{
    public function __construct(
        private readonly AnalyticsService $analyticsService,
    ) {}

    public function show(Request $request, int $url): JsonResponse
    {
        return (new AnalyticsResource(
            $this->analyticsService->getForUser(
                $request->user(),
                $url,
                $request->boolean('refresh'),
            )
        ))->response();
    }
}
