function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TableBody from './TableBody';
import Search from '../../util/searchUtil';
/*
 * Applies the filtering to the articles and then passes its' props to List for display.
 */

var FilteredTable =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FilteredTable, _React$Component);

  function FilteredTable(props) {
    var _this;

    _classCallCheck(this, FilteredTable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FilteredTable).call(this, props));
    _this.onCheck = _this.onCheck.bind(_assertThisInitialized(_this));
    _this.onAllCheck = _this.onAllCheck.bind(_assertThisInitialized(_this));
    _this.lastResultsCount = -1;
    _this.state = {
      currentPage: props.currentPage,
      checkedItems: new Array(props.data.length).fill(false),
      sortedIdx: props.sortedIdx,
      sortedOrientation: 'desc',
      dataWithState: _this.transformData(props.data)
    };
    _this.filteredData = [];
    return _this;
  }

  _createClass(FilteredTable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.onFilter(this.generateFilteredArticles(this.applySearch(this.props.data)));
    }
  }, {
    key: "transformData",
    value: function transformData(data) {
      return data.map(function (obj, i) {
        var _obj = JSON.stringify(obj) ? JSON.parse(JSON.stringify(obj)) : {};

        _obj.checked = false;
        _obj.idx = i;
        return _obj;
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      /* Also note: JSON.stringify is the cheapest arbitrary comparison function
       * since it runs on native code. */
      var thisData = this.props.data;
      var nextData = nextProps.data;

      if (JSON.stringify(thisData) !== JSON.stringify(nextData)) {
        this.setState({
          dataWithState: this.transformData(nextData)
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var data = this.props.data;
      this.onFilter(this.generateFilteredArticles(this.applySearch(data)));
    }
    /* This is called when a individual item's checkbox is clicked */

  }, {
    key: "onCheck",
    value: function onCheck(index) {
      var _this2 = this;

      var dataWithState = this.state.dataWithState;
      var newArray = dataWithState.slice(0);
      newArray[index].checked = !newArray[index].checked;
      /* We do this since setstate does not immediately mutate the state */

      this.setState({
        dataWithState: newArray
      }, function () {
        return _this2.selectionChanged();
      });
    }
  }, {
    key: "onAllCheck",
    value: function onAllCheck() {
      var _this3 = this;

      var dataWithState = this.state.dataWithState;
      var newArray = dataWithState.slice(0);
      var filteredData = this.generateFilteredArticles(this.applySearch(dataWithState));

      if (filteredData.every(function (item) {
        return item.checked;
      })) {
        /* If all items are checked, then uncheck everything */
        filteredData.forEach(function (item) {
          var idx = newArray.findIndex(function (i) {
            return i.idx === item.idx;
          });
          if (idx > -1) newArray[idx].checked = false;
        });
      } else {
        // Reset
        filteredData.forEach(function (item) {
          var idx = newArray.findIndex(function (i) {
            return i.idx === item.idx;
          });
          if (idx > -1) newArray[idx].checked = false;
        });
        /* Else check everything */

        filteredData.forEach(function (item) {
          var idx = newArray.findIndex(function (i) {
            return i.idx === item.idx;
          });
          if (idx > -1) newArray[idx].checked = true;
        });
      }

      this.setState({
        dataWithState: newArray
      }, function () {
        return _this3.selectionChanged();
      });
    }
  }, {
    key: "toggleSort",
    value: function toggleSort(event, idx) {
      var _this$state = this.state,
          sortedIdx = _this$state.sortedIdx,
          sortedOrientation = _this$state.sortedOrientation;
      event.preventDefault();

      if (sortedIdx === idx) {
        if (sortedOrientation === 'desc') {
          this.setState({
            sortedOrientation: 'asc'
          });
        } else {
          this.setState({
            sortedOrientation: 'desc'
          });
        }
      } else {
        this.setState({
          sortedOrientation: 'desc',
          sortedIdx: idx
        });
      }
    }
    /* Passes the list of filtered articles to the callbacks in the props. */

  }, {
    key: "onFilter",
    value: function onFilter(filteredArticles) {
      var onResultsNumUpdate = this.props.onResultsNumUpdate;
      /* Now sort the articles */

      var resultsCount = filteredArticles.length;

      if (this.lastResultsCount !== resultsCount) {
        this.lastResultsCount = resultsCount;

        if (onResultsNumUpdate) {
          onResultsNumUpdate(resultsCount);
        }
      }
    }
  }, {
    key: "generateFilteredArticles",
    value: function generateFilteredArticles(articles) {
      var _this$props = this.props,
          filterList = _this$props.filterList,
          itemFormat = _this$props.itemFormat;
      var _this$state2 = this.state,
          sortedIdx = _this$state2.sortedIdx,
          sortedOrientation = _this$state2.sortedOrientation;
      var filteredArticles = articles;
      filterList.forEach(function (filter) {
        return filteredArticles = filteredArticles.filter(filter);
      });

      if (sortedIdx !== -1) {
        filteredArticles = filteredArticles.sort(function (a, b) {
          var getSortingData = itemFormat[sortedIdx].sortingKey;
          var aData = getSortingData(a);
          var bData = getSortingData(b);

          if (sortedOrientation === 'desc') {
            if (typeof aData === 'string') {
              return bData.toLowerCase().localeCompare(aData.toLowerCase());
            }

            if (aData instanceof Date) {
              return bData.getTime() - aData.getTime();
            }

            return bData - aData;
          }

          if (typeof aData === 'string') {
            return aData.toLowerCase().localeCompare(bData.toLowerCase());
          }

          if (aData instanceof Date) {
            return aData.getTime() - bData.getTime();
          }

          return aData - bData;
        });
      }

      return filteredArticles;
    }
  }, {
    key: "applySearch",
    value: function applySearch(articles) {
      var _this$props2 = this.props,
          searchTerm = _this$props2.searchTerm,
          simpleSearch = _this$props2.simpleSearch,
          searchKeys = _this$props2.searchKeys,
          wholeWord = _this$props2.wholeWord,
          searchLogic = _this$props2.searchLogic;

      if (searchTerm) {
        var filteredArticles = simpleSearch ? Search.simpleSearch(articles, searchTerm, searchKeys, wholeWord, searchLogic) : Search.search(articles, searchTerm);
        return filteredArticles;
      }

      return articles;
    }
    /* Return a list of the indices of all selected items */

  }, {
    key: "selectionChanged",
    value: function selectionChanged() {
      var onSelectionChange = this.props.onSelectionChange;
      var dataWithState = this.state.dataWithState;
      var indexes = [];
      var checkedItems = dataWithState.filter(function (item, i) {
        if (item.checked) indexes.push(i);
        return item.checked;
      });
      onSelectionChange(indexes, checkedItems);
    }
  }, {
    key: "generatePaginatorObject",
    value: function generatePaginatorObject() {
      var _this4 = this;

      var currentPage = this.state.currentPage;
      var _this$props3 = this.props,
          pageSize = _this$props3.pageSize,
          data = _this$props3.data;
      var filteredData = this.applySearch(this.generateFilteredArticles(data));
      var dataLength = filteredData ? filteredData.length : 0;
      var numPages = Math.ceil(dataLength / pageSize);
      var Paginator = {
        currentPage: currentPage,
        numPages: numPages,

        /* Returns a function that will open the page 'page'
         * or undefined if the page does not exist.  */
        getOpenPage: function getOpenPage(page) {
          if (page > 0 && page <= numPages) {
            return function () {
              return _this4.setState({
                currentPage: page
              });
            };
          }

          return undefined;
        }
      };
      return Paginator;
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var _this$props4 = this.props,
          itemFormat = _this$props4.itemFormat,
          className = _this$props4.className,
          paginatorDisplay = _this$props4.paginatorDisplay,
          pageSize = _this$props4.pageSize,
          selectable = _this$props4.selectable,
          onSelectionChange = _this$props4.onSelectionChange,
          rowClickable = _this$props4.rowClickable,
          onRowClick = _this$props4.onRowClick;
      var _this$state3 = this.state,
          currentPage = _this$state3.currentPage,
          dataWithState = _this$state3.dataWithState;
      this.filteredData = this.applySearch(this.generateFilteredArticles(dataWithState));
      /* Setup the header row and onClick for sorting if applicable */

      var headerRow = itemFormat.map(function (cell, idx) {
        return React.createElement("th", {
          key: cell.name
        }, cell.sortingKey ? React.createElement("a", {
          href: "#sort",
          onClick: function onClick(e) {
            return _this5.toggleSort(e, idx);
          }
        }, cell.name) : cell.name);
      });
      /* We have to do this to avoid breaking backwards compatibility */

      var table = React.createElement("table", {
        className: className
      }, React.createElement("thead", null, React.createElement("tr", null, selectable ? React.createElement("th", null, React.createElement("input", {
        type: "Checkbox",
        onChange: this.onAllCheck,
        checked: this.filteredData.every(function (item) {
          return item.checked;
        })
      })) : null, headerRow)), React.createElement(TableBody, {
        data: this.filteredData,
        itemFormat: itemFormat,
        pageSize: pageSize,
        currentPage: currentPage,
        selectable: selectable,
        onSelectionChange: onSelectionChange,
        onCheck: this.onCheck,
        checks: this.state.checkedItems,
        rowClickable: rowClickable,
        onRowClick: onRowClick
      }));

      if (paginatorDisplay) {
        var paginatorObject = this.generatePaginatorObject();
        var InjectedPaginatorDisplay = React.cloneElement(paginatorDisplay, paginatorObject);
        return React.createElement("div", {
          className: classNames(className, 'wfui-filtered-table')
        }, table, InjectedPaginatorDisplay);
      }

      return table;
    }
  }]);

  return FilteredTable;
}(React.Component);

FilteredTable.propTypes = {
  className: PropTypes.string,
  paginatorDisplay: PropTypes.element,
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  pageSize: PropTypes.number,
  currentPage: PropTypes.number,
  filterList: PropTypes.arrayOf(PropTypes.func),
  searchTerm: PropTypes.string,
  selectable: PropTypes.bool,
  onSelectionChange: PropTypes.func,
  itemFormat: PropTypes.arrayOf(PropTypes.object),
  onResultsNumUpdate: PropTypes.func,
  simpleSearch: PropTypes.bool,
  searchKeys: PropTypes.arrayOf(PropTypes.string),
  sortedIdx: PropTypes.number,
  wholeWord: PropTypes.bool,
  searchLogic: PropTypes.oneOf(['and', 'or']),
  rowClickable: PropTypes.bool,
  onRowClick: PropTypes.func
};
FilteredTable.defaultProps = {
  pageSize: 100000,
  paginatorDisplay: null,
  currentPage: 1,
  filterList: [],
  searchTerm: '',
  selectable: false,
  sortedIdx: -1,
  wholeWord: false,
  onSelectionChange: function onSelectionChange(f) {
    return f;
  },
  rowClickable: false,
  onRowClick: function onRowClick(f) {
    return f;
  },
  searchLogic: 'and'
};
export default FilteredTable;