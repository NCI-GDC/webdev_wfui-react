import React from 'react';
import ReactDOM from 'react-dom';
import InputField from '../../src/InputField/input_field';

ReactDOM.render( <InputField type="text" label="Type Text" />, document.getElementById('input1'));
ReactDOM.render( <InputField type="email" label="Type Email" />, document.getElementById('input2'));
ReactDOM.render( <InputField type="number" label="Type Number" />, document.getElementById('input3'));