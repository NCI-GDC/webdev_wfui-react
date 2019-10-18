function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
/**
 * Listbox
 */

var Listbox =
/*#__PURE__*/
function (_Component) {
  _inherits(Listbox, _Component);

  function Listbox() {
    _classCallCheck(this, Listbox);

    return _possibleConstructorReturn(this, _getPrototypeOf(Listbox).apply(this, arguments));
  }

  _createClass(Listbox, [{
    key: "onHandleChange",
    value: function onHandleChange(e) {
      if (this.props.onHandleChange) {
        this.props.onHandleChange(e);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          label = _this$props.label,
          placeholder = _this$props.placeholder,
          defaultOption = _this$props.defaultOption,
          children = _this$props.children,
          description = _this$props.description,
          errors = _this$props.errors,
          value = _this$props.value;
      var options = [];
      children.map(function (list_box_option, i) {
        options.push(list_box_option);
      });
      var placeholder_option = placeholder ? React.createElement("option", {
        value: ""
      }, placeholder) : null; // check error flag

      var errorClassName = '';

      if (errors) {
        errorClassName += ' wfui-list-box--theme-error';
      }

      return React.createElement("div", {
        className: "wfui-list-box"
      }, description, React.createElement("div", {
        className: "wfui-list-box-fields"
      }, React.createElement("label", {
        dangerouslySetInnerHTML: {
          __html: label.replace(/\n/g, '<br/>')
        }
      }), React.createElement("select", {
        className: errorClassName,
        defaultValue: defaultOption,
        value: value,
        onChange: this.onHandleChange.bind(this)
      }, placeholder_option, options)));
    }
  }]);

  return Listbox;
}(Component);
/**
 * Property types
 */


Listbox.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultOption: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  errors: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
};
Listbox.defaultProps = {
  label: '',
  placeholder: '',
  defaultOption: '',
  description: '',
  children: [],
  errors: ''
};
export default Listbox;