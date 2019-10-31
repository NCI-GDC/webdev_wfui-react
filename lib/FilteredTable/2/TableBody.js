function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/* global document, window */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Column, Cell } from 'fixed-data-table-2';
import classNames from 'classnames';
import Dimensions from 'react-dimensions';

var TableBody =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TableBody, _React$Component);

  function TableBody(props) {
    var _this;

    _classCallCheck(this, TableBody);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TableBody).call(this, props));
    _this.state = {
      rowSelected: undefined,
      columnWidths: {}
    };
    _this.onHandleScroll = _this.onHandleScroll.bind(_assertThisInitialized(_this));
    _this._onColumnResizeEndCallback = _this._onColumnResizeEndCallback.bind(_assertThisInitialized(_this));
    _this._rowHeightGetter = _this._rowHeightGetter.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(TableBody, [{
    key: "onHandleScroll",
    value: function onHandleScroll() {
      var event = document.createEvent('Event');
      event.initEvent('fixedTableScrollStart', true, true);
      window.dispatchEvent(event);
    }
  }, {
    key: "_onColumnResizeEndCallback",
    value: function _onColumnResizeEndCallback(newColumnWidth, columnKey) {
      var columnWidths = this.state.columnWidths;
      var onColumnResizeEndCallback = this.props.onColumnResizeEndCallback;

      var newColumnWidths = _extends({}, columnWidths, _defineProperty({}, columnKey, newColumnWidth));

      this.setState({
        columnWidths: newColumnWidths
      });
      if (onColumnResizeEndCallback) onColumnResizeEndCallback(newColumnWidth, columnKey);
    }
  }, {
    key: "_rowHeightGetter",
    value: function _rowHeightGetter(idx) {
      var _this$props = this.props,
          rowResizeDisabled = _this$props.rowResizeDisabled,
          rowHeight = _this$props.rowHeight,
          rowHeightGetter = _this$props.rowHeightGetter,
          id = _this$props.id,
          noTableHeader = _this$props.noTableHeader;
      if (rowResizeDisabled) return rowHeight;
      if (rowHeightGetter) return rowHeightGetter(idx, this.props);
      var table = document.getElementById(id);

      if (table) {
        // const indexOffset = noTableHeader ? 1 : 2; // aria-rowindex starts from 1 (not 0), so add 1. If there is a header, add one more since it takes aria-rowindex=1.
        var indexOffset = 2;
        var row = table.querySelector(".public_fixedDataTable_bodyRow[aria-rowindex=\"".concat(idx + indexOffset, "\"]"));

        if (row) {
          var contents = _toConsumableArray(row.getElementsByClassName('public_fixedDataTableCell_cellContent'));

          if (contents && contents.length) {
            var maxHeight = rowHeight;
            contents.forEach(function (content, i) {
              if (content.offsetHeight > maxHeight) {
                maxHeight = content.offsetHeight;
              }
            });
            return maxHeight;
          }
        }
      }

      return rowHeight;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var id = this.props.id;
      var columnWidths = this.state.columnWidths;
      var table = document.getElementById(id);
      var row = table.querySelector('.public_fixedDataTable_bodyRow:first-child .public_fixedDataTableCell_cellContent:first-child');

      if (JSON.stringify(columnWidths) !== JSON.stringify(prevState.columnWidths) && row && row.click) {
        row.click();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          itemFormat = _this$props2.itemFormat,
          data = _this$props2.data,
          pageSize = _this$props2.pageSize,
          currentPage = _this$props2.currentPage,
          selectable = _this$props2.selectable,
          onCheck = _this$props2.onCheck,
          _onRowClick = _this$props2.onRowClick,
          allCheckbox = _this$props2.allCheckbox,
          toggleSort = _this$props2.toggleSort,
          sortedOrientation = _this$props2.sortedOrientation,
          sortedIdx = _this$props2.sortedIdx,
          contentWidth = _this$props2.contentWidth,
          contentHeight = _this$props2.contentHeight,
          containerHeight = _this$props2.containerHeight,
          containerWidth = _this$props2.containerWidth,
          noTableHeader = _this$props2.noTableHeader,
          rowHeight = _this$props2.rowHeight,
          headerHeight = _this$props2.headerHeight,
          columnResizeDisabled = _this$props2.columnResizeDisabled,
          isResponsive = _this$props2.isResponsive,
          _rowClassNameGetter = _this$props2.rowClassNameGetter;
      var _this$state = this.state,
          rowSelected = _this$state.rowSelected,
          columnWidths = _this$state.columnWidths;
      var indexOffset = (currentPage - 1) * pageSize;
      /* Calculates the Table of articles that should be displayed on the current page */

      var activeData = [];
      var numArticles = data ? data.length : 0;
      var startingArticle = pageSize * (currentPage - 1);

      for (var i = startingArticle; i < startingArticle + pageSize && i < numArticles; i += 1) {
        activeData.push(_extends({}, data[i], {
          columnWidths: columnWidths
        }));
      }

      return React.createElement(Table, {
        rowHeight: rowHeight,
        headerHeight: noTableHeader ? 0 : headerHeight,
        rowsCount: activeData.length,
        width: isResponsive ? containerWidth : contentWidth,
        height: isResponsive ? containerHeight : contentHeight,
        onRowClick: function onRowClick(event, rowIndex) {
          if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'BUTTON' && !event.target.querySelector('.row-selector')) {
            // e.stopPropagation on cell doesn't work. This will be invoked first.
            if (_onRowClick) {
              _onRowClick(activeData[rowIndex], event);
            }

            _this2.setState({
              rowSelected: rowIndex
            });
          }
        },
        rowClassNameGetter: function rowClassNameGetter(idx) {
          return classNames(_extends({
            even: (idx + 1) % 2 === 0,
            add: (idx + 1) % 2 !== 0,
            checked: activeData[idx].checked,
            selected: rowSelected === idx
          }, _rowClassNameGetter ? _rowClassNameGetter(activeData[idx], idx) : {}), activeData[idx].className || '', "".concat(_onRowClick ? 'row-clickable' : ''));
        },
        onScrollStart: this.onHandleScroll,
        onColumnResizeEndCallback: this._onColumnResizeEndCallback,
        isColumnResizing: false,
        rowHeightGetter: this._rowHeightGetter,
        touchScrollEnabled: true,
        keyboardScrollEnabled: true,
        data: activeData
      }, selectable && React.createElement(Column, {
        columnKey: "select",
        header: noTableHeader ? undefined : React.createElement(Cell, null, allCheckbox),
        cell: function cell(props) {
          return React.createElement(Cell, props, React.createElement("input", {
            className: "row-selector",
            type: "checkbox",
            checked: activeData[props.rowIndex].checked,
            onChange: function onChange(e) {
              e.stopPropagation();
              onCheck(activeData[props.rowIndex].idx);
            }
          }));
        },
        width: 30
      }), itemFormat.map(function (item, i) {
        var flexGrow = null;

        if (columnResizeDisabled) {
          flexGrow = 1;
        } else if (item.flexGrow) {
          flexGrow = item.flexGrow;
        }

        return React.createElement(Column, _extends({
          key: i
        }, item, {
          columnKey: item.columnKey || item.name,
          header: noTableHeader ? undefined : React.createElement(Cell, {
            className: classNames({
              sortActive: sortedIdx === i,
              sortDesc: sortedIdx === i && sortedOrientation === 'desc',
              sortAsc: sortedIdx === i && sortedOrientation === 'asc'
            })
          }, item.sortingKey ? React.createElement("a", {
            href: "#",
            onClick: function onClick(e) {
              toggleSort(e, i);
            }
          }, item.name) : item.name),
          cell: function cell(props) {
            return React.createElement(Cell, _extends({}, props, {
              className: item.className
            }), item.display(activeData[props.rowIndex]));
          },
          isResizable: !columnResizeDisabled && !flexGrow,
          flexGrow: flexGrow,
          width: columnWidths[item.columnKey || item.name] || item.width || 20
        }));
      }));
    }
  }]);

  return TableBody;
}(React.Component);

TableBody.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  selectable: PropTypes.bool.isRequired,
  itemFormat: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCheck: PropTypes.func.isRequired,
  onRowClick: PropTypes.func,
  allCheckbox: PropTypes.element,
  toggleSort: PropTypes.func,
  sortedOrientation: PropTypes.string,
  sortedIdx: PropTypes.number,
  contentWidth: PropTypes.number,
  contentHeight: PropTypes.number,
  containerWidth: PropTypes.number,
  containerHeight: PropTypes.number,
  rowHeight: PropTypes.number,
  rowHeightGetter: PropTypes.func,
  headerHeight: PropTypes.number,
  rowClassNameGetter: PropTypes.func,
  onColumnResizeEndCallback: PropTypes.func,
  rowResizeDisabled: PropTypes.bool,
  columnResizeDisabled: PropTypes.bool,
  noTableHeader: PropTypes.bool,
  isResponsive: PropTypes.bool
};
TableBody.defaultProps = {
  toggleSort: function toggleSort(f) {
    return f;
  },
  contentWidth: 100,
  contentHeight: 300
};
var ResponsiveTableBody = Dimensions({
  elementResize: true
})(function (props) {
  return React.createElement(TableBody, _extends({}, props, {
    isResponsive: true
  }));
});

var TableBodyWrapper = function TableBodyWrapper(props) {
  return React.createElement(TableBody, _extends({}, props, {
    isResponsive: false
  }));
};

export default TableBody;
export { ResponsiveTableBody };