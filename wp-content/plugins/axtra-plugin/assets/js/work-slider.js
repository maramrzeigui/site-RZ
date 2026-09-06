(function($) {
	
	"use strict";
	var roll_slider_js = function($scope, $) {
		var workflow_slider = new Swiper(".workflow__slider", {
			loop: true,
			freemode: true,
			slidesPerView: 1,
			spaceBetween: 0,
			speed: 2000,
			breakpoints: {
			  640: {
				slidesPerView: 2,
			  },
			  768: {
				slidesPerView: 2,
			  },
			  1024: {
				slidesPerView: 3,
			  },
			  1200: {
				slidesPerView: 4,
			  },
			},
	  });	
	};
	$(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction('frontend/element_ready/axtra_how_we_work.default', roll_slider_js);
    });	

})(window.jQuery);