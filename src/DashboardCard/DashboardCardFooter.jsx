import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const DashboardCardFooter = ({ role, className, children }) =>
    children ? (
        <div role={role} className={classNames(className, 'form-box-footer')}>
            <ul className="form-box-links">
                {(Array.isArray(children) &&
                    children.map((child, key) => <li key={key}>{cloneElement(child)}</li>)) || (
                    <li>{cloneElement(children)}</li>
                )}
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

export default DashboardCardFooter;
