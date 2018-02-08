'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DashboardCardBody = function DashboardCardBody(_ref) {
    var role = _ref.role,
        className = _ref.className,
        children = _ref.children,
        isList = _ref.isList,
        items = _ref.items,
        itemDisplay = _ref.itemDisplay;
    return isList ? _react2.default.createElement(
        'div',
        { role: role, className: (0, _classnames2.default)(className, 'form-box-body') },
        _react2.default.createElement(
            'ul',
            { className: 'form-box-body-list' },
            Array.isArray(items) && itemDisplay && items.map(function (item, key) {
                return _react2.default.createElement(
                    'li',
                    { key: key },
                    (0, _react.cloneElement)(itemDisplay, { item: item })
                );
            })
        )
    ) : _react2.default.createElement(
        'div',
        { role: role, className: (0, _classnames2.default)(className, 'form-box-body') },
        children
    );
};

DashboardCardBody.propTypes = {
    children: _propTypes2.default.node,
    className: _propTypes2.default.string,
    role: _propTypes2.default.string,
    isList: _propTypes2.default.bool,
    items: _propTypes2.default.array,
    itemDisplay: _propTypes2.default.element
};

DashboardCardBody.defaultProps = {
    role: 'body',
    isList: false
};

exports.default = DashboardCardBody;