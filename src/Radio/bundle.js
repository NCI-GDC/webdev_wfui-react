import React from 'react';
import ReactDOM from 'react-dom';
import Radio from '../../src/Radio/radio';
import InputTable from '../../src/InputTable/input_table';
import InputField from '../../src/InputField/input_field';
const css = require('../../dist/bundle.css');

ReactDOM.render(
    <Radio label="Single, never married" name="radios1" value="5" />,
document.getElementById('radio1'));

ReactDOM.render(
    <Radio label="Single, never married" name="radios1" value="5">
        <InputTable fieldType='and' >
            <InputField type="text" label="Hours:" />
            <InputField type="text" label="Minutes:" />
        </InputTable>
    </Radio>,
document.getElementById('radio2'));