import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import anothersReducer from '../../src/AddAnother/reducers/reducers';
import AnotherTable from '../../src/AddAnother/add_another.js';
const css = require('../../dist/bundle.css');
import InputField from '../../src/InputField/input_field';
import Grid from '../../src/Grid/grid';
import Selection from '../../src/Selection/selection';
import Description from '../../src/Description/description';

const { Component } = React;

ReactDOM.render(
  <Provider store={createStore(anothersReducer)}>
    <AnotherTable label="Medication" buttonLabel="Add another medication" >
        <div>
            <InputField type="text" name="input1" label="Name of Medication:" />
            <InputField type="text" name="input1" label="Drug Identification Number (DIN):" />
        </div>
    </AnotherTable>
  </Provider>,
  document.getElementById('app1')
);

ReactDOM.render(
  <Provider store={createStore(anothersReducer)}>
    <AnotherTable label="Cancer Type" buttonLabel="Add another type">
        <Grid
            label="1. Have you ever used any hormonal contraceptives for any reason?"
            description={<Description content="Full time means 30 hours or more per week. Part time means less than 30 hours per week." />}
            columnNumber={4}>
            <Selection type="checkbox" label="Full-time employed / self-employed" name="checkbox" value="1" />
            <Selection type="checkbox" label="Part-time employed / self-employed" name="checkbox" value="2" />
            <Selection type="checkbox" label="Retired" name="checkbox" value="3" />
            <Selection type="checkbox" label="Looking after home and/or family" name="checkbox" value="4" />
            <Selection type="checkbox" label="Unable to work because of sickness" name="checkbox" value="5" />
            <Selection type="checkbox" label="Unemployed" name="checkbox" value="6" />
            <Selection type="checkbox" label="Doing unpaid or voluntary work" name="checkbox" value="7" />
            <Selection type="checkbox" label="Student" name="checkbox" value="8" />
        </Grid>
    </AnotherTable>
  </Provider>,
  document.getElementById('app2')
);