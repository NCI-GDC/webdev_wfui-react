import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class CardBody extends React.Component {
    render() {
        const { hover, className, children, role } = this.props;

        return (
            <div
                role={role}
                className={classNames(className, 'wfui-card-body', { active: !hover })}
            >
                { children }
            </div>
        );
    }
}

CardBody.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    role: PropTypes.string,
    hover: PropTypes.bool,
};

CardBody.defaultProps = {
    role: 'body',
    hover: false,
};

export default CardBody;
