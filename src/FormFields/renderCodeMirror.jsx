/* eslint react/prop-types : 0 */
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
    FormGroup,
    ControlLabel,
    HelpBlock,
    ReactCodeMirror,
} from '../';

const { Controlled: CodeMirror } = ReactCodeMirror;

class renderCodeMirror extends React.Component {
    constructor(props) {
        super();
        this.onHandleChange = this.onHandleChange.bind(this);
    }

    onHandleChange(editor, data, value) {
        const { input } = this.props;
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
            meta: { touched, error },
            onCursor,
            help,
            defaultValue,
        } = this.props;

        return (
            <div
                className={classNames(
                    className,
                    'wfui-form-item',
                    {
                        'wfui-form-item-error': error,
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
                            ? 'wfui-form-field-with-description'
                            : 'wfui-form-field-no-description'
                        } wfui-form-date`}
                    validationState={touched && error ? 'error' : null}
                >
                    {!disabled ? (
                        <div className="wfui-quill">
                            <CodeMirror
                                value={input.value || defaultValue}
                                options={{
                                    lineWrapping: true,
                                    lineNumbers: true,
                                }}
                                onBeforeChange={this.onHandleChange}
                                onCursor={onCursor}
                            />
                        </div>
                    ) : (
                            <p className="wfui-value">{input.value}</p>
                        )}
                    {touched && error && (
                        <HelpBlock className="wfui-form-error">
                            <span>{error}</span>
                        </HelpBlock>
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
