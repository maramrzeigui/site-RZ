(function($) {
	
	"use strict";
	
	var services_js = function($scope, $) {
		
		$('.service__list a:nth-child(1)').addClass('active').siblings().removeClass('acitve');

		  $('.service__item').on('mousemove', function (e) {
			var service_id = $(this).data("service");
		
			$('.service__img.img-' + service_id).addClass('active').siblings().removeClass('active');
			$('.shape-box-' + service_id).addClass('current').siblings().removeClass('current');
		
			if (service_id != 1) {
			  $('.service__list a:nth-child(1)').removeClass('active');
			}
		  });
		
		
		  $('.service__item').on('mouseout', function (e) {
			var service_id = $(this).data("service");
		
			$('.service__list a:nth-child(' + service_id + ')').addClass('active').siblings().removeClass('active');
		  });
		
	};
	$(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction('frontend/element_ready/axtra_our_services.default', services_js);
    });	

})(window.jQuery);