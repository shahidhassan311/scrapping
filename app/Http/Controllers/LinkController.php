<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Auth\PasswordController;
use Illuminate\Http\Request;

use App\Http\Requests;

//use \Goutte;
use App\DetailLink;
use App\Links\Classes\Padmapper;
use App\Links\Classes\Ottawa_craigslist;
use App\Links\Classes\Homestead;
use App\Links\Classes\Duproprio;
use App\Links\Classes\Trip_advisor;
use App\Links\Classes\Minto;

class LinkController extends Controller
{
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
        foreach ($data as $k => $v)
            DetailLink::create($v);
    }
    //Get Detail of Trip Advisor
    public function getTrip_advisorDetail(){
        $gettrip = new Trip_advisor();
        $data = $gettrip->getDetail();
        foreach($data as $k => $v)
            DetailLink::create($v);
    }

    //Get Detail of Minto
    public function getMintoDetail(){
        $getminto = new Minto();
        $data = $getminto->getDetail();
        dd($data);
        foreach($data as $k => $v)
            DetailLink::create($v);
    }

}
