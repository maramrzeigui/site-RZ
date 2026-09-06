(function($) {
	
	"use strict";
	var product_banner_carousel_js = function($scope, $) {
		
	  //////////////////////////////////////////////////
	  // Woocommerce Hero Slider
	  const woocommerce_hero = new Swiper('.woocomerce-active', {
		loop: true,
		speed: 2000,
		autoplay: {
		  delay: 2000,
		},
		effect: "fade",
		pagination: {
		  el: ".swiper-pagination",
		  type: "fraction",
		},
		navigation: {
		  nextEl: '.woocomerce__hero-next',
		  prevEl: '.woocomerce__hero-prev',
		},
		scrollbar: {
		  el: '.swiper-scrollbar',
		},
	  });
		
	};
	$(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction('frontend/element_ready/axtra_product_banner.default', product_banner_carousel_js);
    });	

})(window.jQuery);