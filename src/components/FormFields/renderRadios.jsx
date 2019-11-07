import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Form, FormGroup, ControlLabel, HelpBlock, Col } from '../index';

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
    meta: { touched, error },
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
            } wfui-form-radios`}
            validationState={touched && (error || globalError) ? 'error' : null}
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
                            className={`wfui-form-radio-container${
                                checked ? ' active' : ''
                            }${disabled ? ' disabled' : ''}${
                                preview ? ' preview' : ''
                            }`}
                            key={i}
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
                                        }
                                    }}
                                />
                                {_option}
                            </Form.Check.Label>
                        </Form.Check>
                    );
                })}
            </div>
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

export default renderRadios;
