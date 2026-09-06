(function($) {
	
	"use strict";
	
	var product_gallery_carousel_js = function($scope, $) {
		
		/////////////////////////////////////////////////
		  // Instagram Images Animation
		  gsap.set(".wc_instagram_img .woocomerce__instagram-item", { x: 50, opacity: 0 });
		
		  if (device_width < 1023) {
			const blogList = gsap.utils.toArray(".wc_instagram_img .woocomerce__instagram-item")
			blogList.forEach((item, i) => {
			  let blogTl = gsap.timeline({
				scrollTrigger: {
				  trigger: item,
				  start: "top center+=200",
				}
			  });
			  blogTl.to(item, {
				x: 0,
				opacity: 1,
				ease: "power2.out",
				duration: 1.5,
			  });
			});
		  }
		  else {
			gsap.to(".wc_instagram_img .woocomerce__instagram-item", {
			  scrollTrigger: {
				trigger: ".wc_instagram_img .woocomerce__instagram-item",
				start: "top center+=300",
				markers: false
			  },
			  x: 0,
			  opacity: 1,
			  ease: "power2.out",
			  duration: 2,
			  stagger: {
				each: 0.3
			  }
			});
		  }
		  /////////////////////////////////////////////////
			
	};
	$(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction('frontend/element_ready/axtra_product_gallery.default', product_gallery_carousel_js);
    });	

})(window.jQuery);