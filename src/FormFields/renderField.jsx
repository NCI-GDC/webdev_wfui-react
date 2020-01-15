/* global FileReader */
/* eslint react/prop-types : 0 */
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from '../index';

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
    autoComplete,
    showErrors,
}) => (
        <div
            className={classNames(
                className,
                'wfui-form-item',
                { 'wfui-form-item-error': (touched || showErrors) && (error || globalError) },
                { 'wfui-form-inline': inline },
                { 'wfui-form-disabled': disabled },
                { 'wfui-form-preview': preview },
                { answered: input.value },
                { 'wfui-form-item-full-width': fullWidth }
            )}
        >
            {label && (
                <div className="wfui-form-label">
                    <ControlLabel>
                        {label}
                        {required && <b className="required"> *</b>}
                    </ControlLabel>
                </div>
            )}

            <FormGroup
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
                    autoComplete={autoComplete}
                />
                {postfix && <div className="wfui-form-postfix">{postfix}</div>}
                <FormControl.Feedback />
                {(touched || showErrors) && error && (
                    <HelpBlock className="wfui-form-error">
                        <span>{error}</span>
                    </HelpBlock>
                )}
                {(touched || showErrors) && globalError && (
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

export default renderField;
