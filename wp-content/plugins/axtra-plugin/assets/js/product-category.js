(function($) {
	
	"use strict";
	
	var product_category_carousel_js = function($scope, $) {
		
		//////////////////////////////////////////////////
		  // Woocommerce Category Slider
		  const woocommerce_category = new Swiper('.category-active', {
			speed: 2000,
			slidesPerView: 9,
			spaceBetween: 5,
			navigation: {
			  nextEl: '.swiper-button-parrow',
			  prevEl: '.swiper-button-narrow',
			},
			breakpoints: {
			  320: {
				slidesPerView: 2,
				spaceBetween: 20,
			  },
			  480: {
				slidesPerView: 3,
				spaceBetween: 20
			  },
			  640: {
				slidesPerView: 4,
				spaceBetween: 20
			  },
			  900: {
				slidesPerView: 6,
				spaceBetween: 20
			  },
			  1200: {
				slidesPerView: 8,
				spaceBetween: 20
			  },
			}
		  });
			
	};
	$(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction('frontend/element_ready/axtra_product_category.default', product_category_carousel_js);
    });	

})(window.jQuery);