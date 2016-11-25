'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TableBody = require('./TableBody');

var _TableBody2 = _interopRequireDefault(_TableBody);

var _searchUtil = require('../util/searchUtil');

var _searchUtil2 = _interopRequireDefault(_searchUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * Applies the filtering to the articles and then passes its' props to List for display.
 */
var FilteredTable = function (_React$Component) {
    _inherits(FilteredTable, _React$Component);

    function FilteredTable(props) {
        _classCallCheck(this, FilteredTable);

        var _this = _possibleConstructorReturn(this, (FilteredTable.__proto__ || Object.getPrototypeOf(FilteredTable)).call(this, props));

        _this.onCheck = _this.onCheck.bind(_this);
        _this.onAllCheck = _this.onAllCheck.bind(_this);

        _this.state = {
            currentPage: props.currentPage,
            checkedItems: new Array(props.data.length).fill(false)
        };
        return _this;
    }

    _createClass(FilteredTable, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            this.setState({
                checkedItems: new Array(props.data.length).fill(false)
            });
        }

        /* This is called when a individual item's checkbox is clicked */

    }, {
        key: 'onCheck',
        value: function onCheck(index) {
            var checkedItems = this.state.checkedItems;


            var newArray = checkedItems.slice(0);
            newArray[index] = !newArray[index];
            this.setState({ checkedItems: newArray });
        }
    }, {
        key: 'onAllCheck',
        value: function onAllCheck() {
            var checkedItems = this.state.checkedItems;


            var newArray = this.state.checkedItems.slice(0);

            if (checkedItems.every(function (item) {
                return item;
            })) {
                /* If all items are checked, then uncheck everything */
                newArray.fill(false);
            } else {
                /* Else check everything */
                newArray.fill(true);
            }

            this.setState({ checkedItems: newArray });
        }
    }, {
        key: 'generateFilteredArticles',
        value: function generateFilteredArticles(articles) {
            var filterList = this.props.filterList;

            var filteredArticles = articles;
            filterList.forEach(function (filter) {
                return filteredArticles = filteredArticles.filter(filter);
            });
            return filteredArticles;
        }
    }, {
        key: 'applySearch',
        value: function applySearch(articles) {
            var searchTerm = this.props.searchTerm;

            if (searchTerm) {
                return _searchUtil2.default.search(articles, searchTerm);
            }
            return articles;
        }

        /* Return a list of the indices of all selected items */

    }, {
        key: 'selectionChanged',
        value: function selectionChanged() {
            var onSelectionChange = this.props.onSelectionChange;
            var checkedItems = this.state.checkedItems;


            var selectedItems = [];
            checkedItems.forEach(function (val, idx) {
                selectedItems.push(idx);
            });

            onSelectionChange(selectedItems);
        }
    }, {
        key: 'generatePaginatorObject',
        value: function generatePaginatorObject() {
            var _this2 = this;

            var currentPage = this.state.currentPage;
            var _props = this.props,
                pageSize = _props.pageSize,
                data = _props.data;


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
                            return _this2.setState({ currentPage: page });
                        };
                    }
                    return undefined;
                }
            };
            return Paginator;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                rows = _props2.rows,
                className = _props2.className,
                paginatorDisplay = _props2.paginatorDisplay,
                data = _props2.data,
                pageSize = _props2.pageSize,
                selectable = _props2.selectable,
                onSelectionChange = _props2.onSelectionChange;
            var _state = this.state,
                checkedItems = _state.checkedItems,
                currentPage = _state.currentPage;


            var filteredData = this.applySearch(this.generateFilteredArticles(data));

            var paginatorObject = this.generatePaginatorObject();
            var InjectedPaginatorDisplay = _react2.default.cloneElement(paginatorDisplay, paginatorObject);

            return _react2.default.createElement(
                'table',
                { className: className },
                _react2.default.createElement(_TableBody2.default, {
                    data: filteredData,
                    rows: rows,
                    pageSize: pageSize,
                    currentPage: currentPage,
                    selectable: selectable,
                    onSelectionChange: onSelectionChange,
                    onCheck: this.onCheck,
                    onAllCheck: this.onAllCheck,
                    checks: checkedItems
                })
            );
        }
    }]);

    return FilteredTable;
}(_react2.default.Component);

FilteredTable.propTypes = {
    className: _react2.default.PropTypes.string,
    paginatorDisplay: _react2.default.PropTypes.element,
    data: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.any).isRequired,
    pageSize: _react2.default.PropTypes.number,
    currentPage: _react2.default.PropTypes.number,
    filterList: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.func),
    searchTerm: _react2.default.PropTypes.string,
    selectable: _react2.default.PropTypes.bool,
    onSelectionChange: _react2.default.PropTypes.func,
    rows: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.object)
};

FilteredTable.defaultProps = {
    pageSize: 1000,
    paginatorDisplay: _react2.default.createElement('span', null),
    currentPage: 1,
    filterList: [],
    searchTerm: '',
    selectable: false
};

exports.default = FilteredTable;