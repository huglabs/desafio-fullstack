<?php

use App\Http\Controllers\Api\RoomController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/rooms', [RoomController::class, 'listRoom']);
    Route::post('/rooms', [RoomController::class, 'createRoom']);
    Route::post('/rooms/{id}/join', [RoomController::class, 'joinRoom']);
});