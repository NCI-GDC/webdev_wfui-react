'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reduxForm = require('redux-form');

var form = _interopRequireWildcard(_reduxForm);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _index = require('../index');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var renderAddAnother = function (_React$Component) {
    _inherits(renderAddAnother, _React$Component);

    function renderAddAnother(props) {
        _classCallCheck(this, renderAddAnother);

        var _this = _possibleConstructorReturn(this, (renderAddAnother.__proto__ || Object.getPrototypeOf(renderAddAnother)).call(this));

        _this.init = false;
        _this.touched = false;
        return _this;
    }

    _createClass(renderAddAnother, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var _props = this.props,
                fields = _props.fields,
                minimumItem = _props.minimumItem,
                defaultValue = _props.defaultValue;

            if (!this.init) {
                // Work around for validation.
                fields.push(defaultValue);
                fields.remove(fields.length);

                // Initialize minimum item.
                if (minimumItem) {
                    for (var i = 0; i < minimumItem - fields.length; i++) {
                        fields.push(defaultValue);
                    }
                }
                this.init = true;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props2 = this.props,
                className = _props2.className,
                fields = _props2.fields,
                childComponent = _props2.childComponent,
                draggable = _props2.draggable,
                label = _props2.label,
                labelAddAnother = _props2.labelAddAnother,
                help = _props2.help,
                required = _props2.required,
                disabled = _props2.disabled,
                preview = _props2.preview,
                withContext = _props2.withContext,
                globalError = _props2.globalError,
                name = _props2.name,
                _props2$meta = _props2.meta,
                error = _props2$meta.error,
                submitFailed = _props2$meta.submitFailed,
                minimumItem = _props2.minimumItem,
                descDisplay = _props2.descDisplay,
                fullWidth = _props2.fullWidth,
                defaultValue = _props2.defaultValue;


            var Comp = withContext ? _index.DraggableWithContext : _index.Draggable;
            var DeleteButton = function DeleteButton(_ref) {
                var index = _ref.index;

                if (!disabled && fields.length > minimumItem) {
                    return _react2.default.createElement(
                        'a',
                        {
                            className: 'delete-icon',
                            onClick: function onClick() {
                                fields.remove(index);
                                _this2.touched = true;
                            }
                        },
                        'Delete'
                    );
                }
                return null;
            };

            return _react2.default.createElement(
                'div',
                {
                    className: (0, _classnames2.default)(className, 'wfui-form-item', {
                        'wfui-form-item-error': this.touched && (error || globalError)
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
                        className: 'wfui-form-field ' + (descDisplay ? 'wfui-form-field-with-description' : 'wfui-form-field-no-description') + ' wfui-form-addAnother',
                        validationState: this.touched && (error || globalError) ? 'error' : null
                    },
                    !disabled && draggable && fields.length > 0 && _react2.default.createElement(
                        Comp,
                        {
                            onHandleItemMove: function onHandleItemMove(from, to) {
                                fields.move(from, to);
                                setTimeout(function () {
                                    return _this2.forceUpdate();
                                }, 1);
                            },
                            onHandleEndDrag: function onHandleEndDrag() {
                                _this2.forceUpdate();
                            },
                            className: 'wfui-form-addAnother-item'
                        },
                        fields.map(function (field, i) {
                            return _react2.default.createElement(
                                Comp.Item,
                                { key: i, id: field },
                                _react2.default.createElement(
                                    Comp.Handle,
                                    null,
                                    _react2.default.createElement(_index.Glyphicon, {
                                        glyph: 'fullscreen',
                                        style: {
                                            transform: 'rotate(45deg)'
                                        }
                                    })
                                ),
                                childComponent(field, i),
                                _react2.default.createElement(DeleteButton, { index: i })
                            );
                        })
                    ),
                    (!draggable || disabled) && fields.map(function (field, i) {
                        return _react2.default.createElement(
                            'div',
                            { className: 'wfui-form-addAnother-item', key: i },
                            childComponent(field, i),
                            _react2.default.createElement(DeleteButton, { index: i })
                        );
                    }),
                    !disabled && _react2.default.createElement(
                        _index.Button,
                        {
                            bsStyle: 'default',
                            onClick: function onClick() {
                                fields.push(defaultValue);
                            }
                        },
                        _react2.default.createElement(
                            'span',
                            { className: 'span-plus' },
                            labelAddAnother
                        )
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
                    (this.touched || submitFailed) && globalError && _react2.default.createElement(
                        _index.HelpBlock,
                        { className: 'wfui-form-error' },
                        _react2.default.createElement(
                            'span',
                            null,
                            globalError
                        )
                    ),
                    help && !preview && _react2.default.createElement('div', {
                        className: 'wfui-form-help',
                        dangerouslySetInnerHTML: { __html: help }
                    })
                ),
                descDisplay && !preview ? (0, _react.cloneElement)(descDisplay) : ''
            );
        }
    }]);

    return renderAddAnother;
}(_react2.default.Component);

renderAddAnother.propTypes = {
    className: _propTypes2.default.string,
    childComponent: _propTypes2.default.func,
    help: _propTypes2.default.string,
    label: _propTypes2.default.string,
    labelAddAnother: _propTypes2.default.string,
    required: _propTypes2.default.bool,
    disabled: _propTypes2.default.bool,
    preview: _propTypes2.default.bool,
    draggable: _propTypes2.default.bool,
    withContext: _propTypes2.default.bool,
    minimumItem: _propTypes2.default.number,
    descDisplay: _propTypes2.default.element,
    fullWidth: _propTypes2.default.bool,
    defaultValue: _propTypes2.default.object
};
renderAddAnother.defaultProps = {
    labelAddAnother: 'Add Another Item',
    minimumItem: 0,
    fullWidth: false,
    defaultValue: null
};

exports.default = renderAddAnother;