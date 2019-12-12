/* global FileReader */
/* eslint react/prop-types : 0 */
import React, { cloneElement } from 'react';
import TimezonePicker from 'react-timezone';
import classNames from 'classnames';
import { FormGroup, ControlLabel, HelpBlock, Form, Col } from '../index';

const renderTimezone = ({
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
    onChange,
    meta: { touched, error, data },
    inline,
}) => (
        <Form.Row
            className={classNames(
                className,
                'wfui-form-item',
                {
                    'wfui-form-item-error': touched && error,
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
                    } wfui-form-time-zone`}
                validationState={touched && error ? 'error' : null}
            >
                {!disabled ? (
                    <TimezonePicker
                        className="wfui-form-timezone"
                        {...input}
                        onChange={timezone => {
                            input.onChange(timezone);
                            if (typeof onChange === 'function') onChange(timezone, input);
                        }}
                        inputProps={{
                            placeholder,
                        }}
                    />
                ) : (
                        <p className="timezone-value">{input.value}</p>
                    )}
                {touched && error && (
                    <HelpBlock className="wfui-form-error">
                        <span>{error}</span>
                    </HelpBlock>
                )}
                {touched && data.warning && (
                    <HelpBlock className="wfui-form-warning">
                        <span>{data.warning}</span>
                    </HelpBlock>
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
                    lg={{ span: 6, offset: 0 }}
                >
                    {cloneElement(descDisplay)}
                </Col>
            ) : null}
        </Form.Row>
    );

export default renderTimezone;
