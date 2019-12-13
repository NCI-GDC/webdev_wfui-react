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

const renderTextArea = ({
    className,
    input,
    label,
    help,
    placeholder,
    onHandleChange,
    required,
    disabled,
    preview,
    globalError,
    meta: { touched, error, data },
    rows,
    readOnly,
    descDisplay,
    fullWidth,
    textLimit,
    textLimitLabel,
    onChange,
    inline,
}) =>
    preview ? (
        <Form.Row
            className={classNames(
                className,
                'wfui-form-item',
                { 'wfui-form-item-error': touched && (error || globalError) },
                {
                    'wfui-form-item-warning': touched && data.warning,
                },
                { 'wfui-form-disabled': disabled },
                { 'wfui-form-preview': preview },
                { answered: input.value },
                { 'wfui-form-item-full-width': fullWidth }
            )}
        >
            {label && (
                <Col xs={12} lg={inline ? 2 : 12} className="wfui-form-label">
                    <ControlLabel>
                        {label}
                        {textLimitLabel ? (
                            <span className="text-muted">{textLimitLabel}</span>
                        ) : null}
                        {required && <b className="required"> *</b>}
                    </ControlLabel>
                </Col>
            )}
            <FormGroup
                as={Col}
                xs={12}
                lg={inline ? 10 : 12}
                className={`wfui-form-field ${
                    descDisplay
                        ? 'wfui-form-field-with-description'
                        : 'wfui-form-field-no-description'
                    } wfui-form-textarea`}
            >
                <div className="wfui-form-textarea-preview-value">
                    {input.value}
                </div>
            </FormGroup>
        </Form.Row>
    ) : (
            <Form.Row
                className={classNames(
                    className,
                    'wfui-form-item',
                    { 'wfui-form-item-error': touched && (error || globalError) },
                    { 'wfui-form-disabled': disabled },
                    { 'wfui-form-preview': preview },
                    { answered: input.value },
                    { 'wfui-form-item-full-width': fullWidth }
                )}
            >
                {label && (
                    <Col xs={12} lg={inline ? 2 : 12} className="wfui-form-label">
                        <ControlLabel>
                            {label}
                            {textLimitLabel ? (
                                <span className="text-muted">{textLimitLabel}</span>
                            ) : null}
                            {required && <b className="required"> *</b>}
                        </ControlLabel>
                    </Col>
                )}
                <FormGroup
                    as={Col}
                    xs={12}
                    lg={inline ? (descDisplay ? 4 : 10) : descDisplay ? 6 : 12}
                    className={`wfui-form-field ${
                        descDisplay
                            ? 'wfui-form-field-with-description'
                            : 'wfui-form-field-no-description'
                        } wfui-form-textarea`}
                    validationState={
                        touched && (error || globalError) ? 'error' : null
                    }
                >
                    <FormControl
                        {...input}
                        placeholder={
                            placeholder || placeholder === '' ? placeholder : label
                        }
                        disabled={readOnly ? false : disabled}
                        readOnly={readOnly}
                        onChange={e => {
                            input.onChange(e);
                            if (onChange) onChange(e, input);
                            if (onHandleChange) onHandleChange(e, input);
                        }}
                        as="textarea"
                        rows={rows || (disabled || preview ? 0 : 5)}
                        isInvalid={touched && (error || globalError)}
                        isValid={touched && data.warning}
                        className={classNames({
                            'is-valid-warning': touched && data.warning,
                        })}
                    />
                    {touched && error && (
                        <Form.Control.Feedback
                            className="wfui-form-error"
                            type="invalid"
                        >
                            {Array.isArray(error)
                                ? error.map(item => <div>{item}</div>)
                                : error}
                            {textLimit && !preview ? (
                                <span className="wfui-form-char-count">
                                    {`${
                                        input && input.value
                                            ? input.value.length
                                            : 0
                                        } / ${textLimit} characters`}
                                </span>
                            ) : null}
                        </Form.Control.Feedback>
                    )}
                    {touched && globalError && (
                        <Form.Control.Feedback
                            className="wfui-form-error"
                            type="invalid"
                        >
                            <span>{Array.isArray(globalError) ? globalError.join(', ') : globalError}</span>
                            {textLimit && !preview ? (
                                <span className="wfui-form-char-count">
                                    {`${
                                        input && input.value
                                            ? input.value.length
                                            : 0
                                        } / ${textLimit} characters`}
                                </span>
                            ) : null}
                        </Form.Control.Feedback>
                    )}
                    {!(touched && (error || globalError)) &&
                        textLimit &&
                        !preview ? (
                            <span className="wfui-form-char-count text-muted">
                                {`${
                                    input && input.value ? input.value.length : 0
                                    } / ${textLimit} characters`}
                            </span>
                        ) : null}
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

export default renderTextArea;
