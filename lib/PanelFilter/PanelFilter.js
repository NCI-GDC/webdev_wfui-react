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

var PanelFilter =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PanelFilter, _React$Component);

  function PanelFilter() {
    var _this;

    _classCallCheck(this, PanelFilter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PanelFilter).call(this));
    _this.onHandleClick = _this.onHandleClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(PanelFilter, [{
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
          key = _this$props2.key,
          parent = _this$props2.parent,
          filters = _this$props2.filters,
          search = _this$props2.search,
          filterItems = _this$props2.filterItems,
          items = _this$props2.items,
          category = _this$props2.category,
          filter = _this$props2.filter; // Filter by search

      var filteredItems = search.all ? items : items.filter(function (item) {
        return search.results.includes(item.permalink);
      }) || [];
      return React.createElement("div", {
        className: "panel panel-default ".concat(key || type)
      }, React.createElement("a", {
        className: "btn-filter btn-".concat(key || type, " collapsed"),
        "data-toggle": "collapse",
        href: "#filter-".concat(key || type),
        "data-paren": "#".concat(parent || 'accordian'),
        "aria-expanded": "false",
        "aria-controls": "collapse"
      }, label), React.createElement(FilterItems, {
        filterItems: filterItems || filters[type].map(function (item) {
          return {
            _id: item._id,
            key: item._key || item._id,
            count: item.count
          };
        }),
        items: filteredItems,
        key: key || type,
        type: type,
        category: category,
        onHandleClick: this.onHandleClick,
        filter: filter
      }));
    }
  }]);

  return PanelFilter;
}(React.Component);

PanelFilter.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  type: PropTypes.string.isRequired,
  key: PropTypes.string,
  parent: PropTypes.string,
  search: PropTypes.object,
  filters: PropTypes.object,
  category: PropTypes.object,
  filterItems: PropTypes.arrayOf(PropTypes.object),
  items: PropTypes.arrayOf(PropTypes.object),
  changeFilter: PropTypes.func,
  toggleFilter: PropTypes.func,
  onHandleClick: PropTypes.func,
  filter: PropTypes.func
};
PanelFilter.defaultProps = {
  type_opt_not: PropTypes.number,
  changeFilter: function changeFilter(f) {
    return f;
  },
  onHandleClick: function onHandleClick(f) {
    return f;
  },
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
})(PanelFilter);