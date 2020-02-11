/* eslint react/prop-types : 0 */
import _ from 'lodash';
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as ReactCodeMirror from 'react-codemirror2';

import { Form, FormGroup, ControlLabel, HelpBlock, FormControl } from '../index';

const { Controlled: CodeMirror } = ReactCodeMirror;

class renderCodeMirror extends React.Component {
    constructor(props) {
        super();
        this.onHandleChange = this.onHandleChange.bind(this);
        const initValue = props.input.value || props.defaultValue;
        this.state = { bodyText: initValue };
        props.input.onChange(initValue);
    }

    componentWillReceiveProps(nextProps) {
        const { input } = this.props;
        const { bodyText } = this.state;
        if (
            nextProps.input.value &&
            !_.isEqual(nextProps.input.value, bodyText)
        ) {
            this.setState({ bodyText: nextProps.input.value });
        }
    }

    onHandleChange(editor, data, value) {
        const { input } = this.props;
        this.setState({ bodyText: value });
        input.onChange(value);
    }

    render() {
        const {
            className,
            label,
            input,
            required,
            disabled,
            preview,
            descDisplay,
            fullWidth,
            globalError,
            meta: { touched, error, data },
            onCursor,
            help,
            defaultValue,
            showErrors
        } = this.props;

        const { bodyText } = this.state;

        return (
            <div
                className={classNames(
                    className,
                    'wfui-form-item',
                    {
                        'wfui-form-item-error': (touched || showErrors) && error,
                    },
                    {
                        'wfui-form-item-warning':
                            (touched || showErrors) && data && data.warning,
                    },
                    { 'wfui-form-disabled': disabled },
                    { 'wfui-form-preview': preview },
                    { 'wfui-form-item-full-width': fullWidth }
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
                            ? 'wfui-form-field-with-description'
                            : 'wfui-form-field-no-description'
                        } wfui-form-date`}
                // validationState={(touched || showErrors) && error ? 'error' : null}
                >
                    <FormControl
                        isInvalid={(this.touched || showErrors) && (error || globalError)}
                        isValid={(this.touched || showErrors) && data && data.warning}
                        className={classNames('d-none', 'custom-form-control', {
                            'is-valid-warning': (this.touched || showErrors) && data && data.warning,
                        })}
                    />
                    {!disabled ? (
                        <div className="wfui-quill">
                            <CodeMirror
                                value={bodyText}
                                options={{
                                    lineWrapping: true,
                                    lineNumbers: true,
                                }}
                                onBlur={(e) => { this.touched = true }}
                                onBeforeChange={this.onHandleChange}
                                onCursor={onCursor}
                            />
                        </div>
                    ) : (
                            <p className="wfui-value">{bodyText}</p>
                        )}
                    {(touched || showErrors) && error && (
                        <Form.Control.Feedback
                            className="wfui-form-error"
                            type="invalid"
                        >
                            {Array.isArray(error)
                                ? error.map(item => <div>{item}</div>)
                                : error}
                        </Form.Control.Feedback>
                    )}
                    {(touched || showErrors) && globalError && (
                        <Form.Control.Feedback
                            className="wfui-form-error"
                            type="invalid"
                        >
                            <span>
                                {Array.isArray(globalError)
                                    ? globalError.join(', ')
                                    : globalError}
                            </span>
                        </Form.Control.Feedback>
                    )}
                    {(touched || showErrors) && data && data.warning && (
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
                        <HelpBlock className="wfui-form-help">
                            <div dangerouslySetInnerHTML={{ __html: help }} />
                        </HelpBlock>
                    )}
                </FormGroup>
                {descDisplay && !preview ? cloneElement(descDisplay) : ''}
            </div>
        );
    }
}

renderCodeMirror.propTypes = {
    onCursor: PropTypes.func,
};
renderCodeMirror.defaultProps = {
    onCursor: f => f,
};

export default renderCodeMirror;
