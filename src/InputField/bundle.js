import React from 'react';
import ReactDOM from 'react-dom';
import InputField from '../../src/InputField/input_field';
import Description from '../../src/Description/description';
const css = require('../../dist/wfui.bundle.css');

ReactDOM.render( <InputField type="text" name="input1" errors={true} label="Type Text:" description={<Description content="This is description" />} />, document.getElementById('input1'));
ReactDOM.render( <InputField type="email" name="input2" label="Type Email:" />, document.getElementById('input2'));
ReactDOM.render( <InputField type="number" name="input3" errors={1} min={0} max={10} label="Type Number:" />, document.getElementById('input3'));
ReactDOM.render( <InputField label="Enter your weight:" postfix="pounds" />, document.getElementById('input4'));
