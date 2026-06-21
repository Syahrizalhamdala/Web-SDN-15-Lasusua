<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json(['message' => 'SD Negeri Cendekia API', 'version' => '1.0']);
});

Route::get('/health', function () {
    return response()->json(['status' => 'ok']);
});
