/* global FileReader */
/* eslint react/prop-types : 0 */
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import classNames from 'classnames';
import moment from 'moment';
import { FormGroup, ControlLabel, HelpBlock, Form, Col } from '../index';

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
    globalError,
    fullWidth,
    timeZone,
    meta: { touched, error },
    utcOffsetNumber,
    datePickerProps,
    inline,
}) => (
    <Form.Row
        className={classNames(
            className,
            'wfui-form-item',
            {
                'wfui-form-item-error': touched && (error || globalError),
            },
            { 'wfui-form-disabled': disabled },
            { 'wfui-form-preview': preview },
            { 'wfui-form-item-full-width': fullWidth }
        )}
    >
        {label && (
            <Col xs={12} md={inline ? 2 : 12} className="wfui-form-label">
                <ControlLabel>
                    {label}
                    {required && <b className="required"> *</b>}
                </ControlLabel>
            </Col>
        )}
        <FormGroup
            as={Col}
            xs={12}
            md={
                inline && label
                    ? descDisplay && !preview
                        ? 4
                        : 10
                    : descDisplay && !preview
                    ? 6
                    : 12
            }
            className={`wfui-form-field ${
                descDisplay
                    ? 'wfui-form-field-with-description'
                    : 'wfui-form-field-no-description'
            } wfui-form-date`}
            validationState={touched && (error || globalError) ? 'error' : null}
        >
            {!disabled ? (
                <div className="wfui-form-datepicker">
                    <DatePicker
                        {...datePickerProps}
                        className="form-control"
                        utcOffset={
                            datePickerProps.utcOffset
                                ? datePickerProps.utcOffset
                                : Number(utcOffsetNumber) / 100
                        }
                        selected={
                            input.value ? moment(input.value).toDate() : ''
                        }
                        onChange={input.onChange}
                        onBlur={input.onBlur}
                        placeholderText={placeholder || 'Choose Date'}
                    />
                    <span className="timezone">
                        {`${timeZone} ${utcOffsetNumber}`}
                    </span>
                </div>
            ) : (
                <p className="date-value">
                    {input.value ? new Date(input.value).toString() : ''}
                </p>
            )}
            {touched && error && (
                <Form.Control.Feedback
                    className="wfui-form-error"
                    type="invalid"
                >
                    <span>{error}</span>
                </Form.Control.Feedback>
            )}
            {touched && globalError && (
                <Form.Control.Feedback
                    className="wfui-form-error"
                    type="invalid"
                >
                    <span>{globalError}</span>
                </Form.Control.Feedback>
            )}
            {help && !preview && (
                <HelpBlock className="wfui-form-help text-muted">
                    <div dangerouslySetInnerHTML={{ __html: help }} />
                </HelpBlock>
            )}
        </FormGroup>
        {descDisplay && !preview ? (
            <Col
                className="wfui-form-description"
                xs={12}
                md={{ span: 6, offset: 0 }}
            >
                {cloneElement(descDisplay)}
            </Col>
        ) : null}
    </Form.Row>
);

renderDate.propTypes = {
    datePickerProps: PropTypes.object,
};
renderDate.defaultProps = {
    datePickerProps: {
        timeFormat: 'HH:mm',
        dateFormat: 'yyyy-MM-dd HH:mm',
        showTimeSelect: true,
    },
    utcOffsetNumber: new Date().toString().match(/([-\+][0-9]+)\s/)[1],
    timeZone: new Date().toString().match(/\(([A-Za-z\s].*)\)/)[1],
};

export default renderDate;
