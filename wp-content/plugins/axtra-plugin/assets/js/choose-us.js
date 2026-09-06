(function($) {
	
	"use strict";
	
	var choose_us_js = function($scope, $) {
		
		let device_width = window.innerWidth;
		
		if (device_width > 1200) {

			var workflow_section_3 = document.querySelector('.workflow__wrapper-3');
			if (workflow_section_3) {
		
			  let duration = 1,
				sections = gsap.utils.toArray(".wf_panel"),
				sectionIncrement = duration / (sections.length - 1),
				tl = gsap.timeline({
				  scrollTrigger: {
					trigger: ".workflow__wrapper-3",
					pin: true,
					scrub: 1,
					start: "top top",
					end: "+=5000"
				  }
				});
		
			  tl.to(sections, {
				xPercent: -100 * (sections.length - 1),
				duration: duration,
				ease: "none"
			  });
		
			  sections.forEach((section, index) => {
				let tween = gsap.from(section, {
				  opacity: 0,
				  scale: 0.6,
				  duration: 0.5,
				  force3D: true,
				  paused: true
				});
				addSectionCallbacks(tl, {
				  start: sectionIncrement * (index - 0.99),
				  end: sectionIncrement * (index + 0.99),
				  onEnter: () => tween.play(),
				  onLeave: () => tween.reverse(),
				  onEnterBack: () => tween.play(),
				  onLeaveBack: () => tween.reverse()
				});
				index || tween.progress(1);
			  });
		
			  function addSectionCallbacks(timeline, { start, end, param, onEnter, onLeave, onEnterBack, onLeaveBack }) {
				let trackDirection = animation => {
				  let onUpdate = animation.eventCallback("onUpdate"),
					prevTime = animation.time();
				  animation.direction = animation.reversed() ? -1 : 1;
				  animation.eventCallback("onUpdate", () => {
					let time = animation.time();
					if (prevTime !== time) {
					  animation.direction = time < prevTime ? -1 : 1;
					  prevTime = time;
					}
					onUpdate && onUpdate.call(animation);
				  });
				},
				  empty = v => v;
				timeline.direction || trackDirection(timeline);
				start >= 0 && timeline.add(() => ((timeline.direction < 0 ? onLeaveBack : onEnter) || empty)(param), start);
				end <= timeline.duration() && timeline.add(() => ((timeline.direction < 0 ? onEnterBack : onLeave) || empty)(param), end);
			  }
			}
		  }
		
	};
	$(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction('frontend/element_ready/axtra_why_choose_us.default', choose_us_js);
    });	

})(window.jQuery);