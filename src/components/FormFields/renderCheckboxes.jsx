import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Form, FormGroup, ControlLabel, HelpBlock, Col } from '../index';

const renderCheckboxes = ({
    className,
    label,
    options,
    input,
    help,
    required,
    disabled,
    preview,
    globalError,
    meta: { touched, error },
    descDisplay,
    fullWidth,
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
            } wfui-form-checkboxes`}
            validationState={touched && (error || globalError) ? 'error' : null}
        >
            <div className="wfui-form-checkbox-group-container">
                {options.map((option, i) => {
                    const _key =
                        typeof option === 'string' ? option : option.key;
                    const _option =
                        typeof option === 'string' ? option : option.value;
                    return (
                        <Form.Check
                            type="checkbox"
                            key={i}
                            className={`wfui-form-checkbox-container${
                                input.value && input.value.includes(_key)
                                    ? ' active'
                                    : ''
                            }${disabled ? ' disabled' : ''}${
                                preview ? ' preview' : ''
                            }`}
                        >
                            <Form.Check.Label>
                                <Form.Check.Input
                                    type="checkbox"
                                    name={input.name}
                                    value={_key}
                                    checked={
                                        input.value &&
                                        input.value.includes(_key)
                                    }
                                    disabled={disabled}
                                    onChange={e => {
                                        const newValue = [...input.value];
                                        if (e.target.checked) {
                                            newValue.push(_key);
                                        } else {
                                            newValue.splice(
                                                newValue.indexOf(_key),
                                                1
                                            );
                                        }
                                        input.onBlur();
                                        if (typeof onChange === 'function')
                                            onChange(newValue);
                                        return input.onChange(newValue);
                                    }}
                                    isInvalid={
                                        touched && (error || globalError)
                                    }
                                />
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: _option,
                                    }}
                                />
                                {option.required && (
                                    <b className="required"> *</b>
                                )}
                            </Form.Check.Label>
                        </Form.Check>
                    );
                })}
            </div>
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
                lg={{ span: 6, offset: 0 }}
            >
                {cloneElement(descDisplay)}
            </Col>
        ) : null}
    </Form.Row>
);

export default renderCheckboxes;
