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

var _reactIntl = require('react-intl');

var _index = require('../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoadingComponent = function (_React$Component) {
    _inherits(LoadingComponent, _React$Component);

    function LoadingComponent() {
        _classCallCheck(this, LoadingComponent);

        return _possibleConstructorReturn(this, (LoadingComponent.__proto__ || Object.getPrototypeOf(LoadingComponent)).apply(this, arguments));
    }

    _createClass(LoadingComponent, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                requestId = _props.requestId,
                enableIntl = _props.enableIntl,
                hideMessage = _props.hideMessage,
                isFetching = _props.isFetching,
                fetch5s = _props.fetch5s,
                fetch8s = _props.fetch8s,
                message5s = _props.message5s,
                message8s = _props.message8s,
                messageFailed = _props.messageFailed,
                error = _props.error,
                retried = _props.retried,
                timeout = _props.timeout,
                status = _props.status,
                spinnerConfig = _props.spinnerConfig,
                children = _props.children,
                onRetry = _props.onRetry,
                textRetry = _props.textRetry;


            if (isFetching) {
                return _react2.default.createElement(
                    'div',
                    { className: 'wfui-loading-component' },
                    _react2.default.createElement(_index.Spinner, spinnerConfig),
                    !hideMessage && fetch5s && _react2.default.createElement(
                        'p',
                        {
                            className: 'loading-5s',
                            style: { textAlign: 'center' }
                        },
                        enableIntl ? _react2.default.createElement(_reactIntl.FormattedHTMLMessage, {
                            id: 'loadingcomponent.message5s',
                            defaultMessage: message5s
                        }) : message5s
                    ),
                    !hideMessage && fetch8s && _react2.default.createElement(
                        'p',
                        {
                            className: 'loading-8s',
                            style: { textAlign: 'center' }
                        },
                        enableIntl ? _react2.default.createElement(_reactIntl.FormattedHTMLMessage, {
                            id: 'loadingcomponent.message8s',
                            defaultMessage: message8s
                        }) : message8s
                    )
                );
            }
            if (status === 'fail') {
                var errorType = (typeof error === 'undefined' ? 'undefined' : _typeof(error)) === 'object' && error.type;
                return _react2.default.createElement(
                    'div',
                    { className: 'wfui-loading-component' },
                    !hideMessage && error && _react2.default.createElement(
                        'p',
                        { className: 'error' },
                        enableIntl ? _react2.default.createElement(_reactIntl.FormattedHTMLMessage, {
                            id: 'loadingcomponent.' + requestId + '.' + (errorType ? '' + errorType : 'default'),
                            defaultMessage: (typeof error === 'undefined' ? 'undefined' : _typeof(error)) === 'object' ? error.type : error
                        }) : (typeof error === 'undefined' ? 'undefined' : _typeof(error)) === 'object' ? error.type : error
                    ),
                    !hideMessage && (retried || timeout) && _react2.default.createElement(
                        'p',
                        {
                            className: 'error',
                            style: { textAlign: 'center' }
                        },
                        enableIntl ? _react2.default.createElement(_reactIntl.FormattedHTMLMessage, {
                            id: 'loadingcomponent.messageFailed',
                            defaultMessage: messageFailed
                        }) : messageFailed
                    ),
                    (retried || timeout) && typeof onRetry === 'function' && _react2.default.createElement(
                        'div',
                        {
                            className: 'retry-button',
                            style: { textAlign: 'center' }
                        },
                        _react2.default.createElement(
                            _index.Button,
                            { onClick: onRetry },
                            textRetry
                        )
                    )
                );
            }

            if (status === 'success') {
                return _react2.default.createElement(
                    'div',
                    { className: 'wfui-loading-component' },
                    children
                );
            }
            return null;
        }
    }]);

    return LoadingComponent;
}(_react2.default.Component);

LoadingComponent.propTypes = {
    requestId: _propTypes2.default.string,
    isFetching: _propTypes2.default.bool,
    fetch5s: _propTypes2.default.bool,
    fetch8s: _propTypes2.default.bool,
    status: _propTypes2.default.string,
    error: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.string]),
    timeout: _propTypes2.default.bool,
    retried: _propTypes2.default.bool,
    hideMessage: _propTypes2.default.bool,
    children: _propTypes2.default.node,
    spinnerConfig: _propTypes2.default.oneOfType([_propTypes2.default.object]),
    message5s: _propTypes2.default.string,
    message8s: _propTypes2.default.string,
    messageFailed: _propTypes2.default.string,
    onRetry: _propTypes2.default.func,
    textRetry: _propTypes2.default.string,
    enableIntl: _propTypes2.default.bool
};

LoadingComponent.defaultProps = {
    spinnerConfig: {
        type: 1,
        color: '#337ab7',
        fontSize: '12',
        margin: '100px auto'
    },
    message5s: 'Loading, please wait...',
    message8s: 'We are experiencing longer than normal load times.',
    messageFailed: 'The server encountered an internal error and was unable to complete your request.',
    textRetry: 'Retry',
    enableIntl: true,
    requestId: '[requestId]'
};

exports.default = LoadingComponent;