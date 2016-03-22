import React, { Component } from 'react';

export default class AutoTextLink extends Component {
  extractUrls(text) {
    const urlPattern = /https?:\/\/[^\s]+/g
    return text.match(urlPattern); 
  }

  replaceUrls(text, urls, linkProps) {
    let subtractedText = text;
    let elements = [];
    urls.forEach((url, i) => {
      const startIndex = subtractedText.indexOf(url);
      const endIndex = startIndex + url.length;
      const beforeUrlText = subtractedText.substring(0, startIndex);
      elements.push(beforeUrlText);
      elements.push(<a key={i} {...linkProps} href={url}>{url}</a>);
      subtractedText = subtractedText.substring(endIndex);
    });
    if(subtractedText) {
      elements.push(subtractedText);
    }
    return elements;
  }

  render() {
    const text = this.props.children;
    const urls = this.extractUrls(text);
    const {target, className} = this.props;
    const linkProps = {
      target,
      className
    };

    return <span>{this.replaceUrls(text, urls, linkProps)}</span>;
  }
}
