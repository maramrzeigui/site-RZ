(function($) {
	
	"use strict";
	var portfolio_slider_js = function($scope, $) {
		
		var breakpoint = window.matchMedia('( max-width: 1300px )');
		  var pp_main_wrap = document.querySelector('.portfolio__main-slider');
		
		  if (pp_main_wrap) {
			var enableSwiper = function () {
			  var pp_main = new Swiper(".portfolio__main-slider", {
				allowTouchMove: false,
				slidesPerView: 1,
				spaceBetween: 0,
				mousewheel: true,
				effect: "fade",
				pagination: {
				  el: ".swiper-pagination",
				  clickable: true,
				}
			  });
			};
		
			var breakpointChecker = function () {
			  if (breakpoint.matches === true) {
				if (pp_main !== undefined) pp_main.destroy(true, true);
				return;
			  } else if (breakpoint.matches === false) {
				return enableSwiper();
			  }
			};
		
			breakpoint.addListener(breakpointChecker);
			breakpointChecker();
		  }
		  
		  var portfolio_project_thumbs = new Swiper(".portfolio__project-thumbs", {
			loop: true,
			spaceBetween: 0,
			slidesPerView: 1,
			freeMode: true,
			watchSlidesProgress: true,
			allowTouchMove: false,
		  });
		  
		  var portfolio_project = new Swiper(".portfolio__project-slider", {
			loop: true,
			spaceBetween: 10,
			navigation: {
			  nextEl: ".pp-next",
			  prevEl: ".pp-prev",
			},
			thumbs: {
			  swiper: portfolio_project_thumbs,
			},
		  });
			
	};
	$(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction('frontend/element_ready/axtra_personal_portfolio.default', portfolio_slider_js);
    });	

})(window.jQuery);