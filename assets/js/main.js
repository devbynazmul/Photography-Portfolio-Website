/*
	Author: themexriver
	Version: 1.0
*/


(function ($) {
"use strict";


gsap.config({
	nullTargetWarn: false,
});



// smooth scroll activation start

const lenis = new Lenis({
	duration: 1,
	easing: (t) => 1 - Math.pow(1 - t, 4),
	direction: 'vertical', 
	smooth: true, 
	smoothTouch: false, 
});
  
function raf(time) {
	lenis.raf(time);
	requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
$('a[href^="#"]').on('click', function (e) {
	e.preventDefault(); 

	const target = $(this.getAttribute('href')); 

	if (target.length) {
		lenis.scrollTo(target[0], {
		duration: 1.2, 
		easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
		});
	}
});


(function () {
 
	if (!document.querySelectorAll(".st-preloader").length) {
	  document.addEventListener("DOMContentLoaded", afterPreloader);
	  window.addEventListener("load", afterPageLoad);
	  return;
	}
   
	const loader   = document.querySelector(".st-preloader");
	const countEl  = loader.querySelector(".st-preloader-count");
	const barEl    = loader.querySelector(".st-preloader-bar");
   
	let currentVal  = 0;  
	let targetVal   = 0;  
	let raf         = null;
	let pageLoaded  = false;
   
  
	function animateToTarget() {
	  if (currentVal < targetVal) {
		currentVal += Math.max(0.4, (targetVal - currentVal) * 0.05);
		if (currentVal > targetVal) currentVal = targetVal;
   
		const val = Math.round(currentVal);
		if (countEl) countEl.textContent = val + " %";
		if (barEl)   barEl.style.width   = val + "%";
	  }
   
	  if (Math.round(currentVal) >= 100 && pageLoaded) {
		if (countEl) countEl.textContent = "100 %";
		if (barEl)   barEl.style.width   = "100%";
   
		cancelAnimationFrame(raf);
   
		setTimeout(() => {
		  loader.classList.add("loaded");
		  afterPreloader();
		}, 300);
   
		setTimeout(() => {
		  loader.remove();
		}, 1500);
   
		return;
	  }
   
	  raf = requestAnimationFrame(animateToTarget);
	}
   
	document.addEventListener("DOMContentLoaded", function () {
	  targetVal = 80;
	  raf = requestAnimationFrame(animateToTarget);




	  
	});
   
	window.addEventListener("load", function () {
	  pageLoaded = true;
	  targetVal  = 100;
	  afterPageLoad();
	});
   
})();
  
function afterPreloader() { 


	CustomEase.create("ease1", "0.19, 1, 0.22, 1");
        
	// add-active-class
	const waAddClass = gsap.utils.toArray('.wa_add_class');
	waAddClass.forEach(waAddClassItem => {
		gsap.to(waAddClassItem, {
			scrollTrigger: {
				trigger: waAddClassItem,
				start: "top 90%",
				end: "bottom bottom",
				toggleActions: "play none none reverse",
				toggleClass: "active",
				once: true,
				markers: false,
			}
		});
	});

	
	// wow-activation
	if($('.wow').length){
		var wow = new WOW(
		{
			boxClass:     'wow',
			animateClass: 'animated',
			offset:       0,
			mobile:       true,
			live:         true
		}
		);
		wow.init();
	};



	// title-animation
	function wa_split_text() {

		var wa_st = $(".wa-split-text");
		if (wa_st.length === 0) return;

		gsap.registerPlugin(SplitText, ScrollTrigger);

		wa_st.each(function (index, wa_el) {

			var wa_els = wa_el;

			const wa_split = new SplitText(wa_els, {
				type: "lines, words, chars",
				lineThreshold: 0.5,
				linesClass: "split-line",
			});

			var split_type_set = wa_split.chars;

			gsap.set(wa_els, { perspective: 400 });

			var settings = {
				scrollTrigger: {
					trigger: wa_els,
					toggleActions: "play none none none",
					start: "top 86%",
					once: true,
					markers: false,
				},
				duration: 0.35,
				stagger: 0.02,
				ease: "expo.out",
			};

			if ($(wa_el).hasClass("split-in-fade")) {
				settings.opacity = 0;
			}
			if ($(wa_el).hasClass("split-in-right")) {
				settings.opacity = 0;
				settings.x = 50;
			}
			if ($(wa_el).hasClass("split-in-left")) {
				settings.opacity = 0;
				settings.x = -50;
			}
			if ($(wa_el).hasClass("split-in-up")) {
				settings.opacity = 0;
				settings.y = 80;
			}
			if ($(wa_el).hasClass("split-in-down")) {
				settings.opacity = 0;
				settings.y = -80;
			}
			if ($(wa_el).hasClass("split-in-rotate")) {
				settings.opacity = 0;
				settings.rotateX = 50;
			}
			if ($(wa_el).hasClass("split-in-scale")) {
				settings.opacity = 0;
				settings.scale = 0.5;
			}

			if ($(wa_el).hasClass("split-line-up")) {

				wa_split.split({ type: "words" });
				split_type_set = wa_split.words;

				$(split_type_set).each(function (i, elw) {
					gsap.from(elw, {
						autoAlpha: 0,
						duration: 2,
						transform: "rotateX(80deg) translateY(80px)",
						delay: 0.25 + i * 0.065,
						ease: "expo.out",
						transformOrigin: "center bottom",
						scrollTrigger: {
							trigger: wa_el,
							start: "top 86%",
							toggleActions: "play none none none",
						},
					});
				});

			}

			if ($(wa_el).hasClass("split-up")) {

				wa_split.split({ type: "words" });
				split_type_set = wa_split.words;

				$(split_type_set).each(function (i, elw) {
					gsap.from(elw, {
						opacity: 0,
						duration: 0.65,
						y: 40,
						rotate: 10,
						transformOrigin: "bottom right",
						filter: "blur(5px)",
						delay: 0.25 + i * 0.065,
						ease: "expo.out",
						scrollTrigger: {
							trigger: wa_el,
							start: "top 86%",
							toggleActions: "play none none none",
						},
					});
				});

			}
			else if ($(wa_el).hasClass("split-words-scale")) {
				let atDelay = parseFloat(wa_el.getAttribute("data-delay")) || 0;

				wa_split.split({ type: "words" });
				split_type_set = wa_split.words;

				gsap.set(split_type_set, {
					opacity: 0,
					scale: (i) => (i % 2 === 0 ? 0 : 2),
					force3D: true,
				});

				gsap.to(split_type_set, {
					scrollTrigger: {
						trigger: wa_el,
						toggleActions: "play reverse play reverse",
						start: "top 86%",
					},
					rotateX: 0,
					scale: 1,
					opacity: 1,
					stagger: 0.03,
					delay: atDelay,
				});

			}
			else {
				var wa_anim = gsap.from(split_type_set, settings);

				if ($(wa_el).hasClass("hover-split-text")) {
					$(wa_el).on("mouseenter", function () {
						wa_anim.restart();
					});
				}
			}

		});
	}
	wa_split_text();


	var hero1tl = gsap.timeline({
		defaults: { 
			duration: 1,
			ease: "ease1", 
		}
	});

	hero1tl.from(".nm-hero-man" , { xPercent: -50, autoAlpha: 0 , delay: .5 })
	hero1tl.from(".nm-hero-ss-single-1 img" , { xPercent: 50, autoAlpha: 0 ,  },"<50%")
	hero1tl.from(".nm-hero-ss-single-2 img" , { xPercent: 50, autoAlpha: 0 ,  },"<50%")
	hero1tl.from(".nm-hero-ss-single-3 img" , { xPercent: 50, autoAlpha: 0 ,  },"<50%")

}




$(window).scroll(function() {
	if ($(this).scrollTop() > 2){
	$('.wa-sticky-header-2').addClass('has-sticky');
	}
	else{
	$('.wa-sticky-header-2').removeClass('has-sticky');
	}
});

$(window).scroll(function() {
	if ($(this).scrollTop() > 300){
	$('.sticky_header_1').addClass('sticky1');
	}
	else{
	$('.sticky_header_1').removeClass('sticky1');
	}
});

// Toggle Offcanvas start
$('.offcanvas_toggle').on('click', function() {
    $('.overlay, .offcanvas_box_active').addClass('active');
});

$('.overlay, .offcanvas_box_close').on('click', function() {
    $('.offcanvas_box_active').removeClass('active');
    $('.overlay').removeClass('active');
});

$(document).on('keydown', function(event) {
    if (event.key === 'Escape') {
        $('.offcanvas_box_active').removeClass('active');
        $('.overlay').removeClass('active');
    }
});

$('.offcanvas_box_active a').on('click', function() {
    $('.offcanvas_box_active').removeClass('active');
    $('.overlay').removeClass('active');
});




// mobile-menu
jQuery(".mobile-main-navigation li.dropdown").append('<span class="dropdown-btn"><i class="fa-solid fa-angle-right"></i></span>'),
	jQuery(".mobile-main-navigation li .dropdown-btn").on("click", function () {
		jQuery(this).hasClass("active")
		? (jQuery(this).closest("ul").find(".dropdown-btn.active").toggleClass("active"), jQuery(this).closest("ul").find(".dropdown-menu.active").toggleClass("active").slideToggle())
		: (jQuery(this).closest("ul").find(".dropdown-btn.active").toggleClass("active"),
			jQuery(this).closest("ul").find(".dropdown-menu.active").toggleClass("active").slideToggle(),
			jQuery(this).toggleClass("active"),
			jQuery(this).parent().find("> .dropdown-menu").toggleClass("active"),
			jQuery(this).parent().find("> .dropdown-menu").slideToggle());
});

// wa-bg-parallax
gsap.utils.toArray(".wa_scale_in").forEach(element => {
	gsap.fromTo(
		element,
		{ scale: 1.4 }, 
		{ 
			scale: 1, 
			duration: 2,
			scrollTrigger: {
				trigger: element,
				start: "top 50%",
				markers: false,  
			},
		}
	);
});


// slideInUp
gsap.utils.toArray('.wa-fadeInUp').forEach((item) => {
	gsap.from(item, {
	  y: 30,
	  ease: "Back.easeOut",
	  autoAlpha: 0,
	  duration: 1,
	  scrollTrigger: {
		trigger: item,
		start: "top 90%",
		toggleActions: 'play none none reverse',
		markers: false,
	  },
	});
});


/* 
	elementor-animation
*/
var pxFeatures = gsap.timeline({
	scrollTrigger: {
		trigger: ".nm-elementor-img",
		start: "top 80%",  
		toggleActions: 'play none none reverse',
		markers: false  
	},
	defaults: { 
		duration: .5,
		ease: "ease1", 
	} //
});

pxFeatures.from(".nm-elementor-img-1" , { yPercent: 50, })
pxFeatures.from(".nm-elementor-img-5" , { yPercent: 100, opacity: 0 }, "<=.2")
pxFeatures.from(".nm-elementor-img-2" , { yPercent: 100, opacity: 0 }, "<=.2")
pxFeatures.from(".nm-elementor-img-3" , { yPercent: 100, opacity: 0 }, "<=.2")
pxFeatures.from(".nm-elementor-img-4" , { yPercent: 100, opacity: 0 }, "<=.2")
pxFeatures.from(".nm-elementor-img-6" , { yPercent: 100, opacity: 0 }, "<=.2")



// inner-page 
var pxInnerPage = gsap.timeline({
	scrollTrigger: {
		trigger: ".px-inner-page-wrap",
        toggleActions: "play reverse play reverse",
        scrub: 10,
        markers: false  ,
	},
});

pxInnerPage.to(".px-inner-page-col:nth-of-type(1)" , { yPercent: -50, })
pxInnerPage.from(".px-inner-page-col:nth-of-type(2)" , { yPercent: -50, },"<")
pxInnerPage.to(".px-inner-page-col:nth-of-type(3)" , { yPercent: -50, },"<")
pxInnerPage.from(".px-inner-page-col:nth-of-type(4)" , { yPercent: -50, },"<")



// inner-content
if (window.matchMedia("(min-width: 768px)").matches) { 
	gsap.to(".px-inner-page-content", {
		scrollTrigger: {
			trigger: ".px-inner-page-area",
			start: "top 10%", 
			end: "bottom 70%", 
			pin: ".px-inner-page-content", 
			pinSpacing: false,
			markers: false,
		}
	});
	
}




// slide-text-1
if($('.marquee_active').length) {
	$('.marquee_active').marquee({
		gap: 0,
		speed: 30,
		delayBeforeStart: 0,
		direction: 'left',
		duplicated: true,
		pauseOnHover: false,
		startVisible:true,
	});
}

// slide-text-2
if($('.marquee_right_active').length) {
	$('.marquee_right_active').marquee({
		gap: 0,
		speed: 20,
		delayBeforeStart: 0,
		direction: 'right',
		duplicated: true,
		pauseOnHover: false,
		startVisible:true,
	});
}

// slide-text-2
if($('.marquee_no_pause').length) {
	$('.marquee_no_pause').marquee({
		gap: 0,
		speed: 40,
		delayBeforeStart: 0,
		direction: 'left',
		duplicated: true,
		pauseOnHover: true,
		startVisible:true,
	});
}




// bootstrap-tooltip
$(function () {
	$('[data-toggle="tooltip"]').tooltip()
})

// counter-activation
$('.counter').counterUp({
	time: 2000
});

/* back-to-top */
var backtotop = $('.scroll_top');

backtotop.on('click', function(e) {
	e.preventDefault();
	$('html, body').animate({scrollTop:0}, '700');
});


/* data-bg-activation */
$("[data-background]").each(function(){
	$(this).css("background-image","url("+$(this).attr("data-background") + ") ")
})




if ($('.copyright-year').length) {
    const currentYear = new Date().getFullYear();
    $('.copyright-year').text(currentYear);
}


})(jQuery);