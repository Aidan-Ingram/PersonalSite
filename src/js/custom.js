$(function () {
    'use strict';

    // ==============================
    // Navbar Scroll Behavior
    // ==============================
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
                navbar.css("top", "-80px");
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

    // ==============================
    // Smooth Scrolling for Navbar Links (Same Page)
    // ==============================
    $('.navbar .nav-link').on('click', function (event) {
        var $anchor = $(this);
        if ($anchor.attr('href').startsWith("#")) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - 70
            }, 1000);
        }
    });

    // ==============================
    // Smooth Scrolling for Cross-Page Links
    // ==============================
    $(document).ready(function () {
        // Show the page only after it's fully loaded
        $("body").css("visibility", "visible").css("opacity", "1");

        // If navigating to an anchor (e.g., index.html#about), scroll smoothly after loading
        if (window.location.hash) {
            let target = $(window.location.hash);
            if (target.length) {
                setTimeout(() => {
                    $('html, body').animate({
                        scrollTop: target.offset().top - 70
                    }, 800);
                }, 10); // Tiny delay to prevent flash
            }
        }
    });
    $(document).ready(function () {
        // Check if the URL contains a tab parameter
        const urlParams = new URLSearchParams(window.location.search);
        const tab = urlParams.get("tab");

        if (tab) {
            setTab(tab);
        }
    });

// Function to switch to the specified tab
    function setTab(tabName) {
        let tabElement = $(`#${tabName}-tab`);
        let tabContent = $(`#${tabName}`);

        if (tabElement.length && tabContent.length) {
            // Deactivate all tabs
            $(".nav-link").removeClass("active");
            $(".tab-pane").removeClass("show active");

            // Activate the selected tab
            tabElement.addClass("active");
            tabContent.addClass("show active");

            // Ensure Bootstrap updates the active tab
            tabElement.tab('show');
        }
    }



    // ==============================
    // Page Fade-In Effect (Fixed)
    // ==============================
    $("body").css("opacity", "0").css("transition", "opacity 0.4s ease-in-out");

    $(document).ready(function () {
        $("body").css("opacity", "1");
    });

    // ==============================
    // Owl Carousel Initialization
    // ==============================
    $('#testimonials-carousel').owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            900: {
                items: 2,
            },
            1200: {
                items: 3,
                loop: false
            }
        }
    });

    // ==============================
    // EmailJS Form Submission
    // ==============================
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

    // ==============================
    // Popup Confirmation Handling
    // ==============================
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
            popupIcon.html(`<i class="fas fa-check-circle" style="color: green; font-size: 48px;"></i>`);
            popup.addClass("popup-success");
            popupButton.text("Great!");
        } else {
            popupIcon.html(`<i class="fas fa-times-circle" style="color: red; font-size: 48px;"></i>`);
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
document.addEventListener("DOMContentLoaded", function () {
    console.log(
        window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'Dark mode is enabled'
            : 'Light mode is enabled'
    );

    document.body.classList.add("fade-in");
});
document.addEventListener("DOMContentLoaded", function () {
    const logo1 = document.querySelector(".navbar-image img");
    const logo2 =document.querySelector(".footer-logo img");
    const darkMode = window.matchMedia("(prefers-color-scheme: dark)");

    function updateLogo(e) {
        if (e.matches) {
            logo1.src = "src/images/site_logo_dark.png"; // Dark mode logo
            logo2.src = "src/images/site_logo_dark.png";
        } else {
            logo1.src = "src/images/site_logo.png"; // Light mode logo
            logo2.src ="src/images/site_logo.png";
        }
    }

    // Initial check
    updateLogo(darkMode);

    // Listen for theme changes
    darkMode.addEventListener("change", updateLogo);
});
