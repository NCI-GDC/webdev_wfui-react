function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React, { cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';
import DrawerButton from '../Drawer/DrawerButton';
import DefaultGroupsItem from './DefaultGroupsItem';
import DefaultFooterItem from './DefaultFooterItem';
import Spinner from '../Spinner/Spinner';
var defaultSpinner = React.createElement("div", {
  className: "groups-drawer",
  style: {
    width: '100px',
    height: '50px'
  }
}, React.createElement(Spinner, {
  type: 1,
  fontSize: "10",
  margin: "40px"
}));

var GroupsDrawer =
/*#__PURE__*/
function (_Component) {
  _inherits(GroupsDrawer, _Component);

  function GroupsDrawer() {
    _classCallCheck(this, GroupsDrawer);

    return _possibleConstructorReturn(this, _getPrototypeOf(GroupsDrawer).apply(this, arguments));
  }

  _createClass(GroupsDrawer, [{
    key: "renderGroups",
    value: function renderGroups() {
      var _this$props = this.props,
          groups = _this$props.data.groups,
          groupsItemFormat = _this$props.groupsItemFormat,
          groupsContainer = _this$props.groupsContainer;
      var groupsComponent = groups.map(function (group, idx) {
        return cloneElement(groupsItemFormat, _extends({
          key: idx
        }, group));
      });
      return cloneElement(groupsContainer, {
        className: 'groups-drawer-body',
        children: groupsComponent
      });
    }
  }, {
    key: "renderFooter",
    value: function renderFooter() {
      var _this$props2 = this.props,
          footer = _this$props2.data.footer,
          footerItemFormat = _this$props2.footerItemFormat,
          footerContainer = _this$props2.footerContainer;
      var footerComponent = footer.map(function (item, idx) {
        return cloneElement(footerItemFormat, _extends({
          key: idx
        }, item));
      });
      return cloneElement(footerContainer, {
        className: 'groups-drawer-footer',
        children: footerComponent
      });
    }
  }, {
    key: "renderPopover",
    value: function renderPopover() {
      var _this$props$data = this.props.data,
          groups = _this$props$data.groups,
          footer = _this$props$data.footer;
      return React.createElement("div", {
        className: "groups-drawer"
      }, groups && groups.length > 0 ? this.renderGroups() : null, footer && footer.length > 0 ? this.renderFooter() : null);
    }
  }, {
    key: "renderSpinner",
    value: function renderSpinner() {
      return this.props.spinnerFormat;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          data = _this$props3.data,
          props = _objectWithoutProperties(_this$props3, ["data"]);

      return React.createElement(DrawerButton, props, data && Object.keys(data).length > 0 ? this.renderPopover() : this.renderSpinner());
    }
  }]);

  return GroupsDrawer;
}(Component);

GroupsDrawer.propTypes = _extends({
  popoverTitle: PropTypes.string,
  data: PropTypes.shape({
    groups: PropTypes.arrayOf(PropTypes.shape({
      icon: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired
    })),
    footer: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired
    }))
  }),
  spinnerFormat: PropTypes.element,
  groupsItemFormat: PropTypes.element,
  footerItemFormat: PropTypes.element,
  groupsContainer: PropTypes.element,
  footerContainer: PropTypes.element
}, DrawerButton.propTypes);
GroupsDrawer.defaultProps = {
  variant: 'link',
  title: '',
  isIcon: true,
  icon: 'th',
  image: null,
  useCaret: false,
  placement: 'bottom',
  popoverTitle: 'MY GROUPS',
  groupsContainer: React.createElement(Row, null),
  footerContainer: React.createElement(Row, null),
  spinnerFormat: defaultSpinner,
  groupsItemFormat: React.createElement(DefaultGroupsItem, null),
  footerItemFormat: React.createElement(DefaultFooterItem, null)
};
export default GroupsDrawer;