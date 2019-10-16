import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import {
    ButtonToolbar,
} from 'react-bootstrap';
import DrawerToggle from './DrawerToggle';
import DrawerPopover from './DrawerPopover';

const TOGGLE_ROLE = DrawerToggle.defaultProps.bsRole;
const POPOVER_ROLE = DrawerPopover.defaultProps.bsRole;

class Drawer extends React.Component {
    constructor(props) {
        super(props);

        this.togglePopover = this.togglePopover.bind(this);
        this.closePopover = this.closePopover.bind(this);

        this.state = { show: false };
    }

    togglePopover(e) {
        this.setState({ target: e.target, show: !this.state.show });
    }

    closePopover() {
        this.setState({ show: false });
    }

    renderToggle(child, key) {
        return cloneElement(child, { handleClick: this.togglePopover, key });
    }

    renderPopover(child, key) {
        const { show, target } = this.state;
        return cloneElement(child, {
            show,
            target,
            handleClose: this.closePopover,
            key,
        });
    }

    render() {
        const {
            componentClass: Component,
            children,
        } = this.props;

        return (
            <Component>
                {
                    children.map((child, key) => {
                        switch (child.props.bsRole) {
                            case TOGGLE_ROLE:
                                return this.renderToggle(child, key);
                            case POPOVER_ROLE:
                                return this.renderPopover(child, key);
                            default:
                                return child;
                        }
                    })
                }
            </Component>
        );
    }
}

Drawer.Button = DrawerToggle;
Drawer.Popover = DrawerPopover;

Drawer.propTypes = {
    componentClass: PropTypes.func,
    children: PropTypes.arrayOf((propValue) => {
        if (propValue.length !== 2) {
            return new Error(
                'The Drawer Component requires exactly two children Drawer.Button and Drawer.Popover',
            );
        } else if (!propValue[0].props.bsRole === TOGGLE_ROLE) {
            return new Error(
                'The first child of Drawer Component should be Drawer.Button',
            );
        } else if (!propValue[1].props.bsRole === POPOVER_ROLE) {
            return new Error(
                'The second child of Drawer Component should be Drawer.Popover',
            );
        }
        return null;
    }).isRequired,
};

Drawer.defaultProps = {
    componentClass: ButtonToolbar,
};

export default Drawer;
