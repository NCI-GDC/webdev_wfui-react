import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Form, FormGroup, ControlLabel, HelpBlock, Col } from '../index';

const renderSingleCheckbox = ({
    className,
    label,
    option,
    input,
    help,
    required,
    disabled,
    preview,
    globalError,
    descDisplay,
    fullWidth,
    inline,
    meta: { touched, error, data },
    onChange,
}) => (
        <Form.Row
            className={classNames(
                className,
                'wfui-form-item wfui-form-singlecheckbox',
                { 'wfui-form-item-error': touched && (error || globalError) },
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
                    <ControlLabel>{label}</ControlLabel>
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
                    } wfui-form-single-checkbox`}
                validationState={touched && (error || globalError) ? 'error' : null}
            >
                <Form.Check
                    type="checkbox"
                    isInvalid={touched && (error || globalError)}
                    isValid={touched && data.warning}
                    className={classNames('wfui-form-checkbox-container', {
                        'active': input.checked,
                        'disabled': disabled,
                        'preview': preview,
                        'is-valid-warning': touched && data.warning,
                    })}
                >
                    <Form.Check.Label>
                        <Form.Check.Input
                            type="checkbox"
                            {...input}
                            onChange={e => {
                                input.onChange(e);
                                if (typeof onChange === 'function')
                                    onChange(e, input);
                            }}
                            disabled={disabled}
                        />
                        <span dangerouslySetInnerHTML={{ __html: option }} />{' '}
                        {required && <b className="required">*</b>}
                    </Form.Check.Label>
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
                    {touched && globalError && (
                        <Form.Control.Feedback
                            className="wfui-form-error"
                            type="invalid"
                        >
                            <span>{Array.isArray(globalError) ? globalError.join(', ') : globalError}</span>
                        </Form.Control.Feedback>
                    )}
                </Form.Check>
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

export default renderSingleCheckbox;
