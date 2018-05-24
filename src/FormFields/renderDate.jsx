/* global FileReader */
/* eslint react/prop-types : 0 */
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import classNames from 'classnames';
import moment from 'moment';
import { FormGroup, ControlLabel, HelpBlock } from '../index';

const renderDate = ({
    className,
    label,
    placeholder,
    input,
    help,
    required,
    disabled,
    preview,
    descDisplay,
    fullWidth,
    timeZone,
    meta: { touched, error },
    utcOffsetNumber,
    datePickerProps,
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
            { 'wfui-form-item-full-width': fullWidth },
        )}
    >
        {label && (
            <div className="wfui-form-label">
                <ControlLabel>
                    {label}
                    {required && <b className="required"> *</b>}
                </ControlLabel>
            </div>
        )}
        <FormGroup
            className={`wfui-form-field ${
                descDisplay
                    ? 'wfui-form-field-with-desctipton'
                    : 'wfui-form-field-no-desctipton'
            } wfui-form-date`}
            validationState={touched && error ? 'error' : null}
        >
            {!disabled ? (
                <div className="wfui-form-datepicker">
                    <DatePicker
                        {...datePickerProps}
                        utcOffset={
                            datePickerProps.utcOffset
                                ? datePickerProps.utcOffset
                                : Number(utcOffsetNumber) / 100
                        }
                        selected={input.value ? moment(input.value) : null}
                        onChange={input.onChange}
                    />
                    <span className="timezone">
                        {timeZone} ({utcOffsetNumber})
                    </span>
                </div>
            ) : (
                <p className="date-value">
                    {input.value ? new Date(input.value).toString() : ''}
                </p>
            )}
            {touched &&
                error && (
                    <HelpBlock className="wfui-form-error">
                        <span>{error}</span>
                    </HelpBlock>
                )}
        </FormGroup>
        {descDisplay && !preview ? cloneElement(descDisplay) : ''}
    </div>
);

renderDate.propTypes = {
    datePickerProps: PropTypes.object,
};
renderDate.defaultProps = {
    datePickerProps: {
        timeFormat: 'HH:mm',
        dateFormat: 'YYYY-MM-DD HH:mm',
        showTimeSelect: true,
    },
    utcOffsetNumber: new Date().toString().match(/([-\+][0-9]+)\s/)[1],
    timeZone: new Date().toString().match(/\(([A-Za-z\s].*)\)/)[1],
};

export default renderDate;
