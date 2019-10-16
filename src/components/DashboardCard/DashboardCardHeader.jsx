import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const DashboardCardHeader = ({ role, className, children }) => (
    <div role={role} className={classNames(className, 'form-box-header')}>
        <div className="form-box-header-box">{children}</div>
    </div>
);

DashboardCardHeader.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    role: PropTypes.string,
};

DashboardCardHeader.defaultProps = {
    role: 'header',
    hover: false,
};

export default DashboardCardHeader;
