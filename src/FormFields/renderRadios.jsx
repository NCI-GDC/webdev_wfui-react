import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormGroup, ControlLabel, HelpBlock, Radio } from '../index';

const renderRadios = ({
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
            {
                'wfui-form-item-error': error || globalError,
            },
            { 'wfui-form-disabled': disabled },
            { 'wfui-form-preview': preview },
        )}
    >
        <div className="wfui-form-label">
            {label && <ControlLabel>{label}</ControlLabel>}
            {required && <b className="required"> *</b>}
        </div>
        <FormGroup
            className={`wfui-form-field ${
                descDisplay ? 'wfui-form-field-with-desctipton' : ''
            } wfui-form-radios`}
            validationState={touched && (error || globalError) ? 'error' : null}
        >
            {options.map((option, i) => {
                const _key = typeof option === 'string' ? option : option.key;
                const _option = typeof option === 'string' ? option : option.value;
                return (
                    <Radio
                        className={input.value === _key ? 'active' : ''}
                        key={i}
                        name={input.name}
                        value={_key}
                        checked={input.value === _key}
                        disabled={disabled}
                        onClick={e => input.onChange(e.target.value)}
                    >
                        {_option}
                    </Radio>
                );
            })}
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

export default renderRadios;
