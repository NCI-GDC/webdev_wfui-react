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

var _DashboardCardTitle = require('./DashboardCardTitle');

var _DashboardCardTitle2 = _interopRequireDefault(_DashboardCardTitle);

var _DashboardCardHeader = require('./DashboardCardHeader');

var _DashboardCardHeader2 = _interopRequireDefault(_DashboardCardHeader);

var _DashboardCardBody = require('./DashboardCardBody');

var _DashboardCardBody2 = _interopRequireDefault(_DashboardCardBody);

var _DashboardCardFooter = require('./DashboardCardFooter');

var _DashboardCardFooter2 = _interopRequireDefault(_DashboardCardFooter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TITLE_ROLE = _DashboardCardTitle2.default.defaultProps.role;
var HEADER_ROLE = _DashboardCardHeader2.default.defaultProps.role;
var BODY_ROLE = _DashboardCardBody2.default.defaultProps.role;
var FOOTER_ROLE = _DashboardCardFooter2.default.defaultProps.role;

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
                style = _props.style;


            return _react2.default.createElement(
                _Card2.default,
                { className: (0, _classnames2.default)(className, 'form-box-container'), cardStyle: style },
                _react2.default.createElement(
                    _Card2.default.Body,
                    { className: 'form-box' },
                    children && (Array.isArray(children) && children.map(function (child, key) {
                        switch (child.props.role) {
                            case TITLE_ROLE:
                            case HEADER_ROLE:
                            case BODY_ROLE:
                            case FOOTER_ROLE:
                                return (0, _react.cloneElement)(child, { key: key });
                            default:
                                return child;
                        }
                    }) || (0, _react.cloneElement)(children))
                )
            );
        }
    }]);

    return DashboardCard;
}(_react2.default.Component);

DashboardCard.propTypes = {
    children: _propTypes2.default.node,
    className: _propTypes2.default.string,
    style: _propTypes2.default.object
};

DashboardCard.Title = _DashboardCardTitle2.default;
DashboardCard.Header = _DashboardCardHeader2.default;
DashboardCard.Body = _DashboardCardBody2.default;
DashboardCard.Footer = _DashboardCardFooter2.default;

exports.default = DashboardCard;