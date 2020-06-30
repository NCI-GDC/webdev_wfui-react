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
 * Grid
 */

var Grid =
/*#__PURE__*/
function (_Component) {
  _inherits(Grid, _Component);

  function Grid() {
    _classCallCheck(this, Grid);

    return _possibleConstructorReturn(this, _getPrototypeOf(Grid).apply(this, arguments));
  }

  _createClass(Grid, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          expandColumn = _this$props.expandColumn,
          label = _this$props.label,
          description = _this$props.description,
          children = _this$props.children,
          columnNumber = _this$props.columnNumber,
          errors = _this$props.errors;
      var last = children.length - children.length % columnNumber; // check error flag for default

      var errorClassName = '';

      if (errors) {
        errorClassName = 'wfui-grid__main--error';
      } // Render rows and columns ( except last row if number of columns is different from columnNumber)
      //= =========


      var grid;
      var grid_rows = [[]];
      var index = 0;
      children.map(function (child, i) {
        if (expandColumn && i >= last) return;

        if (i != 0 && i % columnNumber == 0) {
          grid_rows[++index] = [];
        }

        grid_rows[index].push(child);
      });
      grid = React.createElement("div", {
        className: "wfui-grid__container"
      }, grid_rows.map(function (row, i) {
        return React.createElement("div", {
          className: "wfui-grid__row",
          key: i
        }, row.map(function (child, j) {
          var className = "wfui-grid__column wfui-grid--col-".concat(columnNumber);
          return React.createElement("div", {
            className: className,
            key: j
          }, child);
        }));
      })); //= =========

      if (expandColumn) {
        // Render last row (in case last row has different number of columns)
        var grid_last;
        var grid_rows_last = [];
        children.map(function (child, i) {
          if (i >= last) {
            grid_rows_last.push(child);
          }
        });
        grid_last = React.createElement("div", {
          className: "wfui-grid__container wfui-grid__container--last"
        }, React.createElement("div", {
          className: "wfui-grid__row"
        }, grid_rows_last.map(function (child, i) {
          var className = "wfui-grid__column wfui-grid--col-".concat(grid_rows_last.length);
          return React.createElement("div", {
            className: className,
            key: i
          }, child);
        })));
      } //= =========


      return React.createElement("div", {
        className: "wfui-grid"
      }, React.createElement("label", {
        className: "wfui-grid__label",
        dangerouslySetInnerHTML: {
          __html: label.replace(/\n/g, '<br/>')
        }
      }), React.createElement("div", {
        className: "wfui-grid__description"
      }, description), React.createElement("div", {
        className: "wfui-grid__main ".concat(errorClassName)
      }, grid, grid_last));
    }
  }]);

  return Grid;
}(Component);
/**
 * Property types
 */


Grid.propTypes = {
  label: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  columnNumber: PropTypes.number,
  errors: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
};
Grid.defaultProps = {
  label: '',
  description: '',
  columnNumber: 1,
  errors: '',
  expandColumn: false
};
export default Grid;