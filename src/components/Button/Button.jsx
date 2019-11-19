import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import classNames from 'classnames';
import Icon from '../Icon/Icon';

const CustomButton = props => {
    const { icon, iconPosition, className, children, plus } = props;
    const newProps = { ...props };
    delete newProps.children;
    delete newProps.icon;
    delete newProps.iconPosition;
    delete newProps.plus;

    if (plus) {
        return (
            <Button
                {...newProps}
                className={classNames(
                    className,
                    `btn-plus btn-plus-pre btn-icon btn-icon-pre`
                )}
            >
                <Icon icon="plus-circle" className="btn-icon-container" />
                {children}
            </Button>
        );
    }

    if (icon && icon.length) {
        if (iconPosition === 'post') {
            return (
                <Button
                    {...newProps}
                    className={classNames(
                        className,
                        `btn-${icon} btn-${icon}-post btn-icon btn-icon-post`
                    )}
                >
                    {children}
                    <Icon icon={props.icon} className="btn-icon-container" />
                </Button>
            );
        }
        return (
            <Button
                {...newProps}
                className={classNames(
                    className,
                    `btn-${icon} btn-${icon}-pre btn-icon btn-icon-pre`
                )}
            >
                <Icon icon={props.icon} className="btn-icon-container" />
                {children}
            </Button>
        );
    }
    return <Button {...props} />;
};

CustomButton.prototype = {
    icon: PropTypes.string,
    iconPosition: PropTypes.string,
    plus: PropTypes.bool,
};

CustomButton.defaultProps = {
    iconPosition: 'pre',
    plus: false,
};

export default CustomButton;
