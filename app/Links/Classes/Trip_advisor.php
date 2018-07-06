<?php
/**
dump( $node->filter('a')->nextAll());
dump($node->text());
dump($node->attr('href'));
 */

namespace App\Links\Classes;
use \Goutte;
use App\DetailLink;

class Trip_advisor
{
    public $base_url = 'https://www.tripadvisor.ca';
    public $base_url_apartment = 'https://www.tripadvisor.ca/VacationRentals-g155004-Reviews-Ottawa_Ontario-Vacation_Rentals.html';
    public $main_arr = array();
    public $detail_arr = array();
    public $img = array();
    public $pro_id = array();

    public function getDetail(){
        $crawler = Goutte::request('GET', $this->base_url_apartment);

        $crawler->filter('DIV.prw_rup.prw_vr_listings_vr_srp .vr_listing_cell')->each(function ($node) {
            $this->pro_id = $node->attr('id');
        });
        $crawler->filter('DIV.prw_rup.prw_vr_listings_vr_srp .property_title > a')->each(function ($node) {
            $new_crawler = Goutte::request('GET', $this->base_url . $node->attr('href'));
//            $link_explode = explode('/', $node->attr('href'));

            /* Check record is already exist or not*/
            $checkId = DetailLink::wherePageId($this->pro_id)->first();
            if ($checkId == null) {

                /* Page Id (Get ID from URL)*/
                $this->detail_arr['page_id'] = $this->pro_id;

                /* Base URL */
                $this->detail_arr['base_url'] = $this->base_url;

                /* image URL */
                $this->detail_arr['url'] = $this->base_url . $node->attr('href');
                $new_crawler->filter('DIV.prw_rup.prw_vr_listings_photo_scroll .vrPropertyPhoto')->each(function ($node) {
                    $this->detail_arr['image_url'] = $node->attr('src');
                });

                /* Get Name */
                $new_crawler->filter('#HEADING_GROUP h1')->each(function ($node) {
                    $this->detail_arr['name'] = $node->text();
                });

                /* Get Bathroom */
                $new_crawler->filter('.houseRulesOverlayBullets ul, .bathroomDetailCard ul, .bedroomDetailCard ul')->each(function ($node) {
                    $this->detail_arr['bathroom'] = $node->text();
                });

                /* Get Bedroom */
                $new_crawler->filter('.bedroomDetailCard')->each(function ($node) {
                    $this->detail_arr['bedroom'] = $node->text();
                });

                /* Get Description */
                $new_crawler->filter('#DETAILS_TRUNC_TEXT')->each(function ($node) {
                    $this->detail_arr['description'] = $node->text();
                });

                /* Get Price */
                $this->detail_arr['cost'] = "0";
//                $new_crawler->filter('.RapView__bookingPrice--2PYlC')->each(function ($node) {
//                    $this->detail_arr['cost'] = "0";
////                    $this->detail_arr['cost'] = $node->text();
//                });

                /* Get Address */
                $this->detail_arr['address'] = "0";
//                $new_crawler->filter('.m46Bz')->each(function ($node) {
//                    $this->detail_arr['address'] = "0";
////                    $this->detail_arr['address'] = $node->text();
//                });

                dd($this->detail_arr);
                $this->main_arr[] = $this->detail_arr;
            }
        });
        exit;

        return $this->main_arr;

    }
}