var count = 0;
var total = 300;
var cur = parseInt($('#current').val());
var totalPage;
var end = $('#my-select').val();
var endInt = parseInt(end);
totalPage = total / (endInt);
$(document).ready(function () {
    $('[click-report="display"]').click(function () {
        var current = this;
        $(current).next().slideToggle("fast");
        $(current).next().siblings(".content-left-exten-more").slideUp("fast");
    });
    $('[click="active"]').click(function () {
        var link = this;
        $(link).addClass("active");
        $(link).siblings().removeClass("active");
    });
    $('[click="active1"]').click(function () {
        var link = this;
        $(link).addClass("active1");
        $(link).siblings().removeClass("active1");
    });
    $('.click-btn').click(function () {
        $('.content-left-wrap').toggleClass("content-left-wrap-display");
    });
    $('#danhmuc').click(function () {
        $('.content-left-sub').css("display", "flex");
        count++;
        if (count > 1 && count % 2 === 0) {
            $('.content-left-sub').css("display", "none");
        }
        console.log(count);
    });
    $('#btn-customer').click(function () {
        $('.content-right').css("display", "flex");
        $('.content-left-sub').css("display", "none");
        count--;
    });
    $('#my-select').change(function () {
        end = $('#my-select').val();
        endInt = parseInt(end);
        totalPage = total / (endInt);
        console.log(endInt);
        console.log(total);
        console.log(totalPage);
        $('#current').val(1);
        $('#endRec').text(end);
        $('#totalPage').text("trên " + totalPage);
    });
    $('[click="btn-scroll-right"]').click(function () {
        event.preventDefault();
        $('.foothead-navi').animate({
            scrollLeft: "+=200px"
        }, "slow");
    });

    $('[click="btn-scroll-left"]').click(function () {
        event.preventDefault();
        $('.foothead-navi').animate({
            scrollLeft: "-=200px"
        }, "slow");
    });

    $('#show-info').click(function () {
        $('.content-right-footer-info-wrapper').css("display", "flex");
    });
    $('[hidee="hide-info"]').click(function () {
        $('.content-right-footer-info-wrapper').css("display", "none");
    });
    $('#show-popup').click(function () {
        $('.content-add').css("display", "flex");
        $('.content-right').css("display", "none");
    });
    $('#pa-closeAddContent').click(function () {
        $('.content-add').css("display", "none");
        $('.content-right').css("display", "flex");
    });
});
count = 0;
