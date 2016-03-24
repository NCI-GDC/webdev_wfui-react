import React from 'react';
import ReactDOM from 'react-dom';
import InputField from '../../src/InputField/input_field';
import InputTable from '../../src/InputTable/input_table';
import Description from '../../src/Description/description';
require("!style!css!sass!./style.scss");

let config = {
    label: "1. What is your weight measurement?",
    description: <Description content="hello" />,
    fieldLabel: 'Enter your Weight:',
    fieldType: 'or'
}
ReactDOM.render(
    <InputTable {...config}>
        <InputField type="text" suffix="pounds" />
        <InputField type="text" suffix="kilograms" />
    </InputTable>, 
    document.getElementById('app')
);