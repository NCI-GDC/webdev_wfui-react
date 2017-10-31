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
                labelAddAnother = _props.labelAddAnother,
                help = _props.help,
                required = _props.required,
                disabled = _props.disabled,
                withContext = _props.withContext,
                error = _props.meta.error;


            var Comp = withContext ? _index.DraggableWithContext : _index.Draggable;

            return _react2.default.createElement(
                'div',
                {
                    className: (0, _classnames2.default)(className, 'wfui-form-item', {
                        'wfui-form-item-error': error
                    })
                },
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
                    {
                        className: 'wfui-form-addAnother',
                        validationState: error ? 'error' : null
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
                            }
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
                                !disabled && _react2.default.createElement(
                                    'a',
                                    {
                                        className: 'delete-icon',
                                        onClick: function onClick() {
                                            return fields.remove(i);
                                        }
                                    },
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
                            !disabled && _react2.default.createElement(
                                'a',
                                {
                                    className: 'delete-icon',
                                    onClick: function onClick() {
                                        return fields.remove(i);
                                    }
                                },
                                'Delete'
                            )
                        );
                    }),
                    !disabled && _react2.default.createElement(
                        _index.Button,
                        {
                            bsStyle: 'default',
                            className: 'add-btn',
                            onClick: function onClick() {
                                fields.push();
                            }
                        },
                        labelAddAnother
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
                    help && _react2.default.createElement('div', {
                        className: 'wfui-form-description',
                        dangerouslySetInnerHTML: { __html: help }
                    })
                )
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
    draggable: _propTypes2.default.bool,
    withContext: _propTypes2.default.bool
};
renderAddAnother.defaultProps = {
    labelAddAnother: 'Add Another Item'
};

exports.default = renderAddAnother;