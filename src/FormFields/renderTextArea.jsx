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
    fullWidth,
}) => (
    <div
        className={classNames(
            className,
            'wfui-form-item',
            { 'wfui-form-item-error': touched && (error || globalError) },
            { 'wfui-form-disabled': disabled },
            { 'wfui-form-preview': preview },
            { answered: input.value },
            { 'wfui-form-item-full-width': fullWidth },
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
                    ? 'wfui-form-field-with-desctipton'
                    : 'wfui-form-field-no-desctipton'
            } wfui-form-textarea`}
            validationState={touched && (error || globalError) ? 'error' : null}
        >
            <FormControl
                {...input}
                type={type}
                placeholder={
                    placeholder || placeholder === '' ? placeholder : label
                }
                disabled={readOnly ? false : disabled}
                readOnly={readOnly}
                onChange={e => {
                    input.onChange(e);
                    if (onHandleChange) onHandleChange(e);
                }}
                componentClass="textarea"
                rows={rows || (disabled || preview ? 0 : 5)}
            />
            <FormControl.Feedback />
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

export default renderTextArea;
