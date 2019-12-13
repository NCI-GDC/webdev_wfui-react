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

const renderSelect = ({
    className,
    label,
    options,
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
                'wfui-form-item',
                { 'wfui-form-item-error': touched && (error || globalError) },
                {
                    'wfui-form-item-warning': touched && data.warning,
                },
                { 'wfui-form-disabled': disabled },
                { 'wfui-form-preview': preview },
                { answered: input.value },
                { 'wfui-form-item-full-width': fullWidth },
                { 'wfui-form-with-description': descDisplay }
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
                    } wfui-form-select`}
                validationState={touched && (error || globalError) ? 'error' : null}
            >
                <FormControl
                    {...input}
                    onChange={e => {
                        input.onChange(e);
                        if (typeof onChange === 'function') onChange(e, input);
                    }}
                    as="select"
                    isInvalid={touched && (error || globalError)}
                    isValid={touched && data.warning}
                    className={classNames({
                        'is-valid-warning': touched && data.warning,
                    })}
                >
                    {options.map((option, i) => {
                        const _key =
                            typeof option === 'string' ? option : option.key;
                        const _option =
                            typeof option === 'string' ? option : option.value;
                        return (
                            <option
                                key={i}
                                name={input.name}
                                value={_key}
                                disabled={disabled}
                                onChange={e => input.onChange(e.target.value)}
                            >
                                {_option}
                            </option>
                        );
                    })}
                </FormControl>
                {touched && error && (
                    <Form.Control.Feedback
                        className="wfui-form-error"
                        type="invalid"
                    >
                        <span>{Array.isArray(error) ? error.join(', ') : error}</span>
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
                        <span>{Array.isArray(data.warning) ? data.warning.join(', ') : data.warning}</span>
                    </Form.Control.Feedback>
                )}
                {help && !preview && (
                    <HelpBlock className="wfui-form-help text-muted">
                        <div dangerouslySetInnerHTML={{ __html: help }} />
                    </HelpBlock>
                )}
            </FormGroup>
            {descDisplay && !preview ? (
                <Col className="wfui-form-description" xs={12} lg={6}>
                    {cloneElement(descDisplay)}
                </Col>
            ) : null}
        </Form.Row>
    );

export default renderSelect;
