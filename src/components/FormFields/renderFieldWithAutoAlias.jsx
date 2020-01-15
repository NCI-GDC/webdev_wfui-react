/* global FileReader */
/* eslint react/prop-types : 0 */
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import classNames from 'classnames';
import {
    Form,
    FormFields,
    FormGroup,
    FormControl,
    ControlLabel,
    HelpBlock,
} from '../index';

import Field from './Field';
import renderSingleCheckbox from './renderSingleCheckbox';

/**
 * Reusable field component.
 */
class renderFieldWithAutoAlias extends React.Component {
    renderAutoAlias() {
        const { input, onHandleAliasChecked, autoAliasText } = this.props;

        return (
            <Field
                name={`${input.name}.alias`}
                type="checkbox"
                component={renderSingleCheckbox}
                option={autoAliasText}
                onChange={onHandleAliasChecked}
                placeholder=""
            />
        );
    }

    render() {
        const {
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
            preview,
            globalError,
            descDisplay,
            meta: { touched, error, data },
            fullWidth,
        } = this.props;

        return (
            <div
                className={classNames(
                    className,
                    'wfui-form-item',
                    {
                        'wfui-form-item-error':
                            touched && (error || globalError),
                    },
                    {
                        'wfui-form-item-warning': touched && data.warning,
                    },
                    { 'wfui-form-inline': inline },
                    { 'wfui-form-disabled': disabled },
                    { 'wfui-form-preview': preview },
                    { answered: input.value },
                    { 'wfui-form-item-full-width': fullWidth }
                )}
            >
                {label && (
                    <div className="wfui-form-label wfui-form-autoalias-label">
                        <ControlLabel>
                            {label}
                            {required && <b className="required"> *</b>}
                        </ControlLabel>
                    </div>
                )}

                <FormGroup
                    className={`wfui-form-field ${
                        descDisplay
                            ? 'wfui-form-field-with-description'
                            : 'wfui-form-field-no-description'
                        } wfui-form-input`}
                    validationState={
                        touched && (error || globalError) ? 'error' : null
                    }
                >
                    <FormControl
                        {...input}
                        value={input.value && input.value.value}
                        name={`${input.name}.value`}
                        placeholder={
                            placeholder || placeholder === ''
                                ? placeholder
                                : label
                        }
                        type={type}
                        maxLength={maxlength}
                        min={min}
                        max={max}
                        disabled={
                            disabled || (input.value && input.value.alias)
                        }
                        onBlur={e => {
                            input.onBlur(
                                Object.assign(
                                    {},
                                    {
                                        alias: input.value.alias,
                                        value: input.value.value,
                                    },
                                    {
                                        value: e.target.value,
                                    }
                                )
                            );
                        }}
                        onChange={e => {
                            input.onChange(
                                Object.assign(
                                    {},
                                    {
                                        alias: input.value.alias,
                                        value: input.value.value,
                                    },
                                    {
                                        value: e.target.value,
                                    }
                                )
                            );
                            if (onHandleChange) onHandleChange(e);
                        }}
                        isInvalid={touched && (error || globalError)}
                        isValid={touched && data.warning}
                        className={classNames({
                            'is-valid-warning': touched && data.warning,
                        })}
                    />
                    {postfix && (
                        <div className="wfui-form-postfix">{postfix}</div>
                    )}
                    {!disabled && this.renderAutoAlias()}
                    {touched && error && (
                        <Form.Control.Feedback
                            className="wfui-form-error"
                            type="invalid"
                        >
                            {Array.isArray(error)
                                ? error.map(item => <div>{item}</div>)
                                : error}
                        </Form.Control.Feedback>
                    )}
                    {touched && globalError && (
                        <Form.Control.Feedback
                            className="wfui-form-error"
                            type="invalid"
                        >
                            <span>{Array.isArray(globalError) ? globalError.join(', ') : globalError}</span>
                        </Form.Control.Feedback>
                    )}
                    {touched && data.warning && (
                        <Form.Control.Feedback
                            className="wfui-form-warning"
                            type="valid"
                        >
                            {Array.isArray(data.warning)
                                ? data.warning.map(item => <div>{item}</div>)
                                : data.warning}
                        </Form.Control.Feedback>
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
    }
}

renderFieldWithAutoAlias.propTypes = {
    autoAliasText: PropTypes.string,
};

renderFieldWithAutoAlias.defaultProps = {
    autoAliasText: 'Automatic alias',
};

export default injectIntl(renderFieldWithAutoAlias);