'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactIntl = require('react-intl');

var _activeElement = require('dom-helpers/activeElement');

var _activeElement2 = _interopRequireDefault(_activeElement);

var _contains = require('dom-helpers/query/contains');

var _contains2 = _interopRequireDefault(_contains);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _all = require('prop-types-extra/lib/all');

var _all2 = _interopRequireDefault(_all);

var _elementType = require('prop-types-extra/lib/elementType');

var _elementType2 = _interopRequireDefault(_elementType);

var _isRequiredForA11y = require('prop-types-extra/lib/isRequiredForA11y');

var _isRequiredForA11y2 = _interopRequireDefault(_isRequiredForA11y);

var _uncontrollable = require('uncontrollable');

var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _reactBootstrap = require('react-bootstrap');

var _DropdownMenu = require('react-bootstrap/lib/DropdownMenu');

var _DropdownMenu2 = _interopRequireDefault(_DropdownMenu);

var _DropdownToggle = require('react-bootstrap/lib/DropdownToggle');

var _DropdownToggle2 = _interopRequireDefault(_DropdownToggle);

var _bootstrapUtils = require('react-bootstrap/lib/utils/bootstrapUtils');

var _createChainedFunction = require('react-bootstrap/lib/utils/createChainedFunction');

var _createChainedFunction2 = _interopRequireDefault(_createChainedFunction);

var _PropTypes = require('react-bootstrap/lib/utils/PropTypes');

var _ValidComponentChildren = require('react-bootstrap/lib/utils/ValidComponentChildren');

var _ValidComponentChildren2 = _interopRequireDefault(_ValidComponentChildren);

var _v = require('uuid/v1');

var _v2 = _interopRequireDefault(_v);

require('custom-event-polyfill');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global document, window, CustomEvent */


var TOGGLE_ROLE = _DropdownToggle2.default.defaultProps.bsRole;
var MENU_ROLE = _DropdownMenu2.default.defaultProps.bsRole;

var propTypes = {
    /**
     * The menu will open above the dropdown button, instead of below it.
     */
    dropup: _propTypes2.default.bool,

    /**
     * An html id attribute, necessary for assistive technologies, such as screen readers.
     * @type {string|number}
     * @required
     */
    id: (0, _isRequiredForA11y2.default)(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])),

    componentClass: _elementType2.default,

    /**
     * The children of a Dropdown may be a `<Dropdown.Toggle>` or a `<Dropdown.Menu>`.
     * @type {node}
     */
    children: (0, _all2.default)((0, _PropTypes.requiredRoles)(TOGGLE_ROLE, MENU_ROLE), (0, _PropTypes.exclusiveRoles)(MENU_ROLE)),

    /**
     * Whether or not component is disabled.
     */
    disabled: _propTypes2.default.bool,

    /**
     * Align the menu to the right side of the Dropdown toggle
     */
    pullRight: _propTypes2.default.bool,

    /**
     * Whether or not the Dropdown is visible.
     *
     * @controllable onToggle
     */
    open: _propTypes2.default.bool,

    defaultOpen: _propTypes2.default.bool,

    /**
     * A callback fired when the Dropdown wishes to change visibility. Called with the requested
     * `open` value, the DOM event, and the source that fired it: `'click'`,`'keydown'`,`'rootClose'`, or `'select'`.
     *
     * ```js
     * function(Boolean isOpen, Object event, { String source }) {}
     * ```
     * @controllable open
     */
    onToggle: _propTypes2.default.func,

    /**
     * A callback fired when a menu item is selected.
     *
     * ```js
     * (eventKey: any, event: Object) => any
     * ```
     */
    onSelect: _propTypes2.default.func,

    /**
     * If `'menuitem'`, causes the dropdown to behave like a menu item rather than
     * a menu button.
     */
    role: _propTypes2.default.string,

    /**
     * Which event when fired outside the component will cause it to be closed
     */
    rootCloseEvent: _propTypes2.default.oneOf(['click', 'mousedown']),

    /**
     * @private
     */
    onMouseEnter: _propTypes2.default.func,
    /**
     * @private
     */
    onMouseLeave: _propTypes2.default.func
};

var defaultProps = {
    componentClass: _reactBootstrap.ButtonGroup
};

var WFUIDropdown = function (_React$Component) {
    _inherits(WFUIDropdown, _React$Component);

    function WFUIDropdown(props, context) {
        _classCallCheck(this, WFUIDropdown);

        var _this = _possibleConstructorReturn(this, (WFUIDropdown.__proto__ || Object.getPrototypeOf(WFUIDropdown)).call(this, props, context));

        _this.state = {
            open: false,
            uid: (0, _v2.default)()
        };
        _this.handleClick = _this.handleClick.bind(_this);
        _this.handleKeyDown = _this.handleKeyDown.bind(_this);
        _this.handleClose = _this.handleClose.bind(_this);

        _this._focusInDropdown = false;
        _this.lastOpenEventType = null;

        _this.onToggle = _this.onToggle.bind(_this);
        _this.onShow = _this.onShow.bind(_this);
        _this.onHide = _this.onHide.bind(_this);
        _this.onShowOther = _this.onShowOther.bind(_this); // When other dropdown menu is activated.
        _this.getMenu = _this.getMenu.bind(_this);
        _this.getMenuContainerElement = _this.getMenuContainerElement.bind(_this);
        return _this;
    }

    _createClass(WFUIDropdown, [{
        key: 'getMenuContainerElement',
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
        key: 'onToggle',
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
        key: 'onShowOther',
        value: function onShowOther(e) {
            var uid = this.state.uid;

            if (e.detail !== uid) {
                this.setState({ open: false });
            }
        }
    }, {
        key: 'getMenu',
        value: function getMenu(pullRight) {
            var _this2 = this;

            var _props = this.props,
                id = _props.id,
                onSelect = _props.onSelect,
                bsClass = _props.bsClass,
                rootCloseEvent = _props.rootCloseEvent,
                children = _props.children,
                intl = _props.intl;
            var open = this.state.open;

            return _react2.default.createElement(
                _reactIntl.IntlProvider,
                { locale: 'en', messages: intl.messages },
                _react2.default.createElement(
                    'div',
                    { className: 'open' },
                    _ValidComponentChildren2.default.map(children, function (child) {
                        switch (child.props.bsRole) {
                            case MENU_ROLE:
                                return _this2.renderMenu(child, {
                                    id: id,
                                    open: open, // Always hide.
                                    bsClass: bsClass,
                                    pullRight: pullRight,
                                    onSelect: onSelect,
                                    rootCloseEvent: rootCloseEvent
                                });
                            default:
                                return null;
                        }
                    })
                )
            );
        }
    }, {
        key: 'onShow',
        value: function onShow(e) {
            var _this3 = this;

            var uid = this.state.uid;
            // Broadcast event to other dropdown menus.

            var event = new CustomEvent('wfui-dropdown-menu-clicked', {
                detail: uid
            });
            window.dispatchEvent(event);

            // Render Element
            var el = this.getMenuContainerElement();
            if (el) {
                var buttonElement = e.target.tagName === 'SPAN' ? e.target.parentElement : e.target;
                var viewportOffset = buttonElement.getBoundingClientRect();
                var scrollTopOffset = document.documentElement.scrollTop;

                // Reset menu.
                if (el.firstChild) el.removeChild(el.firstChild);

                // Set attributes for popedup menu.
                el.setAttribute('class', 'menu-opened');
                el.setAttribute('data-uid', uid);
                el.setAttribute('style', 'position: absolute; display: block; top: ' + (viewportOffset.bottom + scrollTopOffset) + 'px; left: ' + viewportOffset.left + 'px');

                _reactDom2.default.render(this.getMenu(), el, function () {
                    // Adjust dropdown menu location.
                    if (el && el.getAttribute('class') === 'menu-opened') {
                        var dropdown = el.getElementsByClassName('dropdown-menu')[0];
                        if (window.innerWidth < dropdown.getBoundingClientRect().right) {
                            el.setAttribute('style', 'position: absolute; display: block; top: ' + (viewportOffset.bottom + scrollTopOffset) + 'px; left: ' + viewportOffset.right + 'px');
                            _reactDom2.default.render(_this3.getMenu(true), el);
                        }
                    }
                });
            }
            this.setState({ open: true });
        }
    }, {
        key: 'onHide',
        value: function onHide(e) {
            var el = this.getMenuContainerElement();
            if (el.getAttribute('class') === 'menu-opened') {
                el.setAttribute('class', 'menu-closed');
                el.setAttribute('data-uid', '');
                el.setAttribute('style', 'display: none;');
                // Broadcast event to other dropdown menus.
                var event = new CustomEvent('wfui-dropdown-menu-clicked', {
                    detail: ''
                });
                window.dispatchEvent(event);
                this.setState({ open: false });
            }
        }

        // ///////////////////////////////////////////////////////////

    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this4 = this;

            this.getMenuContainerElement();
            // Outside click
            window.addEventListener('click', this.onHide);
            // Set event listener
            window.addEventListener('wfui-dropdown-menu-clicked', this.onShowOther);

            window.addEventListener('fixedTableScrollStart', function (e) {
                _this4.onHide(e);
            });

            window.addEventListener('scroll', function (e) {
                _this4.onHide(e);
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            // Remove
            var el = this.getMenuContainerElement();
            if (el) {
                document.body.removeChild(el);
                // Remove event listener
                window.removeEventListener('click', this.onHide);
                window.addEventListener('scroll', this.onHide);
            }
            // Remove event listener
            window.removeEventListener('wfui-dropdown-menu-clicked', this.onShowOther);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.focusNextOnOpen();
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps) {
            if (!nextProps.open && this.props.open) {
                // Custom: Removed
                // this._focusInDropdown = contains(
                //     ReactDOM.findDOMNode(this.menu),
                //     activeElement(document),
                // );
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            var open = this.props.open;

            var prevOpen = prevProps.open;

            if (open && !prevOpen) {
                this.focusNextOnOpen();
            }

            if (!open && prevOpen) {
                // if focus hasn't already moved from the menu let's return it
                // to the toggle
                // Custom: Removed
                // if (this._focusInDropdown) {
                //     this._focusInDropdown = false;
                //     this.focus();
                // }
            }
        }
    }, {
        key: 'focus',
        value: function focus() {
            var toggle = _reactDom2.default.findDOMNode(this.toggle);

            if (toggle && toggle.focus) {
                toggle.focus();
            }
        }
    }, {
        key: 'focusNextOnOpen',
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
        key: 'handleClick',
        value: function handleClick(event) {
            if (this.props.disabled) {
                return;
            }

            this.toggleOpen(event, { source: 'click' });
        }
    }, {
        key: 'handleClose',
        value: function handleClose(event, eventDetails) {
            if (!this.props.open) {
                return;
            }

            this.toggleOpen(event, eventDetails);
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(event) {
            if (this.props.disabled) {
                return;
            }

            switch (event.keyCode) {
                case _keycode2.default.codes.down:
                    if (!this.props.open) {
                        this.toggleOpen(event, { source: 'keydown' });
                    } else if (this.menu && this.menu.focusNext) {
                        this.menu.focusNext();
                    }
                    event.preventDefault();
                    break;
                case _keycode2.default.codes.esc:
                case _keycode2.default.codes.tab:
                    this.handleClose(event, { source: 'keydown' });
                    break;
                default:
            }
        }
    }, {
        key: 'toggleOpen',
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
        key: 'renderMenu',
        value: function renderMenu(child, _ref) {
            var _this5 = this;

            var id = _ref.id,
                onSelect = _ref.onSelect,
                rootCloseEvent = _ref.rootCloseEvent,
                props = _objectWithoutProperties(_ref, ['id', 'onSelect', 'rootCloseEvent']);

            var ref = function ref(c) {
                _this5.menu = c;
            };

            if (typeof child.ref === 'string') {
                (0, _warning2.default)(false, 'String refs are not supported on `<Dropdown.Menu>` components. ' + 'To apply a ref to the component use the callback signature:\n\n ' + 'https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute');
            } else {
                ref = (0, _createChainedFunction2.default)(child.ref, ref);
            }

            return (0, _react.cloneElement)(child, _extends({}, props, {
                ref: ref,
                labelledBy: id,
                bsClass: (0, _bootstrapUtils.prefix)(props, 'menu'),
                onClose: (0, _createChainedFunction2.default)(child.props.onClose, this.handleClose),
                onSelect: (0, _createChainedFunction2.default)(child.props.onSelect, onSelect, function (key, event) {
                    return _this5.handleClose(event, { source: 'select' });
                }),
                rootCloseEvent: rootCloseEvent
            }));
        }
    }, {
        key: 'renderToggle',
        value: function renderToggle(child, props) {
            var _this6 = this;

            var ref = function ref(c) {
                _this6.toggle = c;
            };

            if (typeof child.ref === 'string') {
                (0, _warning2.default)(false, 'String refs are not supported on `<Dropdown.Toggle>` components. ' + 'To apply a ref to the component use the callback signature:\n\n ' + 'https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute');
            } else {
                ref = (0, _createChainedFunction2.default)(child.ref, ref);
            }

            return (0, _react.cloneElement)(child, _extends({}, props, {
                ref: ref,
                bsClass: (0, _bootstrapUtils.prefix)(props, 'toggle'),
                onClick: (0, _createChainedFunction2.default)(child.props.onClick, this.handleClick),
                onKeyDown: (0, _createChainedFunction2.default)(child.props.onKeyDown, this.handleKeyDown)
            }));
        }
    }, {
        key: 'render',
        value: function render() {
            var _classes,
                _this7 = this;

            var _props2 = this.props,
                Component = _props2.componentClass,
                id = _props2.id,
                dropup = _props2.dropup,
                disabled = _props2.disabled,
                pullRight = _props2.pullRight,
                onSelect = _props2.onSelect,
                role = _props2.role,
                bsClass = _props2.bsClass,
                className = _props2.className,
                rootCloseEvent = _props2.rootCloseEvent,
                children = _props2.children,
                intl = _props2.intl,
                props = _objectWithoutProperties(_props2, ['componentClass', 'id', 'dropup', 'disabled', 'pullRight', 'onSelect', 'role', 'bsClass', 'className', 'rootCloseEvent', 'children', 'intl']);

            var open = this.state.open;


            delete props.onToggle;

            var classes = (_classes = {}, _defineProperty(_classes, bsClass, true), _defineProperty(_classes, 'open', open), _defineProperty(_classes, 'disabled', disabled), _classes);

            if (dropup) {
                classes[bsClass] = false;
                classes.dropup = true;
            }

            // This intentionally forwards bsSize and bsStyle (if set) to the
            // underlying component, to allow it to render size and style variants.

            return _react2.default.createElement(
                Component,
                _extends({}, props, { className: (0, _classnames2.default)(className, classes) }),
                _ValidComponentChildren2.default.map(children, function (child) {
                    switch (child.props.bsRole) {
                        case TOGGLE_ROLE:
                            return _this7.renderToggle(child, {
                                id: id,
                                disabled: disabled,
                                open: open,
                                role: role,
                                bsClass: bsClass
                            });
                        case MENU_ROLE:
                            return null;
                        default:
                            return child;
                    }
                })
            );
        }
    }]);

    return WFUIDropdown;
}(_react2.default.Component);

WFUIDropdown.propTypes = propTypes;
WFUIDropdown.defaultProps = defaultProps;

(0, _bootstrapUtils.bsClass)('dropdown', WFUIDropdown);

var UncontrolledDropdown = (0, _reactIntl.injectIntl)((0, _uncontrollable2.default)(WFUIDropdown, { open: 'onToggle' }));

UncontrolledDropdown.Toggle = _DropdownToggle2.default;
UncontrolledDropdown.Menu = _DropdownMenu2.default;

exports.default = UncontrolledDropdown;