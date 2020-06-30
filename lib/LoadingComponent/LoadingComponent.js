function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage } from 'react-intl';
import { flattenObject } from '../util/flattenObject';
import { Button, ClipLoader, ClipLoaderWithContext } from '../index';

var LoadingComponent =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LoadingComponent, _React$Component);

  function LoadingComponent() {
    _classCallCheck(this, LoadingComponent);

    return _possibleConstructorReturn(this, _getPrototypeOf(LoadingComponent).apply(this, arguments));
  }

  _createClass(LoadingComponent, [{
    key: "renderRegularLoader",
    value: function renderRegularLoader() {
      var _this$props = this.props,
          context = _this$props.context,
          spinnerConfig = _this$props.spinnerConfig;

      if (context) {
        return React.createElement(ClipLoaderWithContext, _extends({
          context: context
        }, spinnerConfig, {
          loading: true
        }));
      }

      return React.createElement(ClipLoader, _extends({}, spinnerConfig, {
        loading: true
      }));
    }
  }, {
    key: "renderWholeLoader",
    value: function renderWholeLoader() {
      var _this$props2 = this.props,
          context = _this$props2.context,
          coverSpinnerConfig = _this$props2.coverSpinnerConfig;

      if (context) {
        return React.createElement(ClipLoaderWithContext, _extends({
          context: context
        }, coverSpinnerConfig, {
          loading: true
        }));
      }

      return React.createElement(ClipLoader, _extends({}, coverSpinnerConfig, {
        loading: true
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          requestId = _this$props3.requestId,
          enableIntl = _this$props3.enableIntl,
          hideMessage = _this$props3.hideMessage,
          isFetching = _this$props3.isFetching,
          fetch5s = _this$props3.fetch5s,
          fetch8s = _this$props3.fetch8s,
          message5s = _this$props3.message5s,
          message8s = _this$props3.message8s,
          messageFailed = _this$props3.messageFailed,
          error = _this$props3.error,
          retried = _this$props3.retried,
          timeout = _this$props3.timeout,
          status = _this$props3.status,
          spinnerConfig = _this$props3.spinnerConfig,
          children = _this$props3.children,
          onRetry = _this$props3.onRetry,
          textRetry = _this$props3.textRetry,
          coverWholePage = _this$props3.coverWholePage,
          loaderStyle = _this$props3.loaderStyle,
          coverLoaderStyle = _this$props3.coverLoaderStyle,
          data = _this$props3.data,
          values = _this$props3.values,
          context = _this$props3.context,
          ignoreErrors = _this$props3.ignoreErrors;

      if (isFetching) {
        return React.createElement("div", {
          className: "wfui-loading-component ".concat(coverWholePage ? 'spinner-wrapper-overwrap' : '')
        }, React.createElement("div", {
          className: "loader",
          style: coverWholePage ? coverLoaderStyle : loaderStyle
        }, coverWholePage ? this.renderWholeLoader() : this.renderRegularLoader()), !hideMessage && fetch5s && React.createElement("p", {
          className: "loading-5s",
          style: {
            textAlign: 'center'
          }
        }, enableIntl ? React.createElement(FormattedHTMLMessage, {
          id: "loadingcomponent.message5s",
          defaultMessage: message5s,
          values: _extends({}, flattenObject(values), {}, flattenObject(data))
        }) : message5s), !hideMessage && fetch8s && React.createElement("p", {
          className: "loading-8s",
          style: {
            textAlign: 'center'
          }
        }, enableIntl ? React.createElement(FormattedHTMLMessage, {
          id: "loadingcomponent.message8s",
          defaultMessage: message8s,
          values: _extends({}, flattenObject(values), {}, flattenObject(data))
        }) : message8s));
      }

      if (status === 'fail') {
        var errorType = _typeof(error) === 'object' && error.type;

        if (ignoreErrors && ignoreErrors.length && (errorType && ignoreErrors.includes(errorType) || typeof error === 'string' && ignoreErrors.includes(error)) || coverWholePage) {
          return React.createElement("div", {
            className: "wfui-loading-component"
          }, children);
        }

        return React.createElement("div", {
          className: "wfui-loading-component"
        }, !hideMessage && error && React.createElement("p", {
          className: "error"
        }, enableIntl ? React.createElement(FormattedHTMLMessage, {
          id: "loadingcomponent.".concat(requestId, ".").concat(errorType ? "".concat(errorType) : 'default'),
          defaultMessage: _typeof(error) === 'object' ? error.type : error,
          values: _extends({}, flattenObject(values), {}, flattenObject(data), {
            message: _typeof(error) === 'object' ? error.type : error
          })
        }) : _typeof(error) === 'object' ? error.type : error), !hideMessage && (retried || timeout) && React.createElement("p", {
          className: "error",
          style: {
            textAlign: 'center'
          }
        }, enableIntl ? React.createElement(FormattedHTMLMessage, {
          id: "loadingcomponent.messageFailed",
          defaultMessage: messageFailed,
          values: _extends({}, flattenObject(values), {}, flattenObject(data))
        }) : messageFailed), (retried || timeout) && typeof onRetry === 'function' && React.createElement("div", {
          className: "retry-button",
          style: {
            textAlign: 'center'
          }
        }, React.createElement(Button, {
          onClick: onRetry
        }, textRetry)));
      }

      if (status === 'success') {
        return React.createElement("div", {
          className: "wfui-loading-component"
        }, children);
      }

      return null;
    }
  }]);

  return LoadingComponent;
}(React.Component);

LoadingComponent.propTypes = {
  requestId: PropTypes.string,
  isFetching: PropTypes.bool,
  fetch5s: PropTypes.bool,
  fetch8s: PropTypes.bool,
  status: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  timeout: PropTypes.bool,
  retried: PropTypes.bool,
  hideMessage: PropTypes.bool,
  children: PropTypes.node,
  spinnerConfig: PropTypes.oneOfType([PropTypes.object]),
  coverSpinnerConfig: PropTypes.oneOfType([PropTypes.object]),
  message5s: PropTypes.string,
  message8s: PropTypes.string,
  messageFailed: PropTypes.string,
  onRetry: PropTypes.func,
  textRetry: PropTypes.string,
  enableIntl: PropTypes.bool,
  loaderStyle: PropTypes.oneOfType([PropTypes.object]),
  coverLoaderStyle: PropTypes.oneOfType([PropTypes.object]),
  values: PropTypes.oneOfType([PropTypes.object]),
  data: PropTypes.any,
  ignoreErrors: PropTypes.arrayOf(PropTypes.string)
};
LoadingComponent.defaultProps = {
  spinnerConfig: {
    sizeUnit: 'px',
    size: 60,
    color: '#9B9B9B'
  },
  loaderStyle: {
    margin: '100px auto',
    textAlign: 'center'
  },
  coverSpinnerConfig: {
    sizeUnit: 'px',
    size: 60,
    color: '#ffffff'
  },
  coverLoaderStyle: {
    margin: '-40px 0 0 -30px',
    textAlign: 'center'
  },
  message5s: 'Loading, please wait...',
  message8s: 'We are experiencing longer than normal load times.',
  messageFailed: 'The server encountered an internal error and was unable to complete your request.',
  textRetry: 'Retry',
  enableIntl: true,
  requestId: '[requestId]',
  values: {},
  data: {}
};
export default LoadingComponent;