'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reduxForm = require('redux-form');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ = require('../');

var _reactFroalaWysiwyg = require('react-froala-wysiwyg');

var _reactFroalaWysiwyg2 = _interopRequireDefault(_reactFroalaWysiwyg);

require('froala-editor/js/froala_editor.pkgd.min.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global FileReader window $ */

var renderFroala = function (_React$Component) {
    _inherits(renderFroala, _React$Component);

    function renderFroala(props) {
        _classCallCheck(this, renderFroala);

        var _this = _possibleConstructorReturn(this, (renderFroala.__proto__ || Object.getPrototypeOf(renderFroala)).call(this));

        var input = props.input;

        _this.onHandleChange = _this.onHandleChange.bind(_this);
        _this.state = {
            htmlText: '',
            selectedImagePosition: 'full-width'
        };
        _this.initializeEditor = _this.initializeEditor.bind(_this);
        console.warn('This "renderFroala" is still under development.');
        return _this;
    }

    _createClass(renderFroala, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.initializeEditor(this.props);
        }
    }, {
        key: 'onHandleChange',
        value: function onHandleChange(text) {
            var input = this.props.input;

            input.onChange(text);
        }
    }, {
        key: 'initializeEditor',
        value: function initializeEditor(props) {
            var input = props.input,
                images = props.images;

            var that = this;

            /** *********************************************************************
             * Froala Customization
             * ******************************************************************** */
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

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
                config = _props.config;


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
                        _.ControlLabel,
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
                    _.FormGroup,
                    {
                        className: 'wfui-form-field ' + (descDisplay ? 'wfui-form-field-with-description' : 'wfui-form-field-no-description') + ' wfui-form-date',
                        validationState: touched && error ? 'error' : null
                    },
                    !disabled ? _react2.default.createElement(
                        'div',
                        { className: 'wfui-froala' },
                        _react2.default.createElement(_reactFroalaWysiwyg2.default, {
                            model: input.value,
                            onModelChange: this.onHandleChange,
                            config: {
                                key: config.FROALA_ACTIVATION_KEY,
                                toolbarStickyOffset: config.FROALA_STICKY_TOOLBAR_OFFSET,
                                heightMin: 500,
                                pasteDeniedAttrs: ['style'],
                                toolbarButtons: ['undo', 'redo', '|', 'bold', 'italic', 'strikeThrough', '|', 'formatOL', 'formatUL', 'insertLink', 'insertTable', 'quote', 'add-image', '|', 'html'],
                                quickInsertButtons: ['ol', 'ul', 'table', 'quote'],
                                customPlugin: ['customPlugin'],
                                formEditButtons: [],
                                embedlyEditButtons: [],
                                imageEditButtons: [],
                                videoEditButtons: []
                            },
                            ref: function ref(_ref) {
                                _this2.froalaRef = _ref;
                            }
                        })
                    ) : _react2.default.createElement(
                        'div',
                        { className: 'wfui-quill-disabled' },
                        input.value
                    ),
                    touched && error && _react2.default.createElement(
                        _.HelpBlock,
                        { className: 'wfui-form-error' },
                        _react2.default.createElement(
                            'span',
                            null,
                            error
                        )
                    )
                ),
                descDisplay && !preview ? (0, _react.cloneElement)(descDisplay) : ''
            );
        }
    }]);

    return renderFroala;
}(_react2.default.Component);

renderFroala.propTypes = _extends({
    getContents: _propTypes2.default.func,
    images: _propTypes2.default.arrayOf(_propTypes2.default.object)
}, _reduxForm.fieldPropTypes, {
    config: _propTypes2.default.object
});
renderFroala.defaultProps = {
    config: {
        FROALA_STICKY_TOOLBAR_OFFSET: 0
    }
};

exports.default = renderFroala;