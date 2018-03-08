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
}) => (
    <div
        className={classNames(
            className,
            'wfui-form-item',
            { 'wfui-form-item-error': error || globalError },
            { 'wfui-form-inline': inline },
            { 'wfui-form-disabled': disabled },
            { 'wfui-form-preview': preview },
            { answered: input.value },
        )}
    >
        <div className="wfui-form-label">
            {label && (
                <ControlLabel>
                    {label}
                    {required && <b className="required"> *</b>}
                </ControlLabel>
            )}
        </div>

        <FormGroup
            className={`wfui-form-field ${
                descDisplay ? 'wfui-form-field-with-desctipton' : 'wfui-form-field-no-desctipton'
            } wfui-form-input`}
            validationState={touched && (error || globalError) ? 'error' : null}
        >
            <FormControl
                {...input}
                placeholder={placeholder || placeholder === '' ? placeholder : label}
                type={type}
                maxLength={maxlength}
                min={min}
                max={max}
                disabled={disabled}
                onChange={(e) => {
                    input.onChange(e);
                    if (onHandleChange) onHandleChange(e);
                }}
            />
            {postfix && <div className="wfui-form-postfix">{postfix}</div>}
            <FormControl.Feedback />
            {touched &&
                error && (
                    <HelpBlock className="wfui-form-error">
                        <span>{error}</span>
                    </HelpBlock>
                )}
            {touched &&
                globalError && (
                    <HelpBlock className="wfui-form-error">
                        <span>{globalError}</span>
                    </HelpBlock>
                )}
            {help && <div className="wfui-form-help" dangerouslySetInnerHTML={{ __html: help }} />}
        </FormGroup>
        {descDisplay ? cloneElement(descDisplay) : ''}
    </div>
);

export default renderField;
