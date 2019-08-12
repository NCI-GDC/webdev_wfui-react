'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactIntl = require('react-intl');

var _flattenObject = require('../util/flattenObject');

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
        key: 'renderRegularLoader',
        value: function renderRegularLoader() {
            var _props = this.props,
                context = _props.context,
                spinnerConfig = _props.spinnerConfig;

            if (context) {
                return _react2.default.createElement(_index.ClipLoaderWithContext, _extends({
                    context: context
                }, spinnerConfig, {
                    loading: true
                }));
            }
            return _react2.default.createElement(_index.ClipLoader, _extends({}, spinnerConfig, { loading: true }));
        }
    }, {
        key: 'renderWholeLoader',
        value: function renderWholeLoader() {
            var _props2 = this.props,
                context = _props2.context,
                coverSpinnerConfig = _props2.coverSpinnerConfig;

            if (context) {
                return _react2.default.createElement(_index.ClipLoaderWithContext, _extends({
                    context: context
                }, coverSpinnerConfig, {
                    loading: true
                }));
            }
            return _react2.default.createElement(_index.ClipLoader, _extends({}, coverSpinnerConfig, { loading: true }));
        }
    }, {
        key: 'render',
        value: function render() {
            var _props3 = this.props,
                requestId = _props3.requestId,
                enableIntl = _props3.enableIntl,
                hideMessage = _props3.hideMessage,
                isFetching = _props3.isFetching,
                fetch5s = _props3.fetch5s,
                fetch8s = _props3.fetch8s,
                message5s = _props3.message5s,
                message8s = _props3.message8s,
                messageFailed = _props3.messageFailed,
                error = _props3.error,
                retried = _props3.retried,
                timeout = _props3.timeout,
                status = _props3.status,
                spinnerConfig = _props3.spinnerConfig,
                children = _props3.children,
                onRetry = _props3.onRetry,
                textRetry = _props3.textRetry,
                coverWholePage = _props3.coverWholePage,
                loaderStyle = _props3.loaderStyle,
                coverLoaderStyle = _props3.coverLoaderStyle,
                data = _props3.data,
                values = _props3.values,
                context = _props3.context,
                ignoreErrors = _props3.ignoreErrors;


            if (isFetching) {
                return _react2.default.createElement(
                    'div',
                    {
                        className: 'wfui-loading-component ' + (coverWholePage ? 'spinner-wrapper-overwrap' : '')
                    },
                    _react2.default.createElement(
                        'div',
                        {
                            className: 'loader',
                            style: coverWholePage ? coverLoaderStyle : loaderStyle
                        },
                        coverWholePage ? this.renderWholeLoader() : this.renderRegularLoader()
                    ),
                    !hideMessage && fetch5s && _react2.default.createElement(
                        'p',
                        {
                            className: 'loading-5s',
                            style: { textAlign: 'center' }
                        },
                        enableIntl ? _react2.default.createElement(_reactIntl.FormattedHTMLMessage, {
                            id: 'loadingcomponent.message5s',
                            defaultMessage: message5s,
                            values: Object.assign({}, (0, _flattenObject.flattenObject)(values), (0, _flattenObject.flattenObject)(data))
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
                            defaultMessage: message8s,
                            values: Object.assign({}, (0, _flattenObject.flattenObject)(values), (0, _flattenObject.flattenObject)(data))
                        }) : message8s
                    )
                );
            }
            if (status === 'fail') {
                var errorType = (typeof error === 'undefined' ? 'undefined' : _typeof(error)) === 'object' && error.type;

                if (ignoreErrors && ignoreErrors.length && (errorType && ignoreErrors.includes(errorType) || typeof error === 'string' && ignoreErrors.includes(error)) || coverWholePage) {
                    return _react2.default.createElement(
                        'div',
                        { className: 'wfui-loading-component' },
                        children
                    );
                }

                return _react2.default.createElement(
                    'div',
                    { className: 'wfui-loading-component' },
                    !hideMessage && error && _react2.default.createElement(
                        'p',
                        { className: 'error' },
                        enableIntl ? _react2.default.createElement(_reactIntl.FormattedHTMLMessage, {
                            id: 'loadingcomponent.' + requestId + '.' + (errorType ? '' + errorType : 'default'),
                            defaultMessage: (typeof error === 'undefined' ? 'undefined' : _typeof(error)) === 'object' ? error.type : error,
                            values: Object.assign({}, (0, _flattenObject.flattenObject)(values), (0, _flattenObject.flattenObject)(data), {
                                message: (typeof error === 'undefined' ? 'undefined' : _typeof(error)) === 'object' ? error.type : error
                            })
                        }) : (typeof error === 'undefined' ? 'undefined' : _typeof(error)) === 'object' ? error.type : error
                    ),
                    !hideMessage && (retried || timeout) && _react2.default.createElement(
                        'p',
                        { className: 'error', style: { textAlign: 'center' } },
                        enableIntl ? _react2.default.createElement(_reactIntl.FormattedHTMLMessage, {
                            id: 'loadingcomponent.messageFailed',
                            defaultMessage: messageFailed,
                            values: Object.assign({}, (0, _flattenObject.flattenObject)(values), (0, _flattenObject.flattenObject)(data))
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
    error: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
    timeout: _propTypes2.default.bool,
    retried: _propTypes2.default.bool,
    hideMessage: _propTypes2.default.bool,
    children: _propTypes2.default.node,
    spinnerConfig: _propTypes2.default.oneOfType([_propTypes2.default.object]),
    coverSpinnerConfig: _propTypes2.default.oneOfType([_propTypes2.default.object]),
    message5s: _propTypes2.default.string,
    message8s: _propTypes2.default.string,
    messageFailed: _propTypes2.default.string,
    onRetry: _propTypes2.default.func,
    textRetry: _propTypes2.default.string,
    enableIntl: _propTypes2.default.bool,
    loaderStyle: _propTypes2.default.oneOfType([_propTypes2.default.object]),
    coverLoaderStyle: _propTypes2.default.oneOfType([_propTypes2.default.object]),
    values: _propTypes2.default.oneOfType([_propTypes2.default.object]),
    data: _propTypes2.default.any,
    ignoreErrors: _propTypes2.default.arrayOf(_propTypes2.default.string)
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

exports.default = LoadingComponent;