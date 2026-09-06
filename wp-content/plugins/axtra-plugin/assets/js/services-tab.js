(function($) {
	
	"use strict";
	function Axtra_inViewport(element) {
		let bounds = element.getBoundingClientRect();
		let viewWidth = document.documentElement.clientWidth;
		let viewHeight = document.documentElement.clientHeight;
	
		if (bounds['left'] < 0) return false;
		if (bounds['top'] < 0) return false;
		if (bounds['right'] > viewWidth) return false;
		if (bounds['bottom'] > viewHeight) return false;
	
		return true;
	}
	var testimonial_slider_js = function($scope, $) {
		let device_width = window.innerWidth;
		if (device_width > 1200) {
			gsap.to(".service__list-6", {
			  scrollTrigger: {
				trigger: ".service__area-6",
				pin: ".service__list-6",
				pinSpacing: true,
				start: "top top",
				end: "bottom bottom"
			  }
			})
		
			gsap.to(".service__image-wrap", {
			  scrollTrigger: {
				trigger: ".service__area-6",
				pin: ".mid-content",
				pinSpacing: true,
				start: "top top",
				end: "bottom bottom",
				markers: false
			  }
			})
		
			let service_images = gsap.utils.toArray(".service__image")
			let service_imagess = gsap.utils.toArray(".service__image img")
			let service_items = gsap.utils.toArray(".service__item-6")
		
			if (service_items) {
			  service_items.forEach((image, i) => {
			
				let tl = gsap.timeline({
				  scrollTrigger: {
					trigger: image,
					scrub: 1,
					start: "top top-=600",
					markers: false,
				  }
				});
				tl.to(service_images[i], {
				  zIndex: "1",
				})
				tl.to(service_imagess[i], {
				  opacity: 0,
				  duration: 1,
				  scale: 1.2,
				  ease: "power4.out"
				}, "-=1")
			  })
			}
			var click_active = false;		
			$scope.find( ".service__list-6 li a" ).on('click', function(){
			    var thi_element = $(this);			  
				const ids = $(this).attr('data-hash');
				click_active = true;
				thi_element.parent().addClass('axtra-active').siblings().removeClass('axtra-active'); 
				gsap.to(window, { duration: 0.5, scrollTo: ids, ease: "power4.out", onComplete : function(el){
						 setTimeout(function(){
							click_active = false;
							
						},1000);					
				} });	
			});
		
			// Active Nav
			$(document).on('scroll', function () {
			
					$scope.find('.service__item-6 .animation__service_page h2').each(function (index) {						
					if ((Axtra_inViewport($(this)[0]))){	
					    if(!click_active){					       
							$scope.find(`ul.service__list-6 .li-${index}`).addClass('axtra-active').siblings().removeClass('axtra-active'); 
					    }
						
					} else {
						// console.log('not visible');
					}
				
				});
			});
			
			
		  }
		
	};
	$(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction('frontend/element_ready/axtra_service_tabs.default', testimonial_slider_js);
    });	

})(window.jQuery);