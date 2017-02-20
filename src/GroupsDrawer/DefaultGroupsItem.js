import React, { Component, PropTypes } from 'react';
import { Row, Col, Image } from 'react-bootstrap';

class DefaultGroupsItem extends Component {
    render() {
        const { icon, link, title, size } = this.props;

        return (
            <div className="col-xs-3">
                <div className="popover-content__card">
                    <a href={link}>
                        <Row>
                            <Col xs={12}>
                                <Image src={icon} width={size} height={size} />
                            </Col>
                        </Row>
                        <h4>{title}</h4>
                    </a>
                </div>
            </div>
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
