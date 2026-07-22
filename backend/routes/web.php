<?php

use Illuminate\Support\Facades\Route;

Route::get('/{slug}', function (string $slug) {
    return response()->json(['message' => 'Not implemented', 'slug' => $slug], 501);
})->where('slug', '[a-zA-Z0-9]+');
