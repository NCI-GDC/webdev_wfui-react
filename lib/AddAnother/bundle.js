'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reducers = require('../../src/AddAnother/reducers/reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _add_another = require('../../src/AddAnother/add_another.js');

var _add_another2 = _interopRequireDefault(_add_another);

var _input_field = require('../../src/InputField/input_field');

var _input_field2 = _interopRequireDefault(_input_field);

var _grid = require('../../src/Grid/grid');

var _grid2 = _interopRequireDefault(_grid);

var _selection = require('../../src/Selection/selection');

var _selection2 = _interopRequireDefault(_selection);

var _description = require('../../src/Description/description');

var _description2 = _interopRequireDefault(_description);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AddAnotherReducer = _reducers2.default.AddAnotherReducer;

var css = require('../../dist/wfui.bundle.css');
var Component = _react2.default.Component;


_reactDom2.default.render(_react2.default.createElement(
  _reactRedux.Provider,
  { store: (0, _redux.createStore)(AddAnotherReducer) },
  _react2.default.createElement(
    _add_another2.default,
    { label: 'Add Another Example 1', buttonLabel: 'Add another medication', tableLabel: 'Medication' },
    _react2.default.createElement(_input_field2.default, { type: 'text', name: 'input1', label: 'Name of Medication:' }),
    _react2.default.createElement(_input_field2.default, { type: 'text', name: 'input1', label: 'Drug Identification Number (DIN):' })
  )
), document.getElementById('app1'));

_reactDom2.default.render(_react2.default.createElement(
  _reactRedux.Provider,
  { store: (0, _redux.createStore)(AddAnotherReducer) },
  _react2.default.createElement(
    _add_another2.default,
    { label: 'Add Another Example 2', buttonLabel: 'Add another type', tableLabel: 'Cancer Type', description: _react2.default.createElement(_description2.default, { type: 'theme-blue', content: '<div><b>Before you begin</b><ol><li>Adjust your scale to zero</li><li>Weigh yourself with your clothes off, or wear light clothing. Remember to remove your shoes</li><li>Step on the scale. Make sure both feet are fully on the scale.</li></ol></div>' }) },
    _react2.default.createElement(
      _grid2.default,
      {
        label: '1. Have you ever used any hormonal contraceptives for any reason?',
        description: _react2.default.createElement(_description2.default, { content: 'Full time means 30 hours or more per week. Part time means less than 30 hours per week.' }),
        columnNumber: 4 },
      _react2.default.createElement(_selection2.default, { type: 'radio', label: 'Full-time employed / self-employed', name: 'radio', value: '1' }),
      _react2.default.createElement(_selection2.default, { type: 'radio', label: 'Part-time employed / self-employed', name: 'radio', value: '2' }),
      _react2.default.createElement(_selection2.default, { type: 'radio', label: 'Retired', name: 'radio', value: '3' }),
      _react2.default.createElement(_selection2.default, { type: 'radio', label: 'Looking after home and/or family', name: 'radio', value: '4' }),
      _react2.default.createElement(_selection2.default, { type: 'radio', label: 'Unable to work because of sickness', name: 'radio', value: '5' }),
      _react2.default.createElement(_selection2.default, { type: 'radio', label: 'Unemployed', name: 'radio', value: '6' }),
      _react2.default.createElement(_selection2.default, { type: 'radio', label: 'Doing unpaid or voluntary work', name: 'radio', value: '7' }),
      _react2.default.createElement(_selection2.default, { type: 'radio', label: 'Student', name: 'radio', value: '8' })
    )
  )
), document.getElementById('app2'));