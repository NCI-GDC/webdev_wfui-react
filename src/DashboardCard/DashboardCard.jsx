import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Card from '../Card/Card';

const DashboardCardBody = ({ role, className, children }) => (
    <div role={role} className={classNames(className, 'form-box-body')}>
        {children}
    </div>
);

DashboardCardBody.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    role: PropTypes.string,
};

DashboardCardBody.defaultProps = {
    role: 'body',
    hover: false,
};

const DashboardCardFooter = ({ role, className, children }) =>
    children ? (
        <div role={role} className={classNames(className, 'form-box-footer')}>
            <ul className="form-box-links">
                {(Array.isArray(children) &&
                    children.map((child, key) => <li key={key}>{cloneElement(child)}</li>)) ||
                    cloneElement(children, { key: 0 })}
            </ul>
        </div>
    ) : null;

DashboardCardFooter.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    role: PropTypes.string,
};

DashboardCardFooter.defaultProps = {
    role: 'footer',
    hover: false,
};

const BODY_ROLE = DashboardCardBody.defaultProps.role;
const FOOTER_ROLE = DashboardCardFooter.defaultProps.role;

class DashboardCard extends React.Component {
    render() {
        const { className, children, cardStyle } = this.props;

        return (
            <Card className={classNames(className, 'form-box')} cardStyle={cardStyle}>
                <Card.Body>
                    {children &&
                        ((Array.isArray(children) &&
                            children.map((child, key) => {
                                switch (child.props.role) {
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
    cardStyle: PropTypes.object,
};

DashboardCard.Body = DashboardCardBody;
DashboardCard.Footer = DashboardCardFooter;

export default DashboardCard;
