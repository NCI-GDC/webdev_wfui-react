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
    textLimit,
    textLimitLabel,
    autoComplete,
}) =>
    preview ? (
        <div
            className={classNames(
                className,
                'wfui-form-item',
                { 'wfui-form-item-error': touched && (error || globalError) },
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
                        {textLimitLabel ? (
                            <span className="text-muted">{textLimitLabel}</span>
                        ) : null}
                        {required && <b className="required"> *</b>}
                    </ControlLabel>
                </div>
            )}
            <div
                className={`wfui-form-field ${
                    descDisplay
                        ? 'wfui-form-field-with-description'
                        : 'wfui-form-field-no-description'
                } wfui-form-textarea`}
            >
                <div className="wfui-form-textarea-preview-value">
                    {input.value}
                </div>
            </div>
        </div>
    ) : (
        <div
            className={classNames(
                className,
                'wfui-form-item',
                { 'wfui-form-item-error': touched && (error || globalError) },
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
                        {textLimitLabel ? (
                            <span className="text-muted">{textLimitLabel}</span>
                        ) : null}
                        {required && <b className="required"> *</b>}
                    </ControlLabel>
                </div>
            )}
            <FormGroup
                className={`wfui-form-field ${
                    descDisplay
                        ? 'wfui-form-field-with-description'
                        : 'wfui-form-field-no-description'
                } wfui-form-textarea`}
                validationState={
                    touched && (error || globalError) ? 'error' : null
                }
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
                    autoComplete={autoComplete}
                    componentClass="textarea"
                    rows={rows || (disabled || preview ? 0 : 5)}
                />
                <FormControl.Feedback />
                {touched && error && (
                    <HelpBlock className="wfui-form-error">
                        <span>{error}</span>
                        {textLimit && !preview ? (
                            <span className="wfui-form-char-count">
                                {`${
                                    input && input.value
                                        ? input.value.length
                                        : 0
                                } / ${textLimit} characters`}
                            </span>
                        ) : null}
                    </HelpBlock>
                )}
                {touched && globalError && (
                    <HelpBlock className="wfui-form-error">
                        <span>{globalError}</span>
                        {textLimit && !preview ? (
                            <span className="wfui-form-char-count">
                                {`${
                                    input && input.value
                                        ? input.value.length
                                        : 0
                                } / ${textLimit} characters`}
                            </span>
                        ) : null}
                    </HelpBlock>
                )}
                {!(touched && (error || globalError)) &&
                textLimit &&
                !preview ? (
                    <span className="wfui-form-char-count">
                        {`${
                            input && input.value ? input.value.length : 0
                        } / ${textLimit} characters`}
                    </span>
                ) : null}
                {help && !preview && (
                    <HelpBlock className="wfui-form-help">
                        <div dangerouslySetInnerHTML={{ __html: help }} />
                    </HelpBlock>
                )}
            </FormGroup>
            {descDisplay && !preview ? cloneElement(descDisplay) : ''}
        </div>
    );

export default renderTextArea;
