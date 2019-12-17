function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* global confirm */

/* eslint no-restricted-globals: ["error", "event"] */

/**
 * Folked from External Links from WFUI
 *
 */
export var extLink = function extLink($, _config) {
  var defaultConfig = {
    extAlert: '_blank',
    extAlertText: 'This link will take you to an external web site.',
    extClass: 'ext',
    extSpanClass: '',
    extCssExclude: '',
    extCssExplicit: '',
    extExclude: '',
    extImgClass: 0,
    extInclude: '',
    extLabel: '(link is external)',
    extSubdomains: 1,
    // Exclude links with the same primary domain. // For example, a link from 'www.example.com' to the subdomain of 'my.example.com' would be excluded.
    extTarget: '_blank',
    mailtoClass: 0,
    mailtoLabel: '(link sends e-mail)',
    promptExclude: false,
    promptExcludePage: []
  };

  var config = _extends({}, defaultConfig, {}, _config);

  function attach(context) {
    if (!$) {
      console.error('jQuery is not found: extlink is dependent on jQuery.');
      return false;
    }

    var promptPageExclude = false;

    if (config.promptExcludePage.includes(window.location.pathname)) {
      promptPageExclude = true;
    } // Strip the host name down, removing ports, subdomains, or www.


    var pattern = /^(([^\/:]+?\.)*)([^\.:]{4,})((\.[a-z]{1,4})*)(:[0-9]{1,5})?$/;
    var host = window.location.host.replace(pattern, '$3$4');
    var subdomain = window.location.host.replace(pattern, '$1');

    if (subdomain == host) {
      subdomain = '';
    } // Determine what subdomains are considered internal.


    var subdomains;

    if (config.extSubdomains) {
      subdomains = '([^/]*\\.)?';
    } else if (subdomain === 'www.' || subdomain === '') {
      subdomains = '(www\\.)?';
    } else {
      subdomains = subdomain.replace('.', '\\.');
    } // Build regular expressions that define an internal link.


    var internal_link = new RegExp("^https?://".concat(subdomains).concat(host), 'i'); // Extra internal link matching.

    var extInclude = false;

    if (config.extInclude) {
      extInclude = new RegExp(config.extInclude.replace(/\\/, '\\'), 'i');
    }

    var promptExclude = false;

    if (config.promptExclude) {
      promptExclude = new RegExp(config.promptExclude.replace(/\\/, '\\'), 'i');
    } // Extra external link matching.


    var extExclude = false;

    if (config.extExclude) {
      if (typeof config.extExclude === 'string') {
        extExclude = new RegExp(config.extExclude.replace(/\\/, '\\'), 'i');
      } else if (Array.isArray(config.extExclude) && config.extExclude.length > 0) {
        var extExcConcat = "(".concat(config.extExclude.join('|'), ")");
        extExclude = new RegExp(extExcConcat.replace(/\\/, '\\'), 'i');
      }
    } // Extra external link CSS selector exclusion.


    var extCssExclude = false;

    if (config.extCssExclude) {
      extCssExclude = config.extCssExclude;
    } // Extra external link CSS selector explicit.


    var extCssExplicit = false;

    if (config.extCssExplicit) {
      extCssExplicit = config.extCssExplicit;
    } // Find all links which are NOT internal and begin with http as opposed
    // to ftp://, javascript:, etc. other kinds of links.
    // When operating on the 'this' variable, the host has been appended to
    // all links by the browser, even local ones.
    // In jQuery 1.1 and higher, we'd use a filter method here, but it is not
    // available in jQuery 1.0 (WFUI 5 default).


    var external_links = [];
    var mailto_links = [];
    $("a:not(.".concat(config.extClass, ", .").concat(config.mailtoClass, "), area:not(.").concat(config.extClass, ", .").concat(config.mailtoClass, ")"), context).each(function (el) {
      try {
        var url = '';

        if (typeof this.href === 'string') {
          url = this.href.toLowerCase();
        } // Handle SVG links (xlink:href).
        else if (_typeof(this.href) === 'object') {
            url = this.href.baseVal;
          }

        if (url.indexOf('http') === 0 && (!url.match(internal_link) && !(extExclude && url.match(extExclude)) || extInclude && url.match(extInclude)) && !(extCssExclude && $(this).parents(extCssExclude).length > 0) && !(extCssExplicit && $(this).parents(extCssExplicit).length < 1)) {
          external_links.push(this);
        } // Do not include area tags with begin with mailto: (this prohibits
        // icons from being added to image-maps).
        else if (this.tagName !== 'AREA' && url.indexOf('mailto:') === 0 && !(extCssExclude && $(this).parents(extCssExclude).length > 0) && !(extCssExplicit && $(this).parents(extCssExplicit).length < 1)) {
            mailto_links.push(this);
          }
      } catch (error) {
        // IE7 throws errors often when dealing with irregular links, such as:
        // <a href="node/10"></a> Empty tags.
        // <a href="http://user:pass@example.com">example</a> User:pass syntax.
        return false;
      }
    });

    if (config.extClass) {
      applyClassAndSpan(external_links, config.extClass);
    }

    if (config.mailtoClass) {
      applyClassAndSpan(mailto_links, config.mailtoClass);
    }

    if (config.extTarget) {
      // Apply the target attribute to all links.
      if (config.extTarget) {
        $(external_links).attr({
          target: '_blank',
          rel: 'nofollow'
        });
        $(external_links).attr('rel', function (i, val) {
          // If no rel attribute is present, create one with the values noopener and noreferrer.
          if (val === null) {
            return 'noopener nofererer';
          } // Check to see if rel contains noopener or noreferrer. Add what doesn't exist.


          if (val.indexOf('noopener') > -1 || val.indexOf('noreferrer') > -1) {
            if (val.indexOf('noopener') === -1) {
              return "".concat(val, " noopener");
            }

            if (val.indexOf('noreferrer') === -1) {
              return "".concat(val, " noreferrer");
            } // Both noopener and noreferrer exist. Nothing needs to be added.


            return val;
          } // Else, append noopener and noreferrer to val.


          return "".concat(val, " noopener nofererer");
        });
      }
    } // Set up default click function for the external links popup. This should be
    // overridden by modules wanting to alter the popup.


    function popupClickHandler() {
      if (config.extAlert) {
        return confirm(config.extAlertText);
      }
    }

    $(external_links).click(function (e) {
      if (!promptPageExclude && (!promptExclude || !this.href.match(promptExclude))) {
        return popupClickHandler(e, this);
      }
    });
  }
  /**
   * Apply a class and a trailing <span> to all links not containing images.
   *
   * @param {object[]} links
   *   An array of DOM elements representing the links.
   * @param {string} class_name
   *   The class to apply to the links.
   */


  function applyClassAndSpan(links, class_name) {
    var $links_to_process;

    if (config.extImgClass) {
      $links_to_process = $(links);
    } else {
      var links_with_images = $(links).find('img').parents('a');
      $links_to_process = $(links).not(links_with_images);
    }

    $links_to_process.addClass(class_name);
    var i;
    var _$links_to_process = $links_to_process,
        length = _$links_to_process.length;

    for (i = 0; i < length; i++) {
      var $link = $($links_to_process[i]);

      if ($link.css('display') === 'inline' || $link.css('display') === 'inline-block' || $link.css('display') === 'block') {
        if (config.extSpanClass && config.extSpanClass.length > 0) {
          if (config.extSpanClass === config.mailtoClass) {
            $link.append("<span class=\"".concat(config.extSpanClass, "\"><span class=\"element-invisible sr-only\"> ").concat(config.mailtoLabel, "</span></span>"));
          } else {
            $link.append("<span class=\"".concat(config.extSpanClass, "\"><span class=\"element-invisible sr-only\"> ").concat(config.extLabel, "</span></span>"));
          }
        }
      }
    }
  } // Duplicate same logic for


  function manualConfirm(url) {
    // Strip the host name down, removing ports, subdomains, or www.
    var pattern = /^(([^\/:]+?\.)*)([^\.:]{4,})((\.[a-z]{1,4})*)(:[0-9]{1,5})?$/;
    var host = window.location.host.replace(pattern, '$3$4');
    var subdomain = window.location.host.replace(pattern, '$1');

    if (subdomain == host) {
      subdomain = '';
    } // Determine what subdomains are considered internal.


    var subdomains;

    if (config.extSubdomains) {
      subdomains = '([^/]*\\.)?';
    } else if (subdomain === 'www.' || subdomain === '') {
      subdomains = '(www\\.)?';
    } else {
      subdomains = subdomain.replace('.', '\\.');
    } // Build regular expressions that define an internal link.


    var internal_link = new RegExp("^https?://".concat(subdomains).concat(host), 'i'); // Extra internal link matching.

    var extInclude = false;

    if (config.extInclude) {
      extInclude = new RegExp(config.extInclude.replace(/\\/, '\\'), 'i');
    }

    var promptExclude = false;

    if (config.promptExclude) {
      promptExclude = new RegExp(config.promptExclude.replace(/\\/, '\\'), 'i');
    } // Extra external link matching.


    var extExclude = false;

    if (config.extExclude) {
      if (typeof config.extExclude === 'string') {
        extExclude = new RegExp(config.extExclude.replace(/\\/, '\\'), 'i');
      } else if (Array.isArray(config.extExclude) && config.extExclude.length > 0) {
        var extExcConcat = "(".concat(config.extExclude.join('|'), ")");
        extExclude = new RegExp(extExcConcat.replace(/\\/, '\\'), 'i');
      }
    } // Extra external link CSS selector exclusion.


    var extCssExclude = false;

    if (config.extCssExclude) {
      extCssExclude = config.extCssExclude;
    } // Extra external link CSS selector explicit.


    var extCssExplicit = false;

    if (config.extCssExplicit) {
      extCssExplicit = config.extCssExplicit;
    } // Manually check the individual URL


    if (url.indexOf('http') === 0 && (!url.match(internal_link) && !(extExclude && url.match(extExclude)) || extInclude && url.match(extInclude)) && !(extCssExclude && $(this).parents(extCssExclude).length > 0) && !(extCssExplicit && $(this).parents(extCssExplicit).length < 1) && !promptExclude || !url.match(promptExclude)) {
      return confirm(config.extAlertText);
    }

    return true;
  }

  return {
    attach: attach,
    manualConfirm: manualConfirm
  };
};