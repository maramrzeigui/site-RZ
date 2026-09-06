(function($) {
	
	"use strict";
	var portfolio_slider_js = function($scope, $) {
		
		var portfolio_slider_3 = new Swiper(".portfolio__slider-3", {
			speed: 1500,
			loop: true,
			effect: 'fade',
			autoplay: {
			  delay: 5000,
			  disableOnInteraction: false
			},
			pagination: {
			  el: ".swiper-pagination",
			  type: "fraction",
			},
			navigation: {
			  nextEl: ".pp-next",
			  prevEl: ".pp-prev",
			},
	  });
	  
	  var portfolio_slider = new Swiper(".portfolio__slider-2", {
		slidesPerView: 1,
		spaceBetween: 0,
		effect: "fade",
		speed: 1500,
		loop: true,
		autoplay: {
		  delay: 5000,
		  disableOnInteraction: false
		},
		pagination: {
		  el: ".swiper-pagination",
		  clickable: true,
		  renderBullet: function (i, className) {
			return `
			<button class="${className}">
			  <svg class="circle-progress"><circle class="circle-origin" r="24.5" cx="25" cy="25"></circle></svg><span></span>
			</button>
		  `;
		  }
		}
	  });
	  
	  var portfolio_slider_7 = new Swiper(".portfolio__slider-7", {
		loop: true,
		freemode: true,
		slidesPerView: 1,
		spaceBetween: 30,
		centeredSlides: true,
		speed: 2000,
		breakpoints: {
		  640: {
			slidesPerView: 2,
		  },
		  800: {
			slidesPerView: 2,
			spaceBetween: 50,
		  },
		  1200: {
			slidesPerView: 3,
			spaceBetween: 70,
		  },
		},
	  });
	  
	  var portfolio_slider_6 = new Swiper(".portfolio__slider-4", {
		speed: 1500,
		loop: true,
		slidesPerView: 1,
		spaceBetween: 15,
		breakpoints: {
		  768: {
			slidesPerView: 2,
		  },
		  1000: {
			slidesPerView: 2,
			spaceBetween: 60,
		  },
		  1200: {
			slidesPerView: 2,
			spaceBetween: 90,
		  },
		  1400: {
			slidesPerView: 2,
			spaceBetween: 120,
		  },
		},
	  });
	  
	  let device_width = window.innerWidth;
	  if (device_width > 767) {
		let portfolioline = gsap.timeline({
		  scrollTrigger: {
			trigger: ".portfolio__area",
			start: "top center-=200",
			pin: ".portfolio__text",
			end: "bottom bottom+=80",
			markers: false,
			pinSpacing: false,
			scrub: 1,
		  }
		})
	
		portfolioline.to(".portfolio__text", {
		  scale: 3,
		  duration: 1
		})
		portfolioline.to(".portfolio__text", {
		  scale: 3,
		  duration: 1
		})
		portfolioline.to(".portfolio__text", {
		  scale: 1,
		  duration: 1
		}, "+=2")
	  }
	
	
	  let portfolio_lists = gsap.utils.toArray(".portfolio__item")
	  portfolio_lists.forEach((portfolio, i) => {
		gsap.set(portfolio, { opacity: 0.7 })
		let t1 = gsap.timeline()
	
		t1.set(portfolio, {
		  position: "relative",
		})
		t1.to(portfolio, {
		  scrollTrigger: {
			trigger: portfolio,
			scrub: 2,
			duration: 1.5,
			start: "top bottom+=100",
			end: "bottom center",
			markers: false
		  },
		  scale: 1,
		  opacity: 1,
		  rotateX: 0,
		})
	  });
	
	  gsap.to(".bg_image img", {
		xPercent: -18,
		scrollTrigger: {
		  trigger: ".portfolio__area",
		  start: "top top",
		  end: "bottom center",
		  pin: ".bg_image",
		  scrub: 3
		}
	  });
	  
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
            elementorFrontend.hooks.addAction('frontend/element_ready/axtra_our_projects.default', portfolio_slider_js);
    });	

})(window.jQuery);