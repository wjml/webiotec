! function ($) {
    "use strict";
    $(window).on("load", (function () {
        var wow;
        $("#preloader").fadeOut(), $(window).on("scroll", (function () {
            $(window).scrollTop() > 170 ? $(".scrolling-navbar").addClass("top-nav-collapse") : $(".scrolling-navbar").removeClass("top-nav-collapse")
        })), $("#inscreva-se-btn").on("click", (function (event) {
            event.preventDefault(), $("#inscreva-se-target").click()
        })), $("#apoiar-btn").on("click", (function (event) {
            event.preventDefault(), $("#apoiar-target").click()
        })), $("#recipeCarousel").carousel({
            interval: 2e3
        }), $('a[href$="#"]').click((function (event) {
            event.preventDefault ? event.preventDefault() : event.returnValue = !1
        })), $(".carousel .carousel-item").each((function () {
            var minPerSlide = 1,
                next = $(this).next();
            next.length || (next = $(this).siblings(":first")), next.children(":first-child").clone().appendTo($(this));
            for (var i = 0; i < 1; i++)(next = next.next()).length || (next = $(this).siblings(":first")), next.children(":first-child").clone().appendTo($(this))
        })), jQuery("#clock").countdown("2020/10/12", (function (event) {
            var $this = jQuery(this).html(event.strftime('<div class="time-entry days"><span>%-D</span> Dias</div> <div class="time-entry hours"><span>%H</span> Horas</div> <div class="time-entry minutes"><span>%M</span> Minutos</div> <div class="time-entry seconds"><span>%S</span> Segundos</div> '))
        })), $(".mobile-menu").slicknav({
            prependTo: ".navbar-header",
            parentTag: "liner",
            allowParentLinks: !0,
            duplicate: !0,
            label: ""
        }), new WOW({
            mobile: !1
        }).init(), $(".navbar-nav").onePageNav({
            currentClass: "active"
        });
        var offset = 200,
            duration = 500;
        $(window).scroll((function () {
            $(this).scrollTop() > 200 ? $(".back-to-top").fadeIn(400) : $(".back-to-top").fadeOut(400)
        })), $(".back-to-top").on("click", (function (event) {
            return event.preventDefault(), $("html, body").animate({
                scrollTop: 0
            }, 600), !1
        }))
    }))
}(jQuery);