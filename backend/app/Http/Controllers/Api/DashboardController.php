<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DashboardResource;
use App\Services\AnalyticsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __construct(
        private readonly AnalyticsService $analyticsService,
    ) {}

    public function index(Request $request): JsonResponse
    {
        return (new DashboardResource(
            $this->analyticsService->getDashboardForUser(
                $request->user(),
                $request->boolean('refresh'),
            )
        ))->response();
    }
}
