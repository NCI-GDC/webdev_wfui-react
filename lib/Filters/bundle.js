'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _filters = require('../../src/Filters/filters');

var _filters2 = _interopRequireDefault(_filters);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _data = require('./reducers/data');

var _data2 = _interopRequireDefault(_data);

var _visibility_filter = require('./reducers/visibility_filter');

var _visibility_filter2 = _interopRequireDefault(_visibility_filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Faker = require('faker');
var data = [];
for (var i = 0; i < 100; i++) {
    var person = {};
    person.name = { fname: Faker.name.firstName(), lname: Faker.name.lastName() };
    person.age = Faker.random.number({ max: 100, min: 0 });
    person.company = Faker.company.companyName();
    data.push(person);
}

var filtersReducers = (0, _redux.combineReducers)({
    dataReducer: _data2.default,
    visibilityFilterReducer: _visibility_filter2.default
});

_reactDom2.default.render(_react2.default.createElement(
    _reactRedux.Provider,
    { store: (0, _redux.createStore)(filtersReducers, { visibilityFilterReducer: { companyFilter: "" }, dataReducer: data }, window.devToolsExtension && window.devToolsExtension()) },
    _react2.default.createElement(_filters2.default, { data: [] })
), document.getElementById('filters'));