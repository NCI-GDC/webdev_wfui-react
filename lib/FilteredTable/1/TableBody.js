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

var TableBody =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TableBody, _React$Component);

  function TableBody() {
    _classCallCheck(this, TableBody);

    return _possibleConstructorReturn(this, _getPrototypeOf(TableBody).apply(this, arguments));
  }

  _createClass(TableBody, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          itemFormat = _this$props.itemFormat,
          data = _this$props.data,
          pageSize = _this$props.pageSize,
          currentPage = _this$props.currentPage,
          selectable = _this$props.selectable,
          onCheck = _this$props.onCheck,
          checks = _this$props.checks,
          rowClickable = _this$props.rowClickable,
          onRowClick = _this$props.onRowClick;
      /* Calculates the Table of articles that should be displayed on the current page */

      var activeData = [];
      var numArticles = data ? data.length : 0;
      var startingArticle = pageSize * (currentPage - 1);

      for (var i = startingArticle; i < startingArticle + pageSize && i < numArticles; i += 1) {
        activeData.push(data[i]);
      }
      /* Form row using the provided data functions. */


      var itemDisplays = activeData.map(function (item, idx) {
        var rowItems = [];

        if (selectable) {
          rowItems.push(React.createElement("td", {
            key: "td_".concat(idx)
          }, React.createElement("input", {
            type: "checkbox",
            checked: item.checked,
            onChange: function onChange() {
              return onCheck(item.idx);
            }
          })));
        }

        if (rowClickable) {
          itemFormat.forEach(function (cell, rowIdx) {
            if (cell.excludeRowClick) {
              rowItems.push(React.createElement("td", {
                key: "td_".concat(idx, "_").concat(rowIdx),
                className: cell.className
              }, cell.display(item)));
            } else {
              rowItems.push(React.createElement("td", {
                key: "td_".concat(idx, "_").concat(rowIdx),
                className: cell.className,
                onClick: function onClick() {
                  return onRowClick(item);
                }
              }, cell.display(item)));
            }
          });
        } else {
          itemFormat.forEach(function (cell, rowIdx) {
            rowItems.push(React.createElement("td", {
              key: "td_".concat(idx, "_").concat(rowIdx),
              className: cell.className
            }, cell.display(item)));
          });
        }

        return React.createElement("tr", {
          key: "td_".concat(idx),
          className: "".concat((idx + 1) % 2 === 0 ? 'even' : 'odd', " ").concat(item.className)
        }, rowItems);
      });
      return React.createElement("tbody", null, itemDisplays);
    }
  }]);

  return TableBody;
}(React.Component);

TableBody.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  selectable: PropTypes.bool.isRequired,
  itemFormat: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCheck: PropTypes.func.isRequired,
  checks: PropTypes.arrayOf(PropTypes.bool).isRequired,
  rowClickable: PropTypes.bool,
  onRowClick: PropTypes.func
};
TableBody.defaultProps = {
  rowClickable: false,
  onRowClick: function onRowClick(f) {
    return f;
  }
};
export default TableBody;