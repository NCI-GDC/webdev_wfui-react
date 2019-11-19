/* global FileReader */
/* eslint react/prop-types : 0 */
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TagsInput from 'react-tagsinput';

import { FormGroup, ControlLabel, HelpBlock } from '../index';

class renderTags extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: props.input.value || [],
            suggestions: props.suggestions || [],
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(tags) {
        const { input, onChange } = this.props;
        this.setState({ tags });
        input.onChange(tags);
        if (typeof onChange === 'function') onChange(tags);
    }

    render() {
        const {
            className,
            label,
            input,
            placeholder,
            help,
            globalError,
            required,
            withContext,
            disabled,
            preview,
            descDisplay,
            fullWidth,
            meta: { touched, error },
        } = this.props;
        const { suggestions, tags } = this.state;

        return (
            <div
                className={classNames(
                    className,
                    'wfui-form-item',
                    { 'wfui-form-item-error': touched && error },
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
                        } wfui-form-tags`}
                    validationState={touched && error ? 'error' : null}
                >
                    {disabled ? (
                        <div>
                            {input.value ? (
                                <ul>
                                    {input.value.map((tag, i) => (
                                        <li key={i}>{tag}</li>
                                    ))}
                                </ul>
                            ) : (
                                    <span className="no-item">( No Items )</span>
                                )}
                        </div>
                    ) : (
                            <TagsInput value={tags} onChange={this.handleChange} />
                        )}

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
renderTags.propTypes = {
    placeholder: PropTypes.string,
    withContext: PropTypes.bool,
    descDisplay: PropTypes.element,
    fullWidth: PropTypes.bool,
};
renderTags.defaultProps = {
    placeholder: 'Add keyword',
    fullWidth: false,
};

export default renderTags;
