import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon, Image } from '../index';
import Icon from '../Icon/Icon';

class DrawerToggle extends Component {
    render() {
        const {
            isIcon,
            icon,
            image,
            title,
            useCaret,
            variant,
            bsRole,
            handleClick,
        } = this.props;

        return (
            <Button variant={variant} bsRole={bsRole} onClick={handleClick}>
                {isIcon && <Icon name={icon} />}
                {image && <Image src={image} />}
                {title}
                {useCaret ? <span className="caret" /> : null}
            </Button>
        );
    }
}

DrawerToggle.propTypes = {
    handleClick: PropTypes.func,
    variant: PropTypes.string,
    title: PropTypes.string,
    isIcon: PropTypes.bool,
    icon: PropTypes.string,
    image: PropTypes.string,
    useCaret: PropTypes.bool,
    bsRole: PropTypes.string,
};

DrawerToggle.defaultProps = {
    variant: '',
    title: '',
    isIcon: false,
    icon: null,
    image: null,
    useCaret: false,
    bsRole: 'button',
};

export default DrawerToggle;
