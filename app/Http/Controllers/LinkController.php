<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Auth\PasswordController;
use Illuminate\Http\Request;

use App\Http\Requests;

//use \Goutte;
use App\DetailLink;
use App\Links\Classes\Padmapper;
use App\Links\Classes\Ottawa_craigslist;

class LinkController extends Controller
{
    //
    public function getTitle(){
        $padMap = new Padmapper();
        $padMap->getTitle();
    }

    //Get Detail of PadMapper
    public function getDetail(){
        $padMap = new Padmapper();
        $data = $padMap->getDetail();
        foreach($data as $k => $v)
        DetailLink::create($v);
    }

    //Get Detail of Ottawa craiglist
    public function getOttawaDetail(){
        $ottawa = new Ottawa_craigslist();
        $data = $ottawa->getDetail();
        var_dump($data);
        exit;
        foreach($data as $k => $v)
            DetailLink::create($v);
    }
}
