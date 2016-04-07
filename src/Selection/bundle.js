import React from 'react';
import ReactDOM from 'react-dom';
import Selection from '../../src/Selection/selection';
import InputTable from '../../src/InputTable/input_table';
import InputField from '../../src/InputField/input_field';
const css = require('../../dist/wfui_bundle.css');

ReactDOM.render(
    <Selection label="Single, never married" name="selection1" value="5" />,
document.getElementById('selection1'));

ReactDOM.render(
    <Selection label="Single, never married" name="selection1" value="5">
        <InputTable fieldType='and' >
            <InputField type="text" label="Hours:" />
            <InputField type="text" label="Minutes:" />
        </InputTable>
    </Selection>,
document.getElementById('selection2'));

ReactDOM.render(
    <Selection label="Single, never married" name="selection2" value="5" type="checkbox"/>,
document.getElementById('selection3'));

ReactDOM.render(
    <Selection label="Single, never married" name="selection2" value="5" type="checkbox">
        <InputTable fieldType='and' >
            <InputField type="text" label="Hours:" />
            <InputField type="text" label="Minutes:" />
        </InputTable>
    </Selection>,
document.getElementById('selection4'));