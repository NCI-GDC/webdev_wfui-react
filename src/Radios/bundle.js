import React from 'react';
import ReactDOM from 'react-dom';
import Radios from '../../src/Radios/radios';
import Radio from '../../src/Radios/radio';
import InputField from '../../src/InputField/input_field';
import InputTable from '../../src/InputTable/input_table';
const css = require('../../dist/bundle.css');

ReactDOM.render(
    <Radios label="8. Over the last 2 weeks, how often have you been bothered by the following problems?" columnNumber={2} >
        <Radio label="Label 1" name="test" value="1" defaultChecked={true} />
        <Radio label="Label 2" name="test" value="1">
            <InputTable fieldLabel='Enter your Weight:' fieldType='and' >
                <InputField type="text" suffix="pounds" />
                <InputField type="text" suffix="kilograms" />
            </InputTable>
        </Radio>
        <Radio label="Label 3" name="test" value="1" />
    </Radios>,
document.getElementById('app'));