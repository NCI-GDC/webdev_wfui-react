'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _stringifyValues = require('../util/stringifyValues');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Element = function Element(props) {
    return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(props.className, 'wfui-isotope-element') },
        _react2.default.cloneElement(props.itemDisplay, Object.assign({}, props.item)),
        _react2.default.createElement(
            'span',
            { className: 'hide isotope-search', 'aria-hidden': 'true', hidden: true },
            (0, _stringifyValues.stringifyValues)(props.item)
        )
    );
};

exports.default = Element;