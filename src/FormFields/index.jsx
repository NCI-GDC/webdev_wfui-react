/* global FileReader */
/* eslint react/prop-types : 0 */
import React from 'react';
import Dropzone from 'react-dropzone';
import TimezonePicker from 'react-timezone';
import classNames from 'classnames';
import { Button, FormGroup, FormControl, ControlLabel, HelpBlock, Checkbox, Radio, Glyphicon } from '../index';
import Draggable from '../Draggable/Draggable';

/**
 * Reusable field component.
 */
export const renderField = ({ className, input, label, help, placeholder, type, onHandleChange, required, disabled, meta: { touched, error } }) => (
    <div className={classNames(className, 'wfui-form-item', { 'wfui-form-item-error': error })} >
        <ControlLabel>{label}</ControlLabel>{required && <b className="required"> *</b>}
        <FormGroup className="wfui-form-input" validationState={touched && error ? 'error' : null}>
            <FormControl
                    {...input} placeholder={placeholder || placeholder === '' ? placeholder : label} type={type}
                    disabled={disabled}
                    onChange={(e) => {
                        input.onChange(e);
                        if (onHandleChange) onHandleChange(e);
                    }}
            />
            <FormControl.Feedback />
            <HelpBlock> {touched && error && <span>{error}</span>} </HelpBlock>
            {help && <div className="wfui-form-description" dangerouslySetInnerHTML={{ __html: help }} />}
        </FormGroup>
    </div>
);

export const renderTextArea = ({ className, input, label, help, placeholder, type, onHandleChange, required, disabled, meta: { touched, error }, rows }) => (
    <div className={classNames(className, 'wfui-form-item', { 'wfui-form-item-error': error })}>
        <ControlLabel>{label}</ControlLabel>{required && <b className="required"> *</b>}
        <FormGroup className="wfui-form-textarea" validationState={touched && error ? 'error' : null}>
            <FormControl
                    {...input}
                    type={type}
                    placeholder={placeholder || placeholder === '' ? placeholder : label}
                    disabled={disabled}
                    onChange={(e) => {
                        input.onChange(e);
                        if (onHandleChange) onHandleChange(e);
                    }}
                    componentClass="textarea"
                    rows={rows || 5}
            />
            <FormControl.Feedback />
            <HelpBlock>
                {touched && error && <span>{error}</span>}
            </HelpBlock>
            {help && <div className="wfui-form-description" dangerouslySetInnerHTML={{ __html: help }} />}
        </FormGroup>
    </div>
);

export const renderSingleCheckbox = ({ className, label, option, input, help, required, disabled, meta: { touched, error } }) => (
    <div className={classNames(className, 'wfui-form-item wfui-form-singlecheckbox', { 'wfui-form-item-error': error })}>
        {label && <ControlLabel>{label}</ControlLabel>}{required && <b className="required"> *</b>}
        <FormGroup validationState={touched && error ? 'error' : null}>
            <Checkbox className={input.checked ? 'active' : ''} {...input} disabled={disabled}>
                {option} {required && <b className="required">*</b>}
            </Checkbox>
            <HelpBlock>{touched && error && <span>{error}</span>}</HelpBlock>
            {help && <div className="wfui-form-description" dangerouslySetInnerHTML={{ __html: help }} />}
        </FormGroup>
    </div>
);

export const renderCheckboxs = ({ className, label, options, input, help, required, disabled, meta: { touched, error } }) => (
    <div className={classNames(className, 'wfui-form-item', { 'wfui-form-item-error': error })}>
        <ControlLabel>{label}</ControlLabel>{required && <b className="required"> *</b>}
        <FormGroup className="wfui-form-checkboxes" validationState={touched && error ? 'error' : null}>
            {options.map((option, i) => {
                const _key = typeof option === 'string' ? option : option.key;
                const _option = typeof option === 'string' ? option : option.value;
                return (
                    <Checkbox
                        key={i}
                        name={input.name}
                        value={_key}
                        disabled={disabled}
                        checked={input.value && input.value.includes(_key)}
                        className={input.value && input.value.includes(_key) ? 'active' : ''}
                        onChange={(e) => {
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
            <HelpBlock> {touched && error && <span>{error}</span>} </HelpBlock>
            {help && <div className="wfui-form-description" dangerouslySetInnerHTML={{ __html: help }} />}
        </FormGroup>
    </div>
);

export const renderCheckboxes = renderCheckboxs;

export const renderRadios = ({ className, label, options, input, help, required, disabled, meta: { touched, error } }) => (
    <div className={classNames(className, 'wfui-form-item', { 'wfui-form-item-error': error })}>
        <ControlLabel>{label}</ControlLabel>{required && <b className="required"> *</b>}
        <FormGroup className="wfui-form-radios" validationState={touched && error ? 'error' : null}>
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
                        onClick={e => (input.onChange(e.target.value))}
                    >
                        {_option}
                    </Radio>
                );
            })}
            <HelpBlock> {touched && error && <span>{error}</span>} </HelpBlock>
            {help && <div className="wfui-form-description" dangerouslySetInnerHTML={{ __html: help }} />}
        </FormGroup>
    </div>
);

export const renderSelect = ({ className, label, options, input, help, required, disabled, meta: { touched, error } }) => (
    <div className={classNames(className, 'wfui-form-item', { 'wfui-form-item-error': error })}>
        <ControlLabel>{label}</ControlLabel>{required && <b className="required"> *</b>}
        <FormGroup className="wfui-form-select" validationState={touched && error ? 'error' : null}>
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
                        onChange={e => (input.onChange(e.target.value))}
                    >
                        {_option}
                    </option>
                );
            })}
            </FormControl>
            <HelpBlock> {touched && error && <span>{error}</span>} </HelpBlock>
            {help && <div className="wfui-form-description" dangerouslySetInnerHTML={{ __html: help }} />}
        </FormGroup>
    </div>
);

export class renderAddAnother extends React.Component {
    render() {
        const { className, fields, childComponent, draggable, label, help, required, disabled, meta: { error } } = this.props;
        return (
            <div className={classNames(className, 'wfui-form-item', { 'wfui-form-item-error': error })}>
                <ControlLabel>{label}</ControlLabel>{required && <b className="required"> *</b>}
                <FormGroup className="wfui-form-addAnother" validationState={error ? 'error' : null}>
                    { draggable && fields.length > 0 &&
                        <Draggable
                            onHandleItemMove={(from, to) => {
                                fields.move(from, to);
                                setTimeout(() => this.forceUpdate(), 1);
                            }}
                            onHandleEndDrag={() => { this.forceUpdate(); }}
                        >
                                {fields.map((field, i) => (
                                    <Draggable.Item key={i} id={field}>
                                        <Draggable.Handle>
                                            <Glyphicon glyph="fullscreen" style={{ transform: 'rotate(45deg)' }} />
                                        </Draggable.Handle>
                                        {childComponent(field, i)}
                                    </Draggable.Item>
                                ))}
                        </Draggable>
                    }
                    { !draggable && fields.map(childComponent) }
                    <Button bsStyle="default" className="add-btn" onClick={() => { fields.push(); }}>Add Another Item</Button>
                    <HelpBlock> {error && <span>{error}</span>} </HelpBlock>
                    {help && <div className="wfui-form-description" dangerouslySetInnerHTML={{ __html: help }} />}
                </FormGroup>
            </div>
        );
    }
}


export const renderTimezone = ({ className, label, placeholder, input, help, required, meta: { touched, error } }) => (
    <div className={classNames(className, 'wfui-form-item', { 'wfui-form-item-error': error })}>
        <ControlLabel>{label}</ControlLabel>{required && <b className="required"> *</b>}
        <FormGroup validationState={touched && error ? 'error' : null}>
            <TimezonePicker
                className="wfui-form-timezone"
                {...input}
                onChange={timezone => input.onChange(timezone)}
                inputProps={{
                    placeholder,
                }}
            />
            <HelpBlock> {touched && error && <span>{error}</span>} </HelpBlock>
        </FormGroup>
    </div>
);

export const renderPhoto = ({ className, input, label, required, help, meta: { touched, error } }) => {
    return (
        input.value ?
        <div className={classNames(className, 'wfui-form-item', { 'wfui-form-item-error': error })}>
            <ControlLabel>{label}</ControlLabel>{required && <b className="required"> *</b>}
            <div className="wfui-form-photo file-chosen">
                <p className="image-preview">
                    <img
                        style={{ height: 100 }}
                        src={input.value}
                    />
                </p>
                <Button className="btn-remove" onClick={() => { input.onChange(''); this.setState({ hasFile: false }); }}>
                    Remove Image
                </Button>
            </div>
        </div> :
        <div className={classNames(className, 'wfui-form-item')}>
            <ControlLabel>{label}</ControlLabel>{required && <b className="required"> *</b>}
            <Dropzone
                {...input}
                name={input.name}
                className="wfui-form-photo choose-file"
                onDrop={(acceptedFiles) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(acceptedFiles[0]);
                    reader.onloadend = () => {
                        return input.onChange(reader.result);
                    }
                    this.setState({ hasFile: true });
                }}
            >
                Choose File
            </Dropzone>
            <HelpBlock>{touched && error && <span>{error}</span>}</HelpBlock>
            {help && <div className="wfui-form-description" dangerouslySetInnerHTML={{ __html: help }} />}
        </div>
    );
};
