(function($) {
	
	"use strict";
	var hover_slider_js = function($scope, $) {
		
		let mainSliderSelector11 = '.main-slider11',
		thumbSliderSelector11 = '.thumb-slider11';
	
	  // Main Slider
	  let mainSliderOptions11 = {
		loop: true,
		speed: 1500,
		parallax: true,
		mousewheel: true,
		loopAdditionalSlides: 6,
		grabCursor: true,
		effect: "fade",
		watchSlidesProgress: true,
		direction: 'vertical',
	  };
	  let mainSlider11 = new Swiper(mainSliderSelector11, mainSliderOptions11);
	
	  // thumb Slider
	  let thumbSliderOptions11 = {
		loop: true,
		loopAdditionalSlides: 5,
		speed: 1500,
		centeredSlides: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		direction: 'vertical',
		breakpoints: {
		  200: {
			slidesPerView: 6,
		  },
		  768: {
			slidesPerView: 6,
		  },
		  1200: {
			slidesPerView: 5,
		  },
		},
	  };
	  let thumbSlider11 = new Swiper(thumbSliderSelector11, thumbSliderOptions11);
	
	  mainSlider11.controller.control = thumbSlider11;
	  thumbSlider11.controller.control = mainSlider11;
		
	};
	$(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction('frontend/element_ready/axtra_interactive_hover_showcase.default', hover_slider_js);
    });	

})(window.jQuery);