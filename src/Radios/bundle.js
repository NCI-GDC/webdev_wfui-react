import React from 'react';
import ReactDOM from 'react-dom';
import Radios from '../../src/Radios/radios';
import Radio from '../../src/Radios/radio';
import Description from '../../src/Description/description';
import InputField from '../../src/InputField/input_field';
import InputTable from '../../src/InputTable/input_table';
const css = require('../../dist/bundle.css');

ReactDOM.render(
    <Radios 
        label="8. Over the last 2 weeks, how often have you been bothered by the following problems?" 
        description={<Description content="Please choose the ONE that best describes your current situation." />}
        columnNumber={2} >
        <Radio label="Married and/or living with a partner" name="radios1" value="1" defaultChecked={true} />
        <Radio label="Divored" name="radios1" value="2" />
        <Radio label="Widowed" name="radios1" value="3" />
        <Radio label="Separated" name="radios1" value="4" />
        <Radio label="Single, never married" name="radios1" value="5" />
    </Radios>,
document.getElementById('radios1'));


ReactDOM.render(
    <Radios
        label="1. Have you ever used any hormonal contraceptives for any reason?"
        description={<Description content="Hormonal contraceptives include birth control pills, implants, patches, injections, and rings or intra uterine devices that release female hormones." />}
        columnNumber={3}>
        <Radio label="Yes" name="radios2" value="1" defaultChecked={true} />
        <Radio label="No" name="radios2" value="2" />
        <Radio label="Don't know" name="radios2" value="3" />
    </Radios>,
document.getElementById('radios2'));


ReactDOM.render(
    <Radios
        label="1. On average, how many hours per day do you usually sleep, including naps?"
        description={<Description content="A day refers to a 24 hour period" />}
        columnNumber={2} >
        <Radio name="radios3" value="0">
            <InputTable fieldType='and' >
                <InputField type="text" label="Hours:" />
                <InputField type="text" label="Minutes:" />
            </InputTable>
        </Radio>
        <Radio label="Don't know" name="radios3" value="1" />
    </Radios>,
document.getElementById('radios3'));