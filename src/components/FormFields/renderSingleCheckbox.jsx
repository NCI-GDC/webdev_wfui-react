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
    meta: { touched, error },
    onChange,
}) => (
        <Form.Row
            className={classNames(
                className,
                'wfui-form-item wfui-form-singlecheckbox',
                { 'wfui-form-item-error': touched && (error || globalError) },
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
                    className={`wfui-form-checkbox-container${
                        input.checked ? ' active' : ''
                        }${disabled ? ' disabled' : ''}${preview ? ' preview' : ''}`}
                >
                    <Form.Check.Label>
                        <Form.Check.Input
                            type="checkbox"
                            {...input}
                            onChange={e => {
                                input.onChange(e);
                                if (typeof onChange === 'function') onChange(e, input);
                            }}
                            disabled={disabled}
                        />
                        <span dangerouslySetInnerHTML={{ __html: option }} />
                        {' '}
                        {required && <b className="required">*</b>}
                    </Form.Check.Label>
                </Form.Check>
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
                    lg={{ span: 6, offset: 0 }}
                >
                    {cloneElement(descDisplay)}
                </Col>
            ) : null}
        </Form.Row>
    );

export default renderSingleCheckbox;
