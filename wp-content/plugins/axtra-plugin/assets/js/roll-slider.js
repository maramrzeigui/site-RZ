(function($) {
	
	"use strict";
	var roll_slider_js = function($scope, $) {
		
		var roll_slider = new Swiper(".roll__slider", {
			loop: true,
			freemode: true,
			slidesPerView: 1,
			spaceBetween: 0,
			centeredSlides: true,
			allowTouchMove: false,
			speed: 2000,
			autoplay: {
			  delay: 1,
			  disableOnInteraction: true,
			},
			breakpoints: {
			  640: {
				slidesPerView: 3,
			  },
			  800: {
				slidesPerView: 3,
			  },
			  1024: {
				slidesPerView: 4,
			  },
			  1300: {
				slidesPerView: 5,
			  },
			  1900: {
				slidesPerView: 8,
			  },
			},
		  });
		  // 10. Roll Slider
		  var roll_slider = new Swiper(".roll__slider2", {
			loop: true,
			freemode: true,
			slidesPerView: 1,
			spaceBetween: 60,
			centeredSlides: false,
			allowTouchMove: false,
			speed: 10000,
			autoplay: {
			  delay: 1,
			  disableOnInteraction: true,
			},
		  });
		
	};
	$(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction('frontend/element_ready/axtra_roll_silde_area.default', roll_slider_js);
    });	

})(window.jQuery);