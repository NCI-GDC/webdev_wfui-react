import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import InputField from '../../src/InputField/input_field';


describe('InputField', () => {
  let renderer;

  beforeEach(() => {
    renderer = TestUtils.createRenderer();
    renderer.render(
      <InputField value="test" />
    );
  });

  it('write a test please', () => {
    expect(true).to.be.true;
  });
});
