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
import classNames from 'classnames';
import { Col } from 'react-bootstrap';
import { stringifyValues } from '../util/stringifyValues';
import { removeHTMLTags } from '../util/removeHTMLTags';
var columnProps = PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.shape({
  size: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
  order: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  offset: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
})]);

var IsotopeItem =
/*#__PURE__*/
function (_React$Component) {
  _inherits(IsotopeItem, _React$Component);

  function IsotopeItem() {
    _classCallCheck(this, IsotopeItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(IsotopeItem).apply(this, arguments));
  }

  _createClass(IsotopeItem, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          index = _this$props.index,
          id = _this$props.id,
          width = _this$props.width,
          xs = _this$props.xs,
          sm = _this$props.sm,
          md = _this$props.md,
          lg = _this$props.lg,
          children = _this$props.children,
          item = _this$props.item,
          className = _this$props.className,
          specifySizer = _this$props.specifySizer,
          itemDisplay = _this$props.itemDisplay,
          stringifyField = _this$props.stringifyField,
          disableItemStringify = _this$props.disableItemStringify;
      var elems = [];
      if (!itemDisplay) return null;

      if (Array.isArray(children)) {
        children.forEach(function (elem) {
          if (Array.isArray(elem)) {
            elem.forEach(function (i) {
              return elems.push(i);
            });
          } else {
            elems.push(elem);
          }
        });
      } else {
        elems.push(children);
      }

      if (width) {
        return React.createElement("div", {
          key: index,
          id: "".concat(id, "-item-").concat(index),
          className: classNames(className, "".concat(id, "-item ").concat(index === 0 && !specifySizer ? 'wfui-isotope-grid-sizer' : ''), 'wfui-isotope-item'),
          style: {
            width: "".concat(width, "px")
          },
          "data-item": !disableItemStringify && (stringifyField ? item[stringifyField] : removeHTMLTags(stringifyValues(item)))
        }, itemDisplay ? cloneElement(itemDisplay, Object.assign({}, this.props, {
          id: undefined
        })) : elems.map(function (child, ind) {
          return cloneElement(child, Object.assign({}, _this.props, {
            id: undefined,
            key: ind
          }));
        }));
      }

      return React.createElement(Col, {
        key: index,
        id: "".concat(id, "-item-").concat(index),
        className: classNames(className, "".concat(id, "-item ").concat(index, " ").concat(index === 0 && !specifySizer ? 'wfui-isotope-grid-sizer' : ''), 'wfui-isotope-item'),
        xs: xs,
        sm: sm,
        md: md,
        lg: lg,
        "data-item": !disableItemStringify && (stringifyField ? item[stringifyField] : removeHTMLTags(stringifyValues(item)))
      }, itemDisplay ? cloneElement(itemDisplay, Object.assign({}, this.props, {
        id: undefined,
        className: undefined
      })) : elems.map(function (child, ind) {
        return cloneElement(child, Object.assign({}, _this.props, {
          id: undefined,
          className: undefined,
          key: ind
        }));
      }));
    }
  }]);

  return IsotopeItem;
}(React.Component);

IsotopeItem.propTypes = {
  stringifyField: PropTypes.string,
  index: PropTypes.number,
  id: PropTypes.string,
  width: PropTypes.number,
  xs: columnProps,
  sm: columnProps,
  md: columnProps,
  lg: columnProps,
  children: PropTypes.node,
  item: PropTypes.any,
  className: PropTypes.string,
  specifySizer: PropTypes.bool,
  itemDisplay: PropTypes.element,
  disableItemStringify: PropTypes.bool
};
IsotopeItem.defaultProps = {
  role: 'item'
};
export default IsotopeItem;