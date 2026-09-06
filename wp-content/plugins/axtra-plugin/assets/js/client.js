(function($) {
	
	"use strict";
	
	var clients_js = function($scope, $) {
		
		//////////////////////////////////////////////////
		  // Woocommerce Brand Slider
		  const woocommerce_brand = new Swiper('.woocomerce-brand-active', {
			loop: true,
			speed: 6000,
			autoplay: {
			  delay: 1,
			},
			allowTouchMove: false,
			slidesPerView: 9,
			spaceBetween: 5,
			breakpoints: {
			  320: {
				slidesPerView: 2,
				spaceBetween: 5,
			  },
			  700: {
				slidesPerView: 3,
				spaceBetween: 30
			  },
			  1000: {
				slidesPerView: 5,
				spaceBetween: 40
			  }
			}
		  });
			
	};
	$(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction('frontend/element_ready/axtra_client_carousel.default', clients_js);
    });	

})(window.jQuery);