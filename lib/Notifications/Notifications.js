'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _reactIntl = require('react-intl');

var _index = require('../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Notifications = function (_React$Component) {
    _inherits(Notifications, _React$Component);

    function Notifications() {
        _classCallCheck(this, Notifications);

        return _possibleConstructorReturn(this, (Notifications.__proto__ || Object.getPrototypeOf(Notifications)).apply(this, arguments));
    }

    _createClass(Notifications, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            var _props = this.props,
                fetches = _props.fetches,
                requestIds = _props.requestIds,
                intl = _props.intl;

            var newFetches = nextProps.fetches;
            Object.keys(fetches).filter(function (key) {
                return requestIds.includes(key);
            }).forEach(function (key) {
                if (fetches[key] && newFetches[key]) {
                    if (fetches[key].isFetching && !newFetches[key].isFetching) {
                        if (newFetches[key].status === 'success') {
                            _this2.notificationRef.addNotification({
                                children: _react2.default.createElement(_reactIntl.FormattedHTMLMessage, {
                                    id: 'notifications.' + key + '.success',
                                    values: newFetches[key].data
                                }),
                                level: 'success'
                            });
                        } else {
                            if (_typeof(newFetches[key].error) === 'object') {
                                _this2.notificationRef.addNotification({
                                    children: _react2.default.createElement(_reactIntl.FormattedHTMLMessage, {
                                        id: 'notifications.' + key + '.error.' + newFetches[key].error.type
                                    }),
                                    level: 'error'
                                });
                            } else {
                                _this2.notificationRef.addNotification({
                                    children: _react2.default.createElement(_reactIntl.FormattedHTMLMessage, {
                                        id: 'notifications.' + key + '.error.default',
                                        values: {
                                            message: newFetches[key].error
                                        }
                                    }),
                                    level: 'error'
                                });
                            }
                        }
                    }
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var fetches = this.props.fetches;

            return _react2.default.createElement(_index.NotificationSystem, {
                ref: function ref(_ref) {
                    _this3.notificationRef = _ref;
                }
            });
        }
    }]);

    return Notifications;
}(_react2.default.Component);

Notifications.propTypes = {
    requestIds: _propTypes2.default.arrayOf(_propTypes2.default.string)
};

Notifications.defaultProps = {
    requestIds: []
};

exports.default = (0, _reactIntl.injectIntl)((0, _reactRedux.connect)(function (state) {
    return {
        fetches: state.fetch || {}
    };
})(Notifications));