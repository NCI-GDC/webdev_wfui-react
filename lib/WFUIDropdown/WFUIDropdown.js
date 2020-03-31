function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import classNames from 'classnames';
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types'; // import BaseDropdown from 'react-overlays/Dropdown';

import { useUncontrolled } from 'uncontrollable';
import useEventCallback from '@restart/hooks/useEventCallback';
import { Dropdown as OriginalDropdown } from 'react-bootstrap';
import SelectableContext from 'react-bootstrap/cjs/SelectableContext';
import createWithBsPrefix from 'react-bootstrap/cjs/utils/createWithBsPrefix';
import { useBootstrapPrefix } from 'react-bootstrap/cjs/ThemeProvider';
import BaseDropdown from './BaseDropdown';
import DropdownMenu from './DropdownMenu';
import DropdownToggle from './DropdownToggle';
var propTypes = {
  /** @default 'dropdown' */
  bsPrefix: PropTypes.string,

  /**
   * Determines the direction and location of the Menu in relation to it's Toggle.
   */
  drop: PropTypes.oneOf(['up', 'left', 'right', 'down']),
  as: PropTypes.elementType,

  /**
   * Align the menu to the right side of the Dropdown toggle
   */
  alignRight: PropTypes.bool,

  /**
   * Whether or not the Dropdown is visible.
   *
   * @controllable onToggle
   */
  show: PropTypes.bool,

  /**
   * Allow Dropdown to flip in case of an overlapping on the reference element. For more information refer to
   * Popper.js's flip [docs](https://popper.js.org/popper-documentation.html#modifiers..flip.enabled).
   *
   */
  flip: PropTypes.bool,

  /**
   * A callback fired when the Dropdown wishes to change visibility. Called with the requested
   * `show` value, the DOM event, and the source that fired it: `'click'`,`'keydown'`,`'rootClose'`, or `'select'`.
   *
   * ```js
   * function(
   *   isOpen: boolean,
   *   event: SyntheticEvent,
   *   metadata: {
   *     source: 'select' | 'click' | 'rootClose' | 'keydown'
   *   }
   * ): void
   * ```
   *
   * @controllable show
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
   * Controls the focus behavior for when the Dropdown is opened. Set to
   * `true` to always focus the first menu item, `keyboard` to focus only when
   * navigating via the keyboard, or `false` to disable completely
   *
   * The Default behavior is `false` **unless** the Menu has a `role="menu"`
   * where it will default to `keyboard` to match the recommended [ARIA Authoring practices](https://www.w3.org/TR/wai-aria-practices-1.1/#menubutton).
   */
  focusFirstItemOnShow: PropTypes.oneOf([false, true, 'keyboard']),

  /** @private */
  navbar: PropTypes.bool,
  contentWindow: PropTypes.object
};
var defaultProps = {
  navbar: false,
  contentWindow: window
};
var Dropdown = React.forwardRef(function (uncontrolledProps, ref) {
  var _useUncontrolled = useUncontrolled(uncontrolledProps, {
    show: 'onToggle'
  }),
      bsPrefix = _useUncontrolled.bsPrefix,
      drop = _useUncontrolled.drop,
      show = _useUncontrolled.show,
      className = _useUncontrolled.className,
      alignRight = _useUncontrolled.alignRight,
      onSelect = _useUncontrolled.onSelect,
      onToggle = _useUncontrolled.onToggle,
      focusFirstItemOnShow = _useUncontrolled.focusFirstItemOnShow,
      _useUncontrolled$as = _useUncontrolled.as,
      Component = _useUncontrolled$as === void 0 ? 'div' : _useUncontrolled$as,
      _4 = _useUncontrolled.navbar,
      contentWindow = _useUncontrolled.contentWindow,
      props = _objectWithoutProperties(_useUncontrolled, ["bsPrefix", "drop", "show", "className", "alignRight", "onSelect", "onToggle", "focusFirstItemOnShow", "as", "navbar", "contentWindow"]);

  var onSelectCtx = useContext(SelectableContext);
  var prefix = useBootstrapPrefix(bsPrefix, 'dropdown');
  var handleToggle = useEventCallback(function (nextShow, event) {
    var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : event.type;
    if (event.currentTarget === document) source = 'rootClose';
    onToggle(nextShow, event, {
      source: source
    });
  });
  var handleSelect = useEventCallback(function (key, event) {
    if (onSelectCtx) onSelectCtx(key, event);
    if (onSelect) onSelect(key, event);
    handleToggle(false, event, 'select');
  });
  useEffect(function () {
    // Create container for dropdown menu
    var el = contentWindow.document.getElementById('wfui-dropdown-menu');

    if (!el) {
      el = contentWindow.document.createElement('div');
      el.setAttribute('id', 'wfui-dropdown-menu');
      contentWindow.document.body.appendChild(el);
    }
  });
  return React.createElement(SelectableContext.Provider, {
    value: handleSelect
  }, React.createElement(BaseDropdown.ControlledComponent, {
    drop: drop,
    show: show,
    alignEnd: alignRight,
    onToggle: handleToggle,
    focusFirstItemOnShow: focusFirstItemOnShow,
    itemSelector: ".".concat(prefix, "-item:not(.disabled):not(:disabled)")
  }, function (_ref) {
    var dropdownProps = _ref.props;
    return React.createElement(Component, _extends({}, props, dropdownProps, {
      ref: ref,
      className: classNames(className, show && 'show', (!drop || drop === 'down') && prefix, drop === 'up' && 'dropup', drop === 'right' && 'dropright', drop === 'left' && 'dropleft'),
      contentWindow: contentWindow
    }));
  }));
});
Dropdown.displayName = 'Dropdown';
Dropdown.propTypes = propTypes;
Dropdown.defaultProps = defaultProps;
Dropdown.Toggle = DropdownToggle;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = OriginalDropdown.Item;
Dropdown.Header = createWithBsPrefix('dropdown-header', {
  defaultProps: {
    role: 'heading'
  }
});
Dropdown.Divider = createWithBsPrefix('dropdown-divider', {
  defaultProps: {
    role: 'separator'
  }
});
export default Dropdown;