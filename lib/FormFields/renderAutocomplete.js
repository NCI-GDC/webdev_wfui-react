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
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Spinner, FormGroup, FormControl, ControlLabel, HelpBlock } from '../index';
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
  return React.createElement("div", {
    className: "navbar-form"
  }, React.createElement("div", {
    className: "form-group"
  }, React.createElement("ul", {
    id: "ui-autocomplete",
    className: "autocomplete-ps ui-menu ui-widget ui-widget-content ui-autocomplete ui-front"
  }, !fetching && autoFetched && (!items || items.length === 0) && React.createElement("li", {
    className: "ui-menu-item"
  }, textNoResult), !fetching && autoFetched && items && items.map(function (item, idx) {
    return itemDisplay ? React.cloneElement(React.createElement("li", {
      key: idx,
      className: "ui-menu-item"
    }, itemDisplay(item, onClickItem)), Object.assign({}, {}, {
      key: idx
    })) : React.createElement("li", {
      key: idx,
      className: "ui-menu-item"
    }, React.createElement("div", {
      className: "ui-menu-item-wrapper"
    }, React.createElement("a", {
      onClick: onClickItem,
      "data-key": item
    }, "".concat(item))));
  }), fetching && React.createElement("li", {
    className: "mp ps"
  }, React.createElement(Spinner, {
    type: 1,
    color: "#0072c6",
    fontSize: '5px',
    margin: '10px auto'
  })))));
};
/**
 * Reusable field component.
 */


var renderAutocomplete =
/*#__PURE__*/
function (_React$Component) {
  _inherits(renderAutocomplete, _React$Component);

  function renderAutocomplete() {
    var _this;

    _classCallCheck(this, renderAutocomplete);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(renderAutocomplete).call(this));
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
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var queryInterval = this.props.queryInterval;
      this.interval = setInterval(function () {
        return _this2.tick();
      }, queryInterval);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.interval);
    }
  }, {
    key: "tick",
    value: function tick() {
      var _this3 = this;

      var getAutocomplete = this.props.getAutocomplete;
      var _this$state = this.state,
          fetching = _this$state.fetching,
          secondsElapsed = _this$state.secondsElapsed,
          term = _this$state.term,
          autoTerm = _this$state.autoTerm;

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
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props = this.props,
          className = _this$props.className,
          inline = _this$props.inline,
          input = _this$props.input,
          label = _this$props.label,
          postfix = _this$props.postfix,
          help = _this$props.help,
          placeholder = _this$props.placeholder,
          type = _this$props.type,
          maxlength = _this$props.maxlength,
          max = _this$props.max,
          min = _this$props.min,
          onHandleChange = _this$props.onHandleChange,
          required = _this$props.required,
          disabled = _this$props.disabled,
          preview = _this$props.preview,
          globalError = _this$props.globalError,
          itemDisplay = _this$props.itemDisplay,
          textNoResult = _this$props.textNoResult,
          fullWidth = _this$props.fullWidth,
          _this$props$meta = _this$props.meta,
          touched = _this$props$meta.touched,
          error = _this$props$meta.error;
      var _this$state2 = this.state,
          fetching = _this$state2.fetching,
          autoFetched = _this$state2.autoFetched,
          term = _this$state2.term,
          autoCompleteItems = _this$state2.autoCompleteItems;
      return React.createElement("div", {
        className: classNames(className, 'wfui-form-item', {
          'wfui-form-item-error': touched && (error || globalError)
        }, {
          'wfui-form-inline': inline
        }, {
          'wfui-form-disabled': disabled
        }, {
          'wfui-form-preview': preview
        }, {
          answered: input.value
        }, {
          'wfui-form-item-full-width': fullWidth
        })
      }, React.createElement("div", {
        className: "wfui-form-label"
      }, React.createElement(ControlLabel, null, label, required && React.createElement("b", {
        className: "required"
      }, " *"))), React.createElement(FormGroup, {
        className: "wfui-form-input wfui-form-autocomplete",
        validationState: touched && (error || globalError) ? 'error' : null
      }, React.createElement(FormControl, _extends({}, input, {
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
        },
        autoComplete: "off"
      })), postfix && React.createElement("div", {
        className: "wfui-form-postfix"
      }, postfix), (autoCompleteItems.length > 0 || term) && React.createElement(Autocomplete, {
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
      }), React.createElement(FormControl.Feedback, null), touched && error && React.createElement(HelpBlock, {
        className: "wfui-form-error"
      }, React.createElement("span", null, error)), touched && globalError && React.createElement(HelpBlock, {
        className: "wfui-form-error"
      }, React.createElement("span", null, globalError)), help && React.createElement("div", {
        className: "wfui-form-help",
        dangerouslySetInnerHTML: {
          __html: help
        }
      })));
    }
  }]);

  return renderAutocomplete;
}(React.Component);

renderAutocomplete.propTypes = {
  queryInterval: PropTypes.number,
  fullWidth: PropTypes.bool
};
renderAutocomplete.defaultProps = {
  queryInterval: 100,
  textNoResult: 'No results available',
  fullWidth: false
};
export default renderAutocomplete;