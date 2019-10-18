function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import SplitPane from 'react-split-pane';
import CascadingPaneNav from './CascadingPaneNav';
import CascadingPaneMainView from './CascadingPaneMainView';
import CascadingPaneSubView from './CascadingPaneSubView';
import { fetchSelector } from '../util';
var NAV_ROLE = CascadingPaneNav.role;
var MAINVIEW_ROLE = CascadingPaneMainView.role;
var SUBVIEW_ROLE = CascadingPaneSubView.role;

var CascadingPane =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CascadingPane, _React$Component);

  function CascadingPane(props) {
    var _this;

    _classCallCheck(this, CascadingPane);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CascadingPane).call(this, props));
    _this.state = {
      mainSelectIdx: -1,
      selectedGroup: {},
      selectedMember: {}
    };
    return _this;
  }

  _createClass(CascadingPane, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var getCascadingNav = this.props.getCascadingNav;
      getCascadingNav();
    }
  }, {
    key: "renderNav",
    value: function renderNav(child) {
      var _this2 = this;

      var _this$props = this.props,
          location = _this$props.location,
          getCascadingNav = _this$props.getCascadingNav,
          navData = _this$props.navData,
          navFetch = _this$props.navFetch,
          fetchedNav = _this$props.fetchedNav;
      return React.cloneElement(child, {
        key: 0,
        data: navData,
        getCascadingNav: getCascadingNav,
        navFetch: navFetch,
        fetchedNav: fetchedNav,
        cascNav: location.query.cascNav,
        updateGroupSelect: function updateGroupSelect(item) {
          return _this2.setState({
            selectedGroup: item
          });
        }
      });
    }
  }, {
    key: "renderMainView",
    value: function renderMainView(child) {
      var _this3 = this;

      var _this$props2 = this.props,
          getCascadingNav = _this$props2.getCascadingNav,
          getCascadingMainView = _this$props2.getCascadingMainView,
          location = _this$props2.location,
          mainData = _this$props2.mainData,
          navFetch = _this$props2.navFetch,
          mainViewFetch = _this$props2.mainViewFetch,
          fetchedNav = _this$props2.fetchedNav,
          fetchedMainView = _this$props2.fetchedMainView,
          visibilityFilter = _this$props2.visibilityFilter;
      var selectedGroup = this.state.selectedGroup;
      return React.cloneElement(child, {
        key: 1,
        groupData: selectedGroup,
        mainData: mainData,
        getCascadingMainView: getCascadingMainView,
        navFetch: navFetch,
        mainViewFetch: mainViewFetch,
        fetchedNav: fetchedNav,
        fetchedMainView: fetchedMainView,
        location: location,
        cascNav: location.query.cascNav,
        cascSelect: location.query.cascSelect,
        reloadNav: getCascadingNav,
        updateMemberSelect: function updateMemberSelect(item) {
          return _this3.setState({
            selectedMember: item || {}
          });
        },
        visibilityFilter: visibilityFilter
      });
    }
  }, {
    key: "renderSubView",
    value: function renderSubView(child) {
      var _this$props3 = this.props,
          getCascadingSubView = _this$props3.getCascadingSubView,
          getCascadingMainView = _this$props3.getCascadingMainView,
          location = _this$props3.location,
          subData = _this$props3.subData,
          subViewFetch = _this$props3.subViewFetch,
          mainViewFetch = _this$props3.mainViewFetch,
          fetchedSubView = _this$props3.fetchedSubView,
          fetchedMainView = _this$props3.fetchedMainView;
      var _this$state = this.state,
          selectedGroup = _this$state.selectedGroup,
          selectedMember = _this$state.selectedMember;
      return React.cloneElement(child, {
        key: 2,
        groupData: selectedGroup,
        memberData: selectedMember,
        data: subData,
        getCascadingSubView: getCascadingSubView,
        subViewFetch: subViewFetch,
        mainViewFetch: mainViewFetch,
        fetchedSubView: fetchedSubView,
        fetchedMainView: fetchedMainView,
        cascNav: location.query.cascNav,
        cascSelect: location.query.cascSelect,
        reloadMainView: getCascadingMainView
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          className = _this$props4.className,
          viewClassName = _this$props4.viewClassName,
          splitClassName = _this$props4.splitClassName,
          defaultSize = _this$props4.defaultSize,
          children = _this$props4.children;
      var selectedMember = this.state.selectedMember;
      return React.createElement("div", {
        className: classNames(className, 'cascading-pane cascading-pane-container')
      }, this.renderNav(children[0]), Object.keys(selectedMember).length === 0 ? React.createElement("div", {
        className: classNames(viewClassName, 'cascading-pane-view')
      }, this.renderMainView(children[1])) : React.createElement(SplitPane, {
        className: classNames(viewClassName, splitClassName, 'cascading-pane-view'),
        split: "vertical",
        minSize: 50,
        defaultSize: defaultSize || 150,
        primary: "second"
      }, this.renderMainView(children[1]), this.renderSubView(children[2])));
    }
  }]);

  return CascadingPane;
}(React.Component);

CascadingPane.Nav = CascadingPaneNav;
CascadingPane.MainView = CascadingPaneMainView;
CascadingPane.SubView = CascadingPaneSubView;
CascadingPane.propTypes = {
  location: PropTypes.object,
  className: PropTypes.string,
  viewClassName: PropTypes.string,
  splitClassName: PropTypes.string,
  getCascadingNav: PropTypes.func,
  getCascadingMainView: PropTypes.func,
  getCascadingSubView: PropTypes.func,
  navData: PropTypes.array,
  mainData: PropTypes.array,
  subData: PropTypes.object,
  navFetch: PropTypes.object,
  mainViewFetch: PropTypes.object,
  subViewFetch: PropTypes.object,
  fetchedNav: PropTypes.bool,
  fetchedMainView: PropTypes.bool,
  fetchedSubView: PropTypes.bool,
  defaultSize: PropTypes.number,
  navDataSelector: PropTypes.func,
  mainDataSelector: PropTypes.func,
  subDataSelector: PropTypes.func,
  children: PropTypes.arrayOf(function (propValue) {
    if (propValue.length !== 3) {
      return new Error('The Cascading Pane requires exactly three children: CascadingPane.Nav, CascadingPane.MainView and CascadingPane.SubView');
    }

    var roles = ['nav', 'mainView', 'subView'];
    var rolesMatch = propValue.every(function (child, idx) {
      return child.props.role === roles[idx];
    });

    if (!rolesMatch) {
      return new Error('The Cascading Pane requires exactly three children in the following order: CascadingPane.Nav, CascadingPane.MainView and CascadingPane.SubView');
    }
  }).isRequired,
  visibilityFilter: PropTypes.object
};
CascadingPane.defaultProps = {
  className: '',
  viewClassName: '',
  splitClassName: '',
  getCascadingNav: function getCascadingNav(f) {
    return f;
  },
  getCascadingMainView: function getCascadingMainView(f) {
    return f;
  },
  navData: [],
  mainData: [],
  subData: {},
  location: {
    query: {
      cascNav: '',
      cascSelect: ''
    }
  },
  defaultSize: 0
};
export default connect(function (state, props) {
  var casData = state.cascadingPane;
  var navFetch = fetchSelector('getCascadingNav')(state);
  var mainViewFetch = fetchSelector('getCascadingMainView')(state);
  var subViewFetch = fetchSelector('getCascadingSubView')(state);
  return {
    navFetch: navFetch,
    mainViewFetch: mainViewFetch,
    subViewFetch: subViewFetch,
    navData: props.navDataSelector ? props.navDataSelector(casData)(state) : casData.navData,
    mainData: props.mainDataSelector ? props.mainDataSelector(casData)(state) : casData.mainData,
    subData: props.subDataSelector ? props.subDataSelector(casData)(state) : casData.subData,
    visibilityFilter: state.visibilityFilter,
    fetchedNav: navFetch && !navFetch.isFetching && navFetch.status === 'success',
    fetchedMainView: mainViewFetch && !mainViewFetch.isFetching && mainViewFetch.status === 'success',
    fetchedSubView: subViewFetch && !subViewFetch.isFetching && subViewFetch.status === 'success'
  };
})(CascadingPane);