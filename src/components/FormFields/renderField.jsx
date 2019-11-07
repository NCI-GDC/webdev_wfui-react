/* global FileReader */
/* eslint react/prop-types : 0 */
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
    FormGroup,
    FormControl,
    ControlLabel,
    HelpBlock,
    Form,
    Col,
} from '../index';

/**
 * Reusable field component.
 */
const renderField = ({
    className,
    inline,
    input,
    label,
    postfix,
    help,
    placeholder,
    type,
    maxlength,
    max,
    min,
    onHandleChange,
    required,
    disabled,
    preview,
    globalError,
    descDisplay,
    meta: { touched, error },
    fullWidth,
}) => (
    <Form.Row
        className={classNames(
            className,
            'wfui-form-item',
            { 'wfui-form-item-error': touched && (error || globalError) },
            { 'wfui-form-inline': inline },
            { 'wfui-form-disabled': disabled },
            { 'wfui-form-preview': preview },
            { answered: input.value },
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
                inline
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
            } wfui-form-input`}
            validationState={touched && (error || globalError) ? 'error' : null}
        >
            <FormControl
                {...input}
                placeholder={
                    placeholder || placeholder === '' ? placeholder : label
                }
                type={type}
                maxLength={maxlength}
                min={min}
                max={max}
                disabled={disabled}
                onChange={e => {
                    input.onChange(e);
                    if (onHandleChange) onHandleChange(e);
                }}
            />
            {postfix && <div className="wfui-form-postfix">{postfix}</div>}
            <FormControl.Feedback />
            {touched && error && (
                <HelpBlock className="wfui-form-error">
                    <span>{error}</span>
                </HelpBlock>
            )}
            {touched && globalError && (
                <HelpBlock className="wfui-form-error">
                    <span>{globalError}</span>
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
                md={{ span: 6, offset: 0 }}
            >
                {cloneElement(descDisplay)}
            </Col>
        ) : null}
    </Form.Row>
);

export default renderField;
