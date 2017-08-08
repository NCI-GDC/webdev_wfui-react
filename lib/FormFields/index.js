'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.renderPhoto = exports.renderTimezone = exports.renderAddAnother = exports.renderSelect = exports.renderRadios = exports.renderCheckboxes = exports.renderCheckboxs = exports.renderSingleCheckbox = exports.renderTextArea = exports.renderField = undefined;

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
        input = _ref.input,
        label = _ref.label,
        help = _ref.help,
        placeholder = _ref.placeholder,
        type = _ref.type,
        onHandleChange = _ref.onHandleChange,
        required = _ref.required,
        disabled = _ref.disabled,
        _ref$meta = _ref.meta,
        touched = _ref$meta.touched,
        error = _ref$meta.error;
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
            { className: 'wfui-form-input', validationState: touched && error ? 'error' : null },
            _react2.default.createElement(_index.FormControl, _extends({}, input, { placeholder: placeholder || placeholder === '' ? placeholder : label, type: type,
                disabled: disabled,
                onChange: function onChange(e) {
                    input.onChange(e);
                    if (onHandleChange) onHandleChange(e);
                }
            })),
            _react2.default.createElement(_index.FormControl.Feedback, null),
            _react2.default.createElement(
                _index.HelpBlock,
                null,
                ' ',
                touched && error && _react2.default.createElement(
                    'span',
                    null,
                    error
                ),
                ' '
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
        _ref2$meta = _ref2.meta,
        touched = _ref2$meta.touched,
        error = _ref2$meta.error,
        rows = _ref2.rows;
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
            { className: 'wfui-form-textarea', validationState: touched && error ? 'error' : null },
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
            _react2.default.createElement(
                _index.HelpBlock,
                null,
                touched && error && _react2.default.createElement(
                    'span',
                    null,
                    error
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
        _ref3$meta = _ref3.meta,
        touched = _ref3$meta.touched,
        error = _ref3$meta.error;
    return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(className, 'wfui-form-item wfui-form-singlecheckbox', { 'wfui-form-item-error': error }) },
        label && _react2.default.createElement(
            _index.ControlLabel,
            null,
            label
        ),
        _react2.default.createElement(
            _index.FormGroup,
            { validationState: touched && error ? 'error' : null },
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
            _react2.default.createElement(
                _index.HelpBlock,
                null,
                touched && error && _react2.default.createElement(
                    'span',
                    null,
                    error
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
        _ref4$meta = _ref4.meta,
        touched = _ref4$meta.touched,
        error = _ref4$meta.error;
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
            { className: 'wfui-form-checkboxes', validationState: touched && error ? 'error' : null },
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
            _react2.default.createElement(
                _index.HelpBlock,
                null,
                ' ',
                touched && error && _react2.default.createElement(
                    'span',
                    null,
                    error
                ),
                ' '
            ),
            help && _react2.default.createElement('div', { className: 'wfui-form-description', dangerouslySetInnerHTML: { __html: help } })
        )
    );
};

var renderCheckboxes = exports.renderCheckboxes = renderCheckboxs;

var renderRadios = exports.renderRadios = function renderRadios(_ref5) {
    var className = _ref5.className,
        label = _ref5.label,
        options = _ref5.options,
        input = _ref5.input,
        help = _ref5.help,
        required = _ref5.required,
        disabled = _ref5.disabled,
        _ref5$meta = _ref5.meta,
        touched = _ref5$meta.touched,
        error = _ref5$meta.error;
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
            { className: 'wfui-form-radios', validationState: touched && error ? 'error' : null },
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
            _react2.default.createElement(
                _index.HelpBlock,
                null,
                ' ',
                touched && error && _react2.default.createElement(
                    'span',
                    null,
                    error
                ),
                ' '
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
        _ref6$meta = _ref6.meta,
        touched = _ref6$meta.touched,
        error = _ref6$meta.error;
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
            { className: 'wfui-form-select', validationState: touched && error ? 'error' : null },
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
            _react2.default.createElement(
                _index.HelpBlock,
                null,
                ' ',
                touched && error && _react2.default.createElement(
                    'span',
                    null,
                    error
                ),
                ' '
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
                                childComponent(field, i)
                            );
                        })
                    ),
                    !draggable && fields.map(childComponent),
                    _react2.default.createElement(
                        _index.Button,
                        { bsStyle: 'default', className: 'add-btn', onClick: function onClick() {
                                fields.push();
                            } },
                        'Add Another Item'
                    ),
                    _react2.default.createElement(
                        _index.HelpBlock,
                        null,
                        ' ',
                        error && _react2.default.createElement(
                            'span',
                            null,
                            error
                        ),
                        ' '
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
            _react2.default.createElement(
                _index.HelpBlock,
                null,
                ' ',
                touched && error && _react2.default.createElement(
                    'span',
                    null,
                    error
                ),
                ' '
            )
        )
    );
};

var renderPhoto = exports.renderPhoto = function renderPhoto(_ref8) {
    var className = _ref8.className,
        input = _ref8.input,
        label = _ref8.label,
        required = _ref8.required,
        help = _ref8.help,
        _ref8$meta = _ref8.meta,
        touched = _ref8$meta.touched,
        error = _ref8$meta.error;

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
                        input.onChange('');undefined.setState({ hasFile: false });
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
                    undefined.setState({ hasFile: true });
                }
            }),
            'Choose File'
        ),
        _react2.default.createElement(
            _index.HelpBlock,
            null,
            touched && error && _react2.default.createElement(
                'span',
                null,
                error
            )
        ),
        help && _react2.default.createElement('div', { className: 'wfui-form-description', dangerouslySetInnerHTML: { __html: help } })
    );
};