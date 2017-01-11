import React, { Component, PropTypes } from 'react';
import { Row, Col, Image } from 'react-bootstrap';

class DefaultGroupsItem extends Component {
    render() {
        const { icon, link, title } = this.props;

        return (
            <div className="col-xs-3">
                <a href={link}>
                    <Row>
                        <Col xs={12}>
                            <Image src={icon} style={{ width: '100%', height: '100%' }} />
                        </Col>
                    </Row>
                    <p className="text-center">{title}</p>
                </a>
            </div>
        );
    }
}

DefaultGroupsItem.propTypes = {
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
};

export default DefaultGroupsItem;
