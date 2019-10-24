function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import classNames from 'classnames';
import _ from 'lodash';
import { Form, Checkbox, FormFields, FormGroup, ControlLabel, HelpBlock } from '../index';
import { renderField } from './index';

var renderSelectionHybridCheckbox =
/*#__PURE__*/
function (_React$Component) {
  _inherits(renderSelectionHybridCheckbox, _React$Component);

  function renderSelectionHybridCheckbox(props) {
    var _this;

    _classCallCheck(this, renderSelectionHybridCheckbox);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(renderSelectionHybridCheckbox).call(this));
    var exclusives = [];
    var options = [];
    _this.state = _this.parseOptionsAndSpecials(props);
    _this.onHandleChange = _this.onHandleChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(renderSelectionHybridCheckbox, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.options.join('') !== nextProps.options.join('')) {
        this.setState(this.parseOptionsAndSpecials(nextProps));
      }
    }
  }, {
    key: "onHandleChange",
    value: function onHandleChange(values, checkedValue) {
      var _this$props = this.props,
          name = _this$props.name,
          input = _this$props.input,
          fieldMap = _this$props.fieldMap;
      var exclusives = this.state.exclusives;
      var checkboxCid = fieldMap && fieldMap._checkbox && fieldMap._checkbox.cid;

      var childComponents = _.get(this.props, name);

      var checkboxProps = childComponents[checkboxCid];
      var nextValues = values; // Exclusive feature

      if (exclusives.length > 0) {
        if (checkedValue !== false && exclusives.includes(checkedValue)) {
          nextValues = [checkedValue];
        } else if (checkedValue !== false && !exclusives.includes(checkedValue)) {
          nextValues = values.filter(function (value) {
            return !exclusives.includes(value);
          });
        }
      } // Reset Value if it's not checked.


      Object.keys(fieldMap).forEach(function (key) {
        if (key !== '_checkbox' && !nextValues.includes(key)) {
          var fieldProps = childComponents[fieldMap[key].cid];
          fieldProps.input.onChange('');
        }
      });
      checkboxProps.input.onChange(nextValues);
    }
  }, {
    key: "parseOptionsAndSpecials",
    value: function parseOptionsAndSpecials(props) {
      var exclusives = [];
      var options = [];

      if (props.options) {
        props.options.forEach(function (option) {
          var key = props.getOptKey(option);
          var special = props.getOptSpecial(option);

          if (special.includes('exclusive')) {
            exclusives.push(key);
          }

          options.push({
            key: key,
            value: props.getOptVal(option)
          });
        });
      }

      return {
        options: options,
        exclusives: exclusives
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      // const { questionId, className, label, input, help, required, disabled, fieldMap, meta: { touched, error } } = this.props;
      var _this$props2 = this.props,
          className = _this$props2.className,
          name = _this$props2.name,
          label = _this$props2.label,
          required = _this$props2.required,
          help = _this$props2.help,
          globalError = _this$props2.globalError,
          fieldMap = _this$props2.fieldMap,
          disabled = _this$props2.disabled,
          columnCount = _this$props2.columnCount,
          preview = _this$props2.preview,
          descDisplay = _this$props2.descDisplay,
          fullWidth = _this$props2.fullWidth;
      var options = this.state.options;
      var checkboxCid = fieldMap && fieldMap._checkbox && fieldMap._checkbox.cid;

      var childComponents = _.get(this.props, name);

      var checkboxProps = childComponents[checkboxCid];
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
        className: "wfui-form-field ".concat(descDisplay ? 'wfui-form-field-with-description' : 'wfui-form-field-no-description', " wfui-checkboxes-hybrid column-count-").concat(columnCount),
        validationState: allTouched && globalError ? 'error' : null
      }, options.map(function (option, i) {
        var _key = typeof option === 'string' ? option : option.key;

        var _option = typeof option === 'string' ? option : option.value;

        var renderCheckbox = React.createElement(Form.Check, {
          type: "checkbox",
          key: i,
          className: "".concat(checkboxProps.input.value && checkboxProps.input.value.includes(_key) ? 'active' : '', " ").concat(fieldMap[_key] ? 'checkbox-with-checkboxHybrid' : '')
        }, React.createElement(Form.Check.Label, null, React.createElement(Form.Check.Input, {
          type: "checkbox",
          name: "".concat(name, ".").concat(checkboxCid),
          value: _key,
          disabled: disabled,
          checked: checkboxProps.input.value && checkboxProps.input.value.includes(_key),
          onChange: function onChange(e) {
            var newValue = _toConsumableArray(checkboxProps.input.value);

            if (e.target.checked) {
              newValue.push(_key);
            } else {
              newValue.splice(newValue.indexOf(_key), 1);
            }

            return _this2.onHandleChange(newValue, e.target.checked && e.target.value);
          }
        }), React.createElement("span", {
          dangerouslySetInnerHTML: {
            __html: _option
          }
        }), !label && required ? React.createElement("b", {
          className: "required"
        }, " *") : null, React.createElement("div", {
          key: i,
          className: "checkboxHybrid"
        }, fieldMap[_key] && React.createElement(Field, _extends({}, fieldMap[_key], {
          name: "".concat(name, ".").concat(fieldMap[_key].cid),
          type: fieldMap[_key].field_type || 'text',
          component: renderField,
          disabled: disabled,
          onFocus: function onFocus() {
            var newValue = _toConsumableArray(checkboxProps.input.value);

            var checked = false;

            if (!newValue.includes(_key)) {
              checked = true;
              newValue.push(_key);
            }

            _this2.onHandleChange(newValue, checked && _key);
          }
        })))));
        return renderCheckbox;
      }), preview && !checkboxProps.input.value && React.createElement("span", {
        className: "no-item"
      }, "( No Item Selected )"), React.createElement(HelpBlock, null, ' ', allTouched && globalError && React.createElement("span", null, globalError), ' '), help && !preview && React.createElement("div", {
        className: "wfui-form-help",
        dangerouslySetInnerHTML: {
          __html: help
        }
      })), descDisplay && !preview ? cloneElement(descDisplay) : '');
    }
  }]);

  return renderSelectionHybridCheckbox;
}(React.Component);

renderSelectionHybridCheckbox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  help: PropTypes.string,
  globalError: PropTypes.string,
  fieldMap: PropTypes.object,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  descDisplay: PropTypes.element,
  fullWidth: PropTypes.bool
};
renderSelectionHybridCheckbox.defaultProps = {
  fullWidth: false
};
export default renderSelectionHybridCheckbox;