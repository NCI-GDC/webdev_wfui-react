/* global FileReader */
/* eslint react/prop-types : 0 */
import React, { cloneElement } from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, FormControl, ControlLabel, HelpBlock } from '../index';

class renderPhoto extends React.Component {
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
            disabled,
            preview,
            descDisplay,
            meta: { touched, error },
        } = this.props;
        const { value } = this.state;

        return value ? (
            <div
                className={classNames(
                    className,
                    'wfui-form-item',
                    {
                        'wfui-form-item-error': error,
                    },
                    { 'wfui-form-disabled': disabled },
                    { 'wfui-form-preview': preview },
                )}
            >
                <div className="wfui-form-label">
                    {label && <ControlLabel>{label}</ControlLabel>}
                    {required && <b className="required"> *</b>}
                </div>
                <div
                    className={`wfui-form-field ${
                        descDisplay ? 'wfui-form-field-with-desctipton' : ''
                    } wfui-form-photo file-chosen`}
                >
                    <p className="image-preview">
                        <img style={{ height: 100 }} src={value.src} />
                    </p>
                    <p className="image-alt">
                        <FormControl
                            value={value.title}
                            placeholder={placeholder || placeholder === '' ? placeholder : label}
                            type={type}
                            maxLength={maxlength}
                            onChange={(e) => {
                                const newValue = Object.assign({}, value, {
                                    title: e.target.value,
                                });
                                this.setState({ value: newValue });
                                onStateChange(newValue);
                                input.onChange(newValue);
                            }}
                            disabled={disabled}
                        />
                    </p>
                    {!disabled && (
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
                    )}
                </div>
                {descDisplay ? cloneElement(descDisplay) : ''}
            </div>
        ) : (
            <div className={classNames(className, 'wfui-form-item')}>
                <div className="wfui-form-label">
                    {label && <ControlLabel>{label}</ControlLabel>}
                    {required && <b className="required"> *</b>}
                </div>
                <Dropzone
                    {...input}
                    name={input.name}
                    accept={'image/png,image/jpeg,image/pjpeg,image/gif'}
                    className={`wfui-form-field ${
                        descDisplay ? 'wfui-form-field-with-desctipton' : ''
                    } wfui-form-photo choose-file`}
                    onDrop={(acceptedFiles) => {
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
                    <div className="wfui-form-help" dangerouslySetInnerHTML={{ __html: help }} />
                )}
                {descDisplay ? cloneElement(descDisplay) : ''}
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

export default renderPhoto;
