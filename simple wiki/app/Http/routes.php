<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::resource('/wiki', PageController::class);
Route::get('/wiki', 'HomeController@index');
Route::get('/', function () {
    return redirect()->to('/wiki');
});
Route::get('/wiki/{id}/delete', 'PageController@destroy');
Route::get('/wiki/{id}/refresh', 'PageController@refresh');
