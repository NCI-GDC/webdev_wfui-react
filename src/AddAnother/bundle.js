import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import anothersReducers from '../../src/AddAnother/reducers/reducers';
const { AddAnotherReducer } = anothersReducers;
import AnotherTable from '../../src/AddAnother/add_another.js';
const css = require('../../dist/wfui_bundle.css');
import InputField from '../../src/InputField/input_field';
import Grid from '../../src/Grid/grid';
import Selection from '../../src/Selection/selection';
import Description from '../../src/Description/description';

const { Component } = React;

ReactDOM.render(
  <Provider store={createStore(AddAnotherReducer)}>
    <AnotherTable label="Add Another Example 1" buttonLabel="Add another medication" tableLabel="Medication">
        <InputField type="text" name="input1" label="Name of Medication:" />
        <InputField type="text" name="input1" label="Drug Identification Number (DIN):" />
    </AnotherTable>
  </Provider>,
  document.getElementById('app1')
);

ReactDOM.render(
  <Provider store={createStore(AddAnotherReducer)}>
    <AnotherTable label="Add Another Example 2" buttonLabel="Add another type" tableLabel="Cancer Type" description={<Description type="theme-blue" content="<div><b>Before you begin</b><ol><li>Adjust your scale to zero</li><li>Weigh yourself with your clothes off, or wear light clothing. Remember to remove your shoes</li><li>Step on the scale. Make sure both feet are fully on the scale.</li></ol></div>" />}>
        <Grid
            label="1. Have you ever used any hormonal contraceptives for any reason?"
            description={<Description content="Full time means 30 hours or more per week. Part time means less than 30 hours per week." />}
            columnNumber={4}>
            <Selection type="radio" label="Full-time employed / self-employed" name="radio" value="1" />
            <Selection type="radio" label="Part-time employed / self-employed" name="radio" value="2" />
            <Selection type="radio" label="Retired" name="radio" value="3" />
            <Selection type="radio" label="Looking after home and/or family" name="radio" value="4" />
            <Selection type="radio" label="Unable to work because of sickness" name="radio" value="5" />
            <Selection type="radio" label="Unemployed" name="radio" value="6" />
            <Selection type="radio" label="Doing unpaid or voluntary work" name="radio" value="7" />
            <Selection type="radio" label="Student" name="radio" value="8" />
        </Grid>
    </AnotherTable>
  </Provider>,
  document.getElementById('app2')
);