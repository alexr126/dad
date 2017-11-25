<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::get('login','UserController@login');

Route::model('user','App\User');
Route::resource('users','UserController');
Auth::routes();

Route::get('/master', 'HomeController@index')->name('master');
