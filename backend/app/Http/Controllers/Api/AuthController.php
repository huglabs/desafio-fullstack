<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Services\AuthService;


class AuthController extends Controller {

    public function __construct(private AuthService $authService) {}

    public function registerUser(RegisterRequest $request){

        $register = $this->authService->registerUser($request->validated());

        return response()->json([
            'user' => new UserResource($register['user']),
            'token' => $register['token'],
        ], 201);
    }

    public function loginUser(LoginRequest $request){

        $login = $this->authService->loginUser($request->validated());

        return response()->json([
            'user' => new UserResource($login['user']),
            'token' => $login['token'],
        ]);
    }

    public function logoutUser(Request $request){

        $this->authService->logout($request->user());

        return response()->json([
            'message' => 'Logout realizado com Sucesso'
        ]); 
    }

}
