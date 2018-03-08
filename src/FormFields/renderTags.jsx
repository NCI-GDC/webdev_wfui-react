/* global FileReader */
/* eslint react/prop-types : 0 */
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { WithContext as ReactTagsWithContext, WithOutContext as ReactTags } from 'react-tag-input';

import { FormGroup, ControlLabel, HelpBlock } from '../index';

class renderTags extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: this.transformSubmissionToForm(props.input.value || []),
            suggestions: props.suggestions || [],
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    transformTagsToSubmission(tags) {
        return tags.map(tag => tag.text);
    }

    transformSubmissionToForm(values) {
        return values.map((value, i) => ({ id: i, text: value }));
    }

    handleDelete(i) {
        const { input } = this.props;
        const tags = this.state.tags;
        tags.splice(i, 1);
        this.setState({ tags });
        input.onChange(this.transformTagsToSubmission(tags));
    }

    handleAddition(tag) {
        const { input } = this.props;
        const tags = this.state.tags;
        tags.push({
            id: tags.length + 1,
            text: tag,
        });
        this.setState({ tags });
        input.onChange(this.transformTagsToSubmission(tags));
    }

    handleDrag(tag, currPos, newPos) {
        const { input } = this.props;
        const tags = this.state.tags;

        // mutate array
        tags.splice(currPos, 1);
        tags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags });
        input.onChange(this.transformTagsToSubmission(tags));
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
            meta: { touched, error },
        } = this.props;
        const { suggestions, tags } = this.state;

        const Comp = withContext ? ReactTagsWithContext : ReactTags;

        return (
            <div
                className={classNames(
                    className,
                    'wfui-form-item',
                    { 'wfui-form-item-error': error },
                    { 'wfui-form-disabled': disabled },
                    { 'wfui-form-preview': preview },
                )}
            >
                <div className="wfui-form-label">
                    {label && (
                        <ControlLabel>
                            {label}
                            {required && <b className="required"> *</b>}
                        </ControlLabel>
                    )}
                </div>
                <FormGroup
                    className={`wfui-form-field ${
                        descDisplay
                            ? 'wfui-form-field-with-desctipton'
                            : 'wfui-form-field-no-desctipton'
                    } wfui-form-tags`}
                    validationState={touched && error ? 'error' : null}
                >
                    {disabled ? (
                        <div>
                            {input.value && (
                                <ul>{input.value.map((tag, i) => <li key={i}>{tag}</li>)}</ul>
                            )}
                        </div>
                    ) : (
                        <Comp
                            tags={tags}
                            suggestions={suggestions}
                            handleDelete={this.handleDelete}
                            handleAddition={this.handleAddition}
                            handleDrag={this.handleDrag}
                            placeholder={placeholder}
                            name={input.name}
                        />
                    )}
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
                            className="wfui-form-help"
                            dangerouslySetInnerHTML={{ __html: help }}
                        />
                    )}
                </FormGroup>
                {descDisplay ? cloneElement(descDisplay) : ''}
            </div>
        );
    }
}
renderTags.propTypes = {
    placeholder: PropTypes.string,
    withContext: PropTypes.bool,
    descDisplay: PropTypes.element,
};
renderTags.defaultProps = {
    placeholder: 'Add keyword',
};

export default renderTags;
