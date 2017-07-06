'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global window */
var Autocomplete = function Autocomplete(_ref) {
    var autocomplete = _ref.autocomplete,
        onClickTerm = _ref.onClickTerm,
        textNoResult = _ref.textNoResult;
    return _react2.default.createElement(
        'div',
        { className: 'navbar-form' },
        _react2.default.createElement(
            'div',
            { className: 'form-group' },
            _react2.default.createElement(
                'ul',
                { id: 'ui-autocomplete', className: 'autocomplete-ps ui-menu ui-widget ui-widget-content ui-autocomplete ui-front' },
                (!autocomplete || autocomplete.length === 0) && _react2.default.createElement(
                    'li',
                    { className: 'ui-menu-item' },
                    textNoResult
                ),
                autocomplete && autocomplete.map(function (item, idx) {
                    return _react2.default.createElement(
                        'li',
                        { key: idx, className: 'ui-menu-item' },
                        _react2.default.createElement(
                            'div',
                            { className: 'ui-menu-item-wrapper' },
                            _react2.default.createElement(
                                'a',
                                { onClick: onClickTerm, 'data-keyword': item.keyword },
                                item.keyword + ' (' + item.count + ')'
                            )
                        )
                    );
                })
            )
        )
    );
};

Autocomplete.propTypes = {
    autocomplete: _propTypes2.default.arrayOf(_propTypes2.default.shape({
        keyword: _propTypes2.default.string.isRequired,
        count: _propTypes2.default.number.isRequired
    })),
    onClickTerm: _propTypes2.default.func,
    textNoResult: _propTypes2.default.string
};

Autocomplete.defaultProps = {
    onClickTerm: function onClickTerm(f) {
        return f;
    },
    intl: function intl(f) {
        return f;
    },
    textNoResult: 'No results available'
};

exports.default = Autocomplete;