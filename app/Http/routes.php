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


//website
Route::get('/', 'WebController@index_page');
Route::get('/request', 'WebController@request_page');
Route::post('/request_search', 'WebController@request_search');

//Route::get('/','LinkController@getTitle');

Route::get('/detail','LinkController@getDetail');

Route::get('/ottawa','LinkController@getOttawaDetail');
