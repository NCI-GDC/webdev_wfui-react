function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar } from 'react-bootstrap';
import DrawerToggle from './DrawerToggle';
import DrawerPopover from './DrawerPopover';
var TOGGLE_ROLE = DrawerToggle.defaultProps.bsRole;
var POPOVER_ROLE = DrawerPopover.defaultProps.bsRole;

var Drawer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Drawer, _React$Component);

  function Drawer(props) {
    var _this;

    _classCallCheck(this, Drawer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Drawer).call(this, props));
    _this.togglePopover = _this.togglePopover.bind(_assertThisInitialized(_this));
    _this.closePopover = _this.closePopover.bind(_assertThisInitialized(_this));
    _this.state = {
      show: false
    };
    return _this;
  }

  _createClass(Drawer, [{
    key: "togglePopover",
    value: function togglePopover(e) {
      this.setState({
        target: e.target,
        show: !this.state.show
      });
    }
  }, {
    key: "closePopover",
    value: function closePopover() {
      this.setState({
        show: false
      });
    }
  }, {
    key: "renderToggle",
    value: function renderToggle(child, key) {
      return cloneElement(child, {
        handleClick: this.togglePopover,
        key: key
      });
    }
  }, {
    key: "renderPopover",
    value: function renderPopover(child, key) {
      var _this$state = this.state,
          show = _this$state.show,
          target = _this$state.target;
      return cloneElement(child, {
        show: show,
        target: target,
        handleClose: this.closePopover,
        key: key
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          Component = _this$props.as,
          children = _this$props.children;
      return React.createElement(Component, null, children.map(function (child, key) {
        switch (child.props.bsRole) {
          case TOGGLE_ROLE:
            return _this2.renderToggle(child, key);

          case POPOVER_ROLE:
            return _this2.renderPopover(child, key);

          default:
            return child;
        }
      }));
    }
  }]);

  return Drawer;
}(React.Component);

Drawer.Button = DrawerToggle;
Drawer.Popover = DrawerPopover;
Drawer.propTypes = {
  as: PropTypes.func,
  children: PropTypes.arrayOf(function (propValue) {
    if (propValue.length !== 2) {
      return new Error('The Drawer Component requires exactly two children Drawer.Button and Drawer.Popover');
    }

    if (!propValue[0].props.bsRole === TOGGLE_ROLE) {
      return new Error('The first child of Drawer Component should be Drawer.Button');
    }

    if (!propValue[1].props.bsRole === POPOVER_ROLE) {
      return new Error('The second child of Drawer Component should be Drawer.Popover');
    }

    return null;
  }).isRequired
};
Drawer.defaultProps = {
  as: ButtonToolbar
};
export default Drawer;