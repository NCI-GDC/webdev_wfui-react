import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import TwitterFeed from '../src/TwitterFeed/TwitterFeed';

storiesOf('TwitterFeed', module)
  .addWithInfo(
    'default view', 
    () => (
        <TwitterFeed twitterAccount="GA4GH" />
    ),
    { inline: true },
).addWithInfo(
    'Limited to 2 Tweets', 
    () => (
        <TwitterFeed limit="2" twitterAccount="GA4GH" />
    ),
    { inline: true },
).addWithInfo(
    'French Language', 
    () => (
        <TwitterFeed language="fr" twitterAccount="GA4GH" />
    ),
    { inline: true },
);