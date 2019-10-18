function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/* global document, window, CustomEvent */
import classNames from 'classnames';
import { IntlProvider, injectIntl } from 'react-intl';
import activeElement from 'dom-helpers/activeElement';
import contains from 'dom-helpers/query/contains';
import keycode from 'keycode';
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import all from 'prop-types-extra/lib/all';
import elementType from 'prop-types-extra/lib/elementType';
import isRequiredForA11y from 'prop-types-extra/lib/isRequiredForA11y';
import uncontrollable from 'uncontrollable';
import warning from 'warning';
import { ButtonGroup } from 'react-bootstrap';
import DropdownMenu from 'react-bootstrap/lib/DropdownMenu';
import DropdownToggle from 'react-bootstrap/lib/DropdownToggle';
import { bsPrefix as setbsPrefix, prefix } from 'react-bootstrap/lib/utils/bootstrapUtils';
import createChainedFunction from 'react-bootstrap/lib/utils/createChainedFunction';
import { exclusiveRoles, requiredRoles } from 'react-bootstrap/lib/utils/PropTypes';
import ValidComponentChildren from 'react-bootstrap/lib/utils/ValidComponentChildren';
import uuidv1 from 'uuid/v1';
import 'custom-event-polyfill';
var TOGGLE_ROLE = DropdownToggle.defaultProps.bsRole;
var MENU_ROLE = DropdownMenu.defaultProps.bsRole;
var propTypes = {
  /**
   * The menu will open above the dropdown button, instead of below it.
   */
  dropup: PropTypes.bool,

  /**
   * An html id attribute, necessary for assistive technologies, such as screen readers.
   * @type {string|number}
   * @required
   */
  id: isRequiredForA11y(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  as: elementType,

  /**
   * The children of a Dropdown may be a `<Dropdown.Toggle>` or a `<Dropdown.Menu>`.
   * @type {node}
   */
  children: all(requiredRoles(TOGGLE_ROLE, MENU_ROLE), exclusiveRoles(MENU_ROLE)),

  /**
   * Whether or not component is disabled.
   */
  disabled: PropTypes.bool,

  /**
   * Align the menu to the right side of the Dropdown toggle
   */
  pullRight: PropTypes.bool,

  /**
   * Whether or not the Dropdown is visible.
   *
   * @controllable onToggle
   */
  open: PropTypes.bool,
  defaultOpen: PropTypes.bool,

  /**
   * A callback fired when the Dropdown wishes to change visibility. Called with the requested
   * `open` value, the DOM event, and the source that fired it: `'click'`,`'keydown'`,`'rootClose'`, or `'select'`.
   *
   * ```js
   * function(Boolean isOpen, Object event, { String source }) {}
   * ```
   * @controllable open
   */
  onToggle: PropTypes.func,

  /**
   * A callback fired when a menu item is selected.
   *
   * ```js
   * (eventKey: any, event: Object) => any
   * ```
   */
  onSelect: PropTypes.func,

  /**
   * If `'menuitem'`, causes the dropdown to behave like a menu item rather than
   * a menu button.
   */
  role: PropTypes.string,

  /**
   * Which event when fired outside the component will cause it to be closed
   */
  rootCloseEvent: PropTypes.oneOf(['click', 'mousedown']),

  /**
   * @private
   */
  onMouseEnter: PropTypes.func,

  /**
   * @private
   */
  onMouseLeave: PropTypes.func
};
var defaultProps = {
  as: ButtonGroup
};

var WFUIDropdown =
/*#__PURE__*/
function (_React$Component) {
  _inherits(WFUIDropdown, _React$Component);

  function WFUIDropdown(props, context) {
    var _this;

    _classCallCheck(this, WFUIDropdown);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WFUIDropdown).call(this, props, context));
    _this.state = {
      open: false,
      uid: uuidv1()
    };
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    _this.handleKeyDown = _this.handleKeyDown.bind(_assertThisInitialized(_this));
    _this.handleClose = _this.handleClose.bind(_assertThisInitialized(_this));
    _this._focusInDropdown = false;
    _this.lastOpenEventType = null;
    _this.onToggle = _this.onToggle.bind(_assertThisInitialized(_this));
    _this.onShow = _this.onShow.bind(_assertThisInitialized(_this));
    _this.onHide = _this.onHide.bind(_assertThisInitialized(_this));
    _this.onShowOther = _this.onShowOther.bind(_assertThisInitialized(_this)); // When other dropdown menu is activated.

    _this.getMenu = _this.getMenu.bind(_assertThisInitialized(_this));
    _this.getMenuContainerElement = _this.getMenuContainerElement.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(WFUIDropdown, [{
    key: "getMenuContainerElement",
    value: function getMenuContainerElement() {
      // Create container for dropdown menu
      var el = document.getElementById('wfui-dropdown-menu');

      if (!el) {
        el = document.createElement('div');
        el.setAttribute('id', 'wfui-dropdown-menu');
        document.body.appendChild(el);
      }

      return el;
    }
  }, {
    key: "onToggle",
    value: function onToggle(e) {
      var uid = this.state.uid;
      var el = this.getMenuContainerElement();
      e.stopPropagation();

      if (el) {
        if (el.getAttribute('data-uid') !== uid) {
          this.onShow(e);
        } else {
          this.onHide(e);
        }
      }
    }
  }, {
    key: "onShowOther",
    value: function onShowOther(e) {
      var uid = this.state.uid;

      if (e.detail !== uid) {
        this.setState({
          open: false
        });
      }
    }
  }, {
    key: "getMenu",
    value: function getMenu(pullRight) {
      var _this2 = this;

      var _this$props = this.props,
          id = _this$props.id,
          onSelect = _this$props.onSelect,
          bsPrefix = _this$props.bsPrefix,
          rootCloseEvent = _this$props.rootCloseEvent,
          children = _this$props.children,
          intl = _this$props.intl;
      var open = this.state.open;
      return React.createElement(IntlProvider, {
        locale: "en",
        messages: intl.messages
      }, React.createElement("div", {
        className: "open"
      }, ValidComponentChildren.map(children, function (child) {
        switch (child.props.bsRole) {
          case MENU_ROLE:
            return _this2.renderMenu(child, {
              id: id,
              open: open,
              // Always hide.
              bsPrefix: bsPrefix,
              pullRight: pullRight,
              onSelect: onSelect,
              rootCloseEvent: rootCloseEvent
            });

          default:
            return null;
        }
      })));
    }
  }, {
    key: "onShow",
    value: function onShow(e) {
      var _this3 = this;

      var uid = this.state.uid; // Broadcast event to other dropdown menus.

      var event = new CustomEvent('wfui-dropdown-menu-clicked', {
        detail: uid
      });
      window.dispatchEvent(event); // Render Element

      var el = this.getMenuContainerElement();

      if (el) {
        var buttonElement = e.target.tagName === 'SPAN' ? e.target.parentElement : e.target;
        var viewportOffset = buttonElement.getBoundingClientRect();
        var scrollTopOffset = document.documentElement.scrollTop; // Reset menu.

        if (el.firstChild) el.removeChild(el.firstChild); // Set attributes for popedup menu.

        el.setAttribute('class', 'menu-opened');
        el.setAttribute('data-uid', uid);
        el.setAttribute('style', "position: absolute; display: block; top: ".concat(viewportOffset.bottom + scrollTopOffset, "px; left: ").concat(viewportOffset.left, "px"));
        ReactDOM.render(this.getMenu(), el, function () {
          // Adjust dropdown menu location.
          if (el && el.getAttribute('class') === 'menu-opened') {
            var dropdown = el.getElementsByClassName('dropdown-menu')[0];

            if (window.innerWidth < dropdown.getBoundingClientRect().right) {
              el.setAttribute('style', "position: absolute; display: block; top: ".concat(viewportOffset.bottom + scrollTopOffset, "px; left: ").concat(viewportOffset.right, "px"));
              ReactDOM.render(_this3.getMenu(true), el);
            }
          }
        });
      }

      this.setState({
        open: true
      });
    }
  }, {
    key: "onHide",
    value: function onHide(e) {
      var el = this.getMenuContainerElement();

      if (el.getAttribute('class') === 'menu-opened') {
        el.setAttribute('class', 'menu-closed');
        el.setAttribute('data-uid', '');
        el.setAttribute('style', 'display: none;'); // Broadcast event to other dropdown menus.

        var event = new CustomEvent('wfui-dropdown-menu-clicked', {
          detail: ''
        });
        window.dispatchEvent(event);
        this.setState({
          open: false
        });
      }
    } // ///////////////////////////////////////////////////////////

  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this4 = this;

      this.getMenuContainerElement(); // Outside click

      window.addEventListener('click', this.onHide); // Set event listener

      window.addEventListener('wfui-dropdown-menu-clicked', this.onShowOther);
      window.addEventListener('fixedTableScrollStart', function (e) {
        _this4.onHide(e);
      });
      window.addEventListener('scroll', function (e) {
        _this4.onHide(e);
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // Remove
      var el = this.getMenuContainerElement();

      if (el) {
        document.body.removeChild(el); // Remove event listener

        window.removeEventListener('click', this.onHide);
        window.addEventListener('scroll', this.onHide);
      } // Remove event listener


      window.removeEventListener('wfui-dropdown-menu-clicked', this.onShowOther);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.focusNextOnOpen();
    }
  }, {
    key: "componentWillUpdate",
    value: function componentWillUpdate(nextProps) {
      if (!nextProps.open && this.props.open) {// Custom: Removed
        // this._focusInDropdown = contains(
        //     ReactDOM.findDOMNode(this.menu),
        //     activeElement(document),
        // );
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var open = this.props.open;
      var prevOpen = prevProps.open;

      if (open && !prevOpen) {
        this.focusNextOnOpen();
      }

      if (!open && prevOpen) {// if focus hasn't already moved from the menu let's return it
        // to the toggle
        // Custom: Removed
        // if (this._focusInDropdown) {
        //     this._focusInDropdown = false;
        //     this.focus();
        // }
      }
    }
  }, {
    key: "focus",
    value: function focus() {
      var toggle = ReactDOM.findDOMNode(this.toggle);

      if (toggle && toggle.focus) {
        toggle.focus();
      }
    }
  }, {
    key: "focusNextOnOpen",
    value: function focusNextOnOpen() {
      var menu = this.menu;

      if (menu) {
        if (!menu.focusNext) {
          return;
        }

        if (this.lastOpenEventType === 'keydown' || this.props.role === 'menuitem') {
          menu.focusNext();
        }
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      if (this.props.disabled) {
        return;
      }

      this.toggleOpen(event, {
        source: 'click'
      });
    }
  }, {
    key: "handleClose",
    value: function handleClose(event, eventDetails) {
      if (!this.props.open) {
        return;
      }

      this.toggleOpen(event, eventDetails);
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(event) {
      if (this.props.disabled) {
        return;
      }

      switch (event.keyCode) {
        case keycode.codes.down:
          if (!this.props.open) {
            this.toggleOpen(event, {
              source: 'keydown'
            });
          } else if (this.menu && this.menu.focusNext) {
            this.menu.focusNext();
          }

          event.preventDefault();
          break;

        case keycode.codes.esc:
        case keycode.codes.tab:
          this.handleClose(event, {
            source: 'keydown'
          });
          break;

        default:
      }
    }
  }, {
    key: "toggleOpen",
    value: function toggleOpen(event, eventDetails) {
      // let open = !this.props.open;
      var open = !this.state.open;

      if (open) {
        this.lastOpenEventType = eventDetails.source;
      }

      this.onToggle(event);

      if (this.props.onToggle) {
        this.props.onToggle(open, event, eventDetails);
      }
    }
  }, {
    key: "renderMenu",
    value: function renderMenu(child, _ref) {
      var _this5 = this;

      var id = _ref.id,
          onSelect = _ref.onSelect,
          rootCloseEvent = _ref.rootCloseEvent,
          props = _objectWithoutProperties(_ref, ["id", "onSelect", "rootCloseEvent"]);

      var ref = function ref(c) {
        _this5.menu = c;
      };

      if (typeof child.ref === 'string') {
        warning(false, 'String refs are not supported on `<Dropdown.Menu>` components. ' + 'To apply a ref to the component use the callback signature:\n\n ' + 'https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute');
      } else {
        ref = createChainedFunction(child.ref, ref);
      }

      return cloneElement(child, _extends({}, props, {
        ref: ref,
        labelledBy: id,
        bsPrefix: prefix(props, 'menu'),
        onClose: createChainedFunction(child.props.onClose, this.handleClose),
        onSelect: createChainedFunction(child.props.onSelect, onSelect, function (key, event) {
          return _this5.handleClose(event, {
            source: 'select'
          });
        }),
        rootCloseEvent: rootCloseEvent
      }));
    }
  }, {
    key: "renderToggle",
    value: function renderToggle(child, props) {
      var _this6 = this;

      var ref = function ref(c) {
        _this6.toggle = c;
      };

      if (typeof child.ref === 'string') {
        warning(false, 'String refs are not supported on `<Dropdown.Toggle>` components. ' + 'To apply a ref to the component use the callback signature:\n\n ' + 'https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute');
      } else {
        ref = createChainedFunction(child.ref, ref);
      }

      return cloneElement(child, _extends({}, props, {
        ref: ref,
        bsPrefix: prefix(props, 'toggle'),
        onClick: createChainedFunction(child.props.onClick, this.handleClick),
        onKeyDown: createChainedFunction(child.props.onKeyDown, this.handleKeyDown)
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _classes,
          _this7 = this;

      var _this$props2 = this.props,
          Component = _this$props2.as,
          id = _this$props2.id,
          dropup = _this$props2.dropup,
          disabled = _this$props2.disabled,
          pullRight = _this$props2.pullRight,
          onSelect = _this$props2.onSelect,
          role = _this$props2.role,
          bsPrefix = _this$props2.bsPrefix,
          className = _this$props2.className,
          rootCloseEvent = _this$props2.rootCloseEvent,
          children = _this$props2.children,
          intl = _this$props2.intl,
          props = _objectWithoutProperties(_this$props2, ["as", "id", "dropup", "disabled", "pullRight", "onSelect", "role", "bsPrefix", "className", "rootCloseEvent", "children", "intl"]);

      var open = this.state.open;
      delete props.onToggle;
      var classes = (_classes = {}, _defineProperty(_classes, bsPrefix, true), _defineProperty(_classes, "open", open), _defineProperty(_classes, "disabled", disabled), _classes);

      if (dropup) {
        classes[bsPrefix] = false;
        classes.dropup = true;
      } // This intentionally forwards bsSize and variant (if set) to the
      // underlying component, to allow it to render size and style variants.


      return React.createElement(Component, _extends({}, props, {
        className: classNames(className, classes)
      }), ValidComponentChildren.map(children, function (child) {
        switch (child.props.bsRole) {
          case TOGGLE_ROLE:
            return _this7.renderToggle(child, {
              id: id,
              disabled: disabled,
              open: open,
              role: role,
              bsPrefix: bsPrefix
            });

          case MENU_ROLE:
            return null;

          default:
            return child;
        }
      }));
    }
  }]);

  return WFUIDropdown;
}(React.Component);

WFUIDropdown.propTypes = propTypes;
WFUIDropdown.defaultProps = defaultProps;
setbsPrefix('dropdown', WFUIDropdown);
var UncontrolledDropdown = injectIntl(uncontrollable(WFUIDropdown, {
  open: 'onToggle'
}));
UncontrolledDropdown.Toggle = DropdownToggle;
UncontrolledDropdown.Menu = DropdownMenu;
export default UncontrolledDropdown;