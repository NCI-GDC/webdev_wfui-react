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

var FilterItems =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FilterItems, _React$Component);

  function FilterItems() {
    var _this;

    _classCallCheck(this, FilterItems);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FilterItems).call(this));
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
          filterItems = _this$props2.filterItems,
          key = _this$props2.key,
          type = _this$props2.type,
          category = _this$props2.category,
          onHandleClick = _this$props2.onHandleClick;
      var selectedItems = category && category[type] || [];
      var displayItems = filterItems && filterItems.filter(function (item) {
        return item._id;
      }) || [];
      if (!displayItems || displayItems.length === 0) return null;
      return React.createElement("div", {
        className: "filter-collapse ".concat(key, "-filter collapse panel-collapse"),
        id: "filter-".concat(key)
      }, React.createElement("div", {
        className: "well"
      }, displayItems.Items.map(function (item, idx) {
        var itemCount = _this2.countNumbers(item);

        return React.createElement("label", {
          key: idx,
          className: "label label-filter ".concat(selectedItems.includes(item.key || item._id) ? 'active' : ''),
          onClick: onHandleClick,
          "data-type": type,
          value: item.key || item._id
        }, item._id, " (", itemCount, ")");
      })));
    }
  }]);

  return FilterItems;
}(React.Component);

FilterItems.propTypes = {
  type: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  filterItems: PropTypes.arrayOf(PropTypes.object),
  category: PropTypes.object,
  onHandleClick: PropTypes.func,
  filter: PropTypes.func
};
FilterItems.defaultProps = {
  onHandleClick: function onHandleClick(f) {
    return f;
  },
  items: []
};
export default FilterItems;