(function($) {
	
	"use strict";
	var product_slider_js = function($scope, $) {
		
	  //////////////////////////////////////////////////
	  // Woocommerce Feature Slider
	  const woocommerce_feature = new Swiper('.feature1-active', {
		speed: 2000,
		slidesPerView: 4,
		spaceBetween: 20,
		navigation: {
		  nextEl: '.swiper-button-parrow',
		  prevEl: '.swiper-button-narrow',
		},
		breakpoints: {
		  320: {
			slidesPerView: 1,
			spaceBetween: 10,
		  },
		  480: {
			slidesPerView: 1,
			spaceBetween: 10
		  },
		  640: {
			slidesPerView: 2,
			spaceBetween: 20
		  },
		  991: {
			slidesPerView: 3,
			spaceBetween: 20
		  },
		  1200: {
			slidesPerView: 4,
			spaceBetween: 20
		  },
		}
	  });
		
	};
	$(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction('frontend/element_ready/axtra_product_carousel.default', product_slider_js);
    });	

})(window.jQuery);