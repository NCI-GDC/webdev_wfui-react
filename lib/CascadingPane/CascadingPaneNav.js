function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/* global window, document */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Glyphicon, Alert } from '../index';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import FilteredTable from '../FilteredTable/2/FilteredTable';

var CascadingPaneNav =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CascadingPaneNav, _React$Component);

  function CascadingPaneNav(props) {
    var _this;

    _classCallCheck(this, CascadingPaneNav);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CascadingPaneNav).call(this, props));
    _this.state = {
      selected: props.cascNav || '',
      fetched: props.fetchedNav,
      dataWithClass: props.data ? props.data.map(function (item) {
        var newItem = JSON.parse(JSON.stringify(item));
        newItem.className = "nav-item-".concat(item[props.itemIdField], " ").concat(item[props.itemIdField] === props.cascNav ? 'active' : '');
        return newItem;
      }) : [],
      tableHeight: 0
    };
    _this.onHandleClick = _this.onHandleClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CascadingPaneNav, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this$props = this.props,
          fetchedNav = _this$props.fetchedNav,
          cascNav = _this$props.cascNav,
          data = _this$props.data;

      if (fetchedNav !== nextProps.fetchedNav) {
        this.setState({
          fetched: nextProps.fetchedNav
        });
      }

      if (cascNav) {
        if (!nextProps.cascNav) {
          window.location.href = "".concat(window.location.href.split('?')[0], "?cascNav=").concat(nextProps.data[0][nextProps.itemIdField]);
        }

        if (cascNav !== nextProps.cascNav) {
          this.setState({
            selected: nextProps.cascNav || '',
            dataWithClass: nextProps.data ? nextProps.data.map(function (item) {
              var newItem = JSON.parse(JSON.stringify(item));
              newItem.className = "nav-item-".concat(item[nextProps.itemIdField], " ").concat(item[nextProps.itemIdField] === nextProps.cascNav ? 'active' : '');
              return newItem;
            }) : []
          });
        }
      } else if (nextProps.cascNav) {
        this.setState({
          selected: nextProps.cascNav,
          dataWithClass: nextProps.data ? nextProps.data.map(function (item) {
            var newItem = JSON.parse(JSON.stringify(item));
            newItem.className = "nav-item-".concat(item[nextProps.itemIdField], " ").concat(item[nextProps.itemIdField] === nextProps.cascNav ? 'active' : '');
            return newItem;
          }) : []
        });
      } else if (nextProps.data && nextProps.data.length > 0) {
        window.location.href = "".concat(window.location.href.split('?')[0], "?cascNav=").concat(nextProps.data[0][nextProps.itemIdField]);
      }

      if (JSON.stringify(data) !== JSON.stringify(nextProps.data)) {
        this.setState({
          dataWithClass: nextProps.data ? nextProps.data.map(function (item) {
            var newItem = JSON.parse(JSON.stringify(item));
            newItem.className = "nav-item-".concat(item[nextProps.itemIdField], " ").concat(item[nextProps.itemIdField] === nextProps.cascNav ? 'active' : '');
            return newItem;
          }) : []
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this$props2 = this.props,
          updateGroupSelect = _this$props2.updateGroupSelect,
          data = _this$props2.data,
          itemIdField = _this$props2.itemIdField;
      var _this$state = this.state,
          selected = _this$state.selected,
          tableHeight = _this$state.tableHeight;

      if (prevProps.data.length === 0 && data.length > 0 || selected !== prevState.selected || JSON.stringify(data) !== JSON.stringify(prevProps.data)) {
        var groupSelected = data.filter(function (item) {
          return item[itemIdField] === selected;
        });
        updateGroupSelect(groupSelected[0]);
      } // Set table height


      if (!tableHeight) {
        var navList = document.getElementsByClassName('cascading-pane-nav-list')[0];

        if (navList) {
          this.setState({
            tableHeight: navList.offsetHeight
          });
        }
      }
    }
  }, {
    key: "onHandleClick",
    value: function onHandleClick(item) {
      var itemIdField = this.props.itemIdField;
      var selected = this.state.selected;

      if (selected !== item[itemIdField]) {
        window.location.href = "".concat(window.location.href.split('?')[0], "?cascNav=").concat(encodeURI(item[itemIdField]));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          key = _this$props3.key,
          className = _this$props3.className,
          headerDisplay = _this$props3.headerDisplay,
          footerDisplay = _this$props3.footerDisplay,
          navFetch = _this$props3.navFetch,
          data = _this$props3.data,
          itemConfigDisplay = _this$props3.itemConfigDisplay,
          getCascadingNav = _this$props3.getCascadingNav,
          logoField = _this$props3.logoField,
          logoDefault = _this$props3.logoDefault,
          titleField = _this$props3.titleField,
          itemIdField = _this$props3.itemIdField,
          isHiddenField = _this$props3.isHiddenField;
      var _this$state2 = this.state,
          fetched = _this$state2.fetched,
          dataWithClass = _this$state2.dataWithClass,
          tableHeight = _this$state2.tableHeight;
      var navFormat = [];

      if (logoField) {
        navFormat.push({
          name: 'Logo',
          className: 'nav-group-logo',
          display: function display(item) {
            return React.createElement("img", {
              role: "presentation",
              src: item[logoField] || logoDefault,
              className: "cascading-nav-logo"
            });
          },
          flexGrow: 0,
          width: 37
        });
      }

      navFormat.push({
        name: 'Title',
        className: 'nav-group-title',
        display: function display(item) {
          return item[titleField] && item[titleField].length > 0 ? item[titleField] : item[itemIdField];
        },
        width: 165
      });

      if (isHiddenField) {
        navFormat.push({
          name: 'Visibility',
          className: 'nav-group-visibility',
          display: function display(item) {
            return item[isHiddenField] ? React.createElement(Glyphicon, {
              glyph: "eye-close",
              title: "Only visible to CUD administrators"
            }) : '';
          },
          flexGrow: 0,
          width: 45
        });
      }

      if (itemConfigDisplay) {
        navFormat.push({
          name: 'Actions',
          className: 'nav-group-actions',
          display: function display(item) {
            return React.cloneElement(itemConfigDisplay, {
              item: item,
              updateNav: function updateNav() {
                return getCascadingNav();
              }
            });
          },
          excludeRowClick: true,
          flexGrow: 0,
          width: 72
        });
      }

      return React.createElement("div", {
        className: classNames(className, 'cascading-pane-nav'),
        key: key
      }, headerDisplay, React.createElement(LoadingComponent, navFetch, React.createElement("div", {
        className: "cascading-pane-nav-list"
      }, fetched && !data && React.createElement(Alert, {
        variant: "danger"
      }, "No data available"), fetched && data && React.createElement(FilteredTable, {
        className: "table table-striped table-bordered table-condensed table-cascading-nav",
        data: dataWithClass,
        itemFormat: navFormat,
        rowClickable: true,
        onRowClick: function onRowClick(item) {
          return _this2.onHandleClick(item);
        },
        contentHeight: tableHeight,
        noTableHeader: true
      }))), footerDisplay);
    }
  }]);

  return CascadingPaneNav;
}(React.Component);

CascadingPaneNav.propTypes = {
  role: PropTypes.string,
  key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  data: PropTypes.array,
  getCascadingNav: PropTypes.func,
  navFetch: PropTypes.shape({
    status: PropTypes.string,
    isFetching: PropTypes.bool
  }),
  fetchedNav: PropTypes.bool,
  cascNav: PropTypes.string,
  updateGroupSelect: PropTypes.func,
  className: PropTypes.string,
  itemIdField: PropTypes.string,
  logoField: PropTypes.string,
  logoDefault: PropTypes.string,
  titleField: PropTypes.string,
  isHiddenField: PropTypes.string,
  headerDisplay: PropTypes.element,
  footerDisplay: PropTypes.element,
  itemConfigDisplay: PropTypes.element
};
CascadingPaneNav.defaultProps = {
  role: 'nav',
  key: 0,
  data: [],
  getCascadingNav: function getCascadingNav(f) {
    return f;
  },
  navFetch: {
    status: '',
    isFetching: false
  },
  fetchedNav: false,
  cascNav: '',
  updateGroupSelect: function updateGroupSelect(f) {
    return f;
  },
  className: '',
  itemIdField: 'id',
  logoField: '',
  logoDefault: '',
  titleField: 'title',
  isHiddenField: ''
};
export default CascadingPaneNav;