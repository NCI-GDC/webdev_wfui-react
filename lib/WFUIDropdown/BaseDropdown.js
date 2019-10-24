function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import matches from 'dom-helpers/query/matches';
import qsa from 'dom-helpers/query/querySelectorAll';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import uncontrollable from 'uncontrollable';
import * as Popper from 'react-popper';
import DropdownContext from 'react-overlays/DropdownContext';
import DropdownMenu from './DropdownMenu';
import DropdownToggle from 'react-overlays/DropdownToggle';
var propTypes = {
  /**
   * A render prop that returns the root dropdown element. The `props`
   * argument should spread through to an element containing _both_ the
   * menu and toggle in order to handle keyboard events for focus management.
   *
   * @type {Function ({
   *   props: {
   *     onKeyDown: (SyntheticEvent) => void,
   *   },
   * }) => React.Element}
   */
  children: PropTypes.func.isRequired,

  /**
   * Determines the direction and location of the Menu in relation to it's Toggle.
   */
  drop: PropTypes.oneOf(['up', 'left', 'right', 'down']),

  /**
   * Controls the focus behavior for when the Dropdown is opened. Set to
   * `true` to always focus the first menu item, `keyboard` to focus only when
   * navigating via the keyboard, or `false` to disable completely
   *
   * The Default behavior is `false` **unless** the Menu has a `role="menu"`
   * where it will default to `keyboard` to match the recommended [ARIA Authoring practices](https://www.w3.org/TR/wai-aria-practices-1.1/#menubutton).
   */
  focusFirstItemOnShow: PropTypes.oneOf([false, true, 'keyboard']),

  /**
   * A css slector string that will return __focusable__ menu items.
   * Selectors should be relative to the menu component:
   * e.g. ` > li:not('.disabled')`
   */
  itemSelector: PropTypes.string.isRequired,

  /**
   * Align the menu to the 'end' side of the placement side of the Dropdown toggle. The default placement is `top-start` or `bottom-start`.
   */
  alignEnd: PropTypes.bool,

  /**
   * Whether or not the Dropdown is visible.
   *
   * @controllable onToggle
   */
  show: PropTypes.bool,

  /**
   * A callback fired when the Dropdown wishes to change visibility. Called with the requested
   * `show` value, the DOM event, and the source that fired it: `'click'`,`'keydown'`,`'rootClose'`, or `'select'`.
   *
   * ```js
   * function(
   *   isOpen: boolean,
   *   event: SyntheticEvent,
   * ): void
   * ```
   *
   * @controllable show
   */
  onToggle: PropTypes.func
};
var defaultProps = {
  itemSelector: '* > *'
};
/**
 * `Dropdown` is set of structural components for building, accessible dropdown menus with close-on-click,
 * keyboard navigation, and correct focus handling. As with all the react-overlay's
 * components its BYOS (bring your own styles). Dropdown is primarily
 * built from three base components, you should compose to build your Dropdowns.
 *
 * - `Dropdown`, which wraps the menu and toggle, and handles keyboard navigation
 * - `Dropdown.Toggle` generally a button that triggers the menu opening
 * - `Dropdown.Menu` The overlaid, menu, positioned to the toggle with PopperJs
 */

var Dropdown =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Dropdown, _React$Component);

  _createClass(Dropdown, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(_ref, prevState) {
      var drop = _ref.drop,
          alignEnd = _ref.alignEnd,
          show = _ref.show;
      var lastShow = prevState.context.show;
      return {
        lastShow: lastShow,
        context: _extends({}, prevState.context, {
          drop: drop,
          show: show,
          alignEnd: alignEnd
        })
      };
    }
  }]);

  function Dropdown(props, context) {
    var _this;

    _classCallCheck(this, Dropdown);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Dropdown).call(this, props, context));

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (event) {
      _this.toggleOpen(event);
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (event) {
      var key = event.key,
          target = event.target; // Second only to https://github.com/twbs/bootstrap/blob/8cfbf6933b8a0146ac3fbc369f19e520bd1ebdac/js/src/dropdown.js#L400
      // in inscrutability

      var isInput = /input|textarea/i.test(target.tagName);

      if (isInput && (key === ' ' || key !== 'Escape' && _this.menu.contains(target))) {
        return;
      }

      _this._lastSourceEvent = event.type;

      switch (key) {
        case 'ArrowUp':
          {
            var next = _this.getNextFocusedChild(target, -1);

            if (next && next.focus) next.focus();
            event.preventDefault();
            return;
          }

        case 'ArrowDown':
          event.preventDefault();

          if (!_this.props.show) {
            _this.toggleOpen(event);
          } else {
            var _next = _this.getNextFocusedChild(target, 1);

            if (_next && _next.focus) _next.focus();
          }

          return;

        case 'Escape':
        case 'Tab':
          _this.props.onToggle(false, event);

          break;

        default:
      }
    });

    _this._focusInDropdown = false;
    _this.menu = null;
    _this.state = {
      context: {
        close: _this.handleClose,
        toggle: _this.handleClick,
        menuRef: function menuRef(r) {
          _this.menu = r;
        },
        toggleRef: function toggleRef(r) {
          var toggleNode = r && ReactDOM.findDOMNode(r);

          _this.setState(function (_ref2) {
            var context = _ref2.context;
            return {
              context: _extends({}, context, {
                toggleNode: toggleNode
              })
            };
          });
        }
      }
    };
    return _this;
  }

  _createClass(Dropdown, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var show = this.props.show;
      var prevOpen = prevProps.show;

      if (show && !prevOpen) {
        this.maybeFocusFirst();
      }

      this._lastSourceEvent = null;

      if (!show && prevOpen) {
        // if focus hasn't already moved from the menu let's return it
        // to the toggle
        if (this._focusInDropdown) {
          this._focusInDropdown = false;
          this.focus();
        }
      }
    }
  }, {
    key: "getNextFocusedChild",
    value: function getNextFocusedChild(current, offset) {
      if (!this.menu) return null;
      var itemSelector = this.props.itemSelector;
      var items = qsa(this.menu, itemSelector);
      var index = items.indexOf(current) + offset;
      index = Math.max(0, Math.min(index, items.length));
      return items[index];
    }
  }, {
    key: "hasMenuRole",
    value: function hasMenuRole() {
      return this.menu && matches(this.menu, '[role=menu]');
    }
  }, {
    key: "focus",
    value: function focus() {
      var toggleNode = this.state.context.toggleNode;

      if (toggleNode && toggleNode.focus) {
        toggleNode.focus();
      }
    }
  }, {
    key: "maybeFocusFirst",
    value: function maybeFocusFirst() {
      var type = this._lastSourceEvent;
      var focusFirstItemOnShow = this.props.focusFirstItemOnShow;

      if (focusFirstItemOnShow == null) {
        focusFirstItemOnShow = this.hasMenuRole() ? 'keyboard' : false;
      }

      if (focusFirstItemOnShow === false || focusFirstItemOnShow === 'keyboard' && !/^key.+$/.test(type)) {
        return;
      }

      var itemSelector = this.props.itemSelector;
      var first = qsa(this.menu, itemSelector)[0];
      if (first && first.focus) first.focus();
    }
  }, {
    key: "toggleOpen",
    value: function toggleOpen(event) {
      var show = !this.props.show;
      this.props.onToggle(show, event);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          props = _objectWithoutProperties(_this$props, ["children"]);

      var el = this.state.el;
      delete props.onToggle;

      if (this.menu && this.state.lastShow && !this.props.show) {
        this._focusInDropdown = this.menu.contains(document.activeElement);
      }

      return React.createElement(DropdownContext.Provider, {
        value: this.state.context
      }, React.createElement(Popper.Manager, null, children({
        props: {
          onKeyDown: this.handleKeyDown
        }
      })));
    }
  }]);

  return Dropdown;
}(React.Component);

_defineProperty(Dropdown, "displayName", 'ReactOverlaysDropdown');

Dropdown.propTypes = propTypes;
Dropdown.defaultProps = defaultProps;
var UncontrolledDropdown = uncontrollable(Dropdown, {
  show: 'onToggle'
});
UncontrolledDropdown.Menu = DropdownMenu;
UncontrolledDropdown.Toggle = DropdownToggle;
export default UncontrolledDropdown;