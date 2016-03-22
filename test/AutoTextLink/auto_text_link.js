import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import AutoTextLink from '../../src/AutoTextLink/auto_text_link';


describe('AutoTextLink', () => {
  let text;
  let url;
  let renderer;

  beforeEach(() => {
    url = 'https://github.com/hokuma';
    text = `Url ${url} Not Url`;
    renderer = TestUtils.createRenderer();
    renderer.render(
      <AutoTextLink className='link' target='_blank'>{text}</AutoTextLink>
    );
  });

  it('renders url as text link', () => {
    let result = renderer.getRenderOutput();
    let expectedProps = {
      key: 0,
      className: 'link',
      target: '_blank'
    };
    expect(result.props.children).to.eql(
      ['Url ', <a {...expectedProps} href={url}>{url}</a>, ' Not Url'] 
    );
  });
});
