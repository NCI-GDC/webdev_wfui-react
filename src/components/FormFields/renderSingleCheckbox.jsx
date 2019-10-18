import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Form, FormGroup, ControlLabel, HelpBlock, Checkbox } from '../index';

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
    meta: { touched, error },
}) => (
    <div
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
            <div className="wfui-form-label">
                <ControlLabel>{label}</ControlLabel>
            </div>
        )}
        <FormGroup
            className={`wfui-form-field ${
                descDisplay
                    ? 'wfui-form-field-with-description'
                    : 'wfui-form-field-no-description'
            } wfui-form-single-checkbox`}
            validationState={touched && (error || globalError) ? 'error' : null}
        >
            <Form.Check
                type="checkbox"
                className={input.checked ? 'active' : ''}
                {...input}
                disabled={disabled}
            >
                <Form.Check.Label>
                    <Form.Check.Input type="checkbox" />
                    <span dangerouslySetInnerHTML={{ __html: option }} />{' '}
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
                <div
                    className="wfui-form-help"
                    dangerouslySetInnerHTML={{ __html: help }}
                />
            )}
        </FormGroup>
        {descDisplay && !preview ? cloneElement(descDisplay) : ''}
    </div>
);

export default renderSingleCheckbox;
