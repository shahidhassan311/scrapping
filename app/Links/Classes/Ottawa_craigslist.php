<?php
/**
 * Created by PhpStorm.
 * User: Hassan Shahid
 * Date: 6/13/2018
 * Time: 12:01 AM
 */

namespace App\Links\Classes;
use App\DetailLink;
use \Goutte;

class Ottawa_craigslist
{
    public $base_url = 'https://ottawa.craigslist.ca';
    public $base_url_apartment = 'https://ottawa.craigslist.ca/search/apa';
    public $main_arr = array();
    public $detail_arr = array();
    public $img = array();


    public function getDetail(){

        /*$details = DetailLink::wherePageId('p322387')->first();
        dd($details);*/

        $crawler = Goutte::request('GET', $this->base_url_apartment);
        $crawler->filter('.result-title.hdrlnk')->each(function ($node) {

            $new_crawler = Goutte::request('GET',$node->attr('href'));
            $link_explode = explode('/', $node->attr('href'));
            $arr_len = count($link_explode);

            $new_arr = explode('.',$link_explode[$arr_len-1]);
//            echo "<pre>";
//            print_r($new_arr[0]);
//            exit;



            /* Check record is already exist or not*/
            $checkId = DetailLink::wherePageId($new_arr[0])->first();
            if ($checkId == null) {
                /* Page Id (Get ID from URL)*/
                $this->detail_arr['page_id'] = $new_arr[0];

                /* Base URL */
                $this->detail_arr['base_url'] = $this->base_url;

                /* Detail URL */
                $this->detail_arr['url'] = $this->base_url . $node->attr('href');

                /* Get Name */
                $new_crawler->filter('#titletextonly')->each(function ($node) {
                    $this->detail_arr['name'] = $node->text();
                });

                /* Get Price */
                $new_crawler->filter('.price')->each(function ($node) {
                    $this->detail_arr['cost'] = $node->text();
                });

                /* Get Bedroom */
//                $new_crawler->filter('._21MwP > ul li:nth-child(2n) > div')->each(function ($node) {
//                    $this->detail_arr['bedroom'] = $node->text();
//                });

                /* Get Bathroom */
//                $new_crawler->filter('._21MwP > ul li:nth-child(3n) > div')->each(function ($node) {
//                    $this->detail_arr['bathroom'] = $node->text();
//                });

                /* Get Address */
                $new_crawler->filter('mapbox > .mapaddress')->each(function ($node) {
                    $this->detail_arr['address'] = $node->text();
                });

                /* Get Description */
                $new_crawler->filter('#postingbody')->each(function ($node) {
                    $this->detail_arr['description'] = substr($node->text(), 0, 20);
                });

                /* Get Image Url */

                $new_crawler->filter('.slide.first.visible > img')->each(function ($node) {
                    $this->detail_arr['image_url'] = $node->attr('src');
                });

                $this->main_arr[] = $this->detail_arr;
            }
        });
        return $this->main_arr;

    }

}