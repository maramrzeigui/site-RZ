(function($) {
	
	"use strict";
	var team_slider_js = function($scope, $) {
		
		var team_slider = new Swiper(".team__slider", {
		spaceBetween: 30,
		loop: true,
		freemode: true,
		slidesPerView: 1,
		speed: 2000,
		breakpoints: {
		  640: {
			slidesPerView: 2,
		  },
		  1000: {
			slidesPerView: 3,
		  },
		  1200: {
			slidesPerView: 4,
		  },
		}
	  });	
		
	};
	$(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction('frontend/element_ready/axtra_our_team.default', team_slider_js);
    });	

})(window.jQuery);