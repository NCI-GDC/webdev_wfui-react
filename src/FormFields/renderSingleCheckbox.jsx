import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormGroup, ControlLabel, HelpBlock, Checkbox } from '../index';

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
            { 'wfui-form-item-error': error || globalError },
            { 'wfui-form-disabled': disabled },
            { 'wfui-form-preview': preview },
            { 'wfui-form-item-full-width': fullWidth },
        )}
    >
        <div className="wfui-form-label">{label && <ControlLabel>{label}</ControlLabel>}</div>
        <FormGroup
            className={`wfui-form-field ${
                descDisplay ? 'wfui-form-field-with-desctipton' : 'wfui-form-field-no-desctipton'
            } wfui-form-single-checkbox`}
            validationState={touched && (error || globalError) ? 'error' : null}
        >
            <Checkbox className={input.checked ? 'active' : ''} {...input} disabled={disabled}>
                {option} {required && <b className="required">*</b>}
            </Checkbox>
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

export default renderSingleCheckbox;
