'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactRedux = require('react-redux');

var _reactSplitPane = require('react-split-pane');

var _reactSplitPane2 = _interopRequireDefault(_reactSplitPane);

var _CascadingPaneNav = require('./CascadingPaneNav');

var _CascadingPaneNav2 = _interopRequireDefault(_CascadingPaneNav);

var _CascadingPaneMainView = require('./CascadingPaneMainView');

var _CascadingPaneMainView2 = _interopRequireDefault(_CascadingPaneMainView);

var _CascadingPaneSubView = require('./CascadingPaneSubView');

var _CascadingPaneSubView2 = _interopRequireDefault(_CascadingPaneSubView);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global window */


var NAV_ROLE = _CascadingPaneNav2.default.role;
var MAINVIEW_ROLE = _CascadingPaneMainView2.default.role;
var SUBVIEW_ROLE = _CascadingPaneSubView2.default.role;

var CascadingPane = function (_React$Component) {
  _inherits(CascadingPane, _React$Component);

  function CascadingPane(props) {
    _classCallCheck(this, CascadingPane);

    var _this = _possibleConstructorReturn(this, (CascadingPane.__proto__ || Object.getPrototypeOf(CascadingPane)).call(this, props));

    _this.state = {
      mainSelectIdx: -1,

      selectedGroup: {},
      selectedMember: {}
    };
    return _this;
  }

  _createClass(CascadingPane, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          config = _props.config,
          getCascadingNav = _props.getCascadingNav;

      getCascadingNav(config);
    }
  }, {
    key: 'renderNav',
    value: function renderNav(child) {
      var _this2 = this;

      var _props2 = this.props,
          config = _props2.config,
          location = _props2.location,
          getCascadingNav = _props2.getCascadingNav,
          navData = _props2.navData,
          navFetch = _props2.navFetch,
          fetchedNav = _props2.fetchedNav;


      return _react2.default.cloneElement(child, {
        key: 0,
        config: config,
        data: navData,
        getCascadingNav: getCascadingNav,
        navFetch: navFetch,
        fetchedNav: fetchedNav,
        cascNav: location.query.cascNav,
        updateGroupSelect: function updateGroupSelect(item) {
          return _this2.setState({ selectedGroup: item });
        }
      });
    }
  }, {
    key: 'renderMainView',
    value: function renderMainView(child) {
      var _this3 = this;

      var _props3 = this.props,
          config = _props3.config,
          getCascadingNav = _props3.getCascadingNav,
          getCascadingMainView = _props3.getCascadingMainView,
          location = _props3.location,
          mainData = _props3.mainData,
          navFetch = _props3.navFetch,
          mainViewFetch = _props3.mainViewFetch,
          fetchedNav = _props3.fetchedNav,
          fetchedMainView = _props3.fetchedMainView,
          visibilityFilter = _props3.visibilityFilter;
      var selectedGroup = this.state.selectedGroup;


      return _react2.default.cloneElement(child, {
        key: 1,
        config: config,
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
          return _this3.setState({ selectedMember: item || {} });
        },
        visibilityFilter: visibilityFilter
      });
    }
  }, {
    key: 'renderSubView',
    value: function renderSubView(child) {
      var _props4 = this.props,
          config = _props4.config,
          getCascadingSubView = _props4.getCascadingSubView,
          getCascadingMainView = _props4.getCascadingMainView,
          location = _props4.location,
          subData = _props4.subData,
          subViewFetch = _props4.subViewFetch,
          mainViewFetch = _props4.mainViewFetch,
          fetchedSubView = _props4.fetchedSubView,
          fetchedMainView = _props4.fetchedMainView;
      var _state = this.state,
          selectedGroup = _state.selectedGroup,
          selectedMember = _state.selectedMember;


      return _react2.default.cloneElement(child, {
        key: 2,
        config: config,
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
    key: 'render',
    value: function render() {
      var _props5 = this.props,
          className = _props5.className,
          viewClassName = _props5.viewClassName,
          splitClassName = _props5.splitClassName,
          defaultSize = _props5.defaultSize,
          children = _props5.children;
      var selectedMember = this.state.selectedMember;


      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(className, 'cascading-pane cascading-pane-container') },
        this.renderNav(children[0]),
        Object.keys(selectedMember).length === 0 ? _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)(viewClassName, 'cascading-pane-view') },
          this.renderMainView(children[1])
        ) : _react2.default.createElement(
          _reactSplitPane2.default,
          {
            className: (0, _classnames2.default)(viewClassName, splitClassName, 'cascading-pane-view'),
            split: 'vertical',
            minSize: 50,
            defaultSize: defaultSize || 150,
            primary: 'second'
          },
          this.renderMainView(children[1]),
          this.renderSubView(children[2])
        )
      );
    }
  }]);

  return CascadingPane;
}(_react2.default.Component);

CascadingPane.Nav = _CascadingPaneNav2.default;
CascadingPane.MainView = _CascadingPaneMainView2.default;
CascadingPane.SubView = _CascadingPaneSubView2.default;

CascadingPane.propTypes = {
  config: _propTypes2.default.shape({
    APP_ID: _propTypes2.default.string
  }).isRequired,
  location: _propTypes2.default.object,
  className: _propTypes2.default.string,
  viewClassName: _propTypes2.default.string,
  splitClassName: _propTypes2.default.string,
  getCascadingNav: _propTypes2.default.func,
  getCascadingMainView: _propTypes2.default.func,
  getCascadingSubView: _propTypes2.default.func,
  navData: _propTypes2.default.array,
  mainData: _propTypes2.default.array,
  subData: _propTypes2.default.object,
  navFetch: _propTypes2.default.object,
  mainViewFetch: _propTypes2.default.object,
  subViewFetch: _propTypes2.default.object,
  fetchedNav: _propTypes2.default.bool,
  fetchedMainView: _propTypes2.default.bool,
  fetchedSubView: _propTypes2.default.bool,
  defaultSize: _propTypes2.default.number,
  navDataSelector: _propTypes2.default.func,
  mainDataSelector: _propTypes2.default.func,
  subDataSelector: _propTypes2.default.func,
  children: _propTypes2.default.arrayOf(function (propValue) {
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
  visibilityFilter: _propTypes2.default.object
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
  getCascadingSubView: function getCascadingSubView(f) {
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

exports.default = (0, _reactRedux.connect)(function (state, props) {
  var casData = state.cascadingPane;
  var navFetch = (0, _util.fetchSelector)('getCascadingNav')(state);
  var mainViewFetch = (0, _util.fetchSelector)('getCascadingMainView')(state);
  var subViewFetch = (0, _util.fetchSelector)('getCascadingSubView')(state);
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