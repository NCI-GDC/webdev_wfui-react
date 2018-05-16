/* global document, window, CustomEvent */
import classNames from 'classnames';
import { IntlProvider } from 'react-intl';
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

import {
    bsClass as setBsClass,
    prefix,
} from 'react-bootstrap/lib/utils/bootstrapUtils';
import createChainedFunction from 'react-bootstrap/lib/utils/createChainedFunction';
import {
    exclusiveRoles,
    requiredRoles,
} from 'react-bootstrap/lib/utils/PropTypes';
import ValidComponentChildren from 'react-bootstrap/lib/utils/ValidComponentChildren';

import uuidv1 from 'uuid/v1';
import 'custom-event-polyfill';

const TOGGLE_ROLE = DropdownToggle.defaultProps.bsRole;
const MENU_ROLE = DropdownMenu.defaultProps.bsRole;

const propTypes = {
    /**
     * The menu will open above the dropdown button, instead of below it.
     */
    dropup: PropTypes.bool,

    /**
     * An html id attribute, necessary for assistive technologies, such as screen readers.
     * @type {string|number}
     * @required
     */
    id: isRequiredForA11y(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ),

    componentClass: elementType,

    /**
     * The children of a Dropdown may be a `<Dropdown.Toggle>` or a `<Dropdown.Menu>`.
     * @type {node}
     */
    children: all(
        requiredRoles(TOGGLE_ROLE, MENU_ROLE),
        exclusiveRoles(MENU_ROLE),
    ),

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
    onMouseLeave: PropTypes.func,
};

const defaultProps = {
    componentClass: ButtonGroup,
};

class WFUIDropdown extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            open: false,
            uid: uuidv1(),
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this._focusInDropdown = false;
        this.lastOpenEventType = null;

        this.onToggle = this.onToggle.bind(this);
        this.onShow = this.onShow.bind(this);
        this.onHide = this.onHide.bind(this);
        this.onShowOther = this.onShowOther.bind(this); // When other dropdown menu is activated.
        this.getMenu = this.getMenu.bind(this);
        this.getMenuContainerElement = this.getMenuContainerElement.bind(this);
    }
    getMenuContainerElement() {
        // Create container for dropdown menu
        let el = document.getElementById('wfui-dropdown-menu');
        if (!el) {
            el = document.createElement('div');
            el.setAttribute('id', 'wfui-dropdown-menu');
            document.body.appendChild(el);
        }
        return el;
    }
    onToggle(e) {
        const { uid } = this.state;
        const el = this.getMenuContainerElement();
        e.stopPropagation();
        if (el) {
            if (el.getAttribute('data-uid') !== uid) {
                this.onShow(e);
            } else {
                this.onHide(e);
            }
        }
    }
    onShowOther(e) {
        const { uid } = this.state;
        if (e.detail !== uid) {
            this.setState({ open: false });
        }
    }
    getMenu(pullRight) {
        const { id, onSelect, bsClass, rootCloseEvent, children } = this.props;
        const { open } = this.state;
        return (
            <IntlProvider locale="en">
                {/* Added IntlPwork around */}
                <div className="open">
                    {ValidComponentChildren.map(children, child => {
                        switch (child.props.bsRole) {
                            case MENU_ROLE:
                                return this.renderMenu(child, {
                                    id,
                                    open, // Always hide.
                                    bsClass,
                                    pullRight,
                                    onSelect,
                                    rootCloseEvent,
                                });
                            default:
                                return null;
                        }
                    })}
                </div>
            </IntlProvider>
        );
    }
    onShow(e) {
        const { uid } = this.state;
        // Broadcast event to other dropdown menus.
        const event = new CustomEvent('wfui-dropdown-menu-clicked', {
            detail: uid,
        });
        window.dispatchEvent(event);

        // Render Element
        const el = this.getMenuContainerElement();
        if (el) {
            const buttonElement =
                e.target.tagName === 'SPAN' ? e.target.parentElement : e.target;
            const viewportOffset = buttonElement.getBoundingClientRect();
            const scrollTopOffset = document.documentElement.scrollTop;

            // Reset menu.
            if (el.firstChild) el.removeChild(el.firstChild);

            // Set attributes for popedup menu.
            el.setAttribute('class', 'menu-opened');
            el.setAttribute('data-uid', uid);
            el.setAttribute(
                'style',
                `position: absolute; display: block; top: ${viewportOffset.bottom +
                    scrollTopOffset}px; left: ${viewportOffset.left}px`,
            );

            ReactDOM.render(this.getMenu(), el, () => {
                // Adjust dropdown menu location.
                if (el && el.getAttribute('class') === 'menu-opened') {
                    const dropdown = el.getElementsByClassName(
                        'dropdown-menu',
                    )[0];
                    if (
                        window.innerWidth <
                        dropdown.getBoundingClientRect().right
                    ) {
                        el.setAttribute(
                            'style',
                            `position: absolute; display: block; top: ${viewportOffset.bottom +
                                scrollTopOffset}px; left: ${
                                viewportOffset.right
                            }px`,
                        );
                        ReactDOM.render(this.getMenu(true), el);
                    }
                }
            });
        }
        this.setState({ open: true });
    }

    onHide(e) {
        const el = this.getMenuContainerElement();
        if (el.getAttribute('class') === 'menu-opened') {
            el.setAttribute('class', 'menu-closed');
            el.setAttribute('data-uid', '');
            el.setAttribute('style', 'display: none;');
            // Broadcast event to other dropdown menus.
            const event = new CustomEvent('wfui-dropdown-menu-clicked', {
                detail: '',
            });
            window.dispatchEvent(event);
            this.setState({ open: false });
        }
    }

    /////////////////////////////////////////////////////////////

    componentWillMount() {
        this.getMenuContainerElement();
        // Outside click
        window.addEventListener('click', this.onHide);
        // Set event listener
        window.addEventListener('wfui-dropdown-menu-clicked', this.onShowOther);

        window.addEventListener('fixedTableScrollStart', e => {
            this.onHide(e);
        });

        window.addEventListener('scroll', e => {
            this.onHide(e);
        });
    }

    componentWillUnmount() {
        // Remove
        let el = this.getMenuContainerElement();
        if (el) {
            document.body.removeChild(el);
            // Remove event listener
            window.removeEventListener('click', this.onHide);
            window.addEventListener('scroll', this.onHide);
        }
        // Remove event listener
        window.removeEventListener(
            'wfui-dropdown-menu-clicked',
            this.onShowOther,
        );
    }

    componentDidMount() {
        this.focusNextOnOpen();
    }

    componentWillUpdate(nextProps) {
        if (!nextProps.open && this.props.open) {
            // Custom: Removed
            // this._focusInDropdown = contains(
            //     ReactDOM.findDOMNode(this.menu),
            //     activeElement(document),
            // );
        }
    }

    componentDidUpdate(prevProps) {
        const { open } = this.props;
        const prevOpen = prevProps.open;

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

    focus() {
        const toggle = ReactDOM.findDOMNode(this.toggle);

        if (toggle && toggle.focus) {
            toggle.focus();
        }
    }

    focusNextOnOpen() {
        const menu = this.menu;
        if (menu) {
            if (!menu.focusNext) {
                return;
            }

            if (
                this.lastOpenEventType === 'keydown' ||
                this.props.role === 'menuitem'
            ) {
                menu.focusNext();
            }
        }
    }

    handleClick(event) {
        if (this.props.disabled) {
            return;
        }

        this.toggleOpen(event, { source: 'click' });
    }

    handleClose(event, eventDetails) {
        if (!this.props.open) {
            return;
        }

        this.toggleOpen(event, eventDetails);
    }

    handleKeyDown(event) {
        if (this.props.disabled) {
            return;
        }

        switch (event.keyCode) {
            case keycode.codes.down:
                if (!this.props.open) {
                    this.toggleOpen(event, { source: 'keydown' });
                } else if (this.menu && this.menu.focusNext) {
                    this.menu.focusNext();
                }
                event.preventDefault();
                break;
            case keycode.codes.esc:
            case keycode.codes.tab:
                this.handleClose(event, { source: 'keydown' });
                break;
            default:
        }
    }

    toggleOpen(event, eventDetails) {
        // let open = !this.props.open;
        let open = !this.state.open;

        if (open) {
            this.lastOpenEventType = eventDetails.source;
        }

        this.onToggle(event);

        if (this.props.onToggle) {
            this.props.onToggle(open, event, eventDetails);
        }
    }

    renderMenu(child, { id, onSelect, rootCloseEvent, ...props }) {
        let ref = c => {
            this.menu = c;
        };

        if (typeof child.ref === 'string') {
            warning(
                false,
                'String refs are not supported on `<Dropdown.Menu>` components. ' +
                    'To apply a ref to the component use the callback signature:\n\n ' +
                    'https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute',
            );
        } else {
            ref = createChainedFunction(child.ref, ref);
        }

        return cloneElement(child, {
            ...props,
            ref,
            labelledBy: id,
            bsClass: prefix(props, 'menu'),
            onClose: createChainedFunction(
                child.props.onClose,
                this.handleClose,
            ),
            onSelect: createChainedFunction(
                child.props.onSelect,
                onSelect,
                (key, event) => this.handleClose(event, { source: 'select' }),
            ),
            rootCloseEvent,
        });
    }

    renderToggle(child, props) {
        let ref = c => {
            this.toggle = c;
        };

        if (typeof child.ref === 'string') {
            warning(
                false,
                'String refs are not supported on `<Dropdown.Toggle>` components. ' +
                    'To apply a ref to the component use the callback signature:\n\n ' +
                    'https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute',
            );
        } else {
            ref = createChainedFunction(child.ref, ref);
        }

        return cloneElement(child, {
            ...props,
            ref,
            bsClass: prefix(props, 'toggle'),
            onClick: createChainedFunction(
                child.props.onClick,
                this.handleClick,
            ),
            onKeyDown: createChainedFunction(
                child.props.onKeyDown,
                this.handleKeyDown,
            ),
        });
    }
    render() {
        const {
            componentClass: Component,
            id,
            dropup,
            disabled,
            pullRight,
            //open,
            onSelect,
            role,
            bsClass,
            className,
            rootCloseEvent,
            children,
            ...props
        } = this.props;

        const { open } = this.state;

        delete props.onToggle;

        const classes = {
            [bsClass]: true,
            open,
            disabled,
        };

        if (dropup) {
            classes[bsClass] = false;
            classes.dropup = true;
        }

        // This intentionally forwards bsSize and bsStyle (if set) to the
        // underlying component, to allow it to render size and style variants.

        return (
            <Component {...props} className={classNames(className, classes)}>
                {ValidComponentChildren.map(children, child => {
                    switch (child.props.bsRole) {
                        case TOGGLE_ROLE:
                            return this.renderToggle(child, {
                                id,
                                disabled,
                                open,
                                role,
                                bsClass,
                            });
                        case MENU_ROLE:
                            return null;
                        default:
                            return child;
                    }
                })}
            </Component>
        );
    }
}

WFUIDropdown.propTypes = propTypes;
WFUIDropdown.defaultProps = defaultProps;

setBsClass('dropdown', WFUIDropdown);

const UncontrolledDropdown = uncontrollable(WFUIDropdown, { open: 'onToggle' });

UncontrolledDropdown.Toggle = DropdownToggle;
UncontrolledDropdown.Menu = DropdownMenu;

export default UncontrolledDropdown;
