import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Form, FormGroup, ControlLabel, Button } from '../index';

class Filters extends React.Component {
    render() {
        const {
            className,
            label,
            onClickReset,
            textReset,
            children,
            resetVariant,
        } = this.props;
        return (
            <Form
                className={classNames(className, 'wfui-filters')}
                as="fieldset"
                inline
            >
                <FormGroup>
                    <ControlLabel>{label}</ControlLabel>
                    {children}
                    <FormGroup className="wfui-filters-btn-reset">
                        <Button variant={resetVariant} onClick={onClickReset}>
                            {textReset}
                        </Button>
                    </FormGroup>
                </FormGroup>
            </Form>
        );
    }
}

Filters.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    textReset: PropTypes.string,
    onClickReset: PropTypes.func,
    children: PropTypes.node,
    resetVariant: PropTypes.string,
};

Filters.defaultProps = {
    label: 'Filters:',
    textReset: 'Reset',
    onClickReset: f => f,
    disableReset: false,
    resetVariant: 'invariant-primary',
};

export default Filters;
