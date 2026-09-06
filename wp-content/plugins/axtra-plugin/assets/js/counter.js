(function($) {
	
	"use strict";
	
	var choose_us_js = function($scope, $) {
		
		const about_counter = window.counterUp.default
		  const about_cb = entries => {
		
			entries.forEach(entry => {
			  const el = entry.target
			  if (entry.isIntersecting && !el.classList.contains('is-visible')) {
				about_counter(el, {
				  duration: 1000,
				  delay: 16,
				})
				el.classList.add('is-visible')
			  }
			})
		  }
		
		  const IO = new IntersectionObserver(about_cb, {
			threshold: 1
		  })
		
		  const els = document.querySelectorAll('.counter__number');
		  els.forEach((el) => {
			IO.observe(el)
		  });
			
	};
	$(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction('frontend/element_ready/axtra_funfacts.default', choose_us_js);
    });	

})(window.jQuery);