(function($) {
    $.fn.cbpBGSlideshow = function(options) {
        // merge the default plugin settings with the custom options
        options = $.extend({}, $.fn.cbpBGSlideshow.defaults, options || {});

        return $(this).each(function() {
        	

            var _this = this,
            $slideshow = $(_this),
            $items = $slideshow.children( 'li' ),
            itemsCount = $items.length,
            $controls = $( '#' + $slideshow.get(0).id + '-controls' ),
            navigation = {
                $navPrev : $controls.find( 'span.cbp-biprev' ),
                $navNext : $controls.find( 'span.cbp-binext' ),
                $navPlayPause : $controls.find( 'span.cbp-bipause' )
            },
            // current item´s index
            current = 0,
            // timeout
            slideshowtime,
            slideshowPlay,
            // true if the slideshow is active
            isSlideshowActive = options.isSlideshowActive,
            // it takes 6 seconds to change the background image
            interval = options.interval;
            
            // preload the images
            $slideshow.imagesLoaded( function() {
                
                $items.each( function() {
                    var $item = $( this );
                    $item.css( 'background-image', 'url(' + $item.find( 'img' ).attr( 'src' ) + ')' );
                } );

                // show first item
                $items.eq( current ).css( 'opacity', 1 );
                // initialize/bind the events
                initEvents();

                //Start the slideshow. Must be set for galleries that are not in carousel.
                startSlideshow();

                if ( $slideshow.parents('.owl-carousel').length ) {

                    if ( $slideshow.parents().eq(2).hasClass('active') ) {
                        startSlideshow(); 
                    } else {
                        stopSlideshow();
                    }

                } //only if carousel is the parent
                
            } );


            function initEvents() {

                navigation.$navPlayPause.on( 'click', function() {

                    var $control = $( this );
                    if( $control.hasClass( 'cbp-biplay' ) ) {
                        $control.removeClass( 'cbp-biplay' ).addClass( 'cbp-bipause' );
                        startSlideshow();
                    }
                    else {
                        $control.removeClass( 'cbp-bipause' ).addClass( 'cbp-biplay' );
                        stopSlideshow();
                    }

                } );

                navigation.$navPrev.on( 'click', function() { 
                    navigate( 'prev' ); 
                    if( isSlideshowActive ) { 
                        startSlideshow(); 
                    } 
                } );
                navigation.$navNext.on( 'click', function() { 
                    navigate( 'next' ); 
                    if( isSlideshowActive ) { 
                        startSlideshow(); 
                    }
                } );

                $(".custom-property-nav.prev").on( 'click', function() { 
                    if ( $slideshow.parents().eq(2).hasClass('active') ) {
	                	startSlideshow(); 
	                } else {
	                	stopSlideshow();
	                }
                } );

                $(".custom-property-nav.next").on( 'click', function() { 
                    if ( $slideshow.parents().eq(2).hasClass('active') ) {
	                	startSlideshow(); 
	                } else {
	                	stopSlideshow();
	                }
                } );

            }

            function navigate( direction ) {

                // current item
                var $oldItem = $items.eq( current );
                
                if( direction === 'next' ) {
                    current = current < itemsCount - 1 ? ++current : 0;
                }
                else if( direction === 'prev' ) {
                    current = current > 0 ? --current : itemsCount - 1;
                }

                // new item
                var $newItem = $items.eq( current );
                // show / hide items
                $oldItem.css( 'opacity', 0 );
                $newItem.css( 'opacity', 1 );

            }

            function startSlideshow() {

                isSlideshowActive = true;
                clearTimeout( slideshowtime );
                slideshowtime = setTimeout( function() {
                    navigate( 'next' );
                    startSlideshow();
                }, interval );

            }

            function stopSlideshow() {
                isSlideshowActive = false;
                clearTimeout( slideshowtime );
            }


        });
    };

    $.fn.cbpBGSlideshow.defaults = {
        current : 0,
        isSlideshowActive : true,
        interval: 6000,
    };
   
})(jQuery);