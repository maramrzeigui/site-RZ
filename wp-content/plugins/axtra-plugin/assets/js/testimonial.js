(function($) {
	
	"use strict";
	var testimonial_slider_js = function($scope, $) {
		
		var testimonial_slider = new Swiper(".testimonial__slider", {
			spaceBetween: 0,
			loop: true,
			freemode: true,
			slidesPerView: 1,
			speed: 2000,
		
			navigation: {
			  nextEl: ".next-button",
			  prevEl: ".prev-button",
			},
		  });
		
		var testimonial_slider_3 = new Swiper(".testimonial__slider-3", {
			spaceBetween: 0,
			loop: true,
			freemode: true,
			slidesPerView: 1,
			speed: 2000,
		
			navigation: {
			  nextEl: ".next-button",
			  prevEl: ".prev-button",
			},
		  });
		  
		  var testimonial_slider_4 = new Swiper(".testimonial__slider-4", {
			spaceBetween: 20,
			loop: true,
			freemode: true,
			slidesPerView: 3,
			speed: 2000,
			pagination: {
			  el: ".pagination",
			  type: "fraction",
			},
			navigation: {
			  nextEl: ".next-button",
			  prevEl: ".prev-button",
			},
			breakpoints: {
			  0: {
				slidesPerView: 1,
			  },
			  768: {
				slidesPerView: 2,
			  },
			  1024: {
				slidesPerView: 3,
			  }
			}
		  });
		
	};
	$(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction('frontend/element_ready/axtra_our_testimonials.default', testimonial_slider_js);
    });	

})(window.jQuery);