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
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
/**
 * Selection
 */

var Selection =
/*#__PURE__*/
function (_Component) {
  _inherits(Selection, _Component);

  function Selection() {
    _classCallCheck(this, Selection);

    return _possibleConstructorReturn(this, _getPrototypeOf(Selection).call(this));
  }

  _createClass(Selection, [{
    key: "onHandleClick",
    value: function onHandleClick(e) {
      if (e.target.id != 'ws-label') {
        var type = this.props.type;

        if (type == 'radio') {
          this.refs.selection.checked = true;
        } // Pass data to a callback.


        if (this.props.onHandleChange) {
          var res = {
            checked: this.refs.selection.checked,
            value: this.refs.selection.value,
            name: this.refs.selection.name
          };
          this.props.onHandleChange(res);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          label = _this$props.label,
          name = _this$props.name,
          value = _this$props.value,
          defaultChecked = _this$props.defaultChecked,
          children = _this$props.children,
          type = _this$props.type,
          className = _this$props.className,
          active = _this$props.active;
      var activeClassName = active ? ' active' : '';
      return React.createElement("div", {
        className: "wfui-selection ".concat(className, " ").concat(activeClassName)
      }, React.createElement("label", {
        id: "ws-label",
        className: "wfui-selection__label",
        onClick: this.onHandleClick.bind(this)
      }, React.createElement("input", {
        id: "ws-input",
        className: "wfui-selection__input-".concat(type),
        ref: "selection",
        "data-ref": "selection",
        type: type,
        name: name,
        value: value,
        defaultChecked: defaultChecked
      }), React.createElement("span", {
        id: "ws-label",
        onClick: function onClick(e) {
          e.stopPropagation();
        }
      }, label), children));
    }
  }]);

  return Selection;
}(Component);
/**
 * Property types
 */


Selection.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.oneOf(['radio', 'checkbox']),
  defaultChecked: PropTypes.bool,
  className: PropTypes.string,
  active: PropTypes.bool
};
Selection.defaultProps = {
  label: '',
  name: '',
  value: '',
  type: 'radio',
  defaultChecked: false,
  className: ''
};
export default Selection;