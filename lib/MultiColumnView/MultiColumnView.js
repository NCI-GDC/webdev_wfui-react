function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SplitPane from 'react-split-pane';
import Column from './Column';
var COLUMN_ROLE = Column.role;

var MultiColumnView =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MultiColumnView, _React$Component);

  function MultiColumnView() {
    _classCallCheck(this, MultiColumnView);

    return _possibleConstructorReturn(this, _getPrototypeOf(MultiColumnView).apply(this, arguments));
  }

  _createClass(MultiColumnView, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          splitClassName = _this$props.splitClassName,
          children = _this$props.children,
          enableResize = _this$props.enableResize,
          defaultSize = _this$props.defaultSize,
          minSize = _this$props.minSize,
          colTwoVisible = _this$props.colTwoVisible,
          colThreeVisible = _this$props.colThreeVisible,
          id = _this$props.id;
      var displayChild = [children[0]];
      var visibleColCount = 1;

      if (colTwoVisible) {
        visibleColCount++;
        displayChild.push(children[1]);
      }

      if (colThreeVisible) {
        visibleColCount++;
        displayChild.push(children[2]);
      }

      if (enableResize) {
        return React.createElement("div", {
          id: id,
          className: classNames('three-column-view three-column-resize-view', className, "".concat(visibleColCount, "-column-visible"))
        }, React.cloneElement(displayChild[0], {
          key: 1
        }), visibleColCount === 2 ? React.cloneElement(displayChild[1], {
          key: 2
        }) : null, visibleColCount === 3 ? React.createElement(SplitPane, {
          className: classNames('split-pane', splitClassName),
          split: "vertical",
          minSize: minSize || 50,
          defaultSize: defaultSize || 150,
          primary: "second"
        }, React.createElement("div", null, React.cloneElement(displayChild[1], {
          key: 2
        })), React.createElement("div", null, React.cloneElement(displayChild[2], {
          key: 3
        }))) : null);
      }

      return React.createElement("div", {
        id: id,
        className: classNames('three-column-view three-column-noresize-view', className, "".concat(visibleColCount, "-column-visible"))
      }, React.cloneElement(displayChild[0], {
        key: 1
      }), visibleColCount === 2 ? React.cloneElement(displayChild[1], {
        key: 2
      }) : null, visibleColCount === 3 ? React.cloneElement(displayChild[2], {
        key: 3
      }) : null);
    }
  }]);

  return MultiColumnView;
}(React.Component);

MultiColumnView.Col = Column;
MultiColumnView.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  splitClassName: PropTypes.string,
  colTwoVisible: PropTypes.bool,
  colThreeVisible: PropTypes.bool,
  enableResize: PropTypes.bool,
  defaultSize: PropTypes.number,
  minSize: PropTypes.number,
  children: PropTypes.array
};
MultiColumnView.defaultProps = {
  id: '',
  className: '',
  visibleColCount: 1,
  enableResize: false,
  colTwoVisible: false,
  colThreeVisible: false,
  defaultSize: 150,
  minSize: 50
};
export default MultiColumnView;