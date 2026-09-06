(function($) {
	
	"use strict";
	var portfolio_slider_js = function($scope, $) {
		
		var hero10 = new Swiper(".hero10_activition", {
		direction: 'horizontal',
		loop: true,
		speed: 1500,
		slidesPerView: 4,
		spaceBetween: 30,
		mousewheel: true,
		mousewheelControl: true,
		keyboard: true,
		navigation: {
		  nextEl: ".swiper-button-next",
		  prevEl: ".swiper-button-prev",
		},
		pagination: {
		  el: '.swiper-pagination',
		  type: 'fraction',
		  clickable: true,
	
		  renderFraction: function (currentClass, totalClass) {
			return '<span class="' + currentClass + '"></span>' + ' <span><i class="fa-solid fa-minus increase-dash"></i></span> ' + '<span class="' + totalClass + '"></span>';
		  }
		},
		breakpoints: {
		  1400: {
			slidesPerView: 4,
		  },
		  1000: {
			slidesPerView: 3,
		  },
		  768: {
			slidesPerView: 2,
		  },
		  320: {
			slidesPerView: 1,
		  },
		}
	  });
			
	};
	$(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction('frontend/element_ready/axtra_showcase_carousel.default', portfolio_slider_js);
    });	

})(window.jQuery);