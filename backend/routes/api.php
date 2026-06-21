<?php

use App\Http\Controllers\PublicController;
use Illuminate\Support\Facades\Route;

Route::prefix('public')->group(function () {
    Route::get('/beranda', [PublicController::class, 'index']);
    Route::get('/berita', [PublicController::class, 'berita']);
    Route::get('/berita/{id}', [PublicController::class, 'beritaDetail']);
    Route::get('/galeri', [PublicController::class, 'galeri']);
    Route::get('/kontak', [PublicController::class, 'kontak']);
    Route::post('/chatbot', [PublicController::class, 'chatbot'])->middleware('throttle:10,1');

    Route::get('/posts', [PublicController::class, 'posts']);
    Route::get('/posts/{slug}', [PublicController::class, 'postDetail']);
    Route::get('/guru', [PublicController::class, 'guruList']);
    Route::get('/siswa', [PublicController::class, 'siswaData']);
    Route::get('/downloads', [PublicController::class, 'downloadsList']);
    Route::get('/albums', [PublicController::class, 'albumsList']);
    Route::get('/photos', [PublicController::class, 'photosList']);
});
