<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::prefix('users')->group(function () {
    Route::get('/', [UserController::class, 'index']);        
    Route::post('/', [UserController::class, 'store']);       
    Route::get('/{id}', [UserController::class, 'show']);     
    Route::put('/{id}', [UserController::class, 'update']);   
    Route::delete('/{id}', [UserController::class, 'destroy']);
});

Route::get('/jumlah-user', [UserController::class, 'jumlahUser']);
Route::post('/login', [UserController::class, 'login']);

