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
import List from './List';
import Search from '../util/searchUtil';
/*
 * Applies the filtering to the articles and then passes its' props to List for display.
 */

var FilteredList =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FilteredList, _React$Component);

  function FilteredList(props) {
    var _this;

    _classCallCheck(this, FilteredList);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FilteredList).call(this, props));
    _this.state = {
      currentPage: props.currentPage
    };
    return _this;
  }

  _createClass(FilteredList, [{
    key: "goto",
    value: function goto(page) {
      var currentPage = this.state.currentPage;
      var _this$props = this.props,
          pageSize = _this$props.pageSize,
          data = _this$props.data;
      var filteredData = this.applySearch(this.generateFilteredArticles(data));
      var dataLength = filteredData ? filteredData.length : 0;
      var numPages = Math.ceil(dataLength / pageSize);

      if (page > 0 && page <= numPages) {
        this.setState({
          currentPage: page
        });
      }
    }
  }, {
    key: "generateFilteredArticles",
    value: function generateFilteredArticles(articles) {
      var filterList = this.props.filterList;
      var filteredArticles = articles;
      filterList.forEach(function (filter) {
        return filteredArticles = filteredArticles.filter(filter);
      });
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
  }, {
    key: "generatePaginatorObject",
    value: function generatePaginatorObject() {
      var _this2 = this;

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
              return _this2.setState({
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
      var _this$props4 = this.props,
          className = _this$props4.className,
          itemDisplay = _this$props4.itemDisplay,
          paginatorDisplay = _this$props4.paginatorDisplay,
          data = _this$props4.data,
          pageSize = _this$props4.pageSize,
          sortFunction = _this$props4.sortFunction,
          container = _this$props4.container,
          onDisplay = _this$props4.onDisplay,
          onNumOfListChange = _this$props4.onNumOfListChange,
          onListDidMount = _this$props4.onListDidMount,
          noWrapper = _this$props4.noWrapper;
      var currentPage = this.state.currentPage;
      var filteredData = this.applySearch(this.generateFilteredArticles(data));

      if (sortFunction) {
        filteredData.sort(sortFunction);
      }

      var paginatorObject = this.generatePaginatorObject();

      if (noWrapper && !paginatorDisplay) {
        return React.createElement(List, {
          data: filteredData,
          itemDisplay: itemDisplay,
          pageSize: pageSize,
          container: container,
          currentPage: currentPage,
          onDisplay: onDisplay,
          onNumOfListChange: onNumOfListChange,
          onListDidMount: onListDidMount
        });
      }

      return React.createElement("div", {
        className: classNames(className, 'wfui-filtered-list')
      }, React.createElement(List, {
        data: filteredData,
        itemDisplay: itemDisplay,
        pageSize: pageSize,
        container: container,
        currentPage: currentPage,
        onDisplay: onDisplay,
        onNumOfListChange: onNumOfListChange,
        onListDidMount: onListDidMount
      }), paginatorDisplay ? React.cloneElement(paginatorDisplay, paginatorObject) : null);
    }
  }]);

  return FilteredList;
}(React.Component);

FilteredList.propTypes = {
  itemDisplay: PropTypes.element.isRequired,
  container: PropTypes.element,
  paginatorDisplay: PropTypes.element,
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  pageSize: PropTypes.number,
  currentPage: PropTypes.number,
  filterList: PropTypes.arrayOf(PropTypes.func),
  sortFunction: PropTypes.func,
  searchTerm: PropTypes.string,
  onDisplay: PropTypes.func,
  onNumOfListChange: PropTypes.func,
  onListDidMount: PropTypes.func,
  simpleSearch: PropTypes.bool,
  searchKeys: PropTypes.arrayOf(PropTypes.string),
  wholeWord: PropTypes.bool,
  searchLogic: PropTypes.oneOf(['and', 'or']),
  noWrapper: PropTypes.bool
};
FilteredList.defaultProps = {
  pageSize: 1000,
  currentPage: 1,
  filterList: [],
  container: React.createElement("div", null),
  searchTerm: '',
  sortFunction: undefined,
  onDisplay: function onDisplay() {
    return undefined;
  },
  onNumOfListChange: function onNumOfListChange() {
    return undefined;
  },
  onListDidMount: function onListDidMount() {
    return undefined;
  },
  searchLogic: 'and'
};
export default FilteredList;