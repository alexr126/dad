<?php

use Illuminate\Http\Request;
use Illuminate\Contracts\Support\Jsonable;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
//Login
Route::post('login', 'LoginControllerAPI@login');
Route::middleware('auth:api')->post('logout', 'LoginControllerAPI@logout');
//Users
Route::middleware('auth:api')->get('users', 'UserControllerAPI@getUsers');
Route::middleware('auth:api')->get('users/emailavailable', 'UserControllerAPI@emailAvailable');
Route::middleware('auth:api')->get('users/{id}', 'UserControllerAPI@getUser');
Route::get('users/nickname/{nickname}', 'UserControllerAPI@getUserByNickname');
Route::get('users/email/{email}', 'UserControllerAPI@getUserByEmail');
Route::middleware('auth:api')->post('users', 'UserControllerAPI@store');
Route::middleware('auth:api')->put('users/{id}', 'UserControllerAPI@update');
Route::middleware('auth:api')->delete('users/{id}', 'UserControllerAPI@delete');
//Games
Route::middleware('auth:api')->get('games', 'GameControllerAPI@index');
Route::middleware('auth:api')->get('games/lobby', 'GameControllerAPI@lobby');
Route::middleware('auth:api')->get('games/status/{status}', 'GameControllerAPI@gamesStatus');
Route::middleware('auth:api')->get('games/{id}', 'GameControllerAPI@getGame');
Route::middleware('auth:api')->post('games', 'GameControllerAPI@store');
Route::middleware('auth:api')->patch('games/{id}/join-start', 'GameControllerAPI@joinAndStart');
Route::middleware('auth:api')->patch('games/{id}/endgame/{winner}', 'GameControllerAPI@endgame');


