(function($) {
	
	"use strict";
	var roll_slider_js = function($scope, $) {
		
		let mainSliderSelector = '.main-slider',
		thumbSliderSelector = '.thumb-slider';
	
	  // Main Slider
	  let mainSliderOptions = {
		loop: true,
		speed: 1500,
		parallax: true,
		mousewheel: true,
		loopAdditionalSlides: 6,
		grabCursor: true,
		effect: "fade",
		watchSlidesProgress: true,
		pagination: {
		  el: ".swiper-pagination",
		  clickable: true,
		},
	  };
	  let mainSlider = new Swiper(mainSliderSelector, mainSliderOptions);
	
	  // thumb Slider
	  let thumbSliderOptions = {
		loop: true,
		loopAdditionalSlides: 5,
		speed: 1500,
		spaceBetween: 15,
		centeredSlides: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		direction: 'vertical',
		breakpoints: {
		  200: {
			slidesPerView: 3,
		  },
		  768: {
			slidesPerView: 5,
		  },
		  1024: {
			slidesPerView: 5,
		  },
		  1400: {
			slidesPerView: 7,
		  },
		},
	  };
	  let thumbSlider = new Swiper(thumbSliderSelector, thumbSliderOptions);
	
	  mainSlider.controller.control = thumbSlider;
	  thumbSlider.controller.control = mainSlider;
		
	};
	$(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction('frontend/element_ready/axtra_interactive_image_slider.default', roll_slider_js);
    });	

})(window.jQuery);