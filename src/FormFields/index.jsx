/* global FileReader */
/* eslint react/prop-types : 0 */
import React from 'react';
import Dropzone from 'react-dropzone';
import TimezonePicker from 'react-timezone';
import { Button, FormGroup, FormControl, ControlLabel, HelpBlock, Checkbox, Radio, Glyphicon } from '../index';
import Draggable from '../Draggable/Draggable';

/**
 * Reusable field component.
 */
export const renderField = ({ input, label, help, placeholder, type, onHandleChange, required, disabled, meta: { touched, error } }) => (
    <div className="wfui-form-item">
        <ControlLabel>{label}</ControlLabel>{required && <b style={{ color: 'red' }}> *</b>}
        <FormGroup className="wfui-form-input" validationState={touched && error ? 'error' : null}>
            <FormControl
                    {...input} placeholder={placeholder || label} type={type}
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

export const renderTextArea = ({ input, label, help, placeholder, type, onHandleChange, required, disabled, meta: { touched, error }, rows }) => (
    <div className="wfui-form-item">
        <ControlLabel>{label}</ControlLabel>{required && <b style={{ color: 'red' }}> *</b>}
        <FormGroup className="wfui-form-textarea" validationState={touched && error ? 'error' : null}>
            <FormControl
                    {...input}
                    type={type}
                    placeholder={placeholder || label}
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

export const renderSingleCheckbox = ({ label, option, input, help, required, meta: { touched, error } }) => (
    <div className="wfui-form-item">
        {label && <ControlLabel>{label}</ControlLabel>}{required && <b style={{ color: 'red' }}> *</b>}
        <FormGroup validationState={touched && error ? 'error' : null}>
            <Checkbox {...input}>
                {option} {required && <b style={{ color: 'red' }}>*</b>}
            </Checkbox>
            <HelpBlock>{touched && error && <span>{error}</span>}</HelpBlock>
            {help && <div className="form-description" dangerouslySetInnerHTML={{ __html: help }} />}
        </FormGroup>
    </div>
);

export const renderCheckboxs = ({ label, options, input, help, required, disabled, meta: { touched, error } }) => (
    <div className="wfui-form-item">
        <ControlLabel>{label}</ControlLabel>{required && <b style={{ color: 'red' }}> *</b>}
        <FormGroup className="wfui-form-checkboxes" validationState={touched && error ? 'error' : null}>
            {options.map((option, i) => (
                <Checkbox
                    key={i}
                    name={input.name}
                    value={option}
                    disabled={disabled}
                    checked={input.value && input.value.includes(option)}
                    onChange={(e) => {
                        const newValue = [...input.value];
                        if (e.target.checked) {
                            newValue.push(option);
                        } else {
                            newValue.splice(newValue.indexOf(option), 1);
                        }
                        return input.onChange(newValue);
                    }}
                >
                    {option}
                </Checkbox>
            ))}
            <HelpBlock> {touched && error && <span>{error}</span>} </HelpBlock>
            {help && <div className="wfui-form-description" dangerouslySetInnerHTML={{ __html: help }} />}
        </FormGroup>
    </div>
);

export const renderRadios = ({ label, options, input, help, required, disabled, meta: { touched, error } }) => (
    <div className="wfui-form-item">
        <ControlLabel>{label}</ControlLabel>{required && <b style={{ color: 'red' }}> *</b>}
        <FormGroup className="wfui-form-radios" validationState={touched && error ? 'error' : null}>
            {options.map((option, i) => (
                <Radio
                    key={i}
                    name={input.name}
                    value={option}
                    disabled={disabled}
                    onClick={e => (input.onChange(e.target.value))}
                >
                    {option}
                </Radio>
            ))}
            <HelpBlock> {touched && error && <span>{error}</span>} </HelpBlock>
            {help && <div className="wfui-form-description" dangerouslySetInnerHTML={{ __html: help }} />}
        </FormGroup>
    </div>
);

export const renderSelect = ({ label, options, input, help, required, disabled, meta: { touched, error } }) => (
    <div className="wfui-form-item">
        <ControlLabel>{label}</ControlLabel>{required && <b style={{ color: 'red' }}> *</b>}
        <FormGroup className="wfui-form-radios" validationState={touched && error ? 'error' : null}>
            <FormControl {...input} onChange={input.onChange} componentClass="select">
            {options.map((option, i) => (
                <option
                    key={i}
                    name={input.name}
                    value={option}
                    onChange={e => (input.onChange(e.target.value))}
                >
                    {option}
                </option>
            ))}
            </FormControl>
            <HelpBlock> {touched && error && <span>{error}</span>} </HelpBlock>
            {help && <div className="wfui-form-description" dangerouslySetInnerHTML={{ __html: help }} />}
        </FormGroup>
    </div>
);

export class renderAddAnother extends React.Component {
    render() {
        const { fields, childComponent, draggable, label, help, required, disabled, meta: { touched, error } } = this.props;
        return (
            <div className="wfui-form-item">
                <ControlLabel>{label}</ControlLabel>{required && <b style={{ color: 'red' }}> *</b>}
                <FormGroup className="wfui-form-radios" validationState={touched && error ? 'error' : null}>
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
                    <Button bsStyle="primary" onClick={() => { fields.push(); }}>Add Another Item</Button>
                    <HelpBlock> {touched && error && <span>{error}</span>} </HelpBlock>
                    {help && <div className="wfui-form-description" dangerouslySetInnerHTML={{ __html: help }} />}
                </FormGroup>
            </div>
        );
    }
}


export const renderTimezone = ({ label, placeholder, input, help, required, meta: { touched, error } }) => (
    <div>
        <ControlLabel>{label}</ControlLabel>{required && <b style={{ color: 'red' }}> *</b>}
        <FormGroup validationState={touched && error ? 'error' : null}>
            <TimezonePicker
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

export const renderPhoto = ({ input, label, required, help, meta: { touched, error } }) => {
    return (
        input.value ?
        <div>
            <ControlLabel>{label}</ControlLabel>{required && <b style={{ color: 'red' }}> *</b>}
            <p>
                <img
                    style={{ height: 100 }}
                    src={input.value}
                />
            </p>
            <div>
                <Button onClick={() => { input.onChange(''); this.setState({ hasFile: false }); }}>
                    Remove Image
                </Button>
            </div>
        </div> :
        <div>
            <ControlLabel>{label}</ControlLabel>{required && <b style={{ color: 'red' }}> *</b>}
            <Dropzone
                {...input}
                name={input.name}
                style={{
                    width: '300px',
                    height: '45px',
                    padding: '5px',
                    borderWidth: '1px',
                    borderColor: '#aaa',
                    borderStyle: 'dotted',
                    borderRadius: '1px',
                }}
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
            {help && <div className="form-description" dangerouslySetInnerHTML={{ __html: help }} />}
        </div>
    );
};
