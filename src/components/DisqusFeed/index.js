import React from 'react';
import PropTypes from 'prop-types';

class DisqusFeed extends React.Component {
    constructor(props) {
        /* inserts disqus code into head or body of page */

        const disqusConfig = document.createElement('script');
        disqusConfig.innerText = 'var disqus_config = function () { this.page.url = \'' + props.pageUrl + '\'; this.page.identifier = \'' + props.pageId + '\'; };';
        (document.body || document.head).appendChild(disqusConfig);

        const disqusScript = document.createElement('script');
        disqusScript.src = 'https://' + props.siteName + '.disqus.com/embed.js';
        disqusScript.setAttribute('data-timestamp',+new Date());
        document.body.appendChild(disqusScript);

        super(props);
    }
    render() {
        return (
            <div id="disqus_thread"></div>
        )
    }
}

DisqusFeed.propTypes = {
    pageUrl: PropTypes.string.isRequired,
    pageId: PropTypes.string.isRequired,
    siteName: PropTypes.string.isRequired,
};

export default DisqusFeed;

/* pageUrl should be the canonical URL for the current page
   siteName is a name registered under your disqus account */