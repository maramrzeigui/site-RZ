(function($) {
	
	"use strict";
	var roll_slider_js = function($scope, $) {
		
	  // Home 16
	  var shocase_list_16 = document.querySelectorAll(".showcase__content-16");
	
	  shocase_list_16.forEach((shocase16) => {
		gsap.to(shocase16, {
		  scrollTrigger: {
			trigger: shocase16,
			pin: shocase16,
			pinSpacing: false,
			start: "top top",
			delay: 1
		  }
		});
	  });
		
	};
	$(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction('frontend/element_ready/axtra_showcase_parallax.default', roll_slider_js);
    });	

})(window.jQuery);