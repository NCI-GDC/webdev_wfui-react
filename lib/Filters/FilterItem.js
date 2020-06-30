function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { FormGroup, ControlLabel } from '../index';
import * as Actions from '../util/visibilityFilter/actions';

var FilterItem =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FilterItem, _React$Component);

  function FilterItem() {
    var _this;

    _classCallCheck(this, FilterItem);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FilterItem).call(this));
    _this.onHandleChange = _this.onHandleChange.bind(_assertThisInitialized(_this));
    _this.applyFilters = _.debounce(_this.applyFilters.bind(_assertThisInitialized(_this)), 250);
    return _this;
  }

  _createClass(FilterItem, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this$props = this.props,
          name = _this$props.name,
          query = _this$props.location.query;

      if (query[name]) {
        this.applyFilters(name, decodeURI(query[name]));
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this$props2 = this.props,
          query = _this$props2.location.query,
          name = _this$props2.name;

      if (query[name] && !nextProps.location.query[name]) {
        this.applyFilters(name, '');
      } else if (nextProps.location.query[name] !== query[name]) {
        this.applyFilters(name, decodeURI(nextProps.location.query[name]));
      }
    }
  }, {
    key: "onHandleChange",
    value: function onHandleChange(e) {
      var _this$props3 = this.props,
          onHandleChange = _this$props3.onHandleChange,
          name = _this$props3.name;
      this.applyFilters(name, e.target.value);
      onHandleChange();
    }
  }, {
    key: "applyFilters",
    value: function applyFilters(key, value) {
      var _this$props4 = this.props,
          filterType = _this$props4.filterType,
          changeFilter = _this$props4.changeFilter,
          toggleFilter = _this$props4.toggleFilter;

      switch (filterType) {
        case 'change':
          changeFilter([{
            key: key,
            value: value
          }]);
          break;

        case 'toggle':
          toggleFilter([{
            key: key,
            value: value
          }]);
          break;

        default:
          changeFilter([{
            key: key,
            value: value
          }]);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          label = _this$props5.label,
          className = _this$props5.className,
          component = _this$props5.component;
      return React.createElement(FormGroup, {
        className: classNames(className, 'wfui-filters-item')
      }, label ? React.createElement(ControlLabel, null, label) : null, React.createElement(FormGroup, null, React.createElement(component, _extends({}, this.props, {
        onHandleChange: this.onHandleChange
      }))));
    }
  }]);

  return FilterItem;
}(React.Component);

FilterItem.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  category: PropTypes.object,
  className: PropTypes.string,
  items: PropTypes.array,
  filterType: PropTypes.string,
  changeFilter: PropTypes.func,
  toggleFilter: PropTypes.func,
  onHandleChange: PropTypes.func,
  location: PropTypes.shape({
    query: PropTypes.object
  }),
  capitalize: PropTypes.bool
};
FilterItem.defaultProps = {
  changeFilter: function changeFilter(f) {
    return f;
  },
  onHandleChange: function onHandleChange(f) {
    return f;
  },
  location: {
    query: {}
  },
  className: 'wfui-filters-item',
  filterType: 'change',
  items: []
};
export default connect(function (state) {
  return {
    category: state.visibilityFilter && state.visibilityFilter.category
  };
}, Actions)(FilterItem);