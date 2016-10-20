import React from 'react';

class TwitterFeed extends React.Component{
    constructor(props){
        /* Dynamically insert Twitter widget into head of page */
        const script = document.createElement('script');
        script.src = '//platform.twitter.com/widgets.js';
        script.async = true;
        document.body.appendChild(script);

        super(props);
    }
    render(){
        const {twitterAccount, limit, width, height, language} = this.props;
        const urlSafeTwitter = encodeURIComponent(twitterAccount);
        const twitterLink = `https://twitter.com/${urlSafeTwitter}`;

        return (
            <div>
                <a
                    width={width}
                    height={height}
                    data-tweet-limit={limit}
                    lang={language}
                    className="twitter-timeline"
                    data-dnt="true"
                    data-chrome="noheader nofooter"
                    href={twitterLink}>
                </a>
            </div>
        )
    }
}

TwitterFeed.propTypes = {
    twitterAccount: React.PropTypes.string.isRequired,
    limit: React.PropTypes.number,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    lang: React.PropTypes.string
}

TwitterFeed.defaultProps = {
    limit: 5,
    lang: 'en',
    width: 300
};


export default TwitterFeed;