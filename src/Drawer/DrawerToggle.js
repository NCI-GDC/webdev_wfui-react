import React, { Component, PropTypes } from 'react';
import { Button, Glyphicon, Image } from 'react-bootstrap';

class DrawerToggle extends Component {
    render() {
        const {
            isIcon,
            icon,
            image,
            title,
            useCaret,
            bsStyle,
            bsRole,
            handleClick,
        } = this.props;

        return (
            <Button bsStyle={bsStyle} bsRole={bsRole} onClick={handleClick}>
                { isIcon && <Glyphicon glyph={icon} /> }
                { image && <Image src={image} /> }
                { title }
                { useCaret ? <span className="caret" /> : null }
            </Button>
        );
    }
}

DrawerToggle.propTypes = {
    handleClick: PropTypes.func,
    bsStyle: PropTypes.string,
    title: PropTypes.string,
    isIcon: PropTypes.bool,
    icon: PropTypes.string,
    image: PropTypes.string,
    useCaret: PropTypes.bool,
    bsRole: PropTypes.string,
};

DrawerToggle.defaultProps = {
    bsStyle: '',
    title: '',
    isIcon: false,
    icon: null,
    image: null,
    useCaret: false,
    bsRole: 'button',
};

export default DrawerToggle;
