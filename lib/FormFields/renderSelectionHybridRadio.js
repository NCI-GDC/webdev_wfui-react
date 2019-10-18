function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React, { cloneElement } from 'react';
import { Field } from 'redux-form';
import classNames from 'classnames';
import _ from 'lodash';
import { FormFields, FormGroup, ControlLabel, Radio, HelpBlock, Form } from '../../index';
import { renderField } from './index';

var renderSelectionHybridRadio =
/*#__PURE__*/
function (_React$Component) {
  _inherits(renderSelectionHybridRadio, _React$Component);

  function renderSelectionHybridRadio(props) {
    var _this;

    _classCallCheck(this, renderSelectionHybridRadio);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(renderSelectionHybridRadio).call(this));
    _this.onHandleChange = _this.onHandleChange.bind(_assertThisInitialized(_this));
    _this.state = {
      options: _this.parseOptions(props)
    };
    return _this;
  }

  _createClass(renderSelectionHybridRadio, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.options.join('') !== nextProps.options.join('')) {
        this.setState({
          options: this.parseOptions(nextProps)
        });
      }
    }
  }, {
    key: "onHandleChange",
    value: function onHandleChange(value) {
      var _this$props = this.props,
          name = _this$props.name,
          input = _this$props.input,
          fieldMap = _this$props.fieldMap;
      var radioCid = fieldMap._radio.cid;

      var childComponents = _.get(this.props, name);

      var radioProps = childComponents[radioCid]; // Reset input fields logic

      var exceptions = ['_radio', value];
      Object.keys(fieldMap).map(function (key) {
        if (!exceptions.includes(key)) {
          // Reset value
          var fieldProps = childComponents[fieldMap[key].cid];
          fieldProps.input.onChange('');
        }
      });
      radioProps.input.onChange(value);
    }
  }, {
    key: "parseOptions",
    value: function parseOptions(props) {
      return props.options.map(function (option) {
        return {
          key: props.getOptKey(option),
          value: props.getOptVal(option)
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          className = _this$props2.className,
          name = _this$props2.name,
          label = _this$props2.label,
          required = _this$props2.required,
          help = _this$props2.help,
          globalError = _this$props2.globalError,
          fieldMap = _this$props2.fieldMap,
          columnCount = _this$props2.columnCount,
          disabled = _this$props2.disabled,
          preview = _this$props2.preview,
          descDisplay = _this$props2.descDisplay,
          fullWidth = _this$props2.fullWidth;
      var options = this.state.options;
      var radioCid = fieldMap._radio.cid;

      var childComponents = _.get(this.props, name);

      var radioProps = childComponents[radioCid];
      var components = [];
      var allTouched = true;
      var allPristine = true;
      Object.keys(childComponents).map(function (key) {
        var props = childComponents[key];
        allTouched = allTouched && props.meta.touched;
        allPristine = allPristine && props.meta.pristine;
        components.push(renderField(props));
      });
      return React.createElement("div", {
        className: classNames(className, 'wfui-form-item', {
          'wfui-form-item-error': allTouched && globalError
        }, {
          'wfui-form-disabled': disabled
        }, {
          'wfui-form-preview': preview
        }, {
          'wfui-form-item-full-width': fullWidth
        })
      }, label && React.createElement("div", {
        className: "wfui-form-label"
      }, React.createElement(ControlLabel, null, label, required && React.createElement("b", {
        className: "required"
      }, " *"))), React.createElement(FormGroup, {
        className: "wfui-form-field ".concat(descDisplay ? 'wfui-form-field-with-description' : 'wfui-form-field-no-description', " wfui-radios-hybrid column-count-").concat(columnCount),
        validationState: allTouched && globalError ? 'error' : null
      }, options.map(function (option, i) {
        var _key = typeof option === 'string' ? option : option.key;

        var _option = typeof option === 'string' ? option : option.value;

        var renderRadio = React.createElement(Form.Check, {
          type: "radio",
          key: i,
          className: "".concat(radioProps.input.value === _key ? 'active' : '', " ").concat(fieldMap[_key] ? 'radio-with-radioHybrid' : ''),
          name: "".concat(name, ".").concat(radioCid),
          value: _key,
          checked: radioProps.input.value === _key,
          onClick: function onClick(e) {
            return _this2.onHandleChange(e.target.value);
          },
          disabled: disabled
        }, React.createElement(Form.Check.Label, null, React.createElement(Form.Check.Input, {
          type: "checkbox"
        }), React.createElement("span", {
          dangerouslySetInnerHTML: {
            __html: _option
          }
        }), fieldMap[_key] && React.createElement("div", {
          key: i,
          className: "radioHybrid"
        }, React.createElement(Field, _extends({}, fieldMap[_key], {
          name: "".concat(name, ".").concat(fieldMap[_key].cid),
          type: fieldMap[_key].field_type || 'text',
          component: renderField,
          disabled: disabled,
          onFocus: function onFocus() {
            _this2.onHandleChange(_key);
          } // Change radio when it's focused.

        })))));
        return renderRadio;
      }), React.createElement(HelpBlock, null, ' ', allTouched && globalError && React.createElement("span", null, globalError), ' '), help && !preview && React.createElement("div", {
        className: "wfui-form-help",
        dangerouslySetInnerHTML: {
          __html: help
        }
      })), descDisplay && !preview ? cloneElement(descDisplay) : '');
    }
  }]);

  return renderSelectionHybridRadio;
}(React.Component);

export { renderSelectionHybridRadio as default };