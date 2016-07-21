import React from 'react';
import ReactDOM from 'react-dom';
import Selection from '../../src/Selection/selection';
import Grid from '../../src/Grid/grid';
import Description from '../../src/Description/description';
import InputField from '../../src/InputField/input_field';
import InputTable from '../../src/InputTable/input_table';
const css = require('../../dist/wfui.bundle.css');

ReactDOM.render(
    <Grid 
        label="8. Over the last 2 weeks, how often have you been bothered by the following problems?" 
        description={<Description type="theme-blue" content="Please choose the ONE that best describes your current situation." />}
        columnNumber={3} 
        errors={true}>
        <Selection type="radio" label="Married and/or living with a partner" name="radios1" value="1" defaultChecked={true} />
        <Selection type="radio" label="Divored" name="radios1" value="2" />
        <Selection type="radio" label="Widowed" name="radios1" value="3" />
        <Selection type="radio" label="Separated" name="radios1" value="4" />
        <Selection type="radio" label="Single, never married" name="radios1" value="5" />
        <Selection type="radio" label="Widowed" name="radios1" value="6" />
        <Selection type="radio" label="Separated" name="radios1" value="7" />
        <Selection type="radio" label="Single, never married" name="radios1" value="8" />
        <Selection type="radio" label="Widowed" name="radios1" value="9" />
        <Selection type="radio" label="Separated" name="radios1" value="10" />
        <Selection type="radio" label="Single, never married" name="radios1" value="11" />
        <Selection type="radio" label="Widowed" name="radios1" value="12" />
        <Selection type="radio" label="Separated" name="radios1" value="13" />
        <Selection type="radio" label="Single, never married" name="radios1" value="14" />
    </Grid>,
document.getElementById('selection1'));


ReactDOM.render(
    <Grid
        label="1. Have you ever used any hormonal contraceptives for any reason?"
        description={<Description type="theme-purple" content="Full time means 30 hours or more per week. Part time means less than 30 hours per week." />}
        columnNumber={4}>
        <Selection type="checkbox" label="Full-time employed / self-employed" name="checkbox[]" value="1" />
        <Selection type="checkbox" label="Part-time employed / self-employed" name="checkbox[]" value="2" />
        <Selection type="checkbox" label="Retired" name="checkbox[]" value="3" />
        <Selection type="checkbox" label="Looking after home and/or family" name="checkbox[]" value="4" />
        <Selection type="checkbox" label="Unable to work because of sickness" name="checkbox[]" value="5" />
        <Selection type="checkbox" label="Unemployed" name="checkbox[]" value="6" />
        <Selection type="checkbox" label="Doing unpaid or voluntary work" name="checkbox[]" value="7" />
        <Selection type="checkbox" label="Student" name="checkbox[]" value="8" />
    </Grid>,
document.getElementById('selection2'));


ReactDOM.render(
    <Grid
        label="1. On average, how many hours per day do you usually sleep, including naps?"
        description={<Description content="A day refers to a 24 hour period" />}
        columnNumber={2} >
        <Selection type="radio" name="radios3" value="0">
            <InputTable fieldType='and' >
                <InputField type="text" label="Hours:" />
                <InputField type="text" label="Minutes:" />
            </InputTable>
        </Selection>
        <Selection type="radio" label="Don't know" name="radios3" value="1">
            <InputField type="text" label="Minutes:" />
        </Selection>
    </Grid>,
document.getElementById('selection3'));


ReactDOM.render(
    <Grid
        label="1. On average, how many hours per day do you usually sleep, including naps?"
        description={<Description content="A day refers to a 24 hour period" />}
        columnNumber={2} >
        <Selection type="checkbox" name="radios3" value="0">
            <InputTable fieldType='and' >
                <InputField type="text" label="Hours:" />
                <InputField type="text" label="Minutes:" />
            </InputTable>
        </Selection>
        <Selection type="checkbox" label="Don't know" name="radios3" value="1">
            <InputField type="text" label="Minutes:" />
        </Selection>
    </Grid>,
document.getElementById('selection4'));