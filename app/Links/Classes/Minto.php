<?php
/**
dump( $node->filter('a')->nextAll());
dump($node->text());
dump($node->attr('href'));
 */

namespace App\Links\Classes;
use \Goutte;

use App\DetailLink;

class Minto
{
    public $base_url = 'https://www.minto.com';
    public $base_url_apartment = 'https://www.minto.com/ottawa/apartment-rentals/projects.html';
    public $main_arr = array();
    public $detail_arr = array();
    public $img = array();

    public function getDetail(){
        $crawler = Goutte::request('GET', $this->base_url_apartment);
        $crawler->filter('a:link, a:visited')->each(function ($node) {

            $new_crawler = Goutte::request('GET', $this->base_url . $node->attr('href'));
//            $link_explode = explode('/', $node->attr('href'));

            $new_crawler->filter('#compare-btn')->each(function ($node) {
                dd($node->attr('class'));
            });
            exit;

            /* Check record is already exist or not*/
            $checkId = DetailLink::wherePageId($link_explode[2])->first();
            if ($checkId == null) {
                /* Page Id (Get ID from URL)*/
                $this->detail_arr['page_id'] = $link_explode[2];
                /* Base URL */
                $this->detail_arr['base_url'] = $this->base_url;
                /* Detail URL */
                $this->detail_arr['url'] = $this->base_url . $node->attr('href');
                /* Get Name */
                $new_crawler->filter('._2cdaU')->each(function ($node) {
                    $this->detail_arr['name'] = $node->text();
                });
                /* Get Price */
                $new_crawler->filter('._21MwP > ul li:nth-child(1) > div')->each(function ($node) {
                    $this->detail_arr['cost'] = $node->text();
                });
                /* Get Bedroom */
                $new_crawler->filter('._21MwP > ul li:nth-child(2n) > div')->each(function ($node) {
                    $this->detail_arr['bedroom'] = $node->text();
                });

                /* Get Bathroom */
                $new_crawler->filter('._21MwP > ul li:nth-child(3n) > div')->each(function ($node) {
                    $this->detail_arr['bathroom'] = $node->text();
                });

                /* Get Address */
                $new_crawler->filter('.m46Bz')->each(function ($node) {
                    $this->detail_arr['address'] = $node->text();
                });

                /* Get Description */
                $new_crawler->filter('._12Xsy')->each(function ($node) {
                    $this->detail_arr['description'] = substr($node->text(), 0, 20);
                });

                /* Get Image Url */

                $new_crawler->filter('._22ob1._3aSep > img')->each(function ($node) {
                    $this->detail_arr['image_url'] = $node->attr('src');
                });

//                dd($this->detail_arr);
                $this->main_arr[] = $this->detail_arr;
            }
        });
        exit;

        return $this->main_arr;

    }
}