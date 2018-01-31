'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Card = require('../Card/Card');

var _Card2 = _interopRequireDefault(_Card);

var _stringifyValues = require('../util/stringifyValues');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DashboardCardBody = function DashboardCardBody(_ref) {
    var role = _ref.role,
        className = _ref.className,
        children = _ref.children;
    return _react2.default.createElement(
        'div',
        { role: role, className: (0, _classnames2.default)(className, 'form-box-body') },
        children
    );
};

DashboardCardBody.propTypes = {
    children: _propTypes2.default.node,
    className: _propTypes2.default.string,
    role: _propTypes2.default.string
};

DashboardCardBody.defaultProps = {
    role: 'body',
    hover: false
};

var DashboardCardFooter = function DashboardCardFooter(_ref2) {
    var role = _ref2.role,
        className = _ref2.className,
        children = _ref2.children;
    return children ? _react2.default.createElement(
        'div',
        { role: role, className: (0, _classnames2.default)(className, 'form-box-footer') },
        _react2.default.createElement(
            'ul',
            { className: 'form-box-links' },
            Array.isArray(children) && children.map(function (child, key) {
                return _react2.default.createElement(
                    'li',
                    { key: key },
                    (0, _react.cloneElement)(child)
                );
            }) || _react2.default.createElement(
                'li',
                null,
                (0, _react.cloneElement)(children)
            )
        )
    ) : null;
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

var DashboardCardFilterData = function DashboardCardFilterData(_ref3) {
    var role = _ref3.role,
        data = _ref3.data;
    return _react2.default.createElement(
        'span',
        { role: role, className: 'hide isotope-search', 'aria-hidden': 'true', hidden: true },
        (0, _stringifyValues.stringifyValues)(data)
    );
};

DashboardCardFilterData.propTypes = {
    role: _propTypes2.default.string,
    data: _propTypes2.default.object
};

DashboardCardFilterData.defaultProps = {
    role: 'filterData'
};

var BODY_ROLE = DashboardCardBody.defaultProps.role;
var FOOTER_ROLE = DashboardCardFooter.defaultProps.role;

var DashboardCard = function (_React$Component) {
    _inherits(DashboardCard, _React$Component);

    function DashboardCard() {
        _classCallCheck(this, DashboardCard);

        return _possibleConstructorReturn(this, (DashboardCard.__proto__ || Object.getPrototypeOf(DashboardCard)).apply(this, arguments));
    }

    _createClass(DashboardCard, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                children = _props.children,
                data = _props.data,
                style = _props.style;


            return _react2.default.createElement(
                _Card2.default,
                { className: (0, _classnames2.default)(className, 'form-box-container'), cardStyle: style },
                _react2.default.createElement(
                    _Card2.default.Body,
                    { className: 'form-box' },
                    children && (Array.isArray(children) && children.map(function (child, key) {
                        switch (child.props.role) {
                            case BODY_ROLE:
                            case FOOTER_ROLE:
                                return (0, _react.cloneElement)(child, { key: key });
                            default:
                                return child;
                        }
                    }) || (0, _react.cloneElement)(children)),
                    data && _react2.default.createElement(DashboardCardFilterData, { data: data })
                )
            );
        }
    }]);

    return DashboardCard;
}(_react2.default.Component);

DashboardCard.propTypes = {
    children: _propTypes2.default.node,
    className: _propTypes2.default.string,
    data: _propTypes2.default.object,
    style: _propTypes2.default.object
};

DashboardCard.Body = DashboardCardBody;
DashboardCard.Footer = DashboardCardFooter;

exports.default = DashboardCard;