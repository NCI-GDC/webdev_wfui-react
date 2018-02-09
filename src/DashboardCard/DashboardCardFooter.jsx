import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const DashboardCardFooter = ({ role, className, children }) => {
    if (!children) return null;

    const elems = [];
    if (Array.isArray(children)) {
        children.forEach((item) => {
            if (Array.isArray(item)) {
                item.forEach(i => elems.push(i));
            } else {
                elems.push(item);
            }
        });
    } else {
        elems.push(children);
    }

    return (
        <div role={role} className={classNames(className, 'form-box-footer')}>
            <ul className="form-box-links">
                {elems && elems.map((elem, key) => <li key={key}>{cloneElement(elem)}</li>)}
            </ul>
        </div>
    );
};

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
