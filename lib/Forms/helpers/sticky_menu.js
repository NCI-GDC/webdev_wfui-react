'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Enable sticky menu on survey menu.
 * @returns {Object}
 */
var threshold = 991;
var stickyMenu = function stickyMenu() {
    var menuParams;
    var sidebarHeight;
    return {
        init: function init() {
            sidebarHeight = $('.survey-side').innerHeight();
            $(window).scroll(function (e) {
                if ($(window).width() > threshold) {
                    if (menuParams) {
                        if ($(window).scrollTop() > menuParams - $('.survey-side').innerHeight()) {
                            $('.survey-side').removeClass('affix');
                            $('.survey-side').addClass('affix-bottom');
                        } else {
                            $('.survey-side').removeClass('affix-bottom');
                            $('.survey-side').addClass('affix');
                        }
                    }
                } else {
                    $('.survey-side').removeClass('affix');
                    $('.survey-side').removeClass('affix-bottom');
                }
            });
            $(window).resize(function (e) {
                if (sidebarHeight > $(window).height()) {
                    $('.survey-side').css('height', 'auto');
                } else {
                    $('.survey-side').css('height', '100vh');
                }
            });
            $(window).trigger('resize');
        },
        update: function update() {

            if (sidebarHeight < $('.survey-main.active').innerHeight() && $(window).height() < $('.survey-main.active').innerHeight()) {
                menuParams = $('.survey-main.active').innerHeight();
            } else {
                menuParams = false;
                $('.survey-side').removeClass('affix');
                $('.survey-side').removeClass('affix-bottom');
                $('.survey-side').css('height', '100vh;');
            }
            $(window).trigger('scroll');
            $(window).trigger('resize');
        }
    };
};
exports.default = stickyMenu();