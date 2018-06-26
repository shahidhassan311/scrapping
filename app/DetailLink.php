<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DetailLink extends Model
{
    use SoftDeletes;
    protected $table = 'detail_links';
    protected $fillable = ['base_url','url','page_id','name','cost','address','bedroom','bathroom','description','image_url'];


}
