'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _actions = require('../util/visibilityFilter/actions');

var _FilterItems = require('./FilterItems');

var _FilterItems2 = _interopRequireDefault(_FilterItems);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global window */


var FilterTool = function (_React$Component) {
    _inherits(FilterTool, _React$Component);

    function FilterTool() {
        _classCallCheck(this, FilterTool);

        var _this = _possibleConstructorReturn(this, (FilterTool.__proto__ || Object.getPrototypeOf(FilterTool)).call(this));

        _this.onHandleClick = _this.onHandleClick.bind(_this);
        return _this;
    }

    _createClass(FilterTool, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _props = this.props,
                filters = _props.filters,
                query = _props.location.query;

            this.applyFilters(query, filters, this.props);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var query = this.props.location.query;

            if (JSON.stringify(nextProps.filters) !== JSON.stringify(this.props.filters)) {
                this.applyFilters(query, nextProps.filters, this.props);
            }
        }
    }, {
        key: 'applyFilters',
        value: function applyFilters(query, filters, props) {
            if (query[props.type]) {
                var items = query[props.type].split(',');
                this.props.changeFilter([{ key: props.type, value: items.filter(function (item) {
                        return filters[props.type].map(function (o) {
                            return o._id;
                        }).includes(decodeURI(item));
                    }) }], 'category');
            }
        }
    }, {
        key: 'onHandleClick',
        value: function onHandleClick(e) {
            var onHandleClick = this.props.onHandleClick;

            this.props.toggleFilter({ key: e.target.getAttribute('data-type'), value: e.target.value });
            onHandleClick();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                label = _props2.label,
                type = _props2.type,
                filters = _props2.filters,
                search = _props2.search,
                filterItems = _props2.filterItems,
                items = _props2.items,
                category = _props2.category,
                filter = _props2.filter,
                defaultExpand = _props2.defaultExpand,
                numCollapse = _props2.numCollapse,
                textMore = _props2.textMore,
                textLess = _props2.textLess;

            // Filter by search

            var filteredItems = search.all ? items : items.filter(function (job) {
                return search.results.includes(job.permalink);
            }) || [];

            return _react2.default.createElement(
                'div',
                { className: 'wfui-filter-group' },
                _react2.default.createElement(_FilterItems2.default, {
                    label: label,
                    filterItems: filterItems || filters[type].map(function (item) {
                        return { _id: item._id, key: item._key || item._id, count: item.count };
                    }),
                    type: type,
                    category: category,
                    onHandleClick: this.onHandleClick,
                    items: filteredItems,
                    defaultExpand: defaultExpand,
                    numCollapse: numCollapse,
                    textMore: textMore,
                    textLess: textLess,
                    filter: filter
                })
            );
        }
    }]);

    return FilterTool;
}(_react2.default.Component);

FilterTool.propTypes = {
    label: _propTypes2.default.string.isRequired,
    type: _propTypes2.default.string.isRequired,
    search: _propTypes2.default.object,
    filters: _propTypes2.default.object,
    category: _propTypes2.default.object,
    filterItems: _propTypes2.default.arrayOf(_propTypes2.default.object),
    items: _propTypes2.default.arrayOf(_propTypes2.default.object),
    changeFilter: _propTypes2.default.func,
    toggleFilter: _propTypes2.default.func,
    onHandleClick: _propTypes2.default.func,
    defaultExpand: _propTypes2.default.bool,
    numCollapse: _propTypes2.default.number,
    textMore: _propTypes2.default.string,
    textLess: _propTypes2.default.string,
    filter: _propTypes2.default.func
};
FilterTool.defaultProps = {
    type_opt_not: _propTypes2.default.number,
    changeFilter: function changeFilter(f) {
        return f;
    },
    onHandleClick: function onHandleClick(f) {
        return f;
    },
    defaultExpand: false,
    numCollapse: 10,
    location: { query: {} }
};

exports.default = (0, _reactRedux.connect)(function (state) {
    return {
        filters: state.filters,
        search: state.search || {},
        category: state.visibilityFilter && state.visibilityFilter.category
    };
}, { toggleFilter: _actions.toggleFilter, changeFilter: _actions.changeFilter })(FilterTool);