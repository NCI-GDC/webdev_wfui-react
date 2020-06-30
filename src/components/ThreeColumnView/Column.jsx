import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Column extends React.Component {
    render() {
        const { className, key, component } = this.props;
        return (
            <div className={classNames('column-view-column', className, `column-${key}`)}>
                {component}
            </div>
        );
    }
}

Column.propTypes = {
    role: PropTypes.string,
    className: PropTypes.string,
    key: PropTypes.oneOf([1, 2, 3]),
    component: PropTypes.node,
};

Column.defaultProps = {
    role: 'column',
};

export default Column;
