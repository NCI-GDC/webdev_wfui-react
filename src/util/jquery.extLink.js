/**
 * Folked from External Links from WFUI
 *
 */

export const extLink = ($, _config) => {
    const defaultConfig = {
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
        extSubdomains: 1, // Exclude links with the same primary domain. // For example, a link from 'www.example.com' to the subdomain of 'my.example.com' would be excluded.
        extTarget: '_blank',
        mailtoClass: 0,
        mailtoLabel: '(link sends e-mail)',
        promptExclude: false,
    };
    const config = Object.assign({}, defaultConfig, _config);

    function attach(context) {
        if (!$) {
            console.error(
                'jQuery is not found: extlink is dependent on jQuery.'
            );
            return false;
        }

        // Strip the host name down, removing ports, subdomains, or www.
        const pattern = /^(([^\/:]+?\.)*)([^\.:]{4,})((\.[a-z]{1,4})*)(:[0-9]{1,5})?$/;
        const host = window.location.host.replace(pattern, '$3$4');
        let subdomain = window.location.host.replace(pattern, '$1');
        if (subdomain == host) {
            subdomain = '';
        }

        // Determine what subdomains are considered internal.
        let subdomains;
        if (config.extSubdomains) {
            subdomains = '([^/]*\\.)?';
        } else if (subdomain === 'www.' || subdomain === '') {
            subdomains = '(www\\.)?';
        } else {
            subdomains = subdomain.replace('.', '\\.');
        }

        // Build regular expressions that define an internal link.
        const internal_link = new RegExp(`^https?://${subdomains}${host}`, 'i');

        // Extra internal link matching.
        let extInclude = false;
        if (config.extInclude) {
            extInclude = new RegExp(config.extInclude.replace(/\\/, '\\'), 'i');
        }

        let promptExclude = false;
        if (config.promptExclude) {
            promptExclude = new RegExp(
                config.promptExclude.replace(/\\/, '\\'),
                'i'
            );
        }

        // Extra external link matching.
        let extExclude = false;
        if (config.extExclude) {
            if (typeof config.extExclude === 'string') {
                extExclude = new RegExp(
                    config.extExclude.replace(/\\/, '\\'),
                    'i'
                );
            } else if (
                Array.isArray(config.extExclude) &&
                config.extExclude.length > 0
            ) {
                const extExcConcat = `(${config.extExclude.join('|')})`;
                extExclude = new RegExp(extExcConcat.replace(/\\/, '\\'), 'i');
            }
        }

        // Extra external link CSS selector exclusion.
        let extCssExclude = false;
        if (config.extCssExclude) {
            extCssExclude = config.extCssExclude;
        }

        // Extra external link CSS selector explicit.
        let extCssExplicit = false;
        if (config.extCssExplicit) {
            extCssExplicit = config.extCssExplicit;
        }

        // Find all links which are NOT internal and begin with http as opposed
        // to ftp://, javascript:, etc. other kinds of links.
        // When operating on the 'this' variable, the host has been appended to
        // all links by the browser, even local ones.
        // In jQuery 1.1 and higher, we'd use a filter method here, but it is not
        // available in jQuery 1.0 (WFUI 5 default).
        const external_links = [];
        const mailto_links = [];

        $(
            `a:not(.${config.extClass}, .${config.mailtoClass}), area:not(.${
                config.extClass
            }, .${config.mailtoClass})`,
            context
        ).each(function(el) {
            try {
                let url = '';
                if (typeof this.href === 'string') {
                    url = this.href.toLowerCase();
                }
                // Handle SVG links (xlink:href).
                else if (typeof this.href === 'object') {
                    url = this.href.baseVal;
                }
                if (
                    url.indexOf('http') === 0 &&
                    ((!url.match(internal_link) &&
                        !(extExclude && url.match(extExclude))) ||
                        (extInclude && url.match(extInclude))) &&
                    !(
                        extCssExclude &&
                        $(this).parents(extCssExclude).length > 0
                    ) &&
                    !(
                        extCssExplicit &&
                        $(this).parents(extCssExplicit).length < 1
                    )
                ) {
                    external_links.push(this);
                }
                // Do not include area tags with begin with mailto: (this prohibits
                // icons from being added to image-maps).
                else if (
                    this.tagName !== 'AREA' &&
                    url.indexOf('mailto:') === 0 &&
                    !(
                        extCssExclude &&
                        $(this).parents(extCssExclude).length > 0
                    ) &&
                    !(
                        extCssExplicit &&
                        $(this).parents(extCssExplicit).length < 1
                    )
                ) {
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
                $(external_links).attr({ target: '_blank', rel: 'nofollow' });
                $(external_links).attr('rel', (i, val) => {
                    // If no rel attribute is present, create one with the values noopener and noreferrer.
                    if (val === null) {
                        return 'noopener nofererer';
                    }
                    // Check to see if rel contains noopener or noreferrer. Add what doesn't exist.
                    if (
                        val.indexOf('noopener') > -1 ||
                        val.indexOf('noreferrer') > -1
                    ) {
                        if (val.indexOf('noopener') === -1) {
                            return `${val} noopener`;
                        }
                        if (val.indexOf('noreferrer') === -1) {
                            return `${val} noreferrer`;
                        }
                        // Both noopener and noreferrer exist. Nothing needs to be added.

                        return val;
                    }
                    // Else, append noopener and noreferrer to val.

                    return `${val} noopener nofererer`;
                });
            }
        }

        // Set up default click function for the external links popup. This should be
        // overridden by modules wanting to alter the popup.
        function popupClickHandler() {
            if (config.extAlert) {
                return confirm(config.extAlertText);
            }
        }

        $(external_links).click(function(e) {
            if (!promptExclude || !this.href.match(promptExclude)) {
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
        let $links_to_process;
        if (config.extImgClass) {
            $links_to_process = $(links);
        } else {
            const links_with_images = $(links)
                .find('img')
                .parents('a');
            $links_to_process = $(links).not(links_with_images);
        }
        $links_to_process.addClass(class_name);
        let i;
        const { length } = $links_to_process;
        for (i = 0; i < length; i++) {
            const $link = $($links_to_process[i]);
            if (
                $link.css('display') === 'inline' ||
                $link.css('display') === 'inline-block' ||
                $link.css('display') === 'block'
            ) {
                if (config.extSpanClass && config.extSpanClass.length > 0) {
                    if (config.extSpanClass === config.mailtoClass) {
                        $link.append(
                            `<span class="${
                                config.extSpanClass
                            }"><span class="element-invisible sr-only"> ${
                                config.mailtoLabel
                            }</span></span>`
                        );
                    } else {
                        $link.append(
                            `<span class="${
                                config.extSpanClass
                            }"><span class="element-invisible sr-only"> ${
                                config.extLabel
                            }</span></span>`
                        );
                    }
                }
            }
        }
    }

    return { attach };
};
