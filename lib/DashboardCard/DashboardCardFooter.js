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

var DashboardCardFooter = function DashboardCardFooter(_ref) {
    var role = _ref.role,
        className = _ref.className,
        children = _ref.children;

    if (!children) return null;

    var elems = [];
    if (Array.isArray(children)) {
        children.forEach(function (item) {
            if (Array.isArray(item)) {
                item.forEach(function (i) {
                    return elems.push(i);
                });
            } else {
                elems.push(item);
            }
        });
    } else {
        elems.push(children);
    }

    return _react2.default.createElement(
        'div',
        { role: role, className: (0, _classnames2.default)(className, 'form-box-footer') },
        _react2.default.createElement(
            'ul',
            { className: 'form-box-links' },
            elems && elems.map(function (elem, key) {
                return _react2.default.createElement(
                    'li',
                    { key: key },
                    (0, _react.cloneElement)(elem)
                );
            })
        )
    );
};

DashboardCardFooter.propTypes = {
    children: _propTypes2.default.node,
    className: _propTypes2.default.string,
    role: _propTypes2.default.string
};

DashboardCardFooter.defaultProps = {
    role: 'footer',
    hover: false
};

exports.default = DashboardCardFooter;