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

import React, { cloneElement } from 'react';
import { Field } from 'react-final-form';
import classNames from 'classnames';
import _ from 'lodash';
import { FormFields, FormGroup, ControlLabel, HelpBlock } from '../index';
import { renderField } from './index';

var renderTableFormat =
/*#__PURE__*/
function (_React$Component) {
  _inherits(renderTableFormat, _React$Component);

  function renderTableFormat() {
    _classCallCheck(this, renderTableFormat);

    return _possibleConstructorReturn(this, _getPrototypeOf(renderTableFormat).apply(this, arguments));
  }

  _createClass(renderTableFormat, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this = this;

      var _this$props = this.props,
          name = _this$props.name,
          logic = _this$props.logic; // If logic is "or"

      if (logic === 'or') {
        var childComponentKeys = Object.keys(this.props).filter(function (key) {
          return key.includes(name);
        }); // Modify other fields when user edit one of the fields.

        childComponentKeys.map(function (cid) {
          if (_this.props[cid].input.value !== nextProps[cid].input.value) {
            var modifyingCid = cid;
            var targetCid = childComponentKeys.filter(function (n) {
              return n !== cid;
            });

            if (nextProps[modifyingCid].input.value && modifyingCid && targetCid.length > 0) {
              targetCid.map(function (cid) {
                nextProps[cid].input.onChange('');
              });
            }
          }
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          className = _this$props2.className,
          limits = _this$props2.limits,
          name = _this$props2.name,
          label = _this$props2.label,
          required = _this$props2.required,
          help = _this$props2.help,
          globalError = _this$props2.globalError,
          logic = _this$props2.logic,
          fieldMap = _this$props2.fieldMap,
          disabled = _this$props2.disabled,
          preview = _this$props2.preview,
          descDisplay = _this$props2.descDisplay;
      var components = [];
      var allTouched = true;
      var allPristine = true;
      var childComponentKeys = Object.keys(this.props).filter(function (key) {
        return key.includes(name);
      });
      childComponentKeys.map(function (key) {
        var props = _this2.props[key];
        allTouched = allTouched && props.meta.touched;
        allPristine = allPristine && props.meta.pristine;
        components.push(props);
      });
      return React.createElement("div", {
        className: classNames(className, 'wfui-form-item', {
          'wfui-form-item-error': allTouched && globalError
        }, {
          'wfui-form-disabled': disabled
        }, {
          'wfui-form-preview': preview
        })
      }, label && React.createElement("div", {
        className: "wfui-form-label"
      }, React.createElement(ControlLabel, null, label, required && React.createElement("b", {
        className: "required"
      }, " *"))), React.createElement(FormGroup, {
        className: "wfui-form-field ".concat(descDisplay ? 'wfui-form-field-with-description' : 'wfui-form-field-no-description', " wfui-table-format multiple-inputs-").concat(Object.keys(fieldMap).length),
        validationState: allTouched && globalError ? 'error' : null
      }, React.createElement("ul", {
        className: "wfui-input-table__ul"
      }, Object.keys(fieldMap).map(function (key, i) {
        var lists = [];
        lists.push(React.createElement("li", {
          className: "wfui-input-table__li"
        }, React.createElement(Field, _extends({
          key: i
        }, fieldMap[key], {
          name: "".concat(name, ".").concat(key),
          type: fieldMap[key].field_type || 'text',
          component: renderField,
          disabled: disabled
        }))));

        if (Object.keys(fieldMap).length - 1 > i) {
          lists.push(React.createElement("li", {
            className: "wfui-input-table__li"
          }, React.createElement("span", {
            className: "wfui-input-table__condition"
          }, logic)));
        }

        return lists;
      })), React.createElement(HelpBlock, null, ' ', allTouched && globalError && React.createElement("span", null, globalError), ' '), help && !preview && React.createElement("div", {
        className: "wfui-form-help",
        dangerouslySetInnerHTML: {
          __html: help
        }
      })), descDisplay && !preview ? cloneElement(descDisplay) : '');
    }
  }]);

  return renderTableFormat;
}(React.Component);

export default renderTableFormat;