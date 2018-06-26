(function ($) {
    "use strict";


    /* bwmap */
    function gg_bwmap_init() {
        if ($('#bwmap').length > 0) {
            $('#bwmap').each(function () {

                var $this = $(this),
                    latitude = $this.attr('data-latitude'),
                    longitude = $this.attr('data-longitude'),
                    infow = $this.attr('data-infow'),
                    infowtitle = $this.attr('data-infowtitle'),
                    infowcontent = $this.attr('data-infowcontent'),
                    mapzoom = $this.attr('data-zoom');

                var map;
                var bwmap = new google.maps.LatLng(latitude, longitude);

                function initialize() {

                    var mapOptions = {
                        zoom: 14,
                        scrollwheel: false,
                        center: bwmap,
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        styles: [{featureType: 'all', stylers: [{saturation: -100}, {gamma: 0.0}]}]
                    };

                    map = new google.maps.Map(document.getElementById('bwmap'),
                        mapOptions);

                    var marker = new google.maps.Marker({
                        position: bwmap,
                        map: map
                    });

                    if (infow == 'use_infow') {
                        var contentString = '<div id="content">' +
                            '<div id="siteNotice">' +
                            '</div>' +
                            '<h1 id="firstHeading" class="firstHeading">' + infowtitle + '</h1>' +
                            '<div id="bodyContent">' +
                            '<p>' + infowcontent + '</p>' +
                            '</div>' +
                            '</div>';

                        var infowindow = new google.maps.InfoWindow({
                            content: contentString
                        });

                        google.maps.event.addListener(marker, 'click', function () {
                            infowindow.open(map, marker);
                        });
                    }

                }

                google.maps.event.addDomListener(window, 'load', initialize);

            });
        }
    }

    function gg_isotope_init() {
        if ($('.el-grid:not(.owl-carousel)').length > 0) {

            var layout_modes = {
                fitrows: 'fitRows',
                masonry: 'masonry'
            }

            jQuery('.gg_posts_grid, .gg_rooms').each(function () {

                var $container = jQuery(this);
                var $thumbs = $container.find('.el-grid:not(.owl-carousel)');
                var layout_mode = $thumbs.attr('data-layout-mode');
                var $imgs = $thumbs.find('img.lazy');

                if ($('body').hasClass('gg-lazyload-on')) {
                    if ($imgs.length > 0) {
                        $imgs.lazyload({
                            effect: "fadeIn",
                            threshold: 200,
                            failure_limit: Math.max($imgs.length - 1, 0),
                        });
                    }
                }

                $thumbs.imagesLoaded(function () {
                    $thumbs.isotope({
                        // options
                        itemSelector: '.isotope-item',
                        layoutMode: (layout_modes[layout_mode] == undefined ? 'fitRows' : layout_modes[layout_mode]),
                        onLayout: function () {
                            $(window).trigger("scroll");
                        }
                    });
                })


                if ($container.find('.categories_filter').length) {
                    $container.find('.categories_filter a').data('isotope', $thumbs).click(function (e) {
                        e.preventDefault();
                        var $thumbs = jQuery(this).data('isotope');
                        jQuery(this).parent().parent().find('.active').removeClass('active');
                        jQuery(this).parent().addClass('active');
                        $thumbs.isotope({filter: jQuery(this).attr('data-filter')});
                    });
                }

                jQuery(window).bind('load scroll resize', function () {
                    $thumbs.isotope('layout');
                });

            });
        }
    }

    /* Magnific */
    function gg_magnific_init() {
        if ($('.el-grid, article.post figure.effect-sadie figcaption, .owl-carousel.has_magnific, .wpb_image_grid.has_magnific, .wpb_single_image.has_magnific').length > 0) {
            $('.el-grid, article.post figure.effect-sadie figcaption, .owl-carousel.has_magnific, .wpb_image_grid.has_magnific, .wpb_single_image.has_magnific').each(function () {
                $(this).magnificPopup({
                    delegate: 'a.lightbox-el',
                    type: 'image',
                    gallery: {
                        enabled: true
                    },
                    callbacks: {
                        elementParse: function (item) {
                            if (item.el.context.className == 'lightbox-el link-wrapper lightbox-video') {
                                item.type = 'iframe';
                            } else {
                                item.type = 'image';
                            }
                        }
                    }
                });
            });
        }
    }

    /* OwlCarousel */
    function gg_owlcarousel_init() {
        if ($('.owl-carousel').length > 0) {
            $('.owl-carousel').each(function () {

                var $this = $(this),
                    slidesPerView = $this.attr('data-slides-per-view'),
                    singleItemData = $this.attr('data-single-item') == "true" ? true : false,
                    mouseDragData = $this.attr('data-mouse-drag') == "true" ? true : false,
                    transitionSlide = $this.attr('data-transition-slide'),
                    navigationData = $this.attr('data-navigation-owl') == "true" ? true : false,
                    paginationData = $this.attr('data-pagination-owl') == "true" ? true : false,
                    lazyloadData = $this.attr('data-lazyload') == "true" ? true : false,
                    autoplayData = '',
                    autoplayDataBgImages = $this.attr('data-autoplay-bg-images'),
                    rewindData = $this.attr('data-rewind') == "true" ? true : false,
                    speedData = $this.attr('data-speed'),
                    pagColor = $this.attr('data-pag-color'),
                    cID = $this.attr('data-c-id'),
                    heightData = $this.attr('data-height') == "true" ? true : false,
                    afterInitData = $this.attr('data-afterinit') == "navColor" ? navColor : '';

                if ($this.attr('data-autoplay') == "true") {
                    autoplayData = 5000;
                } else if ($this.attr('data-autoplay') == "false") {
                    autoplayData = false;
                } else {
                    autoplayData = $this.attr('data-autoplay');
                }

                $this.owlCarousel({
                    items: slidesPerView,
                    navigation: navigationData,
                    pagination: paginationData,
                    lazyLoad: lazyloadData,
                    navigationText: [
                        "<i class='arrow_carrot-left_alt2'></i>",
                        "<i class='arrow_carrot-right_alt2'></i>"
                    ],

                    singleItem: singleItemData,
                    mouseDrag: mouseDragData,
                    transitionStyle: transitionSlide, //fade, backSlide, goDown, scaleUp
                    autoPlay: autoplayData,
                    rewindNav: rewindData,
                    slideSpeed: speedData,
                    autoHeight: heightData,
                    addClassActive: true,
                    afterInit: mainSlideshow,
                    afterMove: mainSlideshow
                });

                //MainSlideshow logic
                function mainSlideshow(elem) {
                    var current = this.currentItem;
                    var id = elem.find(".owl-item").eq(current).find(".cbp-bislideshow").attr('id');
                    if (id != undefined) {
                        $('#' + id).cbpBGSlideshow({
                            interval: autoplayDataBgImages
                        });
                    }
                }

                // set Custom event for NEXT custom control
                $(".custom-property-nav.next").click(function () {
                    $this.trigger('owl.next');
                });

                // set Custom event for PREV custom control
                $(".custom-property-nav.prev").click(function () {
                    $this.trigger('owl.prev');
                });

            });

        }
    }

    /* Counter */
    function gg_counter_init() {
        if ($('.counter').length > 0) {
            jQuery('.counter-holder').waypoint(function () {
                $('.counter').each(function () {
                    if (!$(this).hasClass('initialized')) {
                        $(this).addClass('initialized');
                        var $this = $(this),
                            countToNumber = $this.attr('data-number'),
                            refreshInt = $this.attr('data-interval'),
                            speedInt = $this.attr('data-speed');

                        $(this).countTo({
                            from: 0,
                            to: countToNumber,
                            speed: speedInt,
                            refreshInterval: refreshInt
                        });
                    }
                });
            }, {offset: '85%'});
        }
    }

    /* Parallax */
    function gg_parallax_init() {
        if ($('body:not(.luxuryvilla-agent-devices) .parallax-container').length) {
            var $scroll = 0;
            $(window).scroll(function () {
                "use strict";
                $scroll = $(window).scrollTop();
            });
            $('body:not(.luxuryvilla-agent-devices) .parallax-container').each(function () {
                var $self = $(this);
                var section_height = $self.attr('parallax-data-height');
                $self.height(section_height);
                var rate = (section_height / $(document).height()) * 0.7;

                var distance = $scroll - $self.offset().top + 104;
                var bpos = -(distance * rate);
                $self.css({'background-position': '0 0', 'background-attachment': 'fixed'});
                $(window).bind('scroll', function () {
                    var distance = $scroll - $self.offset().top + 104;
                    var bpos = -(distance * rate);
                    $self.css({'background-position': 'center ' + bpos + 'px', 'background-attachment': 'fixed'});
                });
            });
            return this;
        }
    }

    /* Video background */
    function gg_video_background_init() {
        if ($('body:not(.luxuryvilla-agent-devices) .video-container').length) {
            $('body:not(.luxuryvilla-agent-devices) .video-container').each(function () {
                var $this = $(this),
                    height = $this.attr('video-data-height'),
                    video_mp4 = $this.attr('video-data-mp4'),
                    video_webm = $this.attr('video-data-webm'),
                    video_ogv = $this.attr('video-data-ogv'),
                    unique_id = 1 + Math.floor(Math.random() * 10);

                $(this).css('height', height).prepend('<div class="video-background "></div><div class="video-main-controls controls-' + unique_id + '"></div>');

                jQuery(".video-background").videobackground({
                    videoSource: [
                        [video_mp4, "video/mp4"],
                        [video_webm, "video/webm"],
                        [video_ogv, "video/ogg"]
                    ],
                    controlPosition: ".video-main-controls.controls-" + unique_id + "",
                    resize: false,
                    loop: true,
                    muted: true
                });

            });
        }
    }

    $(document).ready(function () {

        gg_owlcarousel_init();
        gg_magnific_init();
        gg_counter_init();
        gg_isotope_init();
        gg_bwmap_init();
        gg_parallax_init();
        gg_video_background_init();
        //back to top
        $('.to-the-top').click(function(e) {
            e.preventDefault();

            $('body').velocity("scroll", {
                duration: 1000
            });
        });
        // preloading
        if ($('#preloader').length > 0) {
            $('.content-wrapper').velocity({opacity:1}, 0);
            $('#preloader').delay(1000).velocity({opacity: 0}, 500, function() {
                $(this).hide();
            });
        } else {
            $('.content-wrapper').velocity({opacity:1}, 0);
        }
        //Placeholder function for IE9
        $('input, textarea').placeholder();

        //If the rooms module is in a tab reload isotope when the tab is active
        if ($('.gg_rooms').parents('.wpb_tab').length == 1) {

            $('.ui-tabs').on('tabsactivate', function (event, ui) {

                var tabid = ui.newPanel.attr('id');
                var index = ui.newTab.index();

                if ($('#' + tabid).has(".gg_rooms").length > 0) {
                    gg_isotope_init();
                }

            });
        }

        //new tabs logic
        if ($('.gg_rooms').parents('.vc_tta-tabs').length == 1) {
            $('[data-vc-tab]').on('show.vc.tab', function (e) {
                var href = $(e.target).attr('href');
                if ($(href).find('.gg_rooms').length > 0) {
                    gg_isotope_init();
                }
            });
        }

        //Dynamically assign height
        function sizeContent() {
            // First you forcibly request the scroll bars to hidden regardless if they will be needed or not.
            $('body').css('overflow', 'hidden');

            // Take the measures.
            var wpadminbar = 0,
                quickreservation = 0,
                header = 0,
                subheader = 0,
                footer = 0,
                areas_map_controls = 0,
                bodyborder = 30;


            //Get header height
            if ($('header.site-header').length > 0) {
                if ($('body').hasClass('gg-has-vertical-menu')) {
                    header = 0;
                } else {
                    header = $('header.site-header').height();
                }
            }
            //Get subheader height
            if ($('#subheader').length > 0) {
                subheader = $('#subheader').outerHeight();
            }
            //Get footer height
            if ($('footer.site-footer').length > 0) {
                footer = $('footer.site-footer').outerHeight();
            }
            //Get areas map control height
            if ($('#areas-map-controls').length > 0) {
                areas_map_controls = 86;
            }
            //Get wpadmin bar height
            if ($("#wpadminbar")[0]) {
                wpadminbar = 32;
            }
            //Get quick reservation height
            if ($('#quick-reservation').length > 0) {
                quickreservation = $('#quick-reservation').outerHeight();
            }

            var heightNoScrollBars = $(window).height() - header - subheader - footer - areas_map_controls - wpadminbar - quickreservation - bodyborder;
            var widthNoScrollBars = $(window).width();
            var heightNoScrollBarsFooter = heightNoScrollBars + footer;

            // Set the overflow css property back to it's original value (default is auto)
            $('body').css('overflow', 'auto');

            if ($(window).width() > 992) {

                if ($('body').hasClass('gg-homepage-var1')) {
                    $(".owl-item").css("height", heightNoScrollBars);
                }
                if ($('body').hasClass('gg-homepage-var2')) {
                    $(".owl-item").css("height", heightNoScrollBarsFooter);
                }

                if ($('body').hasClass('gg-homepage-var3')) {
                    $(".homepage-var3-property-holder, #cbp-bi-homepage-var3 li").css("height", $(window).height() - bodyborder - wpadminbar);
                }

                if ($('body').hasClass('gg-homepage-var4')) {
                    $(".homepage-var3-property-holder, #cbp-bi-homepage-var3 li").css("height", $(window).height() - bodyborder - wpadminbar);
                }

                if ($('body').hasClass('gg-homepage-var5')) {
                    var count_element = $('.homepage-var5-property').length;

                    $("#homepage-var5-gallery-owl .owl-item, #homepage-var5-prop-owl").css("height", $(window).height() - bodyborder - wpadminbar - footer);
                    $("#homepage-var5-prop-owl .owl-item").css("height", 100 / count_element + "%");
                }

                if ($('body').hasClass('gg-has-vertical-menu')) {
                    $("header.site-header.sidebar").css("height", $(window).height() - wpadminbar);
                    $("header.site-header.sidebar").css("margin-top", wpadminbar);
                }

                if ($('body').hasClass('single-property_cpt')) {
                    $(".single-property-content:not(.gg-sans-overflow), .single-property-gallery:not(.gg-sans-overflow)").css("height", heightNoScrollBarsFooter);
                }
            } else {

                // Get on screen image
                var screenImage = $(".cbp-bislideshow li img");

                // Create new offscreen image to test
                var theImage = new Image();
                theImage.src = screenImage.attr("src");

                // Get accurate measurements from that.
                var oldWidth = theImage.width;
                var oldHeight = theImage.height;

                var newHeight = $(window).width() / oldWidth * oldHeight;
                //Set the same height of the image on the gallery placeholder
                $(".slideshow-property-gallery, .single-property-gallery").css("height", newHeight);


            }

            if ($(window).width() < 992) {

                if ($('body').hasClass('gg-homepage-var3')) {
                    $("header.site-header.sidebar").css("height", "auto");
                    $("header.site-header.sidebar").css("margin-top", "0");
                    // Set the height of the property holder as tall as the screen
                    $(".homepage-var3-property-holder").css("height", $(window).height() - $('header.site-header').height() - bodyborder - wpadminbar);
                    $("#cbp-bi-homepage-var3 li").css("height", $(window).height() - $('header.site-header').height() - bodyborder - wpadminbar);
                }

                if ($('body').hasClass('gg-homepage-var4')) {
                    $("header.site-header.sidebar").css("height", "auto");
                    $("header.site-header.sidebar").css("margin-top", "0");
                    // Set the height of the property holder as tall as the screen
                    $(".homepage-var3-property-holder").css("height", $(window).height() - $('header.site-header').height() - bodyborder - wpadminbar);

                }

                if ($('body').hasClass('gg-homepage-var5')) {
                    var count_element = $('.homepage-var5-property').length;

                    $("header.site-header.sidebar, .slideshow-property-gallery").css("height", "auto");
                    $("header.site-header.sidebar").css("margin-top", "0");

                    $("#homepage-var5-gallery-owl .owl-item, #homepage-var5-prop-owl").css("height", $(window).height() - $('header.site-header').height() - bodyborder - wpadminbar);
                    $("#homepage-var5-prop-owl .owl-item").css("height", 100 / count_element + "%");

                }
            }
        }


        $(window).resize(function () {
            sizeContent();
        })

        sizeContent();


        //jPlayer - Rezize the contatiner correctly
        if (jQuery().jPlayer && jQuery('.jp-interface').length) {
            jQuery('.jp-interface').each(function () {
                var playerwidth = jQuery(this).width();
                var newwidth = playerwidth - 220;
                jQuery(this).find('.jp-progress-container').css({width: newwidth + 'px'});
            });
        }

        // here for the submit button of the comment reply form
        $('#submit, input[type="button"], input[type="reset"], input[type="submit"]').addClass('btn btn-primary');

        $('table#wp-calendar').addClass('table table-striped');

        $('table').not('.variations').addClass('table');

        $('form').not('.variations_form').addClass('table');

        $('form').attr('role', 'form');

        var inputs = $('input, textarea')
            .not(':input[type=button], :input[type=submit], :input[type=reset]');

        $(inputs).each(function () {
            $(this).addClass('form-control');
        });


        // Reservation Form
        //jQueryUI - Datepicker
        if (jQuery().datepicker) {

            var nowTemp = new Date();
            var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

            //Get the WPML class
            var langClass = '';
            var body_wpml_class = $('body').attr("class").match(/calendar-[\w-]*\b/);
            var lang = 'en';

            if (body_wpml_class) {
                langClass = body_wpml_class.toString();
                lang = langClass.slice(-2);
            }

            $('#checkin').datepicker({
                startDate: now,
                language: lang,
                todayHighlight: true,
                autoclose: true
            }).on('changeDate', function (e) {
                $('#checkout').datepicker({
                    autoclose: true,
                    language: lang
                }).datepicker('setStartDate', e.date);
                $('#checkout').focus();
            });

            // var checkin = $('#checkin').datepicker({
            //   onRender: function(date) {
            //     return date.valueOf() < now.valueOf() ? 'disabled' : '';
            //   }
            // }).on('changeDate', function(ev) {
            //   if (ev.date.valueOf() > checkout.date.valueOf()) {
            //     var newDate = new Date(ev.date)
            //     newDate.setDate(newDate.getDate() + 1);
            //     checkout.setValue(newDate);
            //   }
            //   checkin.hide();
            //   $('#checkout')[0].focus();
            // }).data('datepicker');
            // var checkout = $('#checkout').datepicker({
            //   onRender: function(date) {
            //     return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
            //   }
            // }).on('changeDate', function(ev) {
            //   checkout.hide();
            // }).data('datepicker');

        }

        //Select - Minimalect
        if (jQuery('select:not(#gg_property_select_form)').length) {
            jQuery('select:not(#gg_property_select_form)').each(function () {

                var $this = $(this);
                var attr = $(this).attr('name');
                var first_option = $("option:first-child");
                var first_option_name = $(this).find(first_option).text();
                var selectPlaceholder = null;

                //alert(first_option_name);

                //if( attr == 'archive-dropdown') {
                //selectPlaceholder = 'Select Month';
                //} else {
                //selectPlaceholder = null;
                //}

                $this.minimalect({
                    searchable: false,
                    placeholder: first_option_name
                });

            });
        }

        $(".categories_filter a[data-toggle^='collapse'], .categories_filter a[data-filter^='*']").on('click', function (e) {
            $('.collapse.in').not($(this).data("target")).collapse('hide');
        });


        function vertical_sidebar_init() {
            if ($('body').hasClass('gg-homepage-var3') || $('body').hasClass('gg-homepage-var4') || $('body').hasClass('gg-homepage-var5') || $('body').hasClass('gg-has-vertical-menu')) {
                // Hide the footer if browser height is low
                var window_height = $(window).height();

                var logo_height = $('.logo-wrapper').height();

                var menu_locate = $('#main-menu');
                var menu_pos = menu_locate.position();
                var menu_height = menu_locate.height();

                if (menu_locate.length) {
                    var menu_base = menu_height + menu_pos.top;
                } else {
                    var menu_base = 0;
                }

                var footer_locate = $('.slideshow-sidebar.slideshow-vertical');
                var footer_height = footer_locate.height();
                var footer_pos = footer_locate.position();
                var footer_top = footer_pos.top;

                var space_remaining = ( window_height - logo_height - menu_base ) - 60;

                if (space_remaining < footer_height) {
                    $('.slideshow-sidebar.slideshow-vertical').removeClass('slideshow-sidebar-fixed').addClass('slideshow-sidebar-scroll');
                }

                if (space_remaining > footer_height) {
                    $('.slideshow-sidebar.slideshow-vertical').addClass('slideshow-sidebar-fixed').removeClass('slideshow-sidebar-scroll');
                }

                $("header.site-header.sidebar").getNiceScroll().resize();
            }
        }

        $(window).resize(function () {
            vertical_sidebar_init();
        });

        //Nice scroll
        if ($(window).width() > 768 && !$('body').hasClass('luxuryvilla-agent-devices')) {
            $(".single-property-content:not(.gg-sans-overflow), header.site-header.sidebar").niceScroll({
                cursorwidth: 4,
                cursorborder: 0,
                cursorcolor: "#f3f3f3",
                cursorborderradius: 0,
                touchbehavior: false,
                autohidemode: "scroll"
            });
        }

        vertical_sidebar_init();

        $('.dropdown').on('shown.bs.dropdown', function () {
            vertical_sidebar_init();
        });

        $('.dropdown').on('hidden.bs.dropdown', function () {
            vertical_sidebar_init();
        });

        //Add a mention for pace to know when the dom is ready
        $('body').prepend('<div id="gg-dom-loaded"></div>');

        //Slideshow
        if ($('.cbp-bislideshow').length) {
            $('.cbp-bislideshow').each(function () {
                $(this).cbpBGSlideshow();
            });
        }

    });
    (function(a) {
        ($.browser = $.browser || {}).mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4));
    })(navigator.userAgent || navigator.vendor || window.opera);

    (function(a) {
        ($.browser = $.browser || {}).ipad = /ipad/i.test(a);
    })(navigator.userAgent || navigator.vendor || window.opera);

    var mobile = $.browser.mobile;
    var ipad = $.browser.ipad;

    //main menu action
    $('#main-navbar .sub-menu').each(function () {
        $(this).addClass('subnav-wrapper');
        $(this).wrapAll('<div class="subnav"/>');
    });
    $('.mobile-nav .sub-menu').each(function () {
        $(this).addClass('subnav-wrapper');
    });
    $('.mobile-nav .menu-item-has-children >a').each(function () {
        $(this).after('<span class="open-children"><i class="fa fa-angle-down"></i></span>');
    });
    $('.menu-item-shopping-bag >a').prepend('<i class="icon-bag"></i>');
    $('.main-menu >li').removeClass (function (index, className) {
        return (className.match (/(^|\s)col-\S+/g) || []).join(' ');
    });
    var navbar = {
        wrapper: $('body'),

        init: function() {

            $('body').addClass('show-nav');
            var that = this;
            if(that.wrapper.hasClass('show-nav')) {
                var showed = true;
            } else {
                showed = false;
            }
            $('.main-reorder').on('click', function(e) {
                e.preventDefault();
                if (showed === true){
                    if($(this).find('.burger-menu').hasClass('active')) {
                        $(this).find('.burger-menu').removeClass('active');
                    } else {
                        $(this).find('.burger-menu').addClass('active');
                    }
                    $('#wrapper').removeClass('loaded');
                    that.close();
                    showed = false;
                    // that.wrapper.find('.main-nav').css('overflow', 'hidden');
                } else {
                    if($(this).find('.burger-menu').hasClass('active')) {
                        $(this).find('.burger-menu').removeClass('active');
                    } else {
                        $(this).find('.burger-menu').addClass('active');
                    }
                    $('#wrapper').addClass('loaded');
                    // that.wrapper.find('.main-nav').css('overflow', 'visible');
                    that.open();
                    showed = true;
                }
            });

            $('.nav-alt .main-nav > ul > li').on('mouseenter', function(){
                var subnav = $(this);
                var subnavWrapper = subnav.children('.subnav');
                var maxWidth = subnavWrapper.width() * 2;
                var subnavOffset = 0;
                if(subnavWrapper.length > 0) {

                    subnavWrapper.removeClass('next-level-left');
                    if($window.width() - subnavWrapper.offset().left < (maxWidth)) {
                        subnavWrapper.removeClass('next-level-left');
                    } else {
                        subnavWrapper.addClass('next-level-left');
                    }

                    subnavWrapper.css('left', '');
                    if(subnavWrapper.offset().left + subnavWrapper.width() > $window.width()) {
                        subnavOffset = subnavWrapper.width() + subnavWrapper.offset().left - $window.width()+15;
                        subnavWrapper.css('left', '-'+subnavOffset+'px');
                    }
                }
            })

        },
        open: function() {
            var that = this;
            that.wrapper.addClass('show-nav');

        },
        close: function() {
            var that = this;
            that.wrapper.removeClass('show-nav');
        }
    };

    var	subnav = {
        show: function() {
            if(!ipad && !mobile) {
                if($('body').hasClass('home-page') && !$('body').hasClass('page-template-homepage2') && $('#main-navbar-home').length == 0) {
                    var newHeight = ($(window).height() / 2) - ($('.main-nav').height() / 2) - 80;
                    $('.image-subnav').height(newHeight);
                    $('.image-subnav div').height(newHeight);
                }

                $('.submenu-languages').addClass('subnav-wrapper').wrap('<div class="subnav"></div>');
                $('#main-navbar .main-nav ul li').hover(function() {
                    subnav = $(this).find('.subnav-wrapper');
                    var $posLeft = $(this).offset().left;
                    var $subW = subnav.outerWidth();
                    var $menuItemW = $(this).width();
                    var newPos = $posLeft - $subW/2 + $menuItemW/2 + 15;
                    var adjustment = 0;
                    var windowW = window.innerWidth;
                    if (newPos + $subW > window.innerWidth) {
                        adjustment = newPos + $subW - windowW;
                    }
                    if (newPos < 0) {
                        newPos = 0;
                    }
                    subnav.css('left', newPos - adjustment);
                    if(newPos > windowW){
                        subnav.css('left', windowW - $subW);
                    }
                });
            } else {
                $('#main-navbar .main-nav > ul > li').addClass('touch-inactive');
                $('#main-navbar .main-nav').on('click', '.touch-inactive', function(e){
                    e.preventDefault();
                    $('.main-nav > ul > li.touch-active').removeClass('touch-active').addClass('touch-inactive');
                    $(this).addClass('touch-active').removeClass('touch-inactive');
                })
            }
        }
    };

    var mobileNav = {
        show: function() {
            this.open();
            this.close();
        },
        open: function() {
            var that = this;
            $('.reorder a').on('click', function(e) {
                e.preventDefault();

                if ($('body').hasClass('mobile-nav-show')) {
                    $(this).parent().removeClass('flyout-open');
                    if($('.reorder').find('.burger-menu').hasClass('active')) {
                        $('.reorder').find('.burger-menu').removeClass('active');
                    } else {
                        $('.reorder').find('.burger-menu').addClass('active');
                    }
                    $('.flyout-container').velocity({height: 0}, { complete: function() {
                        $('.flyout-container .open').css('height', 0).removeClass('open');
                        $('.flyout-container .subnav-open').removeClass('subnav-open');

                    }});

                    $('body').removeClass('mobile-nav-show');

                } else {
                    $(this).parent().addClass('flyout-open');
                    if($('.reorder').find('.burger-menu').hasClass('active')) {
                        $('.reorder').find('.burger-menu').removeClass('active');
                    } else {
                        $('.reorder').find('.burger-menu').addClass('active');
                    }
                    $('.flyout-container').velocity({height: $('.flyout-container .menu > li').height() * $('.flyout-container .menu > li').length}, { complete: function() {
                        $('.flyout-container').css('height', 'auto');

                    }});

                    $('body').addClass('mobile-nav-show');
                }

            });

            $('.flyout-container .menu-item .open-children, .flyout-container .menu-item a').on('click', function(e) {
                if($(this).attr('href') !== undefined) {
                    return
                }

                e.preventDefault();
                var that = this;
                if ($(this).siblings('.subnav-wrapper').length > 0) {
                    //has submenu
                    if ($(this).siblings('.subnav-wrapper').hasClass('open')) {

                        $(this).parent().removeClass('subnav-open');

                        $(this).siblings('.subnav-wrapper').velocity({height: 0}, { complete: function() {
                            $(that).siblings('.open').removeClass('open');
                            $(that).siblings('.subnav-wrapper').find('.open').css('height', 0).removeClass('open');
                            $(that).siblings('.subnav-wrapper').find('.subnav-open').removeClass('subnav-open');
                        }});
                    } else {
                        $(this).parent().addClass('subnav-open');
                        $(this).siblings('.subnav-wrapper').velocity({height: $(this).siblings('.subnav-wrapper').children('li').height() * $(this).siblings('.subnav-wrapper').children('li').length}, { complete: function() {
                            $(that).siblings('.subnav-wrapper').css('height', 'auto').addClass('open');
                        }});
                    }
                }
            });
        },
        close: function() {
            $('.flyout-container .menu-item a').on('click', function() {
                if($(this).attr('href') === undefined) {
                    return
                }
                var that = this;
                if($('.reorder').find('.burger-menu').hasClass('active')) {
                    $('.reorder').find('.burger-menu').removeClass('active');
                }
                $(".flyout-container .menu-item .open-children").parent().removeClass('subnav-open');
                $('.flyout-container').velocity({height: 0}, { complete:  function() {
                    $('.flyout-container .open').css('height', 0).removeClass('open');
                    $('body').removeClass('mobile-nav-show');
                }});
            });
        },
    };

    navbar.init();
    mobileNav.show();
    subnav.show();
})(jQuery);