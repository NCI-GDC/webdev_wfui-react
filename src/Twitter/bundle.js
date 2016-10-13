import React from 'react';
import ReactDOM from 'react-dom';
import Twitter from '../../src/Twitter/twitter';
ReactDOM.render(
    <Twitter twitterAccount="GA4GH" />,
document.getElementById('twitter'));
ReactDOM.render(
    <Twitter twitterAccount="GA4GH" title="test" followLinkText="test" />,
document.getElementById('twitter'));