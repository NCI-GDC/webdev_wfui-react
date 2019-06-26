/* global FileReader */
/* eslint react/prop-types : 0 */
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import classNames from 'classnames';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import {
    FormFields,
    FormGroup,
    FormControl,
    ControlLabel,
    HelpBlock,
} from '../index';

const { renderSingleCheckbox } = FormFields;

/**
 * Reusable field component.
 */
class renderFieldWithAutoAlias extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
        const { input } = this.props;
    }

    renderAutoAlias() {
        const { input, intl, onHandleAliasChecked } = this.props;

        return (
            <Field
                name={`${input.name}.alias`}
                type="checkbox"
                component={renderSingleCheckbox}
                option={intl.formatMessage({
                    id: 'content_manager.columnLabels.published_autoalias',
                })}
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
            meta: { touched, error },
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
                        {this.renderAutoAlias()}
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
                        onChange={e => {
                            input.onChange({
                                ...input.value,
                                value: e.target.value,
                            });
                            if (onHandleChange) onHandleChange(e);
                        }}
                    />
                    {postfix && (
                        <div className="wfui-form-postfix">{postfix}</div>
                    )}
                    <FormControl.Feedback />
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
    }
}

export default injectIntl(renderFieldWithAutoAlias);
