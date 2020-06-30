function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

var FilterItems =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FilterItems, _React$Component);

  function FilterItems() {
    var _this;

    _classCallCheck(this, FilterItems);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FilterItems).call(this));
    _this.state = {
      open: false
    };
    _this.countNumbers = _this.countNumbers.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(FilterItems, [{
    key: "countNumbers",
    value: function countNumbers(item) {
      var _this$props = this.props,
          items = _this$props.items,
          type = _this$props.type,
          category = _this$props.category,
          filter = _this$props.filter;
      var countFilter = Object.assign({}, category, _defineProperty({}, type, [item.key || item._id]));
      var itemCount = filter ? items.filter(filter(countFilter)).length : item.count;
      return itemCount;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          label = _this$props2.label,
          filterItems = _this$props2.filterItems,
          items = _this$props2.items,
          type = _this$props2.type,
          category = _this$props2.category,
          onHandleClick = _this$props2.onHandleClick,
          numCollapse = _this$props2.numCollapse,
          defaultExpand = _this$props2.defaultExpand,
          textLess = _this$props2.textLess,
          textMore = _this$props2.textMore;
      var open = this.state.open;
      var selectedItems = category && category[type] || [];

      if (filterItems) {
        // Filter out null object
        var _filterItems = filterItems.filter(function (item) {
          return item._id;
        }); // If there is not types, then don't display;


        if (_filterItems.length === 0) return null;

        var displayItems = _filterItems.slice(0, numCollapse + 1);

        var collapsedItems = _filterItems.slice(numCollapse + 1);

        var readMore = open ? React.createElement("a", {
          href: "#",
          id: "toggleButton",
          className: "toggleButton toggleButtonMore",
          onClick: function onClick(e) {
            e.preventDefault();

            _this2.setState({
              open: false
            });
          }
        }, React.createElement("p", null, React.createElement("span", {
          className: "showless"
        }), textLess)) : React.createElement("a", {
          href: "#",
          id: "toggleButton",
          className: "toggleButton toggleButtonMore",
          onClick: function onClick(e) {
            e.preventDefault();

            _this2.setState({
              open: true
            });
          }
        }, React.createElement("p", null, React.createElement("span", {
          className: "showmore"
        }), textMore));
        return React.createElement("fieldset", null, React.createElement("legend", null, React.createElement("a", {
          className: "".concat(defaultExpand, " ? '': 'collapsed'"),
          role: "button",
          "data-toggle": "collapse",
          href: "#search-filters-".concat(type),
          "aria-expanded": defaultExpand,
          "aria-controls": "search-filters-".concat(type)
        }, label)), React.createElement("div", {
          className: "collapse ".concat(defaultExpand ? 'in' : ''),
          id: "search-filters-".concat(type)
        }, React.createElement("div", {
          className: "checkbox ".concat(Object.keys(category).length === 0 ? '' : 'filter-selected')
        }, displayItems.map(function (item, i) {
          var itemCount = _this2.countNumbers(item);

          return React.createElement("label", {
            key: i,
            className: !itemCount ? 'no-data' : ''
          }, React.createElement("input", {
            type: "checkbox",
            "data-type": type,
            value: item.key || item._id,
            onClick: onHandleClick,
            checked: selectedItems.includes(item.key || item._id)
          }), item._id, React.createElement("span", {
            className: "filtercount"
          }, " ", itemCount, " "));
        }), React.createElement("div", {
          id: "showmore"
        }), React.createElement(ReactCSSTransitionGroup, {
          transitionName: 'fadein',
          transitionEnterTimeout: 500,
          transitionLeaveTimeout: 0
        }, open && collapsedItems.length > 0 && collapsedItems.map(function (item, i) {
          var itemCount = _this2.countNumbers(item);

          return React.createElement("label", {
            key: i,
            className: !itemCount ? 'no-data' : ''
          }, React.createElement("input", {
            type: "checkbox",
            "data-type": type,
            value: item.key || item._id,
            onClick: onHandleClick,
            checked: selectedItems.includes(item.key || item._id)
          }), item._id, React.createElement("span", {
            className: "filtercount"
          }, " ", itemCount, " "));
        })), collapsedItems.length > 0 && readMore)));
      }

      return null;
    }
  }]);

  return FilterItems;
}(React.Component);

FilterItems.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  label: PropTypes.string,
  type: PropTypes.string,
  filterItems: PropTypes.arrayOf(PropTypes.object),
  category: PropTypes.object,
  onHandleClick: PropTypes.func,
  numCollapse: PropTypes.number,
  defaultExpand: PropTypes.bool,
  textMore: PropTypes.string,
  textLess: PropTypes.string
};
FilterItems.defaultProps = {
  defaultExpand: false,
  numCollapse: 10,
  onHandleClick: function onHandleClick(f) {
    return f;
  },
  textMore: 'More',
  textLess: 'Less'
};
export default FilterItems;