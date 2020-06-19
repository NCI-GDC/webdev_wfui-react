import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Form, FormGroup, ControlLabel, HelpBlock, Col } from '../index';
import sanitizeHtml from 'sanitize-html';

const renderRadios = ({
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
    booleanValue,
    meta: { touched, error, data },
    onChange,
    inline,
    showErrors,
}) => (
    <Form.Row
        className={classNames(
            className,
            'wfui-form-item',
            {
                'wfui-form-item-error':
                    (touched || showErrors) && (error || globalError),
            },
            {
                'wfui-form-item-warning':
                    (touched || showErrors) && data && data.warning,
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
            } wfui-form-radios`}
            // validationState={(touched || showErrors) && (error || globalError) ? 'error' : null}
        >
            <div className="wfui-form-radio-group-container">
                {options.map((option, i) => {
                    const _key =
                        typeof option === 'string' || typeof option === 'number'
                            ? option
                            : option.key;
                    const _option =
                        typeof option === 'string' || typeof option === 'number'
                            ? option
                            : option.value;

                    let checked = input.value == _key;
                    if (typeof input.value === 'boolean') {
                        checked = _key === (input.value ? 'true' : 'false');
                    }

                    return (
                        <Form.Check
                            type="radio"
                            key={i}
                            className={classNames('wfui-form-radio-container', {
                                active: checked,
                                disabled: disabled,
                                preview: preview,
                                'is-valid-warning':
                                    (touched || showErrors) &&
                                    data &&
                                    data.warning,
                            })}
                        >
                            <Form.Check.Label>
                                <Form.Check.Input
                                    type="radio"
                                    name={input.name}
                                    value={_key}
                                    checked={checked}
                                    disabled={disabled}
                                    onChange={e => {
                                        if (
                                            booleanValue &&
                                            (e.target.value === 'true' ||
                                                e.target.value === 'false')
                                        ) {
                                            input.onChange(
                                                e.target.value === 'true'
                                            );
                                        } else {
                                            input.onChange(e.target.value);
                                            if (typeof onChange === 'function')
                                                onChange(e.target.value, input);
                                        }
                                    }}
                                />
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: sanitizeHtml(_option),
                                    }}
                                />
                            </Form.Check.Label>
                            {(touched || showErrors) && error && (
                                <Form.Control.Feedback
                                    className="wfui-form-error"
                                    type="invalid"
                                >
                                    {Array.isArray(error)
                                        ? error.map(item => <div>{item}</div>)
                                        : error}
                                </Form.Control.Feedback>
                            )}
                            {(touched || showErrors) && data && data.warning && (
                                <Form.Control.Feedback
                                    className="wfui-form-warning"
                                    type="valid"
                                >
                                    {Array.isArray(data.warning)
                                        ? data.warning.map(item => (
                                              <div>{item}</div>
                                          ))
                                        : data.warning}
                                </Form.Control.Feedback>
                            )}
                            {(touched || showErrors) && globalError && (
                                <Form.Control.Feedback
                                    className="wfui-form-error"
                                    type="invalid"
                                >
                                    <span>
                                        {Array.isArray(globalError)
                                            ? globalError.join(', ')
                                            : globalError}
                                    </span>
                                </Form.Control.Feedback>
                            )}
                        </Form.Check>
                    );
                })}
            </div>
            {help && !preview && (
                <HelpBlock className="wfui-form-help text-muted">
                    <div
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(help) }}
                    />
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

export default renderRadios;
