(function($) {
    
    var $overflowEl;

    WFUIJS.dim = function (useShim, zIndex) {
        // IE-old needs the overflow on the HTML element so scrollbars are hidden
        // lazy-loaded because body does not exist when scripts are loaded in the head.
        if (!$overflowEl) {
            $overflowEl = $.browser.msie && parseInt($.browser.version,10) < 8 ?
                $('html') :
                $(document.body);
        }

        if (!WFUIJS.dim.$dim) {
            WFUIJS.dim.$dim = WFUIJS("div").addClass("wfui-blanket");
            if (zIndex) {
                WFUIJS.dim.$dim.css({zIndex: zIndex});
            }
            if ($.browser.msie) {
                WFUIJS.dim.$dim.css({width: "200%", height: Math.max($(document).height(), $(window).height()) + "px"});
            }
            $('body').append(WFUIJS.dim.$dim);

            // Add IFrame shim
            if ($.browser.msie && (useShim !== false)) {
                WFUIJS.dim.$shim = $('<iframe frameBorder="0" class="wfui-blanket-shim" src="about:blank"/>');
                WFUIJS.dim.$shim.css({height: Math.max($(document).height(), $(window).height()) + "px"});
                if (zIndex) {
                    WFUIJS.dim.$shim.css({zIndex: zIndex - 1});
                }
                $("body").append(WFUIJS.dim.$shim);
                // WFUIJS.dim.shim is a legacy alias to WFUIJS.dim.$shim
                WFUIJS.dim.shim = WFUIJS.dim.$shim;
            }

            
            WFUIJS.dim.cachedOverflow = $overflowEl.css("overflow");
            $overflowEl.css("overflow", "hidden");
        }

        return WFUIJS.dim.$dim;
    };

    /**
     * Removes semitransparent DIV
     * @see WFUIJS.dim
     */
    WFUIJS.undim = function() {
        if (WFUIJS.dim.$dim) {
            WFUIJS.dim.$dim.remove();
            WFUIJS.dim.$dim = null;

            if (WFUIJS.dim.$shim) {
                WFUIJS.dim.$shim.remove();
                WFUIJS.dim.$shim = null;
            }

            $overflowEl && $overflowEl.css("overflow",  WFUIJS.dim.cachedOverflow);

            // Safari bug workaround
            if ($.browser.safari) {
                var top = $(window).scrollTop();
                $(window).scrollTop(10 + 5 * (top == 10)).scrollTop(top);
            }
        }
    };

}(WFUIJS.$));