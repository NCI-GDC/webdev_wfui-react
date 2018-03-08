/* global FileReader */
/* eslint react/prop-types : 0 */
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from '../index';

const renderSelect = ({
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
    meta: { touched, error },
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
            {label && (
                <ControlLabel>
                    {label}
                    {required && <b className="required"> *</b>}
                </ControlLabel>
            )}
        </div>
        <FormGroup
            className={`wfui-form-field ${
                descDisplay ? 'wfui-form-field-with-desctipton' : ''
            } wfui-form-select`}
            validationState={touched && (error || globalError) ? 'error' : null}
        >
            <FormControl {...input} onChange={input.onChange} componentClass="select">
                {options.map((option, i) => {
                    const _key = typeof option === 'string' ? option : option.key;
                    const _option = typeof option === 'string' ? option : option.value;
                    return (
                        <option
                            key={i}
                            name={input.name}
                            value={_key}
                            disabled={disabled}
                            onChange={e => input.onChange(e.target.value)}
                        >
                            {_option}
                        </option>
                    );
                })}
            </FormControl>
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

export default renderSelect;
