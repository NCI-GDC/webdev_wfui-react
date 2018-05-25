'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.renderTextFilter = exports.renderDateFilter = exports.renderSelectFilter = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Reusable field component.
 */
/* eslint react/prop-types : 0 */
var renderSelectFilter = exports.renderSelectFilter = function renderSelectFilter(_ref) {
    var name = _ref.name,
        category = _ref.category,
        onHandleChange = _ref.onHandleChange,
        items = _ref.items,
        capitalize = _ref.capitalize;
    return _react2.default.createElement(
        _index.FormControl,
        {
            name: name,
            id: name,
            componentClass: 'select',
            onChange: onHandleChange,
            value: category && category[name] || '',
            selected: category && category[name] || ''
        },
        items.map(function (item, idx) {
            return _react2.default.createElement(
                'option',
                {
                    key: idx,
                    value: idx === 0 ? item.value || '' : item.value || item,
                    className: capitalize ? 'text-capitalize' : ''
                },
                item.label || item
            );
        })
    );
};

var renderDateFilter = exports.renderDateFilter = function renderDateFilter(_ref2) {
    var name = _ref2.name,
        category = _ref2.category,
        onHandleChange = _ref2.onHandleChange;
    return _react2.default.createElement(_index.FormControl, {
        type: 'date',
        name: name,
        id: name,
        value: category && category[name] || '',
        onChange: onHandleChange
    });
};

var renderTextFilter = exports.renderTextFilter = function renderTextFilter(_ref3) {
    var name = _ref3.name,
        category = _ref3.category,
        onHandleChange = _ref3.onHandleChange,
        placeholder = _ref3.placeholder;

    var value = category && category[name] || '';
    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_index.FormControl, {
            type: 'text',
            name: name,
            id: name,
            value: value,
            onChange: onHandleChange,
            placeholder: placeholder || ''
        }),
        value && _react2.default.createElement(_index.Glyphicon, {
            glyph: 'remove-circle',
            bsSize: 'xsmall',
            onClick: onHandleChange
        })
    );
};