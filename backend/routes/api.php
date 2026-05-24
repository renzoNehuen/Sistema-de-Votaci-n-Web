<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\VoteController;
use App\Http\Controllers\VoterController;
use App\Http\Controllers\AuthController;

// RUTAS SIN PROTECCION
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::get('/public/candidates', [VoterController::class, 'listCandidates']);
Route::get('/public/voters/search', [VoterController::class, 'searchByDocument']);
Route::post('/public/votes', [VoteController::class, 'store']);

// RUTAS PROTEGIDAS
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::put('/change-password', [AuthController::class, 'changePassword']);

    // RUTAS DE ADMIN
    Route::prefix('admins')->group(function () {
        Route::get('/', [AdminController::class, 'index']);
        Route::post('/', [AdminController::class, 'store']);
        Route::get('/{id}', [AdminController::class, 'show']);
        Route::put('/{id}', [AdminController::class, 'update']);
        Route::delete('/{id}', [AdminController::class, 'destroy']);
    });
    

    // RUTAS DE VOTER
    Route::prefix('voters')->group(function () {
        Route::get('/', [VoterController::class, 'index']);
        Route::post('/', [VoterController::class, 'store']);
        Route::get('/{id}', [VoterController::class, 'show']);
        Route::put('/{id}', [VoterController::class, 'update']);
        Route::delete('/{id}', [VoterController::class, 'destroy']);
    });

    // RUTAS DE VOTE
    Route::prefix('votes')->group(function () {
        Route::get('/', [VoteController::class, 'index']);
        Route::post('/', [VoteController::class, 'store']);
        Route::get('/{id}', [VoteController::class, 'show']);
        Route::put('/{id}', [VoteController::class, 'update']);
        Route::delete('/{id}', [VoteController::class, 'destroy']);
    });
});