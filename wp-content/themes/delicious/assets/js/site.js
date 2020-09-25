/**
 * The JavaScript for displaying & control of front end element 
 * Used to display slider &amp; form validation 
 * 
 * @package delicious
 * @subpackage delicious/assets/js
 * @version 1.0.0
 */
(function ($) {
    "use strict";

    /**
     * Comment Form 
     * Comment Form  validation
     */
    if ($("#comment-form").length > 0) {

        $("#comment-form").submit(function () {

            var $cmtFlag = true;
            $("#email, #comment").removeClass('delicious-required');
            if ($('#email').length > 0) {
                var $emailRgx = /^([a-zA-Z.0-9])+@([a-zA_Z0-9])+\.([a-zA-Z])/;
                var $cmauthor = $("#author").val();
                var $cmemail = $("#email").val();
                if ($cmauthor == "") {
                    $("#author").addClass('delicious-required');
                    $cmtFlag = false;
                }
                if ($cmemail == "" || !$emailRgx.test($cmemail)) {
                    $("#email").addClass('delicious-required');
                    $cmtFlag = false;
                }
            }
            var $cmmsg = $("#comment").val();
            if ($cmmsg == "") {
                $("#comment").addClass('delicious-required');
                $cmtFlag = false;
            }
            return $cmtFlag;
        });

    }


    /**
     * Search Form 
     * Search Form  validation
     */

    if ($("form.deliciousSearchForm").length > 0) {
        $("form.deliciousSearchForm").submit(function () {
            var $serchmsg = '';
            var $serchFlag = true;
            $('input[name="s"]', this).removeClass('delicious-required');
            $serchmsg = $('input[name="s"]', this).val();
            if ($serchmsg == "") {
                $('input[name="s"]', this).addClass('delicious-required');
                $serchFlag = false;
            }
            return $serchFlag;
        });
    }




    if ($('.owl-carousel').length) {
        $('.owl-carousel').owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 2
                }
            }
        })
    }

    if ($('.footer-slides').length) {
        $(".footer-slides").owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 2
                }
            }

        });
    }

    if ($('.customer-testimonial-slides').length) {
        $(".customer-testimonial-slides").owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1000: {
                    items: 1
                }
            }
        });
    }

    if ($('.hg-slides').length) {
        $(".hg-slides").owlCarousel({
            loop: true,
            //margin : 10,
            nav: true,
            responsive: {
                0: {
                    items: 2
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 2
                }
            }
        });
    }
    if ($('.mt-slides').length) {
        $(".mt-slides").owlCarousel({
            loop: true,
            margin: 0,
            nav: false,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1000: {
                    items: 1
                }
            }
        });
    }

    if ($('.hth-testimonial-slides').length) {
        $('.hth-testimonial-slides').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            asNavFor: '.hth-pagination'
        });
        $('.hth-pagination').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: '.hth-testimonial-slides',
            dots: false,
            centerMode: false,
            focusOnSelect: true
        });
    }

    /**
     * Reservation Form
     */
   

    function deliciousReservation() {
        this.submit = function () {
            var $this = this;
            $(document).on('submit', ".rtb-booking-form form", function () {
                var data = $this.getData(this);
                
                $(".rtb-booking-form form").addClass('ajax-loader');
                
                //submit data
                $.post(window.location, data, function (msg) {
                    var $formHTML = $(msg).find('.rtb-booking-form').html()
                    $('.rtb-booking-form').html($formHTML);
                    $this.picker();
                });
                
                return false;
            });

        }
        
        this.getData = function ($obj) {
            var $rtbDate = $('input[name=rtb-date]', $obj).val();
            var $rtbTime = $('input[name=rtb-time]', $obj).val();
            var $rtbParty = $('select[name=rtb-party]', $obj).val();
            var $rtbName = $('input[name=rtb-name]', $obj).val();
            var $rtbEmail = $('input[name=rtb-email]', $obj).val();
            var $rtbPhone = $('input[name=rtb-phone]', $obj).val();

            return {
                'action': 'booking_request',
                'rtb-date': $rtbDate,
                'rtb-time': $rtbTime,
                'rtb-party': $rtbParty,
                'rtb-name': $rtbName,
                'rtb-email': $rtbEmail,
                'rtb-phone': $rtbPhone,
                'rtb-message': ''
            };
        }
        
        this.picker = function(){
            
			// Declare datepicker
			var $date_input = $( '#rtb-date' );
			if ( $date_input.length ) {
				var date_input = $date_input.pickadate({
					format: rtb_pickadate.date_format,
					formatSubmit: 'yyyy/mm/dd',
					hiddenName: true,
					min: !rtb_pickadate.allow_past,
					container: 'body',
					firstDay: rtb_pickadate.first_day,

					// Select the value when loaded if a value has been set
					onStart: function() {
						if ( $date_input.val()	!== '' ) {
							var date = new Date( $date_input.val() );
							if ( Object.prototype.toString.call( date ) === "[object Date]" ) {
								this.set( 'select', date );
							}
						}
					}
				});

				rtb_booking_form.datepicker = date_input.pickadate( 'picker' );
			}

			// Declare timepicker
			var $time_input = $( '#rtb-time' );
			if ( $time_input.length ) {
				var time_input = $time_input.pickatime({
					format: rtb_pickadate.time_format,
					formatSubmit: 'h:i A',
					hiddenName: true,
					interval: parseInt( rtb_pickadate.time_interval, 10 ),
					container: 'body',

					// Select the value when loaded if a value has been set
					onStart: function() {
						if ( $time_input.val()	!== '' ) {
							var today = new Date();
							var today_date = today.getFullYear() + '/' + ( today.getMonth() + 1 ) + '/' + today.getDate();
							var time = new Date( today_date + ' ' + $time_input.val() );
							if ( Object.prototype.toString.call( time ) === "[object Date]" ) {
								this.set( 'select', time );
							}
						}
					}
				});

				rtb_booking_form.timepicker = time_input.pickatime( 'picker' );
			}
            
            
        }
    }
    

    if ($(".rtb-booking-form form").length) {
        var $deliciousReservation = new deliciousReservation();
        $deliciousReservation.submit();
    }


    $(".arp-btn").click(function () {
        var product = $(this).parents(".total-products").find(".product-number").val();
        if ($(this).hasClass("product-plus")) {
            product++;
            $(this).parents(".total-products").find(".product-number").val(product);
        } else {
            
            product--;
            $(this).parents(".total-products").find(".product-number").val(product);
        }
        $('.button[name="update_cart"]').removeAttr('disabled');
    })


    if ($('.sd-slides').length) {
        $('.sd-slides').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            asNavFor: '.sd-pagination'
        });
    }
    if ($('.sd-pagination').length) {
        $('.sd-pagination').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.sd-slides',
            dots: false,
            centerMode: false,
            focusOnSelect: true
        });
    }
    $('.slider_enable .pagination-block a').click(function (e) {
        e.preventDefault();
    });


    if ($('.ingredient-list').length) {
        $(".ingredient-list").mCustomScrollbar();
    }



    $('.chocolate-earl-slides').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.chocolate-earl-thumb'
    });
    $('.chocolate-earl-thumb').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.chocolate-earl-slides',
        dots: true,
        centerMode: true,
        focusOnSelect: true,
        vertical: true,
        verticalSwiping: true
    });

// external JS: masonry.pkgd.js
    if ($('.grid').length) {


    }
    $('.video-play-btn').click(function () {
        var videoPlayer = document.getElementById('imageplay');
        $('.homepage-three-video-wrap').hide();

        $('#imageplay').show();
        $('#deliciousvideo')[0].src += "&autoplay=1";
    });


    $('.menu-icon').click(function () {
        $('.header-nav').slideToggle();
    })

    $('.footer .widget-footer-typo .menu-item-has-children').append('<i class="fa fa-arrow-right" araia-hidden="true"></i>');
    $('.footer .widget-footer-typo .menu-item-has-children .fa').click(function () {
        if ($(this).prev('.sub-menu').css('display') == 'block') {
            $(this).prev('.sub-menu').toggle('slow');
            console.log($(this));
            $(this).toggleClass('fa-arrow-down');
        } else {
            $(this).parent().siblings().children('.sub-menu').slideUp();
            $(this).parent().siblings().children('i').removeClass('fa-arrow-down');
            $(this).prev('.sub-menu').toggle('slow');
            $(this).toggleClass('fa-arrow-down');
        }
    })



    if ($(window).width() < 768) {

        $('.delicious-nav').append('<div class="social-links">' + $('.top-header .social-links').html() + '</div>');

        $('.primary-header .menu-item-has-children').append('<i class="fa fa-arrow-right" aria-hidden="true"></i>');
        $('.primary-header .delicious-mega-menu-item-layout').append('<i class="fa fa-arrow-right" aria-hidden="true"></i>');
        $('.primary-header .menu-item-has-children .fa, .primary-header .delicious-mega-menu-item-layout .fa').click(function () {
            if ($(this).prev('.sub-menu').css('display') == 'block') {
                $(this).prev('.sub-menu').toggle('slow');
                $(this).toggleClass('fa-arrow-down');
            }
            else {
                $(this).parent().siblings().children('.sub-menu').slideUp();
                $(this).parent().siblings().children('i').removeClass('fa-arrow-down');
                $(this).prev('.sub-menu').toggle('slow');
                $(this).toggleClass('fa-arrow-down');
            }
        });
    }

    if ($(window).width() >= 767) {
        var faq_height = 0;
        $('.news-block.circle-pbg .d-news > div').each(function () {
            if ($(this).find('.news-box').outerHeight() > faq_height)
                faq_height = $(this).find('.news-box').outerHeight();
        })
        $('.news-block.circle-pbg .d-news > div').each(function () {
            $(this).find('.news-box').css('height', faq_height);
        });
    }

    var delicious_header = $('.header').height();
    $('.no-banner').css('padding-top', delicious_header + 10);
 
   function Delicious_Animation(){
			this.init = function (){
				
				var obj = $(DELICIOUS_ANIMATE.Selection);
				var type = DELICIOUS_ANIMATE.Type;
				
				if(obj.length> 0 && DELICIOUS_ANIMATE.active == '1'){				
					this.animated(obj, type);
				}	
			}
			
			//animated
			this.animated = function(obj, type){
			        obj.addClass("animate-hidden").viewportChecker({
					   	 classToAdd: 'visible animated '+type, // Class to add to the elements when they are visible rubberBand
					   	 offset: 100    
				   });  
			}
			
		}
		var delicious_animation= new Delicious_Animation();
		delicious_animation.init();
		
		   
})(jQuery);