import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Card from '../Card/Card';
import { stringifyValues } from '../util/stringifyValues';

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

const DashboardCardFilterData = ({ role, data }) => (
    <span role={role} className="hide isotope-search" aria-hidden="true" hidden>
        {stringifyValues(data)}
    </span>
);

DashboardCardFilterData.propTypes = {
    role: PropTypes.string,
    data: PropTypes.object,
};

DashboardCardFilterData.defaultProps = {
    role: 'filterData',
};

const BODY_ROLE = DashboardCardBody.defaultProps.role;
const FOOTER_ROLE = DashboardCardFooter.defaultProps.role;
const DATA_ROLE = DashboardCardFilterData.defaultProps.role;

class DashboardCard extends React.Component {
    render() {
        const { className, children, data, cardStyle } = this.props;

        return (
            <Card className={classNames(className, 'form-box-container')}>
                <Card.Body className="form-box">
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
                    {data && <DashboardCardFilterData data={data} />}
                </Card.Body>
            </Card>
        );
    }
}

DashboardCard.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    data: PropTypes.object,
};

DashboardCard.Body = DashboardCardBody;
DashboardCard.Footer = DashboardCardFooter;

export default DashboardCard;
