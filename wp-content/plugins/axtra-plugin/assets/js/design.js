(function($) {
	
	"use strict";
	
	var services_js = function($scope, $) {
		
		let imageTl_8 = gsap.timeline({
		scrollTrigger: {
		  trigger: ".portfolio__big",
		  start: "top top+=90",
		  pin: true,
		  markers: false,
		  scrub: 1,
		  pinSpacing: false,
		  end: "bottom bottom+=150",
		}
	  });
	  imageTl_8.to(".portfolio__big-inner", {
		width: "100%",
	  });
		
	};
	$(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction('frontend/element_ready/axtra_design_development.default', services_js);
    });	

})(window.jQuery);