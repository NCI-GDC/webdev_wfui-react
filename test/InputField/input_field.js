import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'mocha-jsdom';
import { expect } from 'chai';
import InputField from '../../src/InputField/input_field';


describe('InputField', () => {
  let renderer;
  jsdom();

  it('have default value', () => {
    const field = TestUtils.renderIntoDocument(
      <InputField defaultValue="this is test" />
    );
    const fieldNode = ReactDOM.findDOMNode(field);
    expect(fieldNode.value).toEqual('this is test');

  });
});
