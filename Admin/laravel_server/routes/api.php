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
Route::group(['middleware'=>'auth:api'], function(){
    Route::get('users', 'UserControllerAPI@getUsers');
    Route::get('users/emailavailable', 'UserControllerAPI@emailAvailable');
    Route::get('users/{id}', 'UserControllerAPI@getUser');
    Route::post('users', 'UserControllerAPI@store');
    Route::put('users/{id}', 'UserControllerAPI@update');
    Route::delete('users/{id}', 'UserControllerAPI@delete');
    Route::put('users/block/{id}', 'UserControllerAPI@block');
    Route::put('users/unblock/{id}', 'UserControllerAPI@unblock');
});

//Images
//Route::group(['middleware'=>'auth:api'], function(){
	Route::get('images', 'ImageControllerAPI@getImages');
	Route::get('images/{id}', 'ImageControllerAPI@getImage');
	Route::put('images/activate/{id}', 'ImageControllerAPI@activate');
    Route::put('images/disable/{id}', 'ImageControllerAPI@disable');
	Route::post('images', 'ImageControllerAPI@store');
	Route::delete('images/remove/{id}', 'ImageControllerAPI@delete');
	//Route::post('images/upload', 'ImageControllerAPI@upload');
	Route::post('/upload', 'ImageControllerAPI@upload');
//});

//Games
Route::group(['middleware'=>'auth:api'], function(){
    Route::get('games', 'GameControllerAPI@index');
    Route::get('games/lobby', 'GameControllerAPI@lobby');
    Route::get('games/status/{status}', 'GameControllerAPI@gamesStatus');
    Route::get('games/{id}', 'GameControllerAPI@getGame');
    Route::post('games', 'GameControllerAPI@store');
    Route::patch('games/{id}/join-start', 'GameControllerAPI@joinAndStart');
    Route::patch('games/{id}/endgame/{winner}', 'GameControllerAPI@endgame');
});

