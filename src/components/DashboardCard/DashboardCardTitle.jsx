import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const DashboardCardTitle = ({ role, className, title, image, imageAlt, left }) => (
    <div role={role} className={classNames(className, 'form-box-title')}>
        <div className="form-box-title-box">
            {image && (
                <img
                    src={image}
                    className="form-box-title-image img-responsive"
                    alt={imageAlt || 'title image'}
                />
            )}
            <h2 className={`form-box-title-text ${left ? 'text-left' : 'text-center'}`}>{title}</h2>
        </div>
    </div>
);

DashboardCardTitle.propTypes = {
    title: PropTypes.node.isRequired,
    image: PropTypes.string,
    imageAlt: PropTypes.string,
    className: PropTypes.string,
    role: PropTypes.string,
    left: PropTypes.bool,
};

DashboardCardTitle.defaultProps = {
    role: 'title',
    left: false,
};

export default DashboardCardTitle;
