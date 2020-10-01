(function ($) {

  "use strict";

  $(window).on('load', function () {

    /*Page Loader active
      ========================================================*/
    $('#preloader').fadeOut();

    // Sticky Nav
    $(window).on('scroll', function () {
      if ($(window).scrollTop() > 170) {
        $('.scrolling-navbar').addClass('top-nav-collapse');
        // if($('.nav-item.active')[0].lastElementChild.hash==="#subscription"){
        //   $('.scrolling-navbar').addClass('top-nav-subscription');
        // }else{
        //   $('.scrolling-navbar').removeClass('top-nav-subscription');
        // }
      } else {
        // $('.scrolling-navbar').removeClass('top-nav-subscription');
        $('.scrolling-navbar').removeClass('top-nav-collapse');
      }
    });

    $('#subscription-btn').on('click', function () {
      $('#subscription-target').click();
    })
    // Schedule Carousel Starts
    $('#recipeCarousel').carousel({
      interval: 1000
    })
    
    $('.carousel .carousel-item').each(function(){
        var minPerSlide = 3;
        var next = $(this).next();
        if (!next.length) {
        next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));
        
        for (var i=0;i<minPerSlide;i++) {
            next=next.next();
            if (!next.length) {
              next = $(this).siblings(':first');
            }
            
            next.children(':first-child').clone().appendTo($(this));
          }
    });
    // Schedule Carousel Ends
    
    /* ==========================================================================
       countdown timer
       ========================================================================== */
    jQuery('#clock').countdown('2020/10/12', function (event) {
      var $this = jQuery(this).html(event.strftime('' +
        '<div class="time-entry days"><span>%-D</span> Dias</div> ' +
        '<div class="time-entry hours"><span>%H</span> Horas</div> ' +
        '<div class="time-entry minutes"><span>%M</span> Minutos</div> ' +
        '<div class="time-entry seconds"><span>%S</span> Segundos</div> '));
    });

    /* slicknav mobile menu active  */
    $('.mobile-menu').slicknav({
      prependTo: '.navbar-header',
      parentTag: 'liner',
      allowParentLinks: true,
      duplicate: true,
      label: '',
    });

    /* WOW Scroll Spy
    ========================================================*/
    var wow = new WOW({
      //disabled for mobile
      mobile: false
    });
    wow.init();

    /* Nivo Lightbox 
    ========================================================*/
    $('.lightbox').nivoLightbox({
      effect: 'fadeScale',
      keyboardNav: true,
    });

    // one page navigation 
    $('.navbar-nav').onePageNav({
      currentClass: 'active'
    });

    /* Back Top Link active
    ========================================================*/
    var offset = 200;
    var duration = 500;
    $(window).scroll(function () {
      if ($(this).scrollTop() > offset) {
        $('.back-to-top').fadeIn(400);
      } else {
        $('.back-to-top').fadeOut(400);
      }
    });

    $('.back-to-top').on('click', function (event) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: 0
      }, 600);
      return false;
    });

  });

}(jQuery));