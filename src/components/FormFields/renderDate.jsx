/* global FileReader */
/* eslint react/prop-types : 0 */
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import classNames from 'classnames';
import moment from 'moment';
import { FormControl, FormGroup, ControlLabel, HelpBlock, Form, Col } from '../index';

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
    meta: { touched, error, data },
    utcOffsetNumber,
    datePickerProps,
    onChange,
    inline,
}) => (
        <Form.Row
            className={classNames(
                className,
                'wfui-form-item',
                {
                    'wfui-form-item-error': touched && (error || globalError),
                },
                {
                    'wfui-form-item-warning': touched && data.warning,
                },
                { 'wfui-form-disabled': disabled },
                { 'wfui-form-preview': preview },
                { 'wfui-form-item-full-width': fullWidth }
            )}
        >
            {label && (
                <Col xs={12} lg={inline ? 2 : 12} className="wfui-form-label">
                    <ControlLabel>
                        {label}
                        {required && <b className="required"> *</b>}
                    </ControlLabel>
                </Col>
            )}
            <FormGroup
                as={Col}
                xs={12}
                lg={
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
                    } wfui-form-date ${
                    touched && (error || globalError) ? 'wfui-form-with-error' : ''
                    }`}
                validationState={touched && (error || globalError) ? 'error' : null}
            >
                <FormControl isInvalid={touched && (error || globalError)}
                    isValid={touched && data.warning}
                    className={
                        classNames(
                            'd-none',
                            'custom-form-control',
                            { 'is-valid-warning': touched && data.warning }
                        )
                    }
                />
                {!disabled ? (
                    <div className="wfui-form-datepicker custom-form-control-wrapper">
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
                            onChange={e => {
                                input.onChange(e);
                                if (typeof onChange === 'function')
                                    onChange(e, input);
                            }}
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
                        {Array.isArray(error)
                            ? error.map(item => <div>{item}</div>)
                            : error}
                    </Form.Control.Feedback>
                )}
                {touched && globalError && (
                    <Form.Control.Feedback
                        className="wfui-form-error"
                        type="invalid"
                    >
                        <span>{Array.isArray(globalError) ? globalError.join(', ') : globalError}</span>
                    </Form.Control.Feedback>
                )}
                {touched && data.warning && (
                    <Form.Control.Feedback
                        className="wfui-form-warning"
                        type="valid"
                    >
                        {Array.isArray(data.warning)
                            ? data.warning.map(item => <div>{item}</div>)
                            : data.warning}
                    </Form.Control.Feedback>
                )}
                {help && !preview && (
                    <HelpBlock className="wfui-form-help text-muted">
                        <div dangerouslySetInnerHTML={{ __html: help }} />
                    </HelpBlock>
                )}
            </FormGroup>
            {
                descDisplay && !preview ? (
                    <Col
                        className="wfui-form-description"
                        xs={12}
                        lg={{ span: 6, offset: 0 }}
                    >
                        {cloneElement(descDisplay)}
                    </Col>
                ) : null
            }
        </Form.Row >
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
