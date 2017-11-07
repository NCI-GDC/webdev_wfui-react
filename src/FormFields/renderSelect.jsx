/* global FileReader */
/* eslint react/prop-types : 0 */
import React from 'react';
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
    globalError,
    meta: { touched, error },
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
            className="wfui-form-select"
            validationState={touched && (error || globalError) ? 'error' : null}
        >
            <FormControl
                {...input}
                onChange={input.onChange}
                componentClass="select"
            >
                {options.map((option, i) => {
                    const _key =
                        typeof option === 'string' ? option : option.key;
                    const _option =
                        typeof option === 'string' ? option : option.value;
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
            {help && (
                <div
                    className="wfui-form-description"
                    dangerouslySetInnerHTML={{ __html: help }}
                />
            )}
        </FormGroup>
    </div>
);

export default renderSelect;
