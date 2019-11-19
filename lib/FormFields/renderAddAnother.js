function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import * as form from 'redux-form';
import classNames from 'classnames';
import { Draggable, DraggableWithContext, Button, FormGroup, ControlLabel, HelpBlock, Icon } from '../index';

var renderAddAnother =
/*#__PURE__*/
function (_React$Component) {
  _inherits(renderAddAnother, _React$Component);

  function renderAddAnother(props) {
    var _this;

    _classCallCheck(this, renderAddAnother);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(renderAddAnother).call(this));
    _this.init = false;
    _this.touched = false;
    return _this;
  }

  _createClass(renderAddAnother, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this$props = this.props,
          fields = _this$props.fields,
          minimumItem = _this$props.minimumItem,
          defaultValue = _this$props.defaultValue;

      if (!this.init) {
        // Work around for validation.
        fields.push(defaultValue);
        fields.remove(fields.length); // Initialize minimum item.

        if (minimumItem) {
          for (var i = 0; i < minimumItem - fields.length; i++) {
            fields.push(defaultValue);
          }
        }

        this.init = true;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          className = _this$props2.className,
          fields = _this$props2.fields,
          childComponent = _this$props2.childComponent,
          draggable = _this$props2.draggable,
          label = _this$props2.label,
          labelAddAnother = _this$props2.labelAddAnother,
          help = _this$props2.help,
          required = _this$props2.required,
          disabled = _this$props2.disabled,
          preview = _this$props2.preview,
          withContext = _this$props2.withContext,
          globalError = _this$props2.globalError,
          name = _this$props2.name,
          _this$props2$meta = _this$props2.meta,
          error = _this$props2$meta.error,
          submitFailed = _this$props2$meta.submitFailed,
          minimumItem = _this$props2.minimumItem,
          descDisplay = _this$props2.descDisplay,
          fullWidth = _this$props2.fullWidth,
          defaultValue = _this$props2.defaultValue;
      var Comp = withContext ? DraggableWithContext : Draggable;

      var DeleteButton = function DeleteButton(_ref) {
        var index = _ref.index;

        if (!disabled && fields.length > minimumItem) {
          return React.createElement("a", {
            className: "delete-icon",
            onClick: function onClick() {
              fields.remove(index);
              _this2.touched = true;
            }
          }, "Delete");
        }

        return null;
      };

      return React.createElement("div", {
        className: classNames(className, 'wfui-form-item', {
          'wfui-form-item-error': this.touched && (error || globalError)
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
        className: "wfui-form-field ".concat(descDisplay ? 'wfui-form-field-with-description' : 'wfui-form-field-no-description', " wfui-form-addAnother"),
        validationState: this.touched && (error || globalError) ? 'error' : null
      }, !disabled && draggable && fields.length > 0 && React.createElement(Comp, {
        onHandleItemMove: function onHandleItemMove(from, to) {
          fields.move(from, to);
          setTimeout(function () {
            return _this2.forceUpdate();
          }, 1);
        },
        onHandleEndDrag: function onHandleEndDrag() {
          _this2.forceUpdate();
        },
        className: "wfui-form-addAnother-item"
      }, fields.map(function (field, i) {
        return React.createElement(Comp.Item, {
          key: i,
          id: field
        }, React.createElement(Comp.Handle, null, React.createElement(Icon, {
          glyph: "expand-arrows-alt",
          style: {
            transform: 'rotate(45deg)'
          }
        })), childComponent(field, i), React.createElement(DeleteButton, {
          index: i
        }));
      })), (!draggable || disabled) && fields.map(function (field, i) {
        return React.createElement("div", {
          className: "wfui-form-addAnother-item",
          key: i
        }, childComponent(field, i), React.createElement(DeleteButton, {
          index: i
        }));
      }), !disabled && React.createElement(Button, {
        variant: "default",
        onClick: function onClick() {
          fields.push(defaultValue);
        }
      }, React.createElement("span", {
        className: "span-plus"
      }, labelAddAnother)), (this.touched || submitFailed) && globalError && React.createElement(HelpBlock, {
        className: "wfui-form-error"
      }, React.createElement("span", null, globalError)), help && !preview && React.createElement("div", {
        className: "wfui-form-help",
        dangerouslySetInnerHTML: {
          __html: help
        }
      })), descDisplay && !preview ? cloneElement(descDisplay) : '');
    }
  }]);

  return renderAddAnother;
}(React.Component);

renderAddAnother.propTypes = {
  className: PropTypes.string,
  childComponent: PropTypes.func,
  help: PropTypes.string,
  label: PropTypes.string,
  labelAddAnother: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  preview: PropTypes.bool,
  draggable: PropTypes.bool,
  withContext: PropTypes.bool,
  minimumItem: PropTypes.number,
  descDisplay: PropTypes.element,
  fullWidth: PropTypes.bool,
  defaultValue: PropTypes.object
};
renderAddAnother.defaultProps = {
  labelAddAnother: 'Add Another Item',
  minimumItem: 0,
  fullWidth: false,
  defaultValue: null
};
export default renderAddAnother;