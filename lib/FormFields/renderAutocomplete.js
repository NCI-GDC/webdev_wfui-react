'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Autocomplete component.
 */
var Autocomplete = function Autocomplete(_ref) {
    var fetching = _ref.fetching,
        items = _ref.items,
        onClickItem = _ref.onClickItem,
        itemDisplay = _ref.itemDisplay,
        textNoResult = _ref.textNoResult,
        autoFetched = _ref.autoFetched;
    return _react2.default.createElement(
        'div',
        { className: 'navbar-form' },
        _react2.default.createElement(
            'div',
            { className: 'form-group' },
            _react2.default.createElement(
                'ul',
                {
                    id: 'ui-autocomplete',
                    className: 'autocomplete-ps ui-menu ui-widget ui-widget-content ui-autocomplete ui-front'
                },
                !fetching && autoFetched && (!items || items.length === 0) && _react2.default.createElement(
                    'li',
                    { className: 'ui-menu-item' },
                    textNoResult
                ),
                !fetching && autoFetched && items && items.map(function (item, idx) {
                    return itemDisplay ? _react2.default.cloneElement(_react2.default.createElement(
                        'li',
                        { key: idx, className: 'ui-menu-item' },
                        itemDisplay(item, onClickItem)
                    ), Object.assign({}, {}, { key: idx })) : _react2.default.createElement(
                        'li',
                        { key: idx, className: 'ui-menu-item' },
                        _react2.default.createElement(
                            'div',
                            { className: 'ui-menu-item-wrapper' },
                            _react2.default.createElement(
                                'a',
                                { onClick: onClickItem, 'data-key': item },
                                '' + item
                            )
                        )
                    );
                }),
                fetching && _react2.default.createElement(
                    'li',
                    { className: 'mp ps' },
                    _react2.default.createElement(_.Spinner, { type: 1, color: '#0072c6', fontSize: '5px', margin: '10px auto' })
                )
            )
        )
    );
};

/**
 * Reusable field component.
 */

var renderAutocomplete = function (_React$Component) {
    _inherits(renderAutocomplete, _React$Component);

    function renderAutocomplete() {
        _classCallCheck(this, renderAutocomplete);

        var _this = _possibleConstructorReturn(this, (renderAutocomplete.__proto__ || Object.getPrototypeOf(renderAutocomplete)).call(this));

        _this.state = {
            autoCompleteItems: [],
            fetching: false,
            term: '',
            autoTerm: 'default',
            secondsElapsed: 0,
            autoFetched: false
        };
        return _this;
    }

    _createClass(renderAutocomplete, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var queryInterval = this.props.queryInterval;

            this.interval = setInterval(function () {
                return _this2.tick();
            }, queryInterval);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearInterval(this.interval);
        }
    }, {
        key: 'tick',
        value: function tick() {
            var _this3 = this;

            var getAutocomplete = this.props.getAutocomplete;
            var _state = this.state,
                fetching = _state.fetching,
                secondsElapsed = _state.secondsElapsed,
                term = _state.term,
                autoTerm = _state.autoTerm;


            if (!fetching) {
                if (secondsElapsed > 3) {
                    if (term.length > 0 && autoTerm !== term) {
                        this.setState({
                            autoTerm: term,
                            secondsElapsed: 0,
                            fetching: true,
                            autoFetched: false
                        });
                        getAutocomplete(term).then(function (_ref2) {
                            var data = _ref2.data;

                            _this3.setState({
                                fetching: false,
                                autoFetched: true,
                                autoCompleteItems: data
                            });
                        });
                    }
                } else {
                    this.setState(function (prevState) {
                        return {
                            secondsElapsed: prevState.secondsElapsed + 1
                        };
                    });
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var _props = this.props,
                className = _props.className,
                inline = _props.inline,
                input = _props.input,
                label = _props.label,
                postfix = _props.postfix,
                help = _props.help,
                placeholder = _props.placeholder,
                type = _props.type,
                maxlength = _props.maxlength,
                max = _props.max,
                min = _props.min,
                onHandleChange = _props.onHandleChange,
                required = _props.required,
                disabled = _props.disabled,
                preview = _props.preview,
                globalError = _props.globalError,
                itemDisplay = _props.itemDisplay,
                textNoResult = _props.textNoResult,
                fullWidth = _props.fullWidth,
                _props$meta = _props.meta,
                touched = _props$meta.touched,
                error = _props$meta.error;
            var _state2 = this.state,
                fetching = _state2.fetching,
                autoFetched = _state2.autoFetched,
                term = _state2.term,
                autoCompleteItems = _state2.autoCompleteItems;


            return _react2.default.createElement(
                'div',
                {
                    className: (0, _classnames2.default)(className, 'wfui-form-item', { 'wfui-form-item-error': error || globalError }, { 'wfui-form-inline': inline }, { 'wfui-form-disabled': disabled }, { 'wfui-form-preview': preview }, { answered: input.value }, { 'wfui-form-item-full-width': fullWidth })
                },
                _react2.default.createElement(
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
                        className: 'wfui-form-input wfui-form-autocomplete',
                        validationState: touched && (error || globalError) ? 'error' : null
                    },
                    _react2.default.createElement(_.FormControl, _extends({}, input, {
                        placeholder: placeholder || placeholder === '' ? placeholder : label,
                        type: type,
                        maxLength: maxlength,
                        min: min,
                        max: max,
                        disabled: disabled,
                        onChange: function onChange(e) {
                            input.onChange(e);
                            _this4.setState({
                                term: e.target.value,
                                secondsElapsed: 0,
                                autoFetched: false
                            });
                            if (!e.target.value) {
                                _this4.setState({
                                    term: '',
                                    autoTerm: 'default',
                                    autoCompleteItems: []
                                });
                            }
                            if (onHandleChange) onHandleChange(e);
                        }
                    })),
                    postfix && _react2.default.createElement(
                        'div',
                        { className: 'wfui-form-postfix' },
                        postfix
                    ),
                    (autoCompleteItems.length > 0 || term) && _react2.default.createElement(Autocomplete, {
                        items: autoCompleteItems,
                        onClickItem: function onClickItem(e) {
                            var _term = e.target.getAttribute('data-key');
                            if (_term) {
                                input.onChange(_term);
                                _this4.setState({
                                    term: _term,
                                    autoTerm: _term,
                                    autoCompleteItems: [],
                                    autoFetched: false
                                });
                                if (onHandleChange) onHandleChange(_term);
                            }
                        },
                        autoFetched: autoFetched,
                        fetching: fetching,
                        itemDisplay: itemDisplay,
                        textNoResult: textNoResult
                    }),
                    _react2.default.createElement(_.FormControl.Feedback, null),
                    touched && error && _react2.default.createElement(
                        _.HelpBlock,
                        { className: 'wfui-form-error' },
                        _react2.default.createElement(
                            'span',
                            null,
                            error
                        )
                    ),
                    touched && globalError && _react2.default.createElement(
                        _.HelpBlock,
                        { className: 'wfui-form-error' },
                        _react2.default.createElement(
                            'span',
                            null,
                            globalError
                        )
                    ),
                    help && _react2.default.createElement('div', {
                        className: 'wfui-form-help',
                        dangerouslySetInnerHTML: { __html: help }
                    })
                )
            );
        }
    }]);

    return renderAutocomplete;
}(_react2.default.Component);

renderAutocomplete.propTypes = {
    queryInterval: _propTypes2.default.number,
    fullWidth: _propTypes2.default.bool
};
renderAutocomplete.defaultProps = {
    queryInterval: 100,
    textNoResult: 'No results available',
    fullWidth: false
};

exports.default = renderAutocomplete;