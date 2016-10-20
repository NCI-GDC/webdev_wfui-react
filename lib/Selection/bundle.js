'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _selection = require('../../src/Selection/selection');

var _selection2 = _interopRequireDefault(_selection);

var _input_table = require('../../src/InputTable/input_table');

var _input_table2 = _interopRequireDefault(_input_table);

var _input_field = require('../../src/InputField/input_field');

var _input_field2 = _interopRequireDefault(_input_field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var css = require('../../dist/wfui.bundle.css');

_reactDom2.default.render(_react2.default.createElement(_selection2.default, { label: 'Single, never married', name: 'selection1', value: '2' }), document.getElementById('selection1'));

_reactDom2.default.render(_react2.default.createElement(
    _selection2.default,
    { label: 'Single, never married', name: 'selection1', value: '5' },
    _react2.default.createElement(
        _input_table2.default,
        { fieldType: 'and' },
        _react2.default.createElement(_input_field2.default, { type: 'text', label: 'Hours:' }),
        _react2.default.createElement(_input_field2.default, { type: 'text', label: 'Minutes:' })
    )
), document.getElementById('selection2'));

_reactDom2.default.render(_react2.default.createElement(_selection2.default, { label: 'Single, never married', name: 'selection2', value: '5', type: 'checkbox' }), document.getElementById('selection3'));

_reactDom2.default.render(_react2.default.createElement(
    _selection2.default,
    { label: 'Single, never married', name: 'selection2', value: '5', type: 'checkbox' },
    _react2.default.createElement(
        _input_table2.default,
        { fieldType: 'and' },
        _react2.default.createElement(_input_field2.default, { type: 'text', label: 'Hours:' }),
        _react2.default.createElement(_input_field2.default, { type: 'text', label: 'Minutes:' })
    )
), document.getElementById('selection4'));