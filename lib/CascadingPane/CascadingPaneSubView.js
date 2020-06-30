function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
import LoadingComponent from '../LoadingComponent/LoadingComponent';

var CascadingPaneSubView =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CascadingPaneSubView, _React$Component);

  function CascadingPaneSubView(props) {
    var _this;

    _classCallCheck(this, CascadingPaneSubView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CascadingPaneSubView).call(this, props));
    _this.state = {
      navSelect: props.cascNav || '',
      mainSelect: props.cascSelect || '',
      fetchedSub: props.fetchedSubView,
      fetchedMain: props.fetchedMainView
    };
    return _this;
  }

  _createClass(CascadingPaneSubView, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this$props = this.props,
          cascSelect = _this$props.cascSelect,
          getCascadingSubView = _this$props.getCascadingSubView;
      if (cascSelect && getCascadingSubView) getCascadingSubView(cascSelect);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this$props2 = this.props,
          cascNav = _this$props2.cascNav,
          cascSelect = _this$props2.cascSelect,
          fetchedMainView = _this$props2.fetchedMainView,
          fetchedSubView = _this$props2.fetchedSubView,
          getCascadingSubView = _this$props2.getCascadingSubView;
      var newState = {};

      if (fetchedMainView !== nextProps.fetchedMainView) {
        newState.fetchedMain = nextProps.fetchedMainView;
      }

      if (fetchedSubView !== nextProps.fetchedSubView) {
        newState.fetchedSub = nextProps.fetchedSubView;
      }

      if (cascNav) {
        if (!nextProps.cascNav || cascNav !== nextProps.cascNav) {
          newState.navSelect = nextProps.cascNav || '';
        }
      } else if (nextProps.cascNav) {
        newState.navSelect = nextProps.cascNav;
      }

      if (cascSelect) {
        if (!nextProps.cascSelect || cascSelect !== nextProps.cascSelect) {
          newState.navSelect = nextProps.cascSelect || '';

          if (nextProps.cascSelect && getCascadingSubView) {
            getCascadingSubView(nextProps.cascSelect);
          }
        }
      } else if (nextProps.cascSelect) {
        newState.navSelect = nextProps.cascSelect;
        if (getCascadingSubView) getCascadingSubView(nextProps.cascSelect);
      }

      if (Object.keys(newState).length > 0) {
        this.setState(_extends({}, newState));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          key = _this$props3.key,
          className = _this$props3.className,
          getCascadingSubView = _this$props3.getCascadingSubView,
          reloadMainView = _this$props3.reloadMainView,
          subViewFetch = _this$props3.subViewFetch,
          mainViewFetch = _this$props3.mainViewFetch,
          groupData = _this$props3.groupData,
          memberData = _this$props3.memberData,
          data = _this$props3.data,
          contentDisplay = _this$props3.contentDisplay;
      var _this$state = this.state,
          navSelect = _this$state.navSelect,
          mainSelect = _this$state.mainSelect,
          fetchedSub = _this$state.fetchedSub,
          fetchedMain = _this$state.fetchedMain;

      if (getCascadingSubView) {
        return React.createElement("div", {
          className: classNames(className, 'cascading-pane-subview'),
          key: key
        }, React.createElement(LoadingComponent, mainViewFetch, React.createElement(LoadingComponent, subViewFetch, fetchedSub && fetchedMain && React.cloneElement(contentDisplay, {
          groupData: groupData,
          memberData: memberData,
          data: data,
          reloadMainView: reloadMainView,
          reloadSubView: getCascadingSubView,
          navSelect: navSelect,
          mainSelect: mainSelect
        }))));
      }

      return React.createElement("div", {
        className: classNames(className, 'cascading-pane-subview'),
        key: key
      }, React.createElement(LoadingComponent, mainViewFetch, fetchedMain && React.cloneElement(contentDisplay, {
        groupData: groupData,
        memberData: memberData,
        data: data,
        reloadMainView: reloadMainView,
        navSelect: navSelect,
        mainSelect: mainSelect
      })));
    }
  }]);

  return CascadingPaneSubView;
}(React.Component);

CascadingPaneSubView.propTypes = {
  role: PropTypes.string,
  key: PropTypes.number,
  groupData: PropTypes.object,
  memberData: PropTypes.object,
  data: PropTypes.object,
  getCascadingSubView: PropTypes.func,
  subViewFetch: PropTypes.shape({
    status: PropTypes.string,
    isFetching: PropTypes.bool
  }),
  mainViewFetch: PropTypes.shape({
    status: PropTypes.string,
    isFetching: PropTypes.bool
  }),
  fetchedSubView: PropTypes.bool,
  fetchedMainView: PropTypes.bool,
  cascNav: PropTypes.string,
  cascSelect: PropTypes.string,
  reloadMainView: PropTypes.func,
  className: PropTypes.string,
  contentDisplay: PropTypes.element.isRequired,
  tableClassName: PropTypes.string
};
CascadingPaneSubView.defaultProps = {
  role: 'subView',
  key: 2,
  groupData: {},
  memberData: {},
  data: {},
  subViewFetch: {
    status: '',
    isFetching: false
  },
  mainViewFetch: {
    status: '',
    isFetching: false
  },
  fetchedSubView: false,
  fetchedMainView: false,
  cascNav: '',
  cascSelect: '',
  reloadMainView: function reloadMainView(f) {
    return f;
  },
  className: ''
};
export default CascadingPaneSubView;