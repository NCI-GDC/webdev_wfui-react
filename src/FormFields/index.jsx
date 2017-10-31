/* global FileReader */
/* eslint react/prop-types : 0 */
import React from 'react';
import Dropzone from 'react-dropzone';
import TimezonePicker from 'react-timezone';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
    Draggable,
    DraggableWithoutContext,
    Button,
    FormGroup,
    FormControl,
    ControlLabel,
    HelpBlock,
    Checkbox,
    Radio,
    Glyphicon,
} from '../index';

/**
 * Reusable field component.
 */
export const renderField = ({
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
    globalError,
    meta: { touched, error },
}) => (
    <div
        className={classNames(
            className,
            'wfui-form-item',
            { 'wfui-form-item-error': error || globalError },
            { 'wfui-form-inline': inline },
            { answered: input.value },
        )}
    >
        <ControlLabel>{label}</ControlLabel>
        {required && <b className="required"> *</b>}
        <FormGroup
            className="wfui-form-input"
            validationState={touched && (error || globalError) ? 'error' : null}
        >
            <FormControl
                {...input}
                placeholder={
                    placeholder || placeholder === '' ? placeholder : label
                }
                type={type}
                maxLength={maxlength}
                min={min}
                max={max}
                disabled={disabled}
                onChange={e => {
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
            {help && (
                <div
                    className="wfui-form-description"
                    dangerouslySetInnerHTML={{ __html: help }}
                />
            )}
        </FormGroup>
    </div>
);

export const renderTextArea = ({
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
                rows={rows || 5}
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

export const renderSingleCheckbox = ({
    className,
    label,
    option,
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
            'wfui-form-item wfui-form-singlecheckbox',
            { 'wfui-form-item-error': error || globalError },
        )}
    >
        {label && <ControlLabel>{label}</ControlLabel>}
        <FormGroup
            validationState={touched && (error || globalError) ? 'error' : null}
        >
            <Checkbox
                className={input.checked ? 'active' : ''}
                {...input}
                disabled={disabled}
            >
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
            {help && (
                <div
                    className="wfui-form-description"
                    dangerouslySetInnerHTML={{ __html: help }}
                />
            )}
        </FormGroup>
    </div>
);

export const renderCheckboxs = ({
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
        className={classNames(className, 'wfui-form-item', {
            'wfui-form-item-error': error || globalError,
        })}
    >
        <ControlLabel>{label}</ControlLabel>
        {required && <b className="required"> *</b>}
        <FormGroup
            className="wfui-form-checkboxes"
            validationState={touched && (error || globalError) ? 'error' : null}
        >
            {options.map((option, i) => {
                const _key = typeof option === 'string' ? option : option.key;
                const _option =
                    typeof option === 'string' ? option : option.value;
                return (
                    <Checkbox
                        key={i}
                        name={input.name}
                        value={_key}
                        disabled={disabled}
                        checked={input.value && input.value.includes(_key)}
                        className={
                            input.value && input.value.includes(_key)
                                ? 'active'
                                : ''
                        }
                        onChange={e => {
                            const newValue = [...input.value];
                            if (e.target.checked) {
                                newValue.push(_key);
                            } else {
                                newValue.splice(newValue.indexOf(_key), 1);
                            }
                            return input.onChange(newValue);
                        }}
                    >
                        {_option}
                    </Checkbox>
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
                <div
                    className="wfui-form-description"
                    dangerouslySetInnerHTML={{ __html: help }}
                />
            )}
        </FormGroup>
    </div>
);

// export const renderCheckboxes = renderCheckboxs;

export const renderRadios = ({
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
        className={classNames(className, 'wfui-form-item', {
            'wfui-form-item-error': error || globalError,
        })}
    >
        <ControlLabel>{label}</ControlLabel>
        {required && <b className="required"> *</b>}
        <FormGroup
            className="wfui-form-radios"
            validationState={touched && (error || globalError) ? 'error' : null}
        >
            {options.map((option, i) => {
                const _key = typeof option === 'string' ? option : option.key;
                const _option =
                    typeof option === 'string' ? option : option.value;
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
                <div
                    className="wfui-form-description"
                    dangerouslySetInnerHTML={{ __html: help }}
                />
            )}
        </FormGroup>
    </div>
);

export const renderSelect = ({
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

export renderTableFormat from './renderTableFormat';
export renderSelectionHybridCheckbox from './renderSelectionHybridCheckbox';
export renderSelectionHybridRadio from './renderSelectionHybridRadio';
export renderFilterTable from './renderFilterTable';
export renderAutocomplete from './renderAutocomplete';
export renderAddAnother from './renderAddAnother';
export renderTimezone from './renderTimezone';
export renderPhoto from './renderPhoto';
export renderTags from './renderTags';