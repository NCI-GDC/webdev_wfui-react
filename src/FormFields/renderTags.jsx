/* global FileReader */
/* eslint react/prop-types : 0 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { WithContext as ReactTagsWithContext, WithOutContext as ReactTags } from 'react-tag-input';

import {
    FormGroup,
    ControlLabel,
    HelpBlock,
} from '../index';

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
        let tags = this.state.tags;
        tags.splice(i, 1);
        this.setState({ tags });
        input.onChange(this.transformTagsToSubmission(tags));
    }

    handleAddition(tag) {
        const { input } = this.props;
        let tags = this.state.tags;
        tags.push({
            id: tags.length + 1,
            text: tag
        });
        this.setState({ tags });
        input.onChange(this.transformTagsToSubmission(tags));
    }

    handleDrag(tag, currPos, newPos) {
        const { input } = this.props;
        let tags = this.state.tags;
        
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
            withContent,
            meta: { touched, error },
        } = this.props;
        const { suggestions, tags } = this.state;

        const Comp = withContent ? ReactTagsWithContext : ReactTags;

        return (
            <div
                className={classNames(className, 'wfui-form-item', {
                    'wfui-form-item-error': error,
                })}
            >
                <ControlLabel>{label}</ControlLabel>
                {required && <b className="required"> *</b>}
                <FormGroup validationState={touched && error ? 'error' : null}>
                    <Comp
                        tags={tags}
                        suggestions={suggestions}
                        handleDelete={this.handleDelete}
                        handleAddition={this.handleAddition}
                        handleDrag={this.handleDrag}
                        placeholder={placeholder}
                        name={input.name}
                    />
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
    }    
}
renderTags.propTypes = {
    placeholder: PropTypes.string,
    withContext: PropTypes.bool,
};
renderTags.defaultProps = {
    placeholder: 'Add keyword',
};

export default renderTags;
