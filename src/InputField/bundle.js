import React from 'react';
import ReactDOM from 'react-dom';
import InputField from '../../src/InputField/input_field';
const css = require('../../dist/wfui_bundle.css');

ReactDOM.render( <InputField type="text" name="input1" label="Type Text:" />, document.getElementById('input1'));
ReactDOM.render( <InputField type="email" name="input2" label="Type Email:" />, document.getElementById('input2'));
ReactDOM.render( <InputField type="number" name="input3" label="Type Number:" />, document.getElementById('input3'));
ReactDOM.render( <InputField label="Enter your weight:" postfix="pounds" />, document.getElementById('input4'));
