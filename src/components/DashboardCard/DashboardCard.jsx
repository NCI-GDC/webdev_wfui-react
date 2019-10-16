import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Card from '../Card/Card';
import DashboardCardTitle from './DashboardCardTitle';
import DashboardCardHeader from './DashboardCardHeader';
import DashboardCardBody from './DashboardCardBody';
import DashboardCardFooter from './DashboardCardFooter';

const TITLE_ROLE = DashboardCardTitle.defaultProps.role;
const HEADER_ROLE = DashboardCardHeader.defaultProps.role;
const BODY_ROLE = DashboardCardBody.defaultProps.role;
const FOOTER_ROLE = DashboardCardFooter.defaultProps.role;

class DashboardCard extends React.Component {
    render() {
        const { className, children, style } = this.props;

        return (
            <Card className={classNames(className, 'form-box-container')} cardStyle={style}>
                <Card.Body className="form-box">
                    {children &&
                        ((Array.isArray(children) &&
                            children.map((child, key) => {
                                switch (child.props.role) {
                                    case TITLE_ROLE:
                                    case HEADER_ROLE:
                                    case BODY_ROLE:
                                    case FOOTER_ROLE:
                                        return cloneElement(child, { key });
                                    default:
                                        return child;
                                }
                            })) ||
                            cloneElement(children))}
                </Card.Body>
            </Card>
        );
    }
}

DashboardCard.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.object,
};

DashboardCard.Title = DashboardCardTitle;
DashboardCard.Header = DashboardCardHeader;
DashboardCard.Body = DashboardCardBody;
DashboardCard.Footer = DashboardCardFooter;

export default DashboardCard;
