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
    $('.add-to-cart').hover(function() {
        $(this).css('color', '#c9ada7').css('background-color', '#fff');
    }, function() {
        $(this).css('color', '#fff').css('background-color', '#c9ada7');
    });
    var count = 0;
    $('.add-to-cart').click(function() {
        count++;
        $('.cart_count').html(count)
    });


});