function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
/**
 * Input table
 */

var InputTable =
/*#__PURE__*/
function (_Component) {
  _inherits(InputTable, _Component);

  function InputTable() {
    var _this;

    _classCallCheck(this, InputTable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InputTable).call(this));
    _this.state = {
      refs: ''
    };
    _this.onHandleClick = _this.onHandleClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(InputTable, [{
    key: "onHandleClick",
    value: function onHandleClick(e) {
      var stopPropagation = this.props.stopPropagation;
      if (stopPropagation) e.stopPropagation();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          label = _this$props.label,
          fieldLabel = _this$props.fieldLabel,
          fieldType = _this$props.fieldType,
          description = _this$props.description,
          children = _this$props.children,
          className = _this$props.className; // Get the number of inputs

      this.numOfInputs = children.length; // Render input fields
      //= =========

      var fields;

      if (children) {
        fields = React.createElement("div", {
          className: "wfui-input-table__form"
        }, React.createElement("p", {
          className: "wfui-input-table__label",
          dangerouslySetInnerHTML: {
            __html: fieldLabel.replace(/\n/g, '<br/>')
          }
        }), React.createElement("ul", {
          className: "wfui-input-table__ul",
          ref: "allInputs"
        }, children.map(function (field, i) {
          if (children.length - 1 > i) {
            var condition = React.createElement("span", {
              className: "wfui-input-table__condition"
            }, fieldType.toUpperCase());
          }

          return React.createElement("li", {
            key: i,
            className: "wfui-input-table__li",
            ref: "hello"
          }, field, condition);
          this.numOfInputs = children.length;
        })));
      } //= =========


      return React.createElement("div", {
        className: "wfui-input-table ".concat(className) ? className : '',
        onClick: this.onHandleClick
      }, React.createElement("label", {
        dangerouslySetInnerHTML: {
          __html: label.replace(/\n/g, '<br/>')
        }
      }), description, fields);
    }
  }]);

  return InputTable;
}(Component);
/**
 * Property types
 */


InputTable.propTypes = {
  label: PropTypes.string,
  fieldLabel: PropTypes.string,
  fieldType: PropTypes.oneOf(['and', 'or']),
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  stopPropagation: PropTypes.bool
};
InputTable.defaultProps = {
  label: '',
  fieldLabel: '',
  fieldType: 'and',
  description: '',
  stopPropagation: false
};
export default InputTable;