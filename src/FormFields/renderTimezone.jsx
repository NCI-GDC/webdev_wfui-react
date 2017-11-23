/* global FileReader */
/* eslint react/prop-types : 0 */
import React from 'react';
import TimezonePicker from 'react-timezone';
import classNames from 'classnames';
import { FormGroup, ControlLabel, HelpBlock } from '../index';

const renderTimezone = ({
    className,
    label,
    placeholder,
    input,
    help,
    required,
    disabled,
    preview,
    meta: { touched, error },
}) => (
    <div
        className={classNames(
            className,
            'wfui-form-item',
            {
                'wfui-form-item-error': error,
            },
            { 'wfui-form-disabled': disabled },
            { 'wfui-form-preview': preview },
        )}
    >
        <ControlLabel>{label}</ControlLabel>
        {required && <b className="required"> *</b>}
        <FormGroup validationState={touched && error ? 'error' : null}>
            {!disabled ?
            <TimezonePicker
                className="wfui-form-timezone"
                {...input}
                onChange={timezone => input.onChange(timezone)}
                inputProps={{
                    placeholder,
                }}
            />
            :
            <p className="timezone-value">{input.value}</p>
            }
            {touched &&
                error && (
                    <HelpBlock className="wfui-form-error">
                        <span>{error}</span>
                    </HelpBlock>
                )}
        </FormGroup>
    </div>
);

export default renderTimezone;
