import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Image } from 'react-bootstrap';

class DefaultGroupsItem extends Component {
    render() {
        const { icon, link, title, size } = this.props;

        return (
            <Col xs="4">
                <div className="popover-content__card">
                    <a href={link}>
                        <Row className="justify-content-md-center">
                            <Col className="text-center">
                                <Image src={icon} width={size} height={size} />
                            </Col>
                        </Row>
                        <h4 className="text-center">{title}</h4>
                    </a>
                </div>
            </Col>
        );
    }
}

DefaultGroupsItem.propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string,
    link: PropTypes.string,
    size: PropTypes.number,
};

DefaultGroupsItem.defaultProps = {
    size: 32,
};

export default DefaultGroupsItem;
