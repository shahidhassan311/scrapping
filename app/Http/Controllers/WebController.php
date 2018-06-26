<?php
/**
 * Created by PhpStorm.
 * User: Hassan Shahid
 * Date: 6/13/2018
 * Time: 2:36 AM
 */

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;


class WebController extends Controller
{
    public function index_page()
    {
        $property = DB::table('detail_links')
            ->select('*')
            ->get();
        return view('website.index',compact('property'));
    }
    public function request_page(){
        return view('website.submit_a_request');
    }
}