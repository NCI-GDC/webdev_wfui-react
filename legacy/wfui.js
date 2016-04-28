/**
 * wfui.js
 * A modified version of atlassian.js from the Atlassian AUI package. For use
 * with the OICR WFUI package.
 */

/*! Atlassian UI and the Atlassian Design Guidelines are created by Atlassian. See https://developer.atlassian.com/display/AUI/ for API documentation and https://developer.atlassian.com/design/ for license details. */

/**
 * A collection of Atlassian JavaScript UI components.
 *
 * AUI components/functions should be assumed Private unless included in the API documentation at http://developer.atlassian.com/display/AUI
 *
 * @module WFUIJS
 * @requires jQuery
 */
(function () {

    'use strict';

    if (typeof jQuery === 'undefined') {
        throw new Error('jQuery is required for WFUIJS to function.');
    }

    if (typeof window.console === 'undefined') {
        window.console = {
            messages: [],

            log: function (text) {
                this.messages.push(text);
            },

            show: function () {
                alert(this.messages.join('\n'));
                this.messages = [];
            }
        };
    } else {
        // Firebug console - show not required to do anything.
        console.show = function () {};
    }

    /**
     * WFUIJS contains utility methods, used by various components. It also provides the namespacing for all AUI components.
     *
     * @class WFUIJS
     * @requires jQuery
     */
    window.WFUIJS = (function () {
        var included = [];
        var uniqueID;
        var uniqueIDstring;
        var uniqueIDcounter = 0;

        function escapeHtmlReplacement(str) {
            var special = {
                '<': '&lt;',
                '>': '&gt;',
                '&': '&amp;',
                '\'': '&#39;',
                '`': '&#96;'
            };

            if (typeof special[str] === 'string') {
                return special[str];
            }

            return '&quot;';
        }

        var ESCAPE_HTML_SPECIAL_CHARS = /[&"'<>`]/g;
        var res = {
            /**
             * Returns an HTMLElement reference.
             * @method $
             * @param {String | HTMLElement |Array} el Accepts a string to use as an ID for getting a DOM reference, an actual DOM reference, or an Array of IDs and/or HTMLElements.
             * @return {HTMLElement | Array} A DOM reference to an HTML element or an array of HTMLElements.
             */
            $: jQuery,

            /**
             * Logs the given object to the console.
             * @param obj object to log
             */
            log: function () {
                if (typeof console !== 'undefined' && console.log) {
                    Function.prototype.apply.apply(console.log, [console, arguments]);
                }
            },

            /**
             * Logs the given object to the console as a warning.
             * @param obj object to log
             */
            warn: function () {
                if (typeof console !== 'undefined' && console.warn) {
                    Function.prototype.apply.apply(console.warn, [console, arguments]);
                }
            },

            /**
             * Logs the given object to the console as an error.
             * @param obj object to log
             */
            error: function () {
                if (typeof console !== 'undefined' && console.error) {
                    Function.prototype.apply.apply(console.error, [console, arguments]);
                }
            },

            /**
             * Calls e.preventDefault. This is designed for event handlers that only need to prevent the default browser
             * action, eg:
             * WFUIJS.$(".my-class").click(WFUIJS.preventDefault)
             * @param e jQuery event
             */
            preventDefault: function (e) {
                e.preventDefault();
            },

            /**
             * Prevent further handling of an event. Returns false, which you should use as the return value of your event handler:
             * return WFUIJS.stopEvent(e);
             * @param e jQuery event
             * @deprecated use WFUIJS.preventDefault() instead
             */
            stopEvent: function (e) {
                e.stopPropagation();
                return false; // required for JWebUnit pop-up links to work properly
            },

            include: function (url) {
                if (!this.contains(included, url)) {
                    included.push(url);
                    var s = document.createElement('script');
                    s.src = url;
                    this.$('body').append(s);
                }
            },

            /**
             * Shortcut function to toggle class name of an element.
             * @method toggleClassName
             * @param {String | HTMLElement} element The HTMLElement or an ID to toggle class name on.
             * @param {String} className The class name to remove or add.
             */
            toggleClassName: function (element, className) {
                if (!(element = this.$(element))) {
                    return;
                }

                element.toggleClass(className);
            },

            /**
             * Shortcut function adds or removes 'hidden' classname to an element based on a passed boolean.
             * @method setVisible
             * @param {String | HTMLElement} element The HTMLElement or an ID to show or hide.
             * @param {boolean} show true to show, false to hide
             */
            setVisible: function (element, show) {
                if (!(element = this.$(element))) {
                    return;
                }
                // aliased for use inside function below
                var $ = this.$;

                $(element).each(function () {
                    var isHidden = $(this).hasClass('hidden');

                    if (isHidden && show) {
                        $(this).removeClass('hidden');
                    } else if (!isHidden && !show) {
                        $(this).addClass('hidden');
                    }
                });
            },

            /**
             * Shortcut function adds or removes 'current' classname to an element based on a passed boolean.
             * @param {String | HTMLElement} element The HTMLElement or an ID to show or hide.
             * @param {boolean} show true to add 'current' class, false to remove
             */
            setCurrent: function (element, current) {
                if (!(element = this.$(element))) {
                    return;
                }

                if (current) {
                    element.addClass('current');
                }
                else {
                    element.removeClass('current');
                }
            },

            /**
             * Shortcut function to see if passed element is currently visible on screen.
             * @method isVisible
             * @param {String | HTMLElement} element The HTMLElement or an jQuery selector to check.
             */
            isVisible: function (element) {
                return !this.$(element).hasClass('hidden');
            },

            /**
             * Shortcut function to see if passed element is truncated/clipped, eg. with text-overflow: ellipsis
             * @method isClipped
             * @param {String | HTMLElement} element The HTMLElement or an jQuery selector to check.
             */
            isClipped: function (el) {
                el = WFUIJS.$(el);
                return (el.prop('scrollWidth') > el.prop('clientWidth'));
            },

            /**
             * Adds functions to the list of methods to be run on initialisation. Wraps
             * error handling around the provided function so its failure won't prevent
             * other init functions running.
             * @method toInit
             * @param {Function} func Function to be call on initialisation.
             * @return WFUIJS object.
             */
            toInit: function (func) {
                var ajs = this;

                this.$(function () {
                    try {
                        func.apply(this, arguments);
                    } catch (ex) {
                        ajs.log('Failed to run init function: ' + ex + '\n' + func.toString());
                    }
                });

                return this;
            },

            /**
             * Finds the index of an element in the array.
             * @method indexOf
             * @param item Array element which will be searched.
             * @param fromIndex (optional) the index from which the item will be searched. Negative values will search from the
             * end of the array.
             * @return a zero based index of the element.
             */
            indexOf: function (array, item, fromIndex) {
                var length = array.length;

                if (fromIndex === null) {
                    fromIndex = 0;
                } else if (fromIndex < 0) {
                    fromIndex = Math.max(0, length + fromIndex);
                }

                for (var i = fromIndex; i < length; i++) {
                    if (array[i] === item) {
                        return i;
                    }
                }

                return -1;
            },

            /**
             * Looks for an element inside the array.
             * @method contains
             * @param item Array element which will be searched.
             * @return {Boolean} Is element in array.
             */
            contains: function (array, item) {
                return this.indexOf(array, item) > -1;
            },

            /**
             * Clones the element specified by the selector and removes the id attribute
             * @param selector a jQuery selector
             */
            clone : function (selector) {
                return WFUIJS.$(selector).clone().removeAttr('id');
            },

            /**
             * Similar to Javascript's in-built escape() function, but where the built-in escape()
             * might encode unicode charaters as %uHHHH, this function will leave them as-is.
             *
             * NOTE: this function does not do html-escaping, see WFUIJS.escapeHtml()
             */
            escape: function (string) {
                return escape(string).replace(/%u\w{4}/gi, function (w) {
                    return unescape(w);
                });
            },

            /**
             * Sanitise a string for use with innerHTML or as an attribute.
             *
             * @param {String} str
             */
            escapeHtml: function (str) {
                return str.replace(ESCAPE_HTML_SPECIAL_CHARS, escapeHtmlReplacement);
            },

            /**
             * Generate a unique ID string, checking the ID is not present in the DOM before returning.
             * Note uniqueID, uniqueIDstring, uniqueIDcounter = 0; set at top of file.
             * @param {string} prefix Optional. String to prepend to ID instead of default AUI prefix.
             */
            id: function (prefix) {
                uniqueID = uniqueIDcounter++ + '';
                uniqueIDstring = prefix ? prefix + uniqueID : 'wfui-uid-' + uniqueID;

                if (!document.getElementById(uniqueIDstring)) {
                    return uniqueIDstring;
                } else {
                    uniqueIDstring = uniqueIDstring + '-' + new Date().getTime();

                    if (!document.getElementById(uniqueIDstring)) {
                        return uniqueIDstring;
                    } else {
                        // if we still have a clash, something is deeply weird and needs attention.
                        throw new Error('ERROR: timestamped fallback ID ' + uniqueIDstring + ' exists. WFUIJS.id stopped.');
                    }
                }
            },

            /**
             * Apply a unique ID to the element. Preserves ID if the element already has one.
             * @private
             * @param {HTMLElement} el Selector to find target element.
             * @param {string} prefix Optional. String to prepend to ID instead of default AUI prefix.
             */
            _addID: function (el, prefix) {
                var element = WFUIJS.$(el);
                var addprefix = prefix || false;

                element.each(function () {
                    var $el = WFUIJS.$(this);

                    if (!$el.attr('id')) {
                        $el.attr('id', WFUIJS.id(addprefix));
                    }
                });
            },

            /**
             * Enables or disables any matching elements.
             */
            enable: function (el, b) {
                var $el = WFUIJS.$(el);

                if (typeof b === 'undefined') {
                    b = true;
                }

                return $el.each(function () {
                    this.disabled = !b;
                });
            },

            // Adapted from:
            // Simple JavaScript Templating
            // John Resig - http://ejohn.org/ - MIT Licensed
            tmpl: function(namespace, tpl, data){
                if (!WFUIJS.tplCache[namespace]) WFUIJS.tplCache[namespace] = {};
                // Figure out if we're getting a template, or if we need to
                // load the template - and be sure to cache the result.
                var fn = !/\W/.test(tpl) ?
                  WFUIJS.tplCache[namespace][tpl] = WFUIJS.tplCache[namespace][tpl] ||
                    WFUIJS.tmpl(namespace, WFUIJS.templates[namespace][tpl]) :
                 
                  // Generate a reusable function that will serve as a template
                  // generator (and which will be cached).
                  new Function("data",
                    "with(data){var p=[];" +
                    "p.push('" +
                      tpl.replace(/[\r\t\n]/g, " ")
                         .replace(/'(?=[^%]*%>)/g, "\t")
                         .split("'").join("\\'")
                         .split("\t").join("'")
                         .replace(/<%=(.+?)%>/g, "',(typeof $1 != 'undefined') ? $1 : '','")
                         .split("<%").join("');")
                         .split("%>").join("p.push('")
                         + "');return p.join('');}");
               
                // Provide some basic currying to the user
                return data ? fn( data ) : fn;
            },

            // Process a special WFUIJS template object (or a regular string)
            tplData: function(data) {
                if (typeof data !== 'object')
                    return data;

                return WFUIJS.tmpl(data.namespace, data.template, data.data);
            },

            camelCase: function(input) { 
                return input.toLowerCase().replace(/_(.)/g, function(match, group1) {
                    return group1.toUpperCase();
                });
            },

            tplCache: {},

            // A set of initialization functions for WFUI components that will be 
            // called upon page ready
            inits: [],

            // A set of client-side templates
            templates: {},

            // The set of WFUI components (widgets, etc.) on the current page
            components: [],

            // WFUI Backbone utils and components
            BB: {},
        };

        if (typeof WFUIJS !== 'undefined') {
            for (var i in WFUIJS) {
                res[i] = WFUIJS[i];
            }
        }

        /**
         * Creates DOM object
         * @method WFUIJS
         * @param {String} element tag name
         * @return {jQuery object}
         * @usage var a = WFUIJS("div");
         */
        var result = function () {
            var res = null;

            if (arguments.length && typeof arguments[0] === 'string') {
                res = WFUIJS.$(document.createElement(arguments[0]));

                if (arguments.length === 2) {
                    res.html(arguments[1]);
                }
            }

            return res;
        };

        for (var j in res) {
            result[j] = res[j];
        }

        return result;
    })();

    WFUIJS.$(function () {
        // Create the bridge between WFUI in Drupal and WFUI in JS:
        // Merge the Drupal wfui object with WFUIJS
        var Drupal = Drupal || {settings:{}};
        WFUIJS.$.extend(WFUIJS, Drupal.settings.wfui);

        WFUIJS.$(function() {
            WFUIJS.$.each(WFUIJS.inits, function() { this.call(); });
        });
    });
})();
