<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDetailLinksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('detail_links', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('link_id');
            $table->string('base_url');
            $table->string('url');
            $table->string('page_id')->unique();
            $table->string('name');
            $table->string('cost');
            $table->string('address');
            $table->string('bedroom');
            $table->string('bathroom');
            $table->string('description');
            $table->string('image_url');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('detail_links');
    }
}
