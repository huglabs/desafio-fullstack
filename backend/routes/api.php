<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\MessageController;

// Rotas Públicas
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Rotas Protegidas (Exigem o Token do Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    // Retorna os dados do usuário logado (muito útil para o frontend React)
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Autenticação
    Route::post('/logout', [AuthController::class, 'logout']);

    // Salas de Chat
    Route::get('/rooms', [RoomController::class, 'index']);
    Route::post('/rooms', [RoomController::class, 'store']);

    // Mensagens da Sala
    Route::get('/rooms/{room}/messages', [MessageController::class, 'index']);
    Route::post('/rooms/{room}/messages', [MessageController::class, 'store']);
});