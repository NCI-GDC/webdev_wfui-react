'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

var _searchUtil = require('../util/searchUtil');

var _searchUtil2 = _interopRequireDefault(_searchUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * Applies the filtering to the articles and then passes its' props to List for display.
 */
var FilteredList = function (_React$Component) {
    _inherits(FilteredList, _React$Component);

    function FilteredList(props) {
        _classCallCheck(this, FilteredList);

        var _this = _possibleConstructorReturn(this, (FilteredList.__proto__ || Object.getPrototypeOf(FilteredList)).call(this, props));

        _this.state = {
            currentPage: props.currentPage
        };
        return _this;
    }

    _createClass(FilteredList, [{
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
            var _props = this.props,
                searchTerm = _props.searchTerm,
                simpleSearch = _props.simpleSearch,
                searchKeys = _props.searchKeys,
                wholeWord = _props.wholeWord,
                searchLogic = _props.searchLogic;

            if (searchTerm) {
                var filteredArticles = simpleSearch ? _searchUtil2.default.simpleSearch(articles, searchTerm, searchKeys, wholeWord, searchLogic) : _searchUtil2.default.search(articles, searchTerm);
                return filteredArticles;
            }
            return articles;
        }
    }, {
        key: 'generatePaginatorObject',
        value: function generatePaginatorObject() {
            var _this2 = this;

            var currentPage = this.state.currentPage;
            var _props2 = this.props,
                pageSize = _props2.pageSize,
                data = _props2.data;


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
            var _props3 = this.props,
                className = _props3.className,
                itemDisplay = _props3.itemDisplay,
                paginatorDisplay = _props3.paginatorDisplay,
                data = _props3.data,
                pageSize = _props3.pageSize,
                sortFunction = _props3.sortFunction,
                container = _props3.container,
                onDisplay = _props3.onDisplay,
                onNumOfListChange = _props3.onNumOfListChange,
                onListDidMount = _props3.onListDidMount;
            var currentPage = this.state.currentPage;

            var filteredData = this.applySearch(this.generateFilteredArticles(data));
            if (sortFunction) {
                filteredData.sort(sortFunction);
            }

            var paginatorObject = this.generatePaginatorObject();

            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)(className, 'wfui-filtered-list') },
                _react2.default.createElement(_List2.default, {
                    data: filteredData,
                    itemDisplay: itemDisplay,
                    pageSize: pageSize,
                    container: container,
                    currentPage: currentPage,
                    onDisplay: onDisplay,
                    onNumOfListChange: onNumOfListChange,
                    onListDidMount: onListDidMount
                }),
                paginatorDisplay ? _react2.default.cloneElement(paginatorDisplay, paginatorObject) : null
            );
        }
    }]);

    return FilteredList;
}(_react2.default.Component);

FilteredList.propTypes = {
    itemDisplay: _react2.default.PropTypes.element.isRequired,
    container: _react2.default.PropTypes.element,
    paginatorDisplay: _react2.default.PropTypes.element,
    data: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.any).isRequired,
    pageSize: _react2.default.PropTypes.number,
    currentPage: _react2.default.PropTypes.number,
    filterList: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.func),
    sortFunction: _react2.default.PropTypes.func,
    searchTerm: _react2.default.PropTypes.string,
    onDisplay: _react2.default.PropTypes.func,
    onNumOfListChange: _react2.default.PropTypes.func,
    onListDidMount: _react2.default.PropTypes.func,
    simpleSearch: _react2.default.PropTypes.bool,
    searchKeys: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string),
    wholeWord: _react2.default.PropTypes.bool,
    searchLogic: _react2.default.PropTypes.oneOf(['and', 'or'])
};

FilteredList.defaultProps = {
    pageSize: 1000,
    currentPage: 1,
    filterList: [],
    container: _react2.default.createElement('div', null),
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

exports.default = FilteredList;