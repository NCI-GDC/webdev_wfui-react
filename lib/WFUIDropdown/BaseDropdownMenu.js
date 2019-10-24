function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import { Popper, Reference } from 'react-popper';
import DropdownContext from 'react-overlays/DropdownContext';
import RootCloseWrapper from 'react-overlays/RootCloseWrapper';
import mapContextToProps from 'react-context-toolbox/mapContextToProps';

var DropdownMenu =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DropdownMenu, _React$Component);

  function DropdownMenu() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DropdownMenu);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DropdownMenu)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      toggleId: null
    });

    _defineProperty(_assertThisInitialized(_this), "popperIsInitialized", false);

    _defineProperty(_assertThisInitialized(_this), "handleClose", function (e) {
      if (!_this.props.onToggle) return;

      _this.props.onToggle(false, e);
    });

    return _this;
  }

  _createClass(DropdownMenu, [{
    key: "getSnapshotBeforeUpdate",
    value: function getSnapshotBeforeUpdate(prevProps) {
      // If, to the best we can tell, this update won't reinitialize popper,
      // manually schedule an update
      var shouldUpdatePopper = !prevProps.show && this.props.show && this.popperIsInitialized && // a new reference node will already trigger this internally
      prevProps.toggleNode === this.props.toggleNode;

      if (this.props.show && this.props.usePopper && !this.popperIsInitialized) {
        this.popperIsInitialized = true;
      }

      return !!shouldUpdatePopper;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(_, __, shouldUpdatePopper) {
      if (shouldUpdatePopper && this.scheduleUpdate) {
        this.scheduleUpdate();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          show = _this$props.show,
          flip = _this$props.flip,
          menuRef = _this$props.menuRef,
          alignEnd = _this$props.alignEnd,
          drop = _this$props.drop,
          usePopper = _this$props.usePopper,
          toggleNode = _this$props.toggleNode,
          rootCloseEvent = _this$props.rootCloseEvent,
          _this$props$popperCon = _this$props.popperConfig,
          popperConfig = _this$props$popperCon === void 0 ? {} : _this$props$popperCon;
      var placement = alignEnd ? 'bottom-end' : 'bottom-start';
      if (drop === 'up') placement = alignEnd ? 'top-end' : 'top-start';
      if (drop === 'right') placement = alignEnd ? 'right-end' : 'right-start';
      if (drop === 'left') placement = alignEnd ? 'left-end' : 'left-start';
      var menu = null;
      var menuProps = {
        ref: menuRef,
        'aria-labelledby': toggleNode && toggleNode.id
      };
      var childArgs = {
        show: show,
        alignEnd: alignEnd,
        close: this.handleClose
      };
      console.log(usePopper, 'usePopper');

      if (!usePopper) {
        menu = this.props.children(_extends({}, childArgs, {
          props: menuProps
        }));
      } else if (this.popperIsInitialized || show) {
        // Add it this way, so it doesn't override someones usage
        // with react-poppers <Reference>
        if (toggleNode) popperConfig.referenceElement = toggleNode; // menu = (
        //     <Popper
        //         {...popperConfig}
        //         innerRef={menuRef}
        //         placement={placement}
        //         eventsEnabled={!!show}
        //         modifiers={{
        //             flip: { enabled: !!flip },
        //             ...popperConfig.modifiers,
        //         }}
        //     >
        //         {({ ref, style, ...popper }) => {
        //             this.scheduleUpdate = popper.scheduleUpdate;
        //             return this.props.children({
        //                 ...popper,
        //                 ...childArgs,
        //                 props: { ...menuProps, ref, style },
        //             });
        //         }}
        //     </Popper>
        // );

        menu = React.createElement("div", null, ReactDOM.createPortal(React.createElement(Popper, {
          positionFixed: true
        }, function (_ref) {
          var ref = _ref.ref,
              style = _ref.style,
              popper = _objectWithoutProperties(_ref, ["ref", "style"]);

          _this2.scheduleUpdate = popper.scheduleUpdate;
          return _this2.props.children(_extends({}, popper, {}, childArgs, {
            props: _extends({}, menuProps, {
              ref: ref,
              style: style
            })
          }));
        }), document.querySelector('#wfui-dropdown-menu')));
      }

      return menu && React.createElement(RootCloseWrapper, {
        disabled: !show,
        event: rootCloseEvent,
        onRootClose: this.handleClose
      }, menu);
    }
  }]);

  return DropdownMenu;
}(React.Component);

_defineProperty(DropdownMenu, "displayName", 'ReactOverlaysDropdownMenu');

_defineProperty(DropdownMenu, "propTypes", {
  /**
   * A render prop that returns a Menu element. The `props`
   * argument should spread through to **a component that can accept a ref**.
   *
   * @type {Function ({
   *   show: boolean,
   *   alignEnd: boolean,
   *   close: (?SyntheticEvent) => void,
   *   placement: Placement,
   *   outOfBoundaries: ?boolean,
   *   scheduleUpdate: () => void,
   *   props: {
   *     ref: (?HTMLElement) => void,
   *     style: { [string]: string | number },
   *     aria-labelledby: ?string
   *   },
   *   arrowProps: {
   *     ref: (?HTMLElement) => void,
   *     style: { [string]: string | number },
   *   },
   * }) => React.Element}
   */
  children: PropTypes.func.isRequired,

  /**
   * Controls the visible state of the menu, generally this is
   * provided by the parent `Dropdown` component,
   * but may also be specified as a prop directly.
   */
  show: PropTypes.bool,

  /**
   * Aligns the dropdown menu to the 'end' of it's placement position.
   * Generally this is provided by the parent `Dropdown` component,
   * but may also be specified as a prop directly.
   */
  alignEnd: PropTypes.bool,

  /**
   * Enables the Popper.js `flip` modifier, allowing the Dropdown to
   * automatically adjust it's placement in case of overlap with the viewport or toggle.
   * Refer to the [flip docs](https://popper.js.org/popper-documentation.html#modifiers..flip.enabled) for more info
   */
  flip: PropTypes.bool,
  usePopper: PropTypes.oneOf([true, false]),

  /**
   * A set of popper options and props passed directly to react-popper's Popper component.
   */
  popperConfig: PropTypes.object,

  /**
   * Override the default event used by RootCloseWrapper.
   */
  rootCloseEvent: PropTypes.string,

  /** @private */
  onToggle: PropTypes.func,

  /** @private */
  menuRef: PropTypes.func,

  /** @private */
  drop: PropTypes.string,

  /** @private */
  toggleNode: PropTypes.any
});

_defineProperty(DropdownMenu, "defaultProps", {
  usePopper: true
});

var DecoratedDropdownMenu = mapContextToProps(DropdownContext, function (_ref2, props) {
  var show = _ref2.show,
      alignEnd = _ref2.alignEnd,
      toggle = _ref2.toggle,
      drop = _ref2.drop,
      menuRef = _ref2.menuRef,
      toggleNode = _ref2.toggleNode;
  return {
    drop: drop,
    menuRef: menuRef,
    toggleNode: toggleNode,
    onToggle: toggle,
    show: show == null ? props.show : show,
    alignEnd: alignEnd == null ? props.alignEnd : alignEnd
  };
}, DropdownMenu);
export default DecoratedDropdownMenu;