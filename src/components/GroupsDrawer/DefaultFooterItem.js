import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';

class DefaultFooterItem extends Component {
    render() {
        const { title, link } = this.props;
        return (
            <Col xs="6" className="text-center">
                <a href={link}>{title}</a>
            </Col>
        );
    }
}

DefaultFooterItem.propTypes = {
    title: PropTypes.string,
    link: PropTypes.string,
};

export default DefaultFooterItem;
