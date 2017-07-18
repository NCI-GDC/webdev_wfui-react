import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class CardHover extends React.Component {
    render() {
        const { hover, className, children, role, animation, middle, hoverOpacity, backgroundColor } = this.props;
        const style = {};
        if (hover) {
            if (hoverOpacity && typeof hoverOpacity === 'number') style.opacity = hoverOpacity;
            if (backgroundColor && typeof backgroundColor === 'string') style.backgroundColor = backgroundColor;
        }

        return (
            <div
                role={role}
                className={classNames(className, 'wfui-card-hover', `card-${animation}`, { active: hover })}
                style={style}
            >
                { middle ? <div className="middle">{children}</div> : <div>{children}</div> }
            </div>
        );
    }
}

CardHover.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    role: PropTypes.string,
    hover: PropTypes.bool,
    animation: PropTypes.string,
    hoverOpacity: PropTypes.number,
    backgroundColor: PropTypes.string,
    middle: PropTypes.bool,
};

CardHover.defaultProps = {
    role: 'hover',
    hover: false,
    animation: 'none',
};

export default CardHover;
