function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleFilter, changeFilter } from '../util/visibilityFilter/actions';
import FilterItems from './FilterItems';

var CollapsibleFilter =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CollapsibleFilter, _React$Component);

  function CollapsibleFilter() {
    var _this;

    _classCallCheck(this, CollapsibleFilter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CollapsibleFilter).call(this));
    _this.onHandleClick = _this.onHandleClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CollapsibleFilter, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this$props = this.props,
          filters = _this$props.filters,
          query = _this$props.location.query;
      this.applyFilters(query, filters, this.props);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var query = this.props.location.query;

      if (JSON.stringify(nextProps.filters) !== JSON.stringify(this.props.filters)) {
        this.applyFilters(query, nextProps.filters, this.props);
      }
    }
  }, {
    key: "applyFilters",
    value: function applyFilters(query, filters, props) {
      if (query[props.type]) {
        var items = query[props.type].split(',');
        this.props.changeFilter([{
          key: props.type,
          value: items.filter(function (item) {
            return filters[props.type].map(function (o) {
              return o._id;
            }).includes(decodeURI(item));
          })
        }], 'category');
      }
    }
  }, {
    key: "onHandleClick",
    value: function onHandleClick(e) {
      var onHandleClick = this.props.onHandleClick;
      this.props.toggleFilter({
        key: e.target.getAttribute('data-type'),
        value: e.target.value
      });
      onHandleClick();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          label = _this$props2.label,
          type = _this$props2.type,
          filters = _this$props2.filters,
          search = _this$props2.search,
          filterItems = _this$props2.filterItems,
          items = _this$props2.items,
          category = _this$props2.category,
          filter = _this$props2.filter,
          defaultExpand = _this$props2.defaultExpand,
          numCollapse = _this$props2.numCollapse,
          textMore = _this$props2.textMore,
          textLess = _this$props2.textLess;
      var sortedFilter = filters[type].filter(function (a) {
        return a._id;
      }).sort(function (a, b) {
        return a._id.localeCompare(b._id);
      }); // Filter by search

      var filteredItems = search.all ? items : items.filter(function (job) {
        return search.results.includes(job.permalink);
      }) || [];
      return React.createElement("div", {
        className: "wfui-filter-group"
      }, React.createElement(FilterItems, {
        label: label,
        filterItems: filterItems || sortedFilter.map(function (item) {
          return {
            _id: item._id,
            key: item._key || item._id,
            count: item.count
          };
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
      }));
    }
  }]);

  return CollapsibleFilter;
}(React.Component);

CollapsibleFilter.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  search: PropTypes.object,
  filters: PropTypes.object,
  category: PropTypes.object,
  filterItems: PropTypes.arrayOf(PropTypes.object),
  items: PropTypes.arrayOf(PropTypes.object),
  changeFilter: PropTypes.func,
  toggleFilter: PropTypes.func,
  onHandleClick: PropTypes.func,
  defaultExpand: PropTypes.bool,
  numCollapse: PropTypes.number,
  textMore: PropTypes.string,
  textLess: PropTypes.string,
  filter: PropTypes.func
};
CollapsibleFilter.defaultProps = {
  type_opt_not: PropTypes.number,
  changeFilter: function changeFilter(f) {
    return f;
  },
  onHandleClick: function onHandleClick(f) {
    return f;
  },
  defaultExpand: false,
  numCollapse: 10,
  location: {
    query: {}
  }
};
export default connect(function (state) {
  return {
    filters: state.filters,
    search: state.search || {},
    category: state.visibilityFilter && state.visibilityFilter.category
  };
}, {
  toggleFilter: toggleFilter,
  changeFilter: changeFilter
})(CollapsibleFilter);