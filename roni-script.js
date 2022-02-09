$(document).ready(function() {

    $('.login-container1').hide();
    $('#sign-up').click(function() {
        $('.login-container2').hide();
        $(".login-container1").toggle(1000);

    });

    $('.login-container2').hide();
    $('#login').click(function() {
        $('.login-container1').hide();
        $(".login-container2").toggle(1000);
    });
    document.getElementById('signup-email').value = ''
    document.getElementById('signup-password').value = ''
    $('a, #sign-up, #login, #logout').hover(function() {
            $(this).css('color', '#0dd0d3');
        },
        function() {
            $(this).css('color', '#065e60');
        });

    $('.shopping, .more-videos').hover(function() {
        $(this).css('color', '#f1ac67').css('background-color', '#fff');
    }, function() {
        $(this).css('color', '#fff').css('background-color', '#f1ac67');
    });
    $('.btn').hover(function() {
        $(this).css('color', '#337ab7').css('background-color', '#fff');
    }, function() {
        $(this).css('color', '#fff').css('background-color', '#337ab7');
    });
    $('.submit').hover(function() {
        $(this).css('color', '#f9f5f1').css('background-color', 'black');
    }, function() {
        $(this).css('color', 'black').css('background-color', '#f9f5f1');
    });


    'use strict';

    $(function() {

        //settings for slider
        var width = 720;
        var animationSpeed = 500;
        var pause = 2500;
        var currentSlide = 1;

        //cache DOM elements
        var $slider = $('#slider');
        var $slideContainer = $('.slides', $slider);
        var $slides = $('.slide', $slider);
        var interval;

        function startSlider() {
            interval = setInterval(function() {
                $slideContainer.animate({
                    'margin-left': '-=' + width
                }, animationSpeed, function() {
                    if (++currentSlide === $slides.length) {
                        currentSlide = 1;
                        $slideContainer.css('margin-left', 0);
                    }
                });
            }, pause);
        }

        function pauseSlider() {
            clearInterval(interval);
        }
        $slideContainer.on('mouseenter', pauseSlider).on('mouseleave', startSlider);
        startSlider();
    });

    $(".so-img").hover(function() {
        $(this).animate({ opacity: '1' }, 0);
    }, function() {
        $(this).animate({ opacity: '0.5' }, 0);
    });
});