$(document).ready(function () {
    $('.menu-button').click(function () {
        $(this).toggleClass('add-box-shadow');
        $('.logo-amis').toggle();

        $('.sub-item-hide').hide();
        $('.item-name').toggle();
        $('.left-nav').toggleClass('shrink');
        $('.sub-nav, .big-sub').hide();
    })

    $('.item').click(function () {
        $('.sub-item-hide').not($(this).next('.sub-item-hide')).slideUp('fast');
        $(this).next('.sub-item-hide').slideToggle('fast');
    })

    $('.item, .sub-item').click(function () {
        $('.item, .sub-item').removeClass('to-orange');
        $('.up-down-arrow').not($(this).children('.up-down-arrow')).removeClass('up-side-down');
        $(this).addClass('to-orange');
        $(this).children('.up-down-arrow').toggleClass('up-side-down');
    })

    $('.arrow-right, .big-sub-button').click(function () {
        var subMenu = "#" + this.id + "-sub-menu";
        $('.sub-nav, .big-sub').not(subMenu).hide();
        $(subMenu).slideToggle('fast');
    })
    })