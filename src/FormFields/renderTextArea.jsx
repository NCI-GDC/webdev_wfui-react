/* global FileReader */
/* eslint react/prop-types : 0 */
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from '../index';

const renderTextArea = ({
    className,
    input,
    label,
    help,
    placeholder,
    type,
    onHandleChange,
    required,
    disabled,
    preview,
    globalError,
    meta: { touched, error },
    rows,
    readOnly,
    descDisplay,
}) => (
    <div
        className={classNames(
            className,
            'wfui-form-item',
            { 'wfui-form-item-error': error || globalError },
            { 'wfui-form-disabled': disabled },
            { 'wfui-form-preview': preview },
            { answered: input.value },
        )}
    >
        <div className="wfui-form-label">
            {label && <ControlLabel>{label}</ControlLabel>}
            {required && <b className="required"> *</b>}
        </div>
        <FormGroup
            className={`wfui-form-field ${
                descDisplay ? 'wfui-form-field-with-desctipton' : ''
            } wfui-form-textarea`}
            validationState={touched && (error || globalError) ? 'error' : null}
        >
            <FormControl
                {...input}
                type={type}
                placeholder={placeholder || placeholder === '' ? placeholder : label}
                disabled={readOnly ? false : disabled}
                readOnly={readOnly}
                onChange={(e) => {
                    input.onChange(e);
                    if (onHandleChange) onHandleChange(e);
                }}
                componentClass="textarea"
                rows={disabled ? 10 : rows || 5}
            />
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
            {help && (
                <div className="wfui-form-description" dangerouslySetInnerHTML={{ __html: help }} />
            )}
        </FormGroup>
        {descDisplay ? cloneElement(descDisplay) : ''}
    </div>
);

export default renderTextArea;
