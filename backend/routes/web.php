<?php

use App\Http\Controllers\RedirectController;
use Illuminate\Support\Facades\Route;

Route::get('/{slug}', [RedirectController::class, 'show'])
    ->where('slug', '[a-zA-Z0-9]+');

Route::post('/{slug}', [RedirectController::class, 'unlock'])
    ->where('slug', '[a-zA-Z0-9]+');
