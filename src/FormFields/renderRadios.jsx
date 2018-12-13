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
    fullWidth,
    booleanValue,
    meta: { touched, error },
}) => (
    <div
        className={classNames(
            className,
            'wfui-form-item',
            {
                'wfui-form-item-error': touched && (error || globalError),
            },
            { 'wfui-form-disabled': disabled },
            { 'wfui-form-preview': preview },
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
            } wfui-form-radios`}
            validationState={touched && (error || globalError) ? 'error' : null}
        >
            {options.map((option, i) => {
                const _key =
                    typeof option === 'string' || typeof option === 'number'
                        ? option
                        : option.key;
                const _option =
                    typeof option === 'string' || typeof option === 'number'
                        ? option
                        : option.value;

                let checked = input.value == _key;
                if (typeof input.value === 'boolean') {
                    checked = _key === (input.value ? 'true' : 'false');
                }

                return (
                    <Radio
                        className={checked ? 'active' : ''}
                        key={i}
                        name={input.name}
                        value={_key}
                        checked={checked}
                        disabled={disabled}
                        onClick={e => {
                            if (
                                booleanValue &&
                                (e.target.value === 'true' ||
                                    e.target.value === 'false')
                            ) {
                                input.onChange(e.target.value === 'true');
                            } else {
                                input.onChange(e.target.value);
                            }
                        }}
                    >
                        {_option}
                    </Radio>
                );
            })}
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

export default renderRadios;
