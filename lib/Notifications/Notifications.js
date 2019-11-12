function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { injectIntl, FormattedHTMLMessage } from 'react-intl';
import uuidv1 from 'uuid/v1';
import { NotificationSystem, Alert, Glyphicon } from '../index';
import { flattenObject } from '../util/flattenObject';

var StaticNotification =
/*#__PURE__*/
function (_React$Component) {
  _inherits(StaticNotification, _React$Component);

  function StaticNotification() {
    var _this;

    _classCallCheck(this, StaticNotification);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(StaticNotification).call(this));
    _this.state = {
      notifications: []
    };
    _this.removeNotificationQue = _this.removeNotificationQue.bind(_assertThisInitialized(_this));
    _this.removeNotification = _this.removeNotification.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(StaticNotification, [{
    key: "getStyle",
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
    key: "addNotification",
    value: function addNotification(message) {
      var _this2 = this;

      var duration = this.props.duration;
      var notifications = this.state.notifications;

      var _message = _extends({}, message, {
        uid: uuidv1()
      });

      notifications.push(_message);

      if (!_message.forever) {
        setTimeout(function () {
          _this2.removeNotificationQue(_message.uid);
        }, duration);
      }

      this.setState({
        notifications: notifications
      });
    }
  }, {
    key: "removeNotificationQue",
    value: function removeNotificationQue(uid) {
      var notifications = this.state.notifications;
      var index = notifications.findIndex(function (n) {
        return n.uid === uid;
      });
      notifications.splice(index, 1);
      this.setState({
        notifications: notifications
      });
    }
  }, {
    key: "removeNotification",
    value: function removeNotification(index) {
      var notifications = this.state.notifications;
      notifications.splice(index, 1);
      this.setState({
        notifications: notifications
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var withTitle = this.props.withTitle;
      var notifications = this.state.notifications;
      return React.createElement("div", {
        className: "wfui-notification-static"
      }, React.createElement(ReactCSSTransitionGroup, {
        transitionName: "wfui-notification-fadeout",
        transitionEnterTimeout: 500,
        transitionLeaveTimeout: 300
      }, notifications.map(function (notification, i) {
        return React.createElement(Alert, {
          key: i,
          variant: _this3.getStyle(notification.level),
          className: "message"
        }, withTitle && notification.title && React.createElement("div", {
          className: "alert-heading h4"
        }, notification.title), notification.children, React.createElement(Glyphicon, {
          className: "remove",
          onClick: function onClick() {
            return _this3.removeNotification(i);
          },
          glyph: "remove-circle"
        }));
      })));
    }
  }]);

  return StaticNotification;
}(React.Component);

StaticNotification.propTypes = {
  duration: PropTypes.number
};
StaticNotification.defaultProps = {
  duration: 5000
};

var Notifications =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(Notifications, _React$Component2);

  function Notifications() {
    _classCallCheck(this, Notifications);

    return _possibleConstructorReturn(this, _getPrototypeOf(Notifications).apply(this, arguments));
  }

  _createClass(Notifications, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this4 = this;

      var _this$props = this.props,
          fetches = _this$props.fetches,
          requestIds = _this$props.requestIds,
          queryIds = _this$props.queryIds,
          intl = _this$props.intl,
          lang = _this$props.lang,
          values = _this$props.values,
          overrides = _this$props.overrides,
          duration = _this$props.duration,
          level = _this$props.level,
          withTitle = _this$props.withTitle;
      var newFetches = nextProps.fetches;
      Object.keys(fetches).filter(function (key) {
        return requestIds.includes(key) || queryIds.includes(fetches[key].queryId);
      }).forEach(function (key) {
        var overriding = overrides[key] || {};
        var notificationId = queryIds.includes(fetches[key].queryId) ? fetches[key].queryId : key; // If this fetch object has corresponding queryId, notify against the queryId over the requestId.

        if (fetches[key] && newFetches[key]) {
          if (fetches[key].isFetching && !newFetches[key].isFetching) {
            var displayingTitle;
            var displayingLevel;
            var displayingId;
            var displayingDefaultMessage;
            var displayingValues;

            if (newFetches[key].status === 'success') {
              if (level.includes('success')) {
                displayingLevel = 'success';

                if (overriding.success) {
                  displayingId = '_overridding_text_';
                } else if (withTitle) {
                  displayingId = "notifications.".concat(notificationId, ".success.default");
                  displayingTitle = intl.formatMessage({
                    id: "notifications.".concat(notificationId, ".success.title")
                  });
                } else {
                  displayingId = "notifications.".concat(notificationId, ".success");
                }

                displayingDefaultMessage = overriding.success || undefined;
                displayingValues = flattenObject(newFetches[key].data);
              }
            } else if (level.includes('error')) {
              if (_typeof(newFetches[key].error) === 'object') {
                displayingLevel = 'error';

                if (overriding.error && overriding.error[newFetches[key].error.type]) {
                  displayingId = '_overridding_text_';
                } else {
                  displayingId = "notifications.".concat(notificationId, ".error.").concat(newFetches[key].error.type);
                }

                if (withTitle) {
                  displayingTitle = intl.formatMessage({
                    id: "notifications.".concat(notificationId, ".error.title")
                  });
                }

                displayingDefaultMessage = overriding.error && overriding.error[newFetches[key].error.type] || "An upexpected error has occurred.<br/> Error: \"".concat(newFetches[key].error.type, "\"");

                if (newFetches[key].error.type === 'NO_AUTH' || newFetches[key].error.type === 'NO_PERM') {
                  displayingDefaultMessage = "You don't have permission to perform this action.";
                }

                displayingValues = flattenObject(newFetches[key].data);
              } else {
                displayingLevel = 'error';

                if (overriding.error && overriding.error.default) {
                  displayingId = '_overridding_text_';
                } else {
                  displayingId = "notifications.".concat(notificationId, ".error.default");
                }

                if (withTitle) {
                  displayingTitle = intl.formatMessage({
                    id: "notifications.".concat(notificationId, ".error.title")
                  });
                }

                displayingDefaultMessage = overriding.error && overriding.error.default || 'An unexpected error has occurred.';
                displayingValues = {
                  message: newFetches[key].error
                };
              }
            }

            if (displayingValues) {
              _this4.notificationRef.addNotification({
                title: withTitle && displayingTitle,
                children: React.createElement(FormattedHTMLMessage, {
                  id: displayingId,
                  defaultMessage: displayingDefaultMessage,
                  values: _extends({}, flattenObject(fetches[key].meta), {}, flattenObject(values), {
                    lang: lang
                  }, displayingValues)
                }),
                level: displayingLevel,
                autoDismiss: Math.floor(duration / 1000)
              });
            }
          }
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var _this$props2 = this.props,
          fetches = _this$props2.fetches,
          fixed = _this$props2.fixed,
          duration = _this$props2.duration,
          notificationRef = _this$props2.notificationRef,
          withTitle = _this$props2.withTitle;
      return React.createElement("div", {
        className: "wfui-notification"
      }, fixed ? React.createElement(StaticNotification, {
        duration: duration,
        ref: function ref(_ref) {
          _this5.notificationRef = _ref;
          notificationRef(_ref);
        },
        withTitle: true
      }) : React.createElement(NotificationSystem, {
        ref: function ref(_ref2) {
          _this5.notificationRef = _ref2;
          notificationRef(_ref2);
        },
        withTitle: true
      }));
    }
  }]);

  return Notifications;
}(React.Component);

Notifications.propTypes = {
  requestIds: PropTypes.arrayOf(PropTypes.string),
  queryIds: PropTypes.arrayOf(PropTypes.string),
  level: PropTypes.arrayOf(PropTypes.string),
  lang: PropTypes.string,
  values: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  overrides: PropTypes.object,
  duration: PropTypes.number,
  notificationRef: PropTypes.func,
  withTitle: PropTypes.bool
};
Notifications.defaultProps = {
  requestIds: [],
  queryIds: [],
  level: ['error', 'success'],
  lang: 'en',
  values: {},
  overrides: {},
  duration: 5000,
  notificationRef: function notificationRef(f) {
    return f;
  }
};
export default injectIntl(connect(function (state) {
  return {
    fetches: state.fetch || {}
  };
})(Notifications));