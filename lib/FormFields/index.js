'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.renderFilterTable = exports.renderSelectionHybridRadio = exports.renderSelectionHybridCheckbox = exports.renderTableFormat = exports.renderPhoto = exports.renderTimezone = exports.renderAddAnother = exports.renderSelect = exports.renderRadios = exports.renderCheckboxs = exports.renderSingleCheckbox = exports.renderTextArea = exports.renderField = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* global FileReader */
/* eslint react/prop-types : 0 */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _reactTimezone = require('react-timezone');

var _reactTimezone2 = _interopRequireDefault(_reactTimezone);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _index = require('../index');

var _Draggable = require('../Draggable/Draggable');

var _Draggable2 = _interopRequireDefault(_Draggable);

var _renderTableFormat2 = require('./renderTableFormat');

var _renderTableFormat3 = _interopRequireDefault(_renderTableFormat2);

var _renderSelectionHybridCheckbox2 = require('./renderSelectionHybridCheckbox');

var _renderSelectionHybridCheckbox3 = _interopRequireDefault(_renderSelectionHybridCheckbox2);

var _renderSelectionHybridRadio2 = require('./renderSelectionHybridRadio');

var _renderSelectionHybridRadio3 = _interopRequireDefault(_renderSelectionHybridRadio2);

var _renderFilterTable2 = require('./renderFilterTable');

var _renderFilterTable3 = _interopRequireDefault(_renderFilterTable2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Reusable field component.
 */
var renderField = exports.renderField = function renderField(_ref) {
    var className = _ref.className,
        inline = _ref.inline,
        input = _ref.input,
        label = _ref.label,
        postfix = _ref.postfix,
        help = _ref.help,
        placeholder = _ref.placeholder,
        type = _ref.type,
        maxlength = _ref.maxlength,
        max = _ref.max,
        min = _ref.min,
        onHandleChange = _ref.onHandleChange,
        required = _ref.required,
        disabled = _ref.disabled,
        globalError = _ref.globalError,
        _ref$meta = _ref.meta,
        touched = _ref$meta.touched,
        error = _ref$meta.error;
    return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(className, 'wfui-form-item', { 'wfui-form-item-error': error || globalError }, { 'wfui-form-inline': inline }, { answered: input.value }) },
        _react2.default.createElement(
            _index.ControlLabel,
            null,
            label
        ),
        required && _react2.default.createElement(
            'b',
            { className: 'required' },
            ' *'
        ),
        _react2.default.createElement(
            _index.FormGroup,
            { className: 'wfui-form-input', validationState: touched && (error || globalError) ? 'error' : null },
            _react2.default.createElement(_index.FormControl, _extends({}, input, {
                placeholder: placeholder || placeholder === '' ? placeholder : label,
                type: type,
                maxLength: maxlength,
                min: min,
                max: max,
                disabled: disabled,
                onChange: function onChange(e) {
                    input.onChange(e);
                    if (onHandleChange) onHandleChange(e);
                }
            })),
            postfix && _react2.default.createElement(
                'div',
                { className: 'wfui-form-postfix' },
                postfix
            ),
            _react2.default.createElement(_index.FormControl.Feedback, null),
            touched && error && _react2.default.createElement(
                _index.HelpBlock,
                { className: 'wfui-form-error' },
                _react2.default.createElement(
                    'span',
                    null,
                    error
                )
            ),
            touched && globalError && _react2.default.createElement(
                _index.HelpBlock,
                { className: 'wfui-form-error' },
                _react2.default.createElement(
                    'span',
                    null,
                    globalError
                )
            ),
            help && _react2.default.createElement('div', { className: 'wfui-form-description', dangerouslySetInnerHTML: { __html: help } })
        )
    );
};

var renderTextArea = exports.renderTextArea = function renderTextArea(_ref2) {
    var className = _ref2.className,
        input = _ref2.input,
        label = _ref2.label,
        help = _ref2.help,
        placeholder = _ref2.placeholder,
        type = _ref2.type,
        onHandleChange = _ref2.onHandleChange,
        required = _ref2.required,
        disabled = _ref2.disabled,
        globalError = _ref2.globalError,
        _ref2$meta = _ref2.meta,
        touched = _ref2$meta.touched,
        error = _ref2$meta.error,
        rows = _ref2.rows;
    return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(className, 'wfui-form-item', { 'wfui-form-item-error': error || globalError }, { answered: input.value }) },
        _react2.default.createElement(
            _index.ControlLabel,
            null,
            label
        ),
        required && _react2.default.createElement(
            'b',
            { className: 'required' },
            ' *'
        ),
        _react2.default.createElement(
            _index.FormGroup,
            { className: 'wfui-form-textarea', validationState: touched && (error || globalError) ? 'error' : null },
            _react2.default.createElement(_index.FormControl, _extends({}, input, {
                type: type,
                placeholder: placeholder || placeholder === '' ? placeholder : label,
                disabled: disabled,
                onChange: function onChange(e) {
                    input.onChange(e);
                    if (onHandleChange) onHandleChange(e);
                },
                componentClass: 'textarea',
                rows: rows || 5
            })),
            _react2.default.createElement(_index.FormControl.Feedback, null),
            touched && error && _react2.default.createElement(
                _index.HelpBlock,
                { className: 'wfui-form-error' },
                _react2.default.createElement(
                    'span',
                    null,
                    error
                )
            ),
            touched && globalError && _react2.default.createElement(
                _index.HelpBlock,
                { className: 'wfui-form-error' },
                _react2.default.createElement(
                    'span',
                    null,
                    globalError
                )
            ),
            help && _react2.default.createElement('div', { className: 'wfui-form-description', dangerouslySetInnerHTML: { __html: help } })
        )
    );
};

var renderSingleCheckbox = exports.renderSingleCheckbox = function renderSingleCheckbox(_ref3) {
    var className = _ref3.className,
        label = _ref3.label,
        option = _ref3.option,
        input = _ref3.input,
        help = _ref3.help,
        required = _ref3.required,
        disabled = _ref3.disabled,
        globalError = _ref3.globalError,
        _ref3$meta = _ref3.meta,
        touched = _ref3$meta.touched,
        error = _ref3$meta.error;
    return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(className, 'wfui-form-item wfui-form-singlecheckbox', { 'wfui-form-item-error': error || globalError }) },
        label && _react2.default.createElement(
            _index.ControlLabel,
            null,
            label
        ),
        _react2.default.createElement(
            _index.FormGroup,
            { validationState: touched && (error || globalError) ? 'error' : null },
            _react2.default.createElement(
                _index.Checkbox,
                _extends({ className: input.checked ? 'active' : '' }, input, { disabled: disabled }),
                option,
                ' ',
                required && _react2.default.createElement(
                    'b',
                    { className: 'required' },
                    '*'
                )
            ),
            touched && error && _react2.default.createElement(
                _index.HelpBlock,
                { className: 'wfui-form-error' },
                _react2.default.createElement(
                    'span',
                    null,
                    error
                )
            ),
            touched && globalError && _react2.default.createElement(
                _index.HelpBlock,
                { className: 'wfui-form-error' },
                _react2.default.createElement(
                    'span',
                    null,
                    globalError
                )
            ),
            help && _react2.default.createElement('div', { className: 'wfui-form-description', dangerouslySetInnerHTML: { __html: help } })
        )
    );
};

var renderCheckboxs = exports.renderCheckboxs = function renderCheckboxs(_ref4) {
    var className = _ref4.className,
        label = _ref4.label,
        options = _ref4.options,
        input = _ref4.input,
        help = _ref4.help,
        required = _ref4.required,
        disabled = _ref4.disabled,
        globalError = _ref4.globalError,
        _ref4$meta = _ref4.meta,
        touched = _ref4$meta.touched,
        error = _ref4$meta.error;
    return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(className, 'wfui-form-item', { 'wfui-form-item-error': error || globalError }) },
        _react2.default.createElement(
            _index.ControlLabel,
            null,
            label
        ),
        required && _react2.default.createElement(
            'b',
            { className: 'required' },
            ' *'
        ),
        _react2.default.createElement(
            _index.FormGroup,
            { className: 'wfui-form-checkboxes', validationState: touched && (error || globalError) ? 'error' : null },
            options.map(function (option, i) {
                var _key = typeof option === 'string' ? option : option.key;
                var _option = typeof option === 'string' ? option : option.value;
                return _react2.default.createElement(
                    _index.Checkbox,
                    {
                        key: i,
                        name: input.name,
                        value: _key,
                        disabled: disabled,
                        checked: input.value && input.value.includes(_key),
                        className: input.value && input.value.includes(_key) ? 'active' : '',
                        onChange: function onChange(e) {
                            var newValue = [].concat(_toConsumableArray(input.value));
                            if (e.target.checked) {
                                newValue.push(_key);
                            } else {
                                newValue.splice(newValue.indexOf(_key), 1);
                            }
                            return input.onChange(newValue);
                        }
                    },
                    _option
                );
            }),
            touched && error && _react2.default.createElement(
                _index.HelpBlock,
                { className: 'wfui-form-error' },
                _react2.default.createElement(
                    'span',
                    null,
                    error
                )
            ),
            touched && globalError && _react2.default.createElement(
                _index.HelpBlock,
                { className: 'wfui-form-error' },
                _react2.default.createElement(
                    'span',
                    null,
                    globalError
                )
            ),
            help && _react2.default.createElement('div', { className: 'wfui-form-description', dangerouslySetInnerHTML: { __html: help } })
        )
    );
};

// export const renderCheckboxes = renderCheckboxs;

var renderRadios = exports.renderRadios = function renderRadios(_ref5) {
    var className = _ref5.className,
        label = _ref5.label,
        options = _ref5.options,
        input = _ref5.input,
        help = _ref5.help,
        required = _ref5.required,
        disabled = _ref5.disabled,
        globalError = _ref5.globalError,
        _ref5$meta = _ref5.meta,
        touched = _ref5$meta.touched,
        error = _ref5$meta.error;
    return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(className, 'wfui-form-item', { 'wfui-form-item-error': error || globalError }) },
        _react2.default.createElement(
            _index.ControlLabel,
            null,
            label
        ),
        required && _react2.default.createElement(
            'b',
            { className: 'required' },
            ' *'
        ),
        _react2.default.createElement(
            _index.FormGroup,
            { className: 'wfui-form-radios', validationState: touched && (error || globalError) ? 'error' : null },
            options.map(function (option, i) {
                var _key = typeof option === 'string' ? option : option.key;
                var _option = typeof option === 'string' ? option : option.value;
                return _react2.default.createElement(
                    _index.Radio,
                    {
                        className: input.value === _key ? 'active' : '',
                        key: i,
                        name: input.name,
                        value: _key,
                        checked: input.value === _key,
                        disabled: disabled,
                        onClick: function onClick(e) {
                            return input.onChange(e.target.value);
                        }
                    },
                    _option
                );
            }),
            touched && error && _react2.default.createElement(
                _index.HelpBlock,
                { className: 'wfui-form-error' },
                _react2.default.createElement(
                    'span',
                    null,
                    error
                )
            ),
            touched && globalError && _react2.default.createElement(
                _index.HelpBlock,
                { className: 'wfui-form-error' },
                _react2.default.createElement(
                    'span',
                    null,
                    globalError
                )
            ),
            help && _react2.default.createElement('div', { className: 'wfui-form-description', dangerouslySetInnerHTML: { __html: help } })
        )
    );
};

var renderSelect = exports.renderSelect = function renderSelect(_ref6) {
    var className = _ref6.className,
        label = _ref6.label,
        options = _ref6.options,
        input = _ref6.input,
        help = _ref6.help,
        required = _ref6.required,
        disabled = _ref6.disabled,
        globalError = _ref6.globalError,
        _ref6$meta = _ref6.meta,
        touched = _ref6$meta.touched,
        error = _ref6$meta.error;
    return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(className, 'wfui-form-item', { 'wfui-form-item-error': error || globalError }, { answered: input.value }) },
        _react2.default.createElement(
            _index.ControlLabel,
            null,
            label
        ),
        required && _react2.default.createElement(
            'b',
            { className: 'required' },
            ' *'
        ),
        _react2.default.createElement(
            _index.FormGroup,
            { className: 'wfui-form-select', validationState: touched && (error || globalError) ? 'error' : null },
            _react2.default.createElement(
                _index.FormControl,
                _extends({}, input, { onChange: input.onChange, componentClass: 'select' }),
                options.map(function (option, i) {
                    var _key = typeof option === 'string' ? option : option.key;
                    var _option = typeof option === 'string' ? option : option.value;
                    return _react2.default.createElement(
                        'option',
                        {
                            key: i,
                            name: input.name,
                            value: _key,
                            disabled: disabled,
                            onChange: function onChange(e) {
                                return input.onChange(e.target.value);
                            }
                        },
                        _option
                    );
                })
            ),
            touched && error && _react2.default.createElement(
                _index.HelpBlock,
                { className: 'wfui-form-error' },
                _react2.default.createElement(
                    'span',
                    null,
                    error
                )
            ),
            touched && globalError && _react2.default.createElement(
                _index.HelpBlock,
                { className: 'wfui-form-error' },
                _react2.default.createElement(
                    'span',
                    null,
                    globalError
                )
            ),
            help && _react2.default.createElement('div', { className: 'wfui-form-description', dangerouslySetInnerHTML: { __html: help } })
        )
    );
};

var renderAddAnother = exports.renderAddAnother = function (_React$Component) {
    _inherits(renderAddAnother, _React$Component);

    function renderAddAnother() {
        _classCallCheck(this, renderAddAnother);

        return _possibleConstructorReturn(this, (renderAddAnother.__proto__ || Object.getPrototypeOf(renderAddAnother)).apply(this, arguments));
    }

    _createClass(renderAddAnother, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                className = _props.className,
                fields = _props.fields,
                childComponent = _props.childComponent,
                draggable = _props.draggable,
                label = _props.label,
                help = _props.help,
                required = _props.required,
                disabled = _props.disabled,
                error = _props.meta.error;

            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)(className, 'wfui-form-item', { 'wfui-form-item-error': error }) },
                _react2.default.createElement(
                    _index.ControlLabel,
                    null,
                    label
                ),
                required && _react2.default.createElement(
                    'b',
                    { className: 'required' },
                    ' *'
                ),
                _react2.default.createElement(
                    _index.FormGroup,
                    { className: 'wfui-form-addAnother', validationState: error ? 'error' : null },
                    draggable && fields.length > 0 && _react2.default.createElement(
                        _Draggable2.default,
                        {
                            onHandleItemMove: function onHandleItemMove(from, to) {
                                fields.move(from, to);
                                setTimeout(function () {
                                    return _this2.forceUpdate();
                                }, 1);
                            },
                            onHandleEndDrag: function onHandleEndDrag() {
                                _this2.forceUpdate();
                            }
                        },
                        fields.map(function (field, i) {
                            return _react2.default.createElement(
                                _Draggable2.default.Item,
                                { key: i, id: field },
                                _react2.default.createElement(
                                    _Draggable2.default.Handle,
                                    null,
                                    _react2.default.createElement(_index.Glyphicon, { glyph: 'fullscreen', style: { transform: 'rotate(45deg)' } })
                                ),
                                childComponent(field, i),
                                _react2.default.createElement(
                                    'a',
                                    { className: 'delete-icon', onClick: function onClick() {
                                            return fields.remove(i);
                                        } },
                                    'Delete'
                                )
                            );
                        })
                    ),
                    !draggable && fields.map(function (field, i) {
                        return _react2.default.createElement(
                            'div',
                            null,
                            childComponent(field, i),
                            _react2.default.createElement(
                                'a',
                                { className: 'delete-icon', onClick: function onClick() {
                                        return fields.remove(i);
                                    } },
                                'Delete'
                            )
                        );
                    }),
                    _react2.default.createElement(
                        _index.Button,
                        { bsStyle: 'default', className: 'add-btn', onClick: function onClick() {
                                fields.push();
                            } },
                        'Add Another Item'
                    ),
                    error && _react2.default.createElement(
                        _index.HelpBlock,
                        { className: 'wfui-form-error' },
                        _react2.default.createElement(
                            'span',
                            null,
                            error
                        )
                    ),
                    help && _react2.default.createElement('div', { className: 'wfui-form-description', dangerouslySetInnerHTML: { __html: help } })
                )
            );
        }
    }]);

    return renderAddAnother;
}(_react2.default.Component);

var renderTimezone = exports.renderTimezone = function renderTimezone(_ref7) {
    var className = _ref7.className,
        label = _ref7.label,
        placeholder = _ref7.placeholder,
        input = _ref7.input,
        help = _ref7.help,
        required = _ref7.required,
        _ref7$meta = _ref7.meta,
        touched = _ref7$meta.touched,
        error = _ref7$meta.error;
    return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(className, 'wfui-form-item', { 'wfui-form-item-error': error }) },
        _react2.default.createElement(
            _index.ControlLabel,
            null,
            label
        ),
        required && _react2.default.createElement(
            'b',
            { className: 'required' },
            ' *'
        ),
        _react2.default.createElement(
            _index.FormGroup,
            { validationState: touched && error ? 'error' : null },
            _react2.default.createElement(_reactTimezone2.default, _extends({
                className: 'wfui-form-timezone'
            }, input, {
                onChange: function onChange(timezone) {
                    return input.onChange(timezone);
                },
                inputProps: {
                    placeholder: placeholder
                }
            })),
            touched && error && _react2.default.createElement(
                _index.HelpBlock,
                { className: 'wfui-form-error' },
                _react2.default.createElement(
                    'span',
                    null,
                    error
                )
            )
        )
    );
};

var renderPhoto = exports.renderPhoto = function (_React$Component2) {
    _inherits(renderPhoto, _React$Component2);

    function renderPhoto() {
        _classCallCheck(this, renderPhoto);

        var _this3 = _possibleConstructorReturn(this, (renderPhoto.__proto__ || Object.getPrototypeOf(renderPhoto)).call(this));

        _this3.state = {};
        return _this3;
    }

    _createClass(renderPhoto, [{
        key: 'render',
        value: function render() {
            var _this4 = this;

            var _props2 = this.props,
                className = _props2.className,
                input = _props2.input,
                label = _props2.label,
                required = _props2.required,
                help = _props2.help,
                _props2$meta = _props2.meta,
                touched = _props2$meta.touched,
                error = _props2$meta.error;

            return input.value ? _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)(className, 'wfui-form-item', { 'wfui-form-item-error': error }) },
                _react2.default.createElement(
                    _index.ControlLabel,
                    null,
                    label
                ),
                required && _react2.default.createElement(
                    'b',
                    { className: 'required' },
                    ' *'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'wfui-form-photo file-chosen' },
                    _react2.default.createElement(
                        'p',
                        { className: 'image-preview' },
                        _react2.default.createElement('img', {
                            style: { height: 100 },
                            src: input.value
                        })
                    ),
                    _react2.default.createElement(
                        _index.Button,
                        { className: 'btn-remove', onClick: function onClick() {
                                input.onChange('');_this4.setState({ hasFile: false });
                            } },
                        'Remove Image'
                    )
                )
            ) : _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)(className, 'wfui-form-item') },
                _react2.default.createElement(
                    _index.ControlLabel,
                    null,
                    label
                ),
                required && _react2.default.createElement(
                    'b',
                    { className: 'required' },
                    ' *'
                ),
                _react2.default.createElement(
                    _reactDropzone2.default,
                    _extends({}, input, {
                        name: input.name,
                        className: 'wfui-form-photo choose-file',
                        onDrop: function onDrop(acceptedFiles) {
                            var reader = new FileReader();
                            reader.readAsDataURL(acceptedFiles[0]);
                            reader.onloadend = function () {
                                return input.onChange(reader.result);
                            };
                            _this4.setState({ hasFile: true });
                        }
                    }),
                    'Choose File'
                ),
                touched && error && _react2.default.createElement(
                    _index.HelpBlock,
                    { className: 'wfui-form-error' },
                    _react2.default.createElement(
                        'span',
                        null,
                        error
                    )
                ),
                help && _react2.default.createElement('div', { className: 'wfui-form-description', dangerouslySetInnerHTML: { __html: help } })
            );
        }
    }]);

    return renderPhoto;
}(_react2.default.Component);

exports.renderTableFormat = _renderTableFormat3.default;
exports.renderSelectionHybridCheckbox = _renderSelectionHybridCheckbox3.default;
exports.renderSelectionHybridRadio = _renderSelectionHybridRadio3.default;
exports.renderFilterTable = _renderFilterTable3.default;