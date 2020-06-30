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
import PropTypes from 'prop-types';
import classNames from 'classnames';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import FilteredTable from '../FilteredTable/2/FilteredTable';

var CascadingPaneMainView =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CascadingPaneMainView, _React$Component);

  function CascadingPaneMainView(props) {
    var _this;

    _classCallCheck(this, CascadingPaneMainView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CascadingPaneMainView).call(this, props));
    _this.state = {
      navSelect: props.cascNav || '',
      curSelect: props.cascSelect || '',
      fetchedNav: props.fetchedNav,
      fetchedMainView: props.fetchedMainView,
      selected: [],
      filtered: [],
      showing: 0,
      dataWithClass: props.mainData ? props.mainData.map(function (item) {
        var newItem = JSON.parse(JSON.stringify(item));
        newItem.className = "member-item-".concat(item[props.itemIdField], " ").concat(item[props.itemIdField] === props.cascSelect ? 'active' : '');
        return newItem;
      }) : []
    };
    _this.onHandleClick = _this.onHandleClick.bind(_assertThisInitialized(_this));
    _this.onSelectionChange = _this.onSelectionChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CascadingPaneMainView, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this$props = this.props,
          cascNav = _this$props.cascNav,
          getCascadingMainView = _this$props.getCascadingMainView;
      if (cascNav) getCascadingMainView(cascNav);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this$props2 = this.props,
          cascNav = _this$props2.cascNav,
          cascSelect = _this$props2.cascSelect,
          fetchedNav = _this$props2.fetchedNav,
          fetchedMainView = _this$props2.fetchedMainView,
          getCascadingMainView = _this$props2.getCascadingMainView,
          mainData = _this$props2.mainData;
      var newState = {};

      if (fetchedNav !== nextProps.fetchedNav) {
        newState.fetchedNav = nextProps.fetchedNav;
      }

      if (fetchedMainView !== nextProps.fetchedMainView) {
        newState.fetchedMainView = nextProps.fetchedMainView;
      }

      if (cascNav) {
        if (!nextProps.cascNav || cascNav !== nextProps.cascNav) {
          newState.navSelect = nextProps.cascNav || '';
          if (nextProps.cascNav) getCascadingMainView(nextProps.cascNav);
        }
      } else if (nextProps.cascNav) {
        newState.navSelect = nextProps.cascNav;
        getCascadingMainView(nextProps.cascNav);
      }

      if (cascSelect) {
        if (!nextProps.cascSelect || cascSelect !== nextProps.cascSelect) {
          newState.curSelect = nextProps.cascSelect || '';
          newState.dataWithClass = nextProps.mainData ? nextProps.mainData.map(function (item) {
            var newItem = JSON.parse(JSON.stringify(item));
            newItem.className = "member-item-".concat(item[nextProps.itemIdField], " ").concat(item[nextProps.itemIdField] === nextProps.cascSelect ? 'active' : '');
            return newItem;
          }) : [];
        }
      } else if (nextProps.cascSelect) {
        newState.curSelect = nextProps.cascSelect;
        newState.dataWithClass = nextProps.mainData ? nextProps.mainData.map(function (item) {
          var newItem = JSON.parse(JSON.stringify(item));
          newItem.className = "member-item-".concat(item[nextProps.itemIdField], " ").concat(item[nextProps.itemIdField] === nextProps.cascSelect ? 'active' : '');
          return newItem;
        }) : [];
      }

      if (JSON.stringify(mainData) !== nextProps.mainData) {
        newState.dataWithClass = nextProps.mainData ? nextProps.mainData.map(function (item) {
          var newItem = JSON.parse(JSON.stringify(item));
          newItem.className = "member-item-".concat(item[nextProps.itemIdField], " ").concat(item[nextProps.itemIdField] === nextProps.cascSelect ? 'active' : '');
          return newItem;
        }) : [];
      }

      if (Object.keys(newState).length > 0) {
        this.setState(_extends({}, newState));
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this$props3 = this.props,
          updateMemberSelect = _this$props3.updateMemberSelect,
          mainData = _this$props3.mainData,
          itemIdField = _this$props3.itemIdField;
      var curSelect = this.state.curSelect;

      if (prevProps.mainData.length === 0 && mainData.length > 0 || curSelect !== prevState.curSelect || JSON.stringify(mainData) !== JSON.stringify(prevProps.mainData)) {
        var memberSelected = mainData.filter(function (item) {
          return item[itemIdField] === curSelect;
        });
        updateMemberSelect(memberSelected[0]);
      }
    }
  }, {
    key: "onSelectionChange",
    value: function onSelectionChange(selection) {
      var mainData = this.props.mainData;
      var newSelected = selection.map(function (idx) {
        return mainData[idx];
      });
      this.setState({
        selected: newSelected
      });
    }
  }, {
    key: "onHandleClick",
    value: function onHandleClick(item) {
      var itemIdField = this.props.itemIdField;
      var curSelect = this.state.curSelect;

      if (curSelect !== item[itemIdField]) {
        if (curSelect) {
          window.location.href = window.location.href.replace("cascSelect=".concat(encodeURI(curSelect)), "cascSelect=".concat(encodeURI(item[itemIdField])));
        } else {
          window.location.href = "".concat(window.location.href, "&cascSelect=").concat(encodeURI(item[itemIdField]));
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props4 = this.props,
          key = _this$props4.key,
          className = _this$props4.className,
          noneSelectedDisplay = _this$props4.noneSelectedDisplay,
          navFetch = _this$props4.navFetch,
          mainViewFetch = _this$props4.mainViewFetch,
          groupData = _this$props4.groupData,
          mainData = _this$props4.mainData,
          summaryDisplay = _this$props4.summaryDisplay,
          reloadNav = _this$props4.reloadNav,
          itemDisplay = _this$props4.itemDisplay,
          itemConfig = _this$props4.itemConfig,
          tableClassName = _this$props4.tableClassName,
          visibilityFilter = _this$props4.visibilityFilter,
          filtersDisplay = _this$props4.filtersDisplay,
          getFilters = _this$props4.getFilters,
          location = _this$props4.location,
          getCascadingMainView = _this$props4.getCascadingMainView;
      var _this$state = this.state,
          navSelect = _this$state.navSelect,
          fetchedNav = _this$state.fetchedNav,
          fetchedMainView = _this$state.fetchedMainView,
          showing = _this$state.showing,
          dataWithClass = _this$state.dataWithClass,
          selected = _this$state.selected;
      var mainViewItemFormat = [];

      if (itemDisplay) {
        mainViewItemFormat = mainViewItemFormat.concat(itemDisplay);
      }

      if (itemConfig) {
        mainViewItemFormat.push({
          name: 'actions',
          className: 'td-actions',
          display: function display(item) {
            return React.cloneElement(itemConfig, Object.assign({}, {
              item: item,
              groupData: groupData
            }, {
              reloadData: function reloadData() {
                return getCascadingMainView();
              }
            }));
          },
          excludeRowClick: true,
          width: 72,
          flexGrow: 0
        });
      }

      if (!navSelect) {
        return React.createElement("div", {
          className: classNames(className, 'cascading-pane-mainview'),
          key: key
        }, noneSelectedDisplay);
      }

      return React.createElement("div", {
        className: classNames(className, 'cascading-pane-mainview'),
        key: key
      }, React.createElement(LoadingComponent, navFetch, React.createElement(LoadingComponent, mainViewFetch, React.createElement("div", {
        className: "cascading-pane-mainview-summary"
      }, fetchedNav && summaryDisplay && React.cloneElement(summaryDisplay, {
        data: mainData,
        groupData: groupData,
        updateNav: function updateNav() {
          return reloadNav();
        }
      })), React.createElement("div", {
        className: "cascading-pane-mainview-filters "
      }, filtersDisplay && React.cloneElement(filtersDisplay, _extends({}, this.props, {
        visibilityFilter: visibilityFilter,
        location: location,
        showing: showing,
        data: mainData,
        selected: selected,
        groupData: groupData
      }))), React.createElement("div", {
        className: "cascading-pane-mainview-table"
      }, fetchedMainView && React.createElement(FilteredTable, {
        className: tableClassName,
        searchTerm: visibilityFilter.category.searchTerm || '',
        filterList: getFilters(visibilityFilter.category),
        data: dataWithClass,
        itemFormat: mainViewItemFormat,
        onSelectionChange: this.onSelectionChange,
        onResultsNumUpdate: function onResultsNumUpdate(results) {
          return _this2.setState({
            showing: results
          });
        },
        rowClickable: true,
        onRowClick: function onRowClick(item) {
          return _this2.onHandleClick(item);
        },
        selectable: true,
        simpleSearch: true,
        wholeWord: true
      })))));
    }
  }]);

  return CascadingPaneMainView;
}(React.Component);

CascadingPaneMainView.propTypes = {
  role: PropTypes.string,
  key: PropTypes.number,
  groupData: PropTypes.object,
  mainData: PropTypes.array,
  getCascadingMainView: PropTypes.func,
  navFetch: PropTypes.shape({
    status: PropTypes.string,
    isFetching: PropTypes.bool
  }),
  mainViewFetch: PropTypes.shape({
    status: PropTypes.string,
    isFetching: PropTypes.bool
  }),
  fetchedNav: PropTypes.bool,
  fetchedMainView: PropTypes.bool,
  location: PropTypes.object,
  cascNav: PropTypes.string,
  cascSelect: PropTypes.string,
  reloadNav: PropTypes.func,
  updateMemberSelect: PropTypes.func,
  visibilityFilter: PropTypes.object,
  className: PropTypes.string,
  tableClassName: PropTypes.string,
  noneSelectedDisplay: PropTypes.element,
  summaryDisplay: PropTypes.element,
  itemDisplay: PropTypes.array,
  itemConfig: PropTypes.element,
  itemIdField: PropTypes.string,
  getFilters: PropTypes.func,
  filtersDisplay: PropTypes.element
};
CascadingPaneMainView.defaultProps = {
  role: 'mainView',
  key: 1,
  groupData: {},
  mainData: [],
  getCascadingMainView: function getCascadingMainView(f) {
    return f;
  },
  navFetch: {
    status: '',
    isFetching: false
  },
  mainViewFetch: {
    status: '',
    isFetching: false
  },
  fetchedNav: false,
  fetchedMainView: false,
  cascNav: '',
  cascSelect: '',
  reloadNav: function reloadNav(f) {
    return f;
  },
  updateMemberSelect: function updateMemberSelect(f) {
    return f;
  },
  className: '',
  tableClassName: '',
  noneSelectedDisplay: React.createElement("p", null, "Please select a group"),
  itemIdField: 'id'
};
export default CascadingPaneMainView;