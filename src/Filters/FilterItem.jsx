import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormGroup } from 'react-bootstrap';

class FilterItem extends React.Component {
    render() {
        const { className, component } = this.props;

        /*
            Can you make each field look like this?

            <FormGroup className={classNames(className, 'wfui-filters-item')} >
                <ControlLabel>{label}</ControlLabel>
                <FormGroup>
                    things goes inside.
                </FormGroup>
            </FormGroup>
        */
        return null;
    }
}

FilterItem.propTypes = {
    className: PropTypes.string,
};

FilterItem.defaultProps = {
    className: 'wfui-filters-item',
};

export default FilterItem;
