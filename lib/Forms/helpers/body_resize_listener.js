'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var bodyResizeListener = function bodyResizeListener($, el, callback) {
    var divW = $(el).width();
    var divH = $(el).height();
    var timer = setInterval(_checkResize, 100);
    function _checkResize() {
        var w = $(el).width();
        var h = $(el).height();
        if (w != divW || h != divH) {
            divH = h;
            divW = w;
            if (typeof callback === 'function') {
                setTimeout(function () {
                    callback($);
                }, 10);
            }
        }
    }
    return {
        off: function off() {
            console.log('off');
            clearInterval(timer);
        }
    };
};
exports.default = bodyResizeListener;