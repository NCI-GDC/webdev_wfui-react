/* global FileReader */
/* eslint react/prop-types : 0 */
import React from 'react';
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
    globalError,
    meta: { touched, error },
    rows,
}) => (
    <div
        className={classNames(
            className,
            'wfui-form-item',
            { 'wfui-form-item-error': error || globalError },
            { 'wfui-form-disabled': disabled },
            { answered: input.value },
        )}
    >
        <ControlLabel>{label}</ControlLabel>
        {required && <b className="required"> *</b>}
        <FormGroup
            className="wfui-form-textarea"
            validationState={touched && (error || globalError) ? 'error' : null}
        >
            <FormControl
                {...input}
                type={type}
                placeholder={
                    placeholder || placeholder === '' ? placeholder : label
                }
                disabled={disabled}
                onChange={e => {
                    input.onChange(e);
                    if (onHandleChange) onHandleChange(e);
                }}
                componentClass="textarea"
                rows={disabled ? 0 : (rows || 5)}
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
                <div
                    className="wfui-form-description"
                    dangerouslySetInnerHTML={{ __html: help }}
                />
            )}
        </FormGroup>
    </div>
);

export default renderTextArea;
