import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * ListboxOption
 */
class ListboxOption extends Component {
    render() {
        const { value, label, className } = this.props;

        return (
            <option value={value} className={className}>
                {label}
            </option>
        );
    }
}

/**
 * Property types
 */
ListboxOption.propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    label: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    className: PropTypes.string,
};
ListboxOption.defaultProps = {
    value: '',
    label: '',
    className: '',
};

export default ListboxOption;
