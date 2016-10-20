'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _selection = require('../../src/Selection/selection');

var _selection2 = _interopRequireDefault(_selection);

var _grid = require('../../src/Grid/grid');

var _grid2 = _interopRequireDefault(_grid);

var _description = require('../../src/Description/description');

var _description2 = _interopRequireDefault(_description);

var _input_field = require('../../src/InputField/input_field');

var _input_field2 = _interopRequireDefault(_input_field);

var _input_table = require('../../src/InputTable/input_table');

var _input_table2 = _interopRequireDefault(_input_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var css = require('../../dist/wfui.bundle.css');

_reactDom2.default.render(_react2.default.createElement(
    _grid2.default,
    {
        label: '8. Over the last 2 weeks, how often have you been bothered by the following problems?',
        description: _react2.default.createElement(_description2.default, { type: 'theme-blue', content: 'Please choose the ONE that best describes your current situation.' }),
        columnNumber: 3,
        errors: true },
    _react2.default.createElement(_selection2.default, { type: 'radio', label: 'Married and/or living with a partner', name: 'radios1', value: '1', defaultChecked: true }),
    _react2.default.createElement(_selection2.default, { type: 'radio', label: 'Divored', name: 'radios1', value: '2' }),
    _react2.default.createElement(_selection2.default, { type: 'radio', label: 'Widowed', name: 'radios1', value: '3' }),
    _react2.default.createElement(_selection2.default, { type: 'radio', label: 'Separated', name: 'radios1', value: '4' }),
    _react2.default.createElement(_selection2.default, { type: 'radio', label: 'Single, never married', name: 'radios1', value: '5' }),
    _react2.default.createElement(_selection2.default, { type: 'radio', label: 'Widowed', name: 'radios1', value: '6' }),
    _react2.default.createElement(_selection2.default, { type: 'radio', label: 'Separated', name: 'radios1', value: '7' }),
    _react2.default.createElement(_selection2.default, { type: 'radio', label: 'Single, never married', name: 'radios1', value: '8' }),
    _react2.default.createElement(_selection2.default, { type: 'radio', label: 'Widowed', name: 'radios1', value: '9' }),
    _react2.default.createElement(_selection2.default, { type: 'radio', label: 'Separated', name: 'radios1', value: '10' }),
    _react2.default.createElement(_selection2.default, { type: 'radio', label: 'Single, never married', name: 'radios1', value: '11' }),
    _react2.default.createElement(_selection2.default, { type: 'radio', label: 'Widowed', name: 'radios1', value: '12' }),
    _react2.default.createElement(_selection2.default, { type: 'radio', label: 'Separated', name: 'radios1', value: '13' }),
    _react2.default.createElement(_selection2.default, { type: 'radio', label: 'Single, never married', name: 'radios1', value: '14' })
), document.getElementById('selection1'));

_reactDom2.default.render(_react2.default.createElement(
    _grid2.default,
    {
        label: '1. Have you ever used any hormonal contraceptives for any reason?',
        description: _react2.default.createElement(_description2.default, { type: 'theme-purple', content: 'Full time means 30 hours or more per week. Part time means less than 30 hours per week.' }),
        columnNumber: 4 },
    _react2.default.createElement(_selection2.default, { type: 'checkbox', label: 'Full-time employed / self-employed', name: 'checkbox[]', value: '1' }),
    _react2.default.createElement(_selection2.default, { type: 'checkbox', label: 'Part-time employed / self-employed', name: 'checkbox[]', value: '2' }),
    _react2.default.createElement(_selection2.default, { type: 'checkbox', label: 'Retired', name: 'checkbox[]', value: '3' }),
    _react2.default.createElement(_selection2.default, { type: 'checkbox', label: 'Looking after home and/or family', name: 'checkbox[]', value: '4' }),
    _react2.default.createElement(_selection2.default, { type: 'checkbox', label: 'Unable to work because of sickness', name: 'checkbox[]', value: '5' }),
    _react2.default.createElement(_selection2.default, { type: 'checkbox', label: 'Unemployed', name: 'checkbox[]', value: '6' }),
    _react2.default.createElement(_selection2.default, { type: 'checkbox', label: 'Doing unpaid or voluntary work', name: 'checkbox[]', value: '7' }),
    _react2.default.createElement(_selection2.default, { type: 'checkbox', label: 'Student', name: 'checkbox[]', value: '8' })
), document.getElementById('selection2'));

_reactDom2.default.render(_react2.default.createElement(
    _grid2.default,
    {
        label: '1. On average, how many hours per day do you usually sleep, including naps?',
        description: _react2.default.createElement(_description2.default, { content: 'A day refers to a 24 hour period' }),
        columnNumber: 2 },
    _react2.default.createElement(
        _selection2.default,
        { type: 'radio', name: 'radios3', value: '0' },
        _react2.default.createElement(
            _input_table2.default,
            { fieldType: 'and' },
            _react2.default.createElement(_input_field2.default, { type: 'text', label: 'Hours:' }),
            _react2.default.createElement(_input_field2.default, { type: 'text', label: 'Minutes:' })
        )
    ),
    _react2.default.createElement(
        _selection2.default,
        { type: 'radio', label: 'Don\'t know', name: 'radios3', value: '1' },
        _react2.default.createElement(_input_field2.default, { type: 'text', label: 'Minutes:' })
    )
), document.getElementById('selection3'));

_reactDom2.default.render(_react2.default.createElement(
    _grid2.default,
    {
        label: '1. On average, how many hours per day do you usually sleep, including naps?',
        description: _react2.default.createElement(_description2.default, { content: 'A day refers to a 24 hour period' }),
        columnNumber: 2 },
    _react2.default.createElement(
        _selection2.default,
        { type: 'checkbox', name: 'radios3', value: '0' },
        _react2.default.createElement(
            _input_table2.default,
            { fieldType: 'and' },
            _react2.default.createElement(_input_field2.default, { type: 'text', label: 'Hours:' }),
            _react2.default.createElement(_input_field2.default, { type: 'text', label: 'Minutes:' })
        )
    ),
    _react2.default.createElement(
        _selection2.default,
        { type: 'checkbox', label: 'Don\'t know', name: 'radios3', value: '1' },
        _react2.default.createElement(_input_field2.default, { type: 'text', label: 'Minutes:' })
    )
), document.getElementById('selection4'));