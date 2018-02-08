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

var DashboardCardHeader = function DashboardCardHeader(_ref) {
    var role = _ref.role,
        className = _ref.className,
        children = _ref.children;
    return _react2.default.createElement(
        'div',
        { role: role, className: (0, _classnames2.default)(className, 'form-box-header') },
        _react2.default.createElement(
            'div',
            { className: 'form-box-header-box' },
            children
        )
    );
};

DashboardCardHeader.propTypes = {
    children: _propTypes2.default.node,
    className: _propTypes2.default.string,
    role: _propTypes2.default.string
};

DashboardCardHeader.defaultProps = {
    role: 'header',
    hover: false
};

exports.default = DashboardCardHeader;