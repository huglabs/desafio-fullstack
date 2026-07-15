<?php

use App\Http\Controllers\Api\MessageController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function (){
    Route::get('/rooms/{roomId}/messages', [MessageController::class, 'listMessage']);
    Route::post('/rooms/{roomId}/messages', [MessageController::class, 'sendMessage']);
});