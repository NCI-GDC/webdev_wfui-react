import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import TestUtils from 'react-addons-test-utils';
import InputField from '../../src/InputField/input_field';

describe('InputField', () => {
  let comp;

  beforeEach(() => {
    comp = TestUtils.renderIntoDocument(<InputField defaultValue="this is test" />)
  });

  it('receives props properly', () => {
    var input = TestUtils.findRenderedDOMComponentWithTag(comp, 'input');
    expect(input.value).to.equal('this is test');
  });

  it('changes value properly', () => {
    var { Simulate } = TestUtils;
    var input = TestUtils.findRenderedDOMComponentWithTag(comp, 'input')
    var inputNode = ReactDOM.findDOMNode(input)
    inputNode.value = 'this is new text';
    Simulate.change(inputNode);
    expect(input.value).to.equal('this is new text');
  });
});
