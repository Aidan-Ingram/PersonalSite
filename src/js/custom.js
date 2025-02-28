$(function () {
    'use strict';

    let lastScrollTop = 0;
    const navbar = $(".navbar");
    let scrollThreshold = 50; // Minimum scroll distance before hiding

    // Ensure the navbar is visible on page load
    navbar.css("top", "0");

    $(window).on("scroll", function () {
        let currentScroll = $(this).scrollTop();

        if (Math.abs(currentScroll - lastScrollTop) > scrollThreshold) {
            if (currentScroll > lastScrollTop) {
                // Scrolling down - hide navbar
                navbar.css("top", "-80px"); // Adjust height as needed
            } else {
                // Scrolling up - show navbar
                navbar.css("top", "0");
            }
            lastScrollTop = currentScroll;
        }

        // Add scroll class when scrolling past 72px
        if (currentScroll > 72) {
            navbar.addClass("scroll");
        } else {
            navbar.removeClass("scroll");
        }
    });

    // Close mobile menu when a link is clicked
    $(".navbar .nav-link").on("click", function () {
        $(".navbar-collapse").collapse("hide");
    });

    // TESTIMONIALS CAROUSEL
    if ($("#testimonials-carousel").length) {
        $("#testimonials-carousel").owlCarousel({
            loop: true,
            margin: 10,
            responsiveClass: true,
            responsive: {
                0: { items: 1 },
                900: { items: 2 },
                1200: { items: 3, loop: false }
            }
        });
    }

    // SMOOTHSCROLL
    $('.navbar .nav-link').on('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 49
        }, 1000);
        event.preventDefault();
    });

    // Initialize EmailJS
    emailjs.init("kZzN6-PESS9XVMHoB");

    $("#contact-form").on("submit", function (event) {
        event.preventDefault();

        const formData = {
            to_name: "Aidan Ingram",
            first_name: $("#first_name").val(),
            last_name: $("#last_name").val(),
            email: $("#email").val(),
            message: $("#message").val()
        };

        emailjs.send("service_1k5pwvq", "template_ctlxgxn", formData)
            .then(response => {
                showPopup(
                    "Your message has been sent successfully!",
                    "I will reply to you as soon as I can.",
                    "success"
                );
                $("#contact-form")[0].reset();
            })
            .catch(error => {
                showPopup(
                    "Oops! Something went wrong.",
                    "Check your connection, and try again.",
                    "error"
                );
                console.error("EmailJS Error:", error);
            });
    });

    function showPopup(message, subtext, type) {
        let popup = $("#custom-popup");
        let popupMessage = $("#popup-message");
        let popupSubtext = $("#popup-subtext");
        let popupIcon = $("#popup-icon");
        let popupButton = $("#popup-button");

        popup.removeClass("show popup-success popup-error");

        popupMessage.text(message);
        popupSubtext.text(subtext);

        if (type === "success") {
            popupIcon.html(`<i class="fas fa-check-circle"></i>`);
            popup.addClass("popup-success");
            popupButton.text("Great!");
        } else {
            popupIcon.html(`<i class="fas fa-times-circle"></i>`);
            popup.addClass("popup-error");
            popupButton.text("Try Again");
        }

        popup.css("display", "flex");
        setTimeout(() => {
            popup.addClass("show");
        }, 10);
    }

    window.closePopup = function () {
        let popup = $("#custom-popup");
        popup.removeClass("show");

        setTimeout(() => {
            popup.css("display", "none");
        }, 300);
    };
});
