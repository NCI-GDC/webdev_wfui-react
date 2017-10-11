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

export class renderAddAnother extends React.Component {
    render() {
        const {
            className,
            fields,
            childComponent,
            draggable,
            label,
            help,
            required,
            disabled,
            withoutDnDContext,
            meta: { error },
        } = this.props;

        const Comp = withoutDnDContext ? DraggableWithoutContext : Draggable;

        return (
            <div
                className={classNames(className, 'wfui-form-item', {
                    'wfui-form-item-error': error,
                })}
            >
                <ControlLabel>{label}</ControlLabel>
                {required && <b className="required"> *</b>}
                <FormGroup
                    className="wfui-form-addAnother"
                    validationState={error ? 'error' : null}
                >
                    {!disabled &&
                        draggable &&
                        fields.length > 0 && (
                            <Comp
                                onHandleItemMove={(from, to) => {
                                    fields.move(from, to);
                                    setTimeout(() => this.forceUpdate(), 1);
                                }}
                                onHandleEndDrag={() => {
                                    this.forceUpdate();
                                }}
                            >
                                {fields.map((field, i) => (
                                    <Comp.Item key={i} id={field}>
                                        <Comp.Handle>
                                            <Glyphicon
                                                glyph="fullscreen"
                                                style={{
                                                    transform: 'rotate(45deg)',
                                                }}
                                            />
                                        </Comp.Handle>
                                        {childComponent(field, i)}
                                        {!disabled && (
                                            <a
                                                className="delete-icon"
                                                onClick={() => fields.remove(i)}
                                            >
                                                Delete
                                            </a>
                                        )}
                                    </Comp.Item>
                                ))}
                            </Comp>
                        )}
                    {!draggable &&
                        fields.map((field, i) => (
                            <div>
                                {childComponent(field, i)}
                                {!disabled && (
                                    <a
                                        className="delete-icon"
                                        onClick={() => fields.remove(i)}
                                    >
                                        Delete
                                    </a>
                                )}
                            </div>
                        ))}
                    {!disabled && (
                        <Button
                            bsStyle="default"
                            className="add-btn"
                            onClick={() => {
                                fields.push();
                            }}
                        >
                            Add Another Item
                        </Button>
                    )}
                    {error && (
                        <HelpBlock className="wfui-form-error">
                            <span>{error}</span>
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
    }
}

export const renderTimezone = ({
    className,
    label,
    placeholder,
    input,
    help,
    required,
    meta: { touched, error },
}) => (
    <div
        className={classNames(className, 'wfui-form-item', {
            'wfui-form-item-error': error,
        })}
    >
        <ControlLabel>{label}</ControlLabel>
        {required && <b className="required"> *</b>}
        <FormGroup validationState={touched && error ? 'error' : null}>
            <TimezonePicker
                className="wfui-form-timezone"
                {...input}
                onChange={timezone => input.onChange(timezone)}
                inputProps={{
                    placeholder,
                }}
            />
            {touched &&
                error && (
                    <HelpBlock className="wfui-form-error">
                        <span>{error}</span>
                    </HelpBlock>
                )}
        </FormGroup>
    </div>
);

export class renderPhoto extends React.Component {
    constructor(props) {
        super();
        this.state = { value: props.input.value };
    }

    render() {
        const {
            className,
            input,
            label,
            required,
            help,
            placeholder,
            type,
            maxlength,
            onStateChange,
            meta: { touched, error },
        } = this.props;
        const { value } = this.state;

        return value ? (
            <div
                className={classNames(className, 'wfui-form-item', {
                    'wfui-form-item-error': error,
                })}
            >
                <ControlLabel>{label}</ControlLabel>
                {required && <b className="required"> *</b>}
                <div className="wfui-form-photo file-chosen">
                    <p className="image-preview">
                        <img style={{ height: 100 }} src={value.src} />
                    </p>
                    <p className="image-alt">
                        <FormControl
                            value={value.title}
                            placeholder={
                                placeholder || placeholder === ''
                                    ? placeholder
                                    : label
                            }
                            type={type}
                            maxLength={maxlength}
                            onChange={e => {
                                const newValue = Object.assign({}, value, {
                                    title: e.target.value,
                                });
                                this.setState({ value: newValue });
                                onStateChange(newValue);
                                input.onChange(newValue);
                            }}
                        />
                    </p>
                    <Button
                        className="btn-remove"
                        onClick={() => {
                            input.onChange();
                            onStateChange();
                            this.setState({ value: undefined });
                        }}
                    >
                        Remove Image
                    </Button>
                </div>
            </div>
        ) : (
            <div className={classNames(className, 'wfui-form-item')}>
                <ControlLabel>{label}</ControlLabel>
                {required && <b className="required"> *</b>}
                <Dropzone
                    {...input}
                    name={input.name}
                    className="wfui-form-photo choose-file"
                    onDrop={acceptedFiles => {
                        const reader = new FileReader();
                        reader.readAsDataURL(acceptedFiles[0]);
                        reader.onloadend = () => {
                            const newValue = Object.assign({}, value, {
                                src: reader.result,
                            });
                            this.setState({ value: newValue });
                            onStateChange(newValue);
                            return input.onChange(newValue);
                        };
                        this.setState({ hasFile: true });
                    }}
                >
                    Choose File
                </Dropzone>
                {touched &&
                    error && (
                        <HelpBlock className="wfui-form-error">
                            <span>{error}</span>
                        </HelpBlock>
                    )}
                {help && (
                    <div
                        className="wfui-form-description"
                        dangerouslySetInnerHTML={{ __html: help }}
                    />
                )}
            </div>
        );
    }
}
renderPhoto.propTypes = {
    onStateChange: PropTypes.func,
};
renderPhoto.defaultProps = {
    onStateChange: f => f,
};

export renderTableFormat from './renderTableFormat';
export renderSelectionHybridCheckbox from './renderSelectionHybridCheckbox';
export renderSelectionHybridRadio from './renderSelectionHybridRadio';
export renderFilterTable from './renderFilterTable';
export renderAutocomplete from './renderAutocomplete';
