import React, { Component, PropTypes } from 'react';
import Drawer from './Drawer';

class DrawerButton extends Component {
    render() {
        const {
            placement,
            children,
            popoverTitle,
            ...props
        } = this.props;

        return (
            <Drawer>
                <Drawer.Button {...props} />
                <Drawer.Popover title={popoverTitle} placement={placement}>
                    {children}
                </Drawer.Popover>
            </Drawer>
        );
    }
}

DrawerButton.propTypes = {
    bsStyle: PropTypes.string,
    title: PropTypes.string,
    isIcon: PropTypes.bool,
    icon: PropTypes.string,
    image: PropTypes.string,
    useCaret: PropTypes.bool,
    placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    popoverTitle: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element),
        ]),
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        ]),
};

DrawerButton.defaultProps = {
    bsStyle: 'default',
    title: '',
    isIcon: false,
    icon: '',
    image: null,
    useCaret: false,
    placement: 'bottom',
    popoverTitle: null,
};

export default DrawerButton;
