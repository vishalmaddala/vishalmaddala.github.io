// @codekit-prepend "/vendor/TweenLite.min.js";
// @codekit-prepend "/vendor/TimelineLite.min.js";
// @codekit-prepend "/vendor/CSSPlugin.min.js";
// @codekit-prepend "/vendor/CSSRulePlugin.min.js";
// @codekit-prepend "/vendor/ScrollToPlugin.min.js";
// @codekit-prepend "/vendor/jquery.gsap.min.js";
// @codekit-prepend "/vendor/ScrollMagic.min.js";
// @codekit-prepend "/vendor/animation.gsap.min.js";
// @codekit-prepend "/vendor/jquery.ScrollMagic.min.js";

console.log("functions.js loaded");
$(document).ready(function() {
	$('.work__list-el').hide(); // Hide all experiences
    $('.work__list-el:first').show().addClass('work__list-el--is-active'); // Show only the first one

    // Example Fix: Ensure the target element exists before animating
    if ($(".your-target-class").length) {
        TweenLite.to(".your-target-class", 1, { opacity: 1 });
    } else {
        console.warn("Target element '.your-target-class' not found!");
    }

	/***************** Splashscreen ******************/
	
	$(window).on('load', function() {
		
		$('.splashscreen').addClass('splashscreen--is-hidden');
		
		setTimeout(function() {
			$('.splashscreen').css( {'display': 'none'} );
			
			/* Introduction Animation */
			var $name = $('.introduction__content-el--name'),
	  			$job = $('.introduction__content-el--job');
			TweenLite.to([$name, $job], 0.8, {x: 0, opacity: 1, ease: Power1.easeOut});
		}, 800);
		
	});
	
	/***************** Responsive Nav ******************/

  $('.navigation__burger').click(function() {
	  
	  navigationToggle();
	  
  });
  
  function navigationToggle() {
	  
	  $('.navigation__burger').toggleClass('navigation__burger--is-open');
	  $('.navigation__container').toggleClass('navigation__container--is-open');
	  $('html, body').toggleClass('scroll-lock');
	  
  }
  
  /***************** Smooth Scroll ******************/
  
  $('a[href*="#"]:not([href="#0"])').click(function(ev) {
	  
	  ev.preventDefault();
		
		if ($('.navigation__container').hasClass('navigation__container--is-open')) {
			navigationToggle();
		}
			
		var target = $(this).attr('href');
		
		TweenLite.to(window, 1, {scrollTo: target});
		
	});
	
	/***************** Animations ******************/
	
	/* Restrict to large devices */
	if ($(window).width() > 991) {  
	
	  var controller = new ScrollMagic.Controller();
	
	  /* About */
	  var $aboutTrigger = $('.about'),
	  		$aboutBlurb = $('.about__content-blurb'),
	  		$aboutVisual = $('.about__visual'),
	  		$aboutSignature = $('.about__content-signature'),	
	  		aboutTl = new TimelineLite();
	
	  var aboutFrame = CSSRulePlugin.getRule('.about__wrapper::before');
			  if (aboutFrame) {
				aboutTl.from(aboutFrame, 0.8, {cssRule:{opacity: 0}, ease: Power1.easeOut});
			  } else {
				console.warn("CSSRule for '.about__wrapper:before' not found!");
			  }
					  
	  aboutTl
	  	.from($aboutBlurb, 0.8, {x: 50, opacity: 0, ease: Power1.easeOut})
	  	.from($aboutVisual, 0.8, {x: -50, opacity: 0, ease: Power1.easeOut}, 0)
	  	/*.from($aboutFrame, 0.8, {cssRule:{opacity: 0}, ease: Power1.easeOut})*/
	  	.from($aboutSignature, 0.8, {opacity: 0}, '-=0.4');
	  	
	  var aboutScene = new ScrollMagic.Scene({
		  triggerElement: $aboutTrigger,
		  reverse: false
	  })
	  	.setTween(aboutTl)
	  	.addTo(controller);
	  
	  /* Fix for about__visual positioning due to
		 * JS tweening overwriting CSS translateX
		 * value when loaded on a larger display
		 * that is then resized below 991
		 * (e.g. landscape => portrait) */
	  $(window).resize(function() {
		  
		  if ($(window).width() <= 991) {
			  $('.about__visual').css({ 'transform': 'translateX(-50%)' });
		  }
		  else {
			  $('.about__visual').css({ 'transform': 'translateX(0)' });
		  }
		  
	  });
	  	
	  /* App Design */
	  var $appDesignTrigger = $('.app-design'),
	  		$appDesignVisual = $('.app-design__visual');
	  	
	  var appDesignScene = new ScrollMagic.Scene({
		  triggerElement: $appDesignTrigger,
		  reverse: false
	  })
	  	.setTween(TweenLite.from($appDesignVisual, 0.8, {x: 100, opacity: 0, ease: Power1.easeOut}))
	  	.addTo(controller);
	  	
	  /* Web Design */
	  var $webDesignTrigger = $('.web-design'),
	  		$webDesignVisual = $('.web-design__visual');
	  	
	  var webDesignScene = new ScrollMagic.Scene({
		  triggerElement: $webDesignTrigger,
		  reverse: false
	  })
	  	.setTween(TweenLite.from($webDesignVisual, 0.8, {x: -100, opacity: 0, ease: Power1.easeOut}))
	  	.addTo(controller);
	  	
	  /* Work */
	  var $workTrigger = $('.work'),
	  		$workContent = $('.work__content'),
	  		$workVisual = $('.work__visual'),
	  		$workFrame = CSSRulePlugin.getRule('.work__list::before'),
	  		workTl = new TimelineLite();	
	  		
	  workTl
		  .set($workVisual, {scale: 1})
		  .from($workContent, 0.8, {x: -50, opacity: 0, ease: Power1.easeOut})
		  .from($workVisual, 0.8, {x: 50, opacity: 0, ease: Power1.easeOut}, 0);
			
		if ($workFrame) {
		  workTl.from($workFrame, 0.8, {cssRule:{opacity: 0}, ease: Power1.easeOut});
		} else {
		  console.warn("CSSRule for '.work__list::before' not found!");
		}
	
		var workScene = new ScrollMagic.Scene({
		  triggerElement: $workTrigger,
		  offset: 60,
		  reverse: false
	  })
	  	.setTween(workTl)
	  	.addTo(controller);
	  	
	  /* Blog */
	  var $blogTrigger = $('.blog'),
	  		$blogPost = $('.blog__post'),
	  		blogTl = new TimelineLite();
	  		
	  blogTl
	  	.staggerFrom($blogPost, 0.8, {opacity: 0, ease: Power1.easeOut}, 0.4);
	  	
	  var blogScene = new ScrollMagic.Scene({
		  triggerElement: $blogTrigger,
		  reverse: false
	  })
	  	.setTween(blogTl)
	  	.addTo(controller);
	  	
	  /* Contact */
	  var $contactTrigger = $('.contact'),
	  		$contactForm = $('.contact__form'),
	  		$contactVisual = $('.contact__visual'),
	  		$contactFrame = CSSRulePlugin.getRule('.contact__wrapper::before'),
	  		contactTl = new TimelineLite();
	  		
	  
		contactTl
		.from($contactForm, 0.8, {x: 50, opacity: 0, ease: Power1.easeOut})
		.from($contactVisual, 0.8, {x: -50, opacity: 0, ease: Power1.easeOut}, 0);

		if ($contactFrame) {
		contactTl.from($contactFrame, 0.8, {cssRule:{opacity: 0}, ease: Power1.easeOut});
		} else {
		console.warn("CSSRule for '.contact__wrapper::before' not found!");
		}	
	  var contactScene = new ScrollMagic.Scene({
		  triggerElement: $contactTrigger,
		  reverse: false
	  })
	  	.setTween(contactTl)
	  	.addTo(controller);
	  	
	}
  
  /***************** Work Carousel ******************/
  
  $('.work__navigation-el').click(function() {
    var $this = $(this),
        position = $this.parent().children().index($this);

    // Remove active class from all navigation elements
    $('.work__navigation-el').removeClass('work__navigation-el--is-active');
    $this.addClass('work__navigation-el--is-active');

    // Hide all work experiences, show only the selected one
    $('.work__list-el').hide().removeClass('work__list-el--is-active');
    $('.work__list-el').eq(position).fadeIn().addClass('work__list-el--is-active');
});

 

 
        /***************** Work Experience Carousel ******************/

    // Get carousel elements from the blog section (work experience)
    const wrapper = $(".blog__wrapper");
    const posts = $(".blog__post");
    const experienceSection = $(".blog");

    let index = 0;
    const totalPosts = posts.length;
    let autoSlide;

    function updateCarousel() {
      if (wrapper.length) {
        // Each slide is assumed to be 100% of the container width
        wrapper.css("transform", `translateX(-${index * 100}%)`);
        console.log(`Carousel moved to index: ${index}`);
      } else {
        console.warn("Carousel wrapper NOT found!");
      }
    }

    function startAutoSlide() {
      stopAutoSlide(); // Prevent multiple intervals from stacking
      autoSlide = setInterval(function () {
        index = (index < totalPosts - 1) ? index + 1 : 0;
        updateCarousel();
      }, 5000);
      console.log("Auto-slide started");
    }

    function stopAutoSlide() {
      clearInterval(autoSlide);
      console.log("Auto-slide stopped");
    }

    // Start auto-sliding on page load
    startAutoSlide();

    // Pause auto-slide on hover
    experienceSection.hover(stopAutoSlide, startAutoSlide);

    // ***** REMOVE the following old button-based code ***** 
    /*
    if (prevBtn.length && nextBtn.length) {
      console.log("Carousel buttons found!");

      prevBtn.off("click").on("click", function (e) {
        e.preventDefault();
        stopAutoSlide();
        index = index > 0 ? index - 1 : totalPosts - 1; // Loop back
        updateCarousel();
        startAutoSlide();
      });

      nextBtn.off("click").on("click", function (e) {
        e.preventDefault();
        stopAutoSlide();
        index = index < totalPosts - 1 ? index + 1 : 0; // Loop back
        updateCarousel();
        startAutoSlide();
      });
    } else {
      console.warn("Carousel navigation buttons NOT found!");
    }

    $('.prev-btn').on('click', function() {
      console.log('Prev button clicked!');
    });

    $('.next-btn').on('click', function() {
      console.log('Next button clicked!');
    });
    
    // Also remove the swapping code below:
    var $leftArrow = $(".carousel .blog__arrow--left");
    var $rightArrow = $(".carousel .blog__arrow--right");

    if ($leftArrow.length && $rightArrow.length) {
      // Use a temporary class to swap the classes
      $leftArrow.removeClass("blog__arrow--left").addClass("temp-arrow");
      $rightArrow.removeClass("blog__arrow--right").addClass("blog__arrow--left");
      $(".temp-arrow").removeClass("temp-arrow").addClass("blog__arrow--right");
      console.log("Swapped animated arrow classes");
    }
    */
    // ***** End Removal of old button code *****

    // ***** Add new SVG arrow event bindings for swipe navigation *****
    $(".blog__arrow--right").on("click", function(e) {
      e.preventDefault();
      // This arrow (with class blog__arrow--right) now acts as "previous"
      stopAutoSlide();
      index = index > 0 ? index - 1 : totalPosts - 1;
      updateCarousel();
      startAutoSlide();
      console.log("SVG arrow on right clicked (acting as prev)!");
    });

    $(".blog__arrow--left").on("click", function(e) {
      e.preventDefault();
      // This arrow (with class blog__arrow--left) now acts as "next"
      stopAutoSlide();
      index = index < totalPosts - 1 ? index + 1 : 0;
      updateCarousel();
      startAutoSlide();
      console.log("SVG arrow on left clicked (acting as next)!");
    });


		

		    
	});
	