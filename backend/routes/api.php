<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AnalyticsController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\UrlController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::get('/dashboard', [DashboardController::class, 'index']);

    Route::get('/urls', [UrlController::class, 'index']);
    Route::post('/urls', [UrlController::class, 'store']);
    Route::get('/urls/{url}', [UrlController::class, 'show']);
    Route::delete('/urls/{url}', [UrlController::class, 'destroy']);
    Route::get('/urls/{url}/analytics', [AnalyticsController::class, 'show']);
});
