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

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _reactRedux = require('react-redux');

var _reactIntl = require('react-intl');

var _v = require('uuid/v1');

var _v2 = _interopRequireDefault(_v);

var _index = require('../index');

var _flattenObject = require('../util/flattenObject');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StaticNotification = function (_React$Component) {
    _inherits(StaticNotification, _React$Component);

    function StaticNotification() {
        _classCallCheck(this, StaticNotification);

        var _this = _possibleConstructorReturn(this, (StaticNotification.__proto__ || Object.getPrototypeOf(StaticNotification)).call(this));

        _this.state = { notifications: [] };
        _this.removeNotificationQue = _this.removeNotificationQue.bind(_this);
        _this.removeNotification = _this.removeNotification.bind(_this);
        return _this;
    }

    _createClass(StaticNotification, [{
        key: 'getStyle',
        value: function getStyle(key) {
            switch (key) {
                case 'success':
                    return 'success';
                case 'error':
                    return 'danger';
                case 'warning':
                    return 'warning';
                default:
                    return 'info';
            }
        }
    }, {
        key: 'addNotification',
        value: function addNotification(message) {
            var _this2 = this;

            var duration = this.props.duration;
            var notifications = this.state.notifications;

            var _message = Object.assign({}, message, { uid: (0, _v2.default)() });
            notifications.push(_message);
            if (!_message.forever) {
                setTimeout(function () {
                    _this2.removeNotificationQue(_message.uid);
                }, duration);
            }
            this.setState({ notifications: notifications });
        }
    }, {
        key: 'removeNotificationQue',
        value: function removeNotificationQue(uid) {
            var notifications = this.state.notifications;

            var index = notifications.findIndex(function (n) {
                return n.uid === uid;
            });
            notifications.splice(index, 1);
            this.setState({ notifications: notifications });
        }
    }, {
        key: 'removeNotification',
        value: function removeNotification(index) {
            var notifications = this.state.notifications;

            notifications.splice(index, 1);
            this.setState({ notifications: notifications });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var notifications = this.state.notifications;

            return _react2.default.createElement(
                'div',
                { className: 'wfui-notification-static' },
                _react2.default.createElement(
                    _reactAddonsCssTransitionGroup2.default,
                    {
                        transitionName: 'wfui-notification-fadeout',
                        transitionEnterTimeout: 500,
                        transitionLeaveTimeout: 300
                    },
                    notifications.map(function (notification, i) {
                        return _react2.default.createElement(
                            _index.Alert,
                            {
                                key: i,
                                bsStyle: _this3.getStyle(notification.level),
                                className: 'message'
                            },
                            notification.children,
                            _react2.default.createElement(_index.Glyphicon, {
                                className: 'remove',
                                onClick: function onClick() {
                                    return _this3.removeNotification(i);
                                },
                                glyph: 'remove-circle'
                            })
                        );
                    })
                )
            );
        }
    }]);

    return StaticNotification;
}(_react2.default.Component);

StaticNotification.propTypes = {
    duration: _propTypes2.default.number
};
StaticNotification.defaultProps = {
    duration: 5000
};

var Notifications = function (_React$Component2) {
    _inherits(Notifications, _React$Component2);

    function Notifications() {
        _classCallCheck(this, Notifications);

        return _possibleConstructorReturn(this, (Notifications.__proto__ || Object.getPrototypeOf(Notifications)).apply(this, arguments));
    }

    _createClass(Notifications, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this5 = this;

            var _props = this.props,
                fetches = _props.fetches,
                requestIds = _props.requestIds,
                intl = _props.intl,
                lang = _props.lang,
                values = _props.values;

            var newFetches = nextProps.fetches;
            Object.keys(fetches).filter(function (key) {
                return requestIds.includes(key);
            }).forEach(function (key) {
                if (fetches[key] && newFetches[key]) {
                    if (fetches[key].isFetching && !newFetches[key].isFetching) {
                        if (newFetches[key].status === 'success') {
                            _this5.notificationRef.addNotification({
                                children: _react2.default.createElement(_reactIntl.FormattedHTMLMessage, {
                                    id: 'notifications.' + key + '.success',
                                    values: Object.assign({}, (0, _flattenObject.flattenObject)(values), (0, _flattenObject.flattenObject)(newFetches[key].data), { lang: lang })
                                }),
                                level: 'success'
                            });
                        } else {
                            if (_typeof(newFetches[key].error) === 'object') {
                                _this5.notificationRef.addNotification({
                                    children: _react2.default.createElement(_reactIntl.FormattedHTMLMessage, {
                                        id: 'notifications.' + key + '.error.' + newFetches[key].error.type,
                                        values: Object.assign({}, (0, _flattenObject.flattenObject)(values), (0, _flattenObject.flattenObject)(newFetches[key].data), { lang: lang })
                                    }),
                                    level: 'error'
                                });
                            } else {
                                _this5.notificationRef.addNotification({
                                    children: _react2.default.createElement(_reactIntl.FormattedHTMLMessage, {
                                        id: 'notifications.' + key + '.error.default',
                                        values: Object.assign({}, (0, _flattenObject.flattenObject)(values), {
                                            message: newFetches[key].error
                                        }, { lang: lang })
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
            var _this6 = this;

            var _props2 = this.props,
                fetches = _props2.fetches,
                fixed = _props2.fixed;

            return _react2.default.createElement(
                'div',
                { className: 'wfui-notification' },
                fixed ? _react2.default.createElement(StaticNotification, {
                    ref: function ref(_ref) {
                        _this6.notificationRef = _ref;
                    }
                }) : _react2.default.createElement(_index.NotificationSystem, {
                    ref: function ref(_ref2) {
                        _this6.notificationRef = _ref2;
                    }
                })
            );
        }
    }]);

    return Notifications;
}(_react2.default.Component);

Notifications.propTypes = {
    requestIds: _propTypes2.default.arrayOf(_propTypes2.default.string),
    lang: _propTypes2.default.string,
    values: _propTypes2.default.object
};

Notifications.defaultProps = {
    requestIds: [],
    lang: 'en',
    values: {}
};

exports.default = (0, _reactIntl.injectIntl)((0, _reactRedux.connect)(function (state) {
    return {
        fetches: state.fetch || {}
    };
})(Notifications));