'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SearchBox = function SearchBox(_ref) {
    var value = _ref.value,
        onInputChange = _ref.onInputChange,
        onSearchSubmit = _ref.onSearchSubmit,
        onReset = _ref.onReset,
        textSubmit = _ref.textSubmit,
        placeholder = _ref.placeholder;
    return _react2.default.createElement(
        'form',
        { id: 'cbw-search-jobs', className: 'form-inline webform-search' },
        _react2.default.createElement(
            'div',
            { className: 'form-group' },
            _react2.default.createElement('input', {
                type: 'text',
                className: 'form-control',
                id: 'search-jobs-keyword',
                placeholder: placeholder,
                value: value,
                onChange: onInputChange,
                autoComplete: 'off'
            })
        ),
        value && _react2.default.createElement(
            'a',
            { className: 'search-reset', onClick: onReset },
            _react2.default.createElement(
                'span',
                { className: 'sr-only' },
                'Reset'
            )
        ),
        ' ',
        _react2.default.createElement(
            'button',
            { type: 'submit', className: 'btn btn-primary', onClick: onSearchSubmit },
            textSubmit
        )
    );
};

SearchBox.propTypes = {
    value: _propTypes2.default.string,
    onInputChange: _propTypes2.default.func,
    onSearchSubmit: _propTypes2.default.func,
    onReset: _propTypes2.default.func,
    textSubmit: _propTypes2.default.string,
    placeholder: _propTypes2.default.string
};

SearchBox.defaultProps = {
    value: '',
    onInputChange: function onInputChange(f) {
        return f;
    },
    onSearchSubmit: function onSearchSubmit(f) {
        return f;
    },
    OnReset: function OnReset(f) {
        return f;
    },
    intl: function intl(f) {
        return f;
    },
    textSubmit: 'Search',
    placeholder: ''
};

exports.default = SearchBox;