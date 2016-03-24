import React from 'react';
import ReactDOM from 'react-dom';
import InputField from '../../src/InputField/input_field';
import InputTable from '../../src/InputTable/input_table';

let config = {
    label: "1. What is your weight measurement?",
    description: (
        <div>
            <p>Before you begin:</p>
            <ol>
            <li>Adjust your scale to zero</li>
            <li>Weigh your self with your clothes off, or wear light clothing. Remember to remove your shoe</li>
            <li>Step on the scale. Make sure both feet oare fully on the scale</li>
            </ol>
        </div>
    ),
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