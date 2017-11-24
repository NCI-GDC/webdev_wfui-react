'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

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
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.onFilter(this.generateFilteredArticles(this.applySearch(this.props.data)));
        }
    }, {
        key: 'transformData',
        value: function transformData(data) {
            return data.map(function (obj, i) {
                var _obj = JSON.stringify(obj) ? JSON.parse(JSON.stringify(obj)) : {};
                _obj.checked = false;
                _obj.idx = i;
                return _obj;
            });
        }
    }, {
        key: 'componentWillReceiveProps',
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
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var data = this.props.data;

            this.onFilter(this.generateFilteredArticles(this.applySearch(data)));
        }

        /* This is called when a individual item's checkbox is clicked */

    }, {
        key: 'onCheck',
        value: function onCheck(index) {
            var _this2 = this;

            var dataWithState = this.state.dataWithState;

            var newArray = dataWithState.slice(0);
            newArray[index].checked = !newArray[index].checked;

            /* We do this since setstate does not immediately mutate the state */
            this.setState({ dataWithState: newArray }, function () {
                return _this2.selectionChanged();
            });
        }
    }, {
        key: 'onAllCheck',
        value: function onAllCheck() {
            var _this3 = this;

            var dataWithState = this.state.dataWithState;

            var newArray = dataWithState.slice(0);

            if (newArray.every(function (item) {
                return item.checked;
            })) {
                /* If all items are checked, then uncheck everything */
                newArray.forEach(function (item) {
                    item.checked = false;
                });
            } else {
                /* Else check everything */
                newArray.forEach(function (item) {
                    item.checked = true;
                });
            }

            this.setState({ dataWithState: newArray }, function () {
                return _this3.selectionChanged();
            });
        }
    }, {
        key: 'toggleSort',
        value: function toggleSort(event, idx) {
            var _state = this.state,
                sortedIdx = _state.sortedIdx,
                sortedOrientation = _state.sortedOrientation;

            event.preventDefault();
            if (sortedIdx === idx) {
                if (sortedOrientation === 'desc') {
                    this.setState({ sortedOrientation: 'asc' });
                } else {
                    this.setState({ sortedOrientation: 'desc' });
                }
            } else {
                this.setState({ sortedOrientation: 'desc', sortedIdx: idx });
            }
        }

        /* Passes the list of filtered articles to the callbacks in the props. */

    }, {
        key: 'onFilter',
        value: function onFilter(filteredArticles) {
            var onResultsNumUpdate = this.props.onResultsNumUpdate;

            /* Now sort the articles*/

            var resultsCount = filteredArticles.length;
            if (this.lastResultsCount !== resultsCount) {
                this.lastResultsCount = resultsCount;
                if (onResultsNumUpdate) {
                    onResultsNumUpdate(resultsCount);
                }
            }
        }
    }, {
        key: 'generateFilteredArticles',
        value: function generateFilteredArticles(articles) {
            var _props = this.props,
                filterList = _props.filterList,
                itemFormat = _props.itemFormat;
            var _state2 = this.state,
                sortedIdx = _state2.sortedIdx,
                sortedOrientation = _state2.sortedOrientation;


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
                        return bData - aData;
                    }
                    if (typeof aData === 'string') {
                        return aData.toLowerCase().localeCompare(bData.toLowerCase());
                    }
                    return aData - bData;
                });
            }

            return filteredArticles;
        }
    }, {
        key: 'applySearch',
        value: function applySearch(articles) {
            var _props2 = this.props,
                searchTerm = _props2.searchTerm,
                simpleSearch = _props2.simpleSearch,
                searchKeys = _props2.searchKeys,
                wholeWord = _props2.wholeWord,
                searchLogic = _props2.searchLogic;

            if (searchTerm) {
                var filteredArticles = simpleSearch ? _searchUtil2.default.simpleSearch(articles, searchTerm, searchKeys, wholeWord, searchLogic) : _searchUtil2.default.search(articles, searchTerm);
                return filteredArticles;
            }

            return articles;
        }

        /* Return a list of the indices of all selected items */

    }, {
        key: 'selectionChanged',
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
        key: 'generatePaginatorObject',
        value: function generatePaginatorObject() {
            var _this4 = this;

            var currentPage = this.state.currentPage;
            var _props3 = this.props,
                pageSize = _props3.pageSize,
                data = _props3.data;


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
                            return _this4.setState({ currentPage: page });
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
            var _this5 = this;

            var _props4 = this.props,
                itemFormat = _props4.itemFormat,
                className = _props4.className,
                paginatorDisplay = _props4.paginatorDisplay,
                pageSize = _props4.pageSize,
                selectable = _props4.selectable,
                onSelectionChange = _props4.onSelectionChange,
                rowClickable = _props4.rowClickable,
                onRowClick = _props4.onRowClick;
            var _state3 = this.state,
                currentPage = _state3.currentPage,
                dataWithState = _state3.dataWithState;

            this.filteredData = this.applySearch(this.generateFilteredArticles(dataWithState));

            /* Setup the header row and onClick for sorting if applicable */
            var headerRow = itemFormat.map(function (cell, idx) {
                return _react2.default.createElement(
                    'th',
                    { key: cell.name },
                    cell.sortingKey ? _react2.default.createElement(
                        'a',
                        { href: '#sort', onClick: function onClick(e) {
                                return _this5.toggleSort(e, idx);
                            } },
                        cell.name
                    ) : cell.name
                );
            });

            /* We have to do this to avoid breaking backwards compatibility */
            var table = _react2.default.createElement(
                'table',
                { className: className },
                _react2.default.createElement(
                    'thead',
                    null,
                    _react2.default.createElement(
                        'tr',
                        null,
                        selectable ? _react2.default.createElement(
                            'th',
                            null,
                            _react2.default.createElement('input', {
                                type: 'Checkbox',
                                onChange: this.onAllCheck,
                                checked: dataWithState.every(function (item) {
                                    return item.checked;
                                })
                            })
                        ) : null,
                        headerRow
                    )
                ),
                _react2.default.createElement(_TableBody2.default, {
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
                })
            );

            if (paginatorDisplay) {
                var paginatorObject = this.generatePaginatorObject();
                var InjectedPaginatorDisplay = _react2.default.cloneElement(paginatorDisplay, paginatorObject);
                return _react2.default.createElement(
                    'div',
                    { className: (0, _classnames2.default)(className, 'wfui-filtered-table') },
                    table,
                    InjectedPaginatorDisplay
                );
            }

            return table;
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
    itemFormat: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.object),
    onResultsNumUpdate: _react2.default.PropTypes.func,
    simpleSearch: _react2.default.PropTypes.bool,
    searchKeys: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string),
    sortedIdx: _react2.default.PropTypes.number,
    wholeWord: _react2.default.PropTypes.bool,
    searchLogic: _react2.default.PropTypes.oneOf(['and', 'or']),
    rowClickable: _react2.default.PropTypes.bool,
    onRowClick: _react2.default.PropTypes.func
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

exports.default = FilteredTable;