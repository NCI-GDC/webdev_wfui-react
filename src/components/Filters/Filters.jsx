import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Form, FormGroup, ControlLabel, Button } from 'react-bootstrap';

class Filters extends React.Component {
    render() {
        const { className, label, onClickReset, textReset, children } = this.props;
        return (
            <Form className={classNames(className, 'wfui-filters')} componentClass="fieldset" inline>
                <FormGroup>
                    <ControlLabel>{label}</ControlLabel>
                    {children}
                    <FormGroup className="wfui-filters-btn-reset">
                        <Button
                            onClick={onClickReset}
                        >
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
};

Filters.defaultProps = {
    label: 'Filters:',
    textReset: 'Reset',
    onClickReset: f => f,
    disableReset: false,
};

export default Filters;
