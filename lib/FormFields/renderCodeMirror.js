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

var _reactCodemirror = require('react-codemirror2');

var ReactCodeMirror = _interopRequireWildcard(_reactCodemirror);

var _index = require('../index');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/prop-types : 0 */


var CodeMirror = ReactCodeMirror.Controlled;

var renderCodeMirror = function (_React$Component) {
    _inherits(renderCodeMirror, _React$Component);

    function renderCodeMirror(props) {
        _classCallCheck(this, renderCodeMirror);

        var _this = _possibleConstructorReturn(this, (renderCodeMirror.__proto__ || Object.getPrototypeOf(renderCodeMirror)).call(this));

        _this.onHandleChange = _this.onHandleChange.bind(_this);
        var initValue = props.input.value || props.defaultValue;
        _this.state = { bodyText: initValue };
        props.input.onChange(initValue);
        return _this;
    }

    _createClass(renderCodeMirror, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var input = this.props.input;
            var bodyText = this.state.bodyText;

            if (nextProps.input.value && !_.isEqual(nextProps.input.value, bodyText)) {
                this.setState({ bodyText: nextProps.input.value });
            }
        }
    }, {
        key: 'onHandleChange',
        value: function onHandleChange(editor, data, value) {
            var input = this.props.input;

            this.setState({ bodyText: value });
            input.onChange(value);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                label = _props.label,
                input = _props.input,
                required = _props.required,
                disabled = _props.disabled,
                preview = _props.preview,
                descDisplay = _props.descDisplay,
                fullWidth = _props.fullWidth,
                _props$meta = _props.meta,
                touched = _props$meta.touched,
                error = _props$meta.error,
                onCursor = _props.onCursor,
                help = _props.help,
                defaultValue = _props.defaultValue,
                showErrors = _props.showErrors;
            var bodyText = this.state.bodyText;


            return _react2.default.createElement(
                'div',
                {
                    className: (0, _classnames2.default)(className, 'wfui-form-item', {
                        'wfui-form-item-error': error
                    }, { 'wfui-form-disabled': disabled }, { 'wfui-form-preview': preview }, { 'wfui-form-item-full-width': fullWidth })
                },
                label && _react2.default.createElement(
                    'div',
                    { className: 'wfui-form-label' },
                    _react2.default.createElement(
                        _index.ControlLabel,
                        null,
                        label,
                        required && _react2.default.createElement(
                            'b',
                            { className: 'required' },
                            ' *'
                        )
                    )
                ),
                _react2.default.createElement(
                    _index.FormGroup,
                    {
                        className: 'wfui-form-field ' + (descDisplay ? 'wfui-form-field-with-description' : 'wfui-form-field-no-description') + ' wfui-form-date',
                        validationState: (touched || showErrors) && error ? 'error' : null
                    },
                    !disabled ? _react2.default.createElement(
                        'div',
                        { className: 'wfui-quill' },
                        _react2.default.createElement(CodeMirror, {
                            value: bodyText,
                            options: {
                                lineWrapping: true,
                                lineNumbers: true
                            },
                            onBeforeChange: this.onHandleChange,
                            onCursor: onCursor
                        })
                    ) : _react2.default.createElement(
                        'p',
                        { className: 'wfui-value' },
                        bodyText
                    ),
                    (touched || showErrors) && error && _react2.default.createElement(
                        _index.HelpBlock,
                        { className: 'wfui-form-error' },
                        _react2.default.createElement(
                            'span',
                            null,
                            error
                        )
                    ),
                    help && !preview && _react2.default.createElement(
                        _index.HelpBlock,
                        { className: 'wfui-form-help' },
                        _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: help } })
                    )
                ),
                descDisplay && !preview ? (0, _react.cloneElement)(descDisplay) : ''
            );
        }
    }]);

    return renderCodeMirror;
}(_react2.default.Component);

renderCodeMirror.propTypes = {
    onCursor: _propTypes2.default.func
};
renderCodeMirror.defaultProps = {
    onCursor: function onCursor(f) {
        return f;
    }
};

exports.default = renderCodeMirror;