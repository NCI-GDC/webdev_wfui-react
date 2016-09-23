import React from 'react';

export default class Twitter extends React.Component{
    constructor(props){
        const script = document.createElement('script');
        script.src = 'http://platform.twitter.com/widgets.js';
        script.async = true;
        document.body.appendChild(script);

        super(props);
    }
    render(){
        const {twitterAccount, limit} = this.props;
        const urlSafeTwitter = encodeURIComponent(twitterAccount);
        const twitterLink = `https://twitter.com/${urlSafeTwitter}`;
        return (
            <div>
                <h2 className="title block-title blog-title twitter">
                    Twitter: <a href={twitterLink}>@{twitterAccount}</a>
                </h2>
                <a
                    className="twitter-timeline"
                    data-dnt="true"
                    data-chrome="noheader nofooter"
                    data-tweet-limit={limit}
                    href={twitterLink}>
                </a>
                <div className="view-all-link">
                    <a href={twitterLink}>Follow on Twitter</a>
                </div>
            </div>
        )
    }
}
