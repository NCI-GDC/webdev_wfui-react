import React from 'react';
import ReactDOM from 'react-dom';
import Filters from '../../src/Filters/filters';
import { createStore, combineReducers} from 'redux';
import { Provider } from 'react-redux';
import dataReducer from './reducers/data';
var {visibilityFilterReducer} = require('./index');

var Faker = require('faker')
var data = [];
for(var i=0; i<100; i++){
    var person = {}
    person.fname = Faker.name.firstName();
    person.lname = Faker.name.lastName();
    person.age = Faker.random.number({max:100, min:0});
    person.company = Faker.company.companyName();
    data.push(person);
}

const filtersReducers = combineReducers({
    dataReducer,
    visibilityFilterReducer
});

ReactDOM.render(
    <Provider store={ createStore(filtersReducers, {dataReducer: data} , window.devToolsExtension && window.devToolsExtension() )}>
        <Filters data={[]} />
    </Provider>,
    document.getElementById('filters')
);