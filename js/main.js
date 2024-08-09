'use strict';

(function ($) {
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");

        // Initialize variables
        var itemsToShow = 12; // Number of items to show initially
        var $items = $('.gallery-filter .gs-item');
        var totalItems = $items.length;
        var activeFilter = '*'; // Default to showing all items

        function updateVisibleItems() {
            var currentlyVisible = $items.filter('[data-visible="true"]').length;
            $('#show-more').toggleClass('d-none', currentlyVisible >= totalItems);
            $('#show-less').toggleClass('d-none', currentlyVisible <= itemsToShow);
        }

        function showItems(number) {
            var visibleCount = 0;
            $items.each(function (index) {
                var $this = $(this);
                if ((activeFilter === '*' || $this.hasClass(activeFilter.substring(1))) && visibleCount < number) {
                    $this.attr('data-visible', 'true').show();
                    visibleCount++;
                } else {
                    $this.attr('data-visible', 'false').hide();
                }
            });
            updateVisibleItems();
        }

        function hideItems(number) {
            var visibleCount = 0;
            $items.each(function (index) {
                if (visibleCount < number) {
                    $(this).attr('data-visible', 'true').show();
                    visibleCount++;
                } else {
                    $(this).attr('data-visible', 'false').hide();
                }
            });
            updateVisibleItems();
        }

        // Initially show a subset of items
        showItems(itemsToShow);

        $('#show-more').click(function () {
            var currentlyVisible = $items.filter('[data-visible="true"]').length;
            var nextSet = currentlyVisible + itemsToShow;
            if (nextSet > totalItems) {
                nextSet = totalItems;
            }
            showItems(nextSet);
        });

        $('#show-less').click(function () {
            var currentlyVisible = $items.filter('[data-visible="true"]').length;
            var prevSet = currentlyVisible - itemsToShow;
            if (prevSet < 0) {
                prevSet = 0;
            }
            hideItems(prevSet);
        });

        // Filter functionality
        $('.gallery-controls ul li').click(function () {
            var filterValue = $(this).attr('data-filter');
            activeFilter = filterValue;

            // Show the first set of items that match the filter
            showItems(itemsToShow);

            $('.gallery-controls ul li').removeClass('active');
            $(this).addClass('active');
        });

        // Handle hash for initial filter
        var hash = window.location.hash.substring(1); // Remove the '#' from the hash
        if (hash) {
            $('.gallery-controls li[data-filter=".' + hash + '"]').click();
        }
    });

    /* Additional functionality... */
  /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------------
		Testimonial Slider
    ----------------------- */
    $(".testimonial-slider").owlCarousel({
        items: 2,
        dots: true,
        // autoplay: true,
        loop: true,
        smartSpeed: 1200,
        margin: 0,
        responsive: {
            320: {
                items: 1,
            },
            480: {
                items: 1,
            },
            992: {
                items: 2,
            }
        }
    });

    /*------------------
        Magnific Popup
    --------------------*/
    $('.image-popup').magnificPopup({
        type: 'image'
    });

    /*------------------
        Counter Up
    --------------------*/
    $('.count').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 4000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });

    /*------------------
        About Counter Up
    --------------------*/
    $('.ab-count').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 4000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });

})(jQuery);
