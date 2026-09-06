(function($) {
	
	"use strict";
	var mixit_up_js = function($scope, $) {
		
		let mixitup_17 = document.querySelector('.showcase-mixitup');
		
		if (mixitup_17) {
			var mixer = mixitup('.showcase-mixitup');
		}
		/////////////////////////////////////////////////////
		
		
		/////////////////////////////////////////////////////
		// Home 17
		gsap.to(".showcase__menu-4", {
			scrollTrigger: {
			trigger: ".showcase__area-4",
			pin: ".showcase__menu-4",
			pinSpacing: false,
			start: "top top",
			end: "bottom center",
			markers: false,
			delay: 1
		}
		});
		
	};
	$(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction('frontend/element_ready/axtra_logo_showcase.default', mixit_up_js);
    });	

})(window.jQuery);