import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const DashboardCardBody = ({ role, className, children, isList, items, itemDisplay }) =>
    isList ? (
        <div role={role} className={classNames(className, 'form-box-body')}>
            <ul className="form-box-body-list">
                {Array.isArray(items) && itemDisplay && 
                    items.map((item, key) => (
                        <li key={key}>{cloneElement(itemDisplay, {item})}</li>
                    ))}
            </ul>
        </div>
    ) : (
        <div role={role} className={classNames(className, 'form-box-body')}>
            {children}
        </div>
    );

DashboardCardBody.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    role: PropTypes.string,
    isList: PropTypes.bool,
    items: PropTypes.array,
    itemDisplay: PropTypes.element,
};

DashboardCardBody.defaultProps = {
    role: 'body',
    isList: false,
};

export default DashboardCardBody;
