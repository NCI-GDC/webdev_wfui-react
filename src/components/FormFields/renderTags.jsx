/* global FileReader */
/* eslint react/prop-types : 0 */
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TagsInput from 'react-tagsinput';

import { FormGroup, ControlLabel, HelpBlock, Form, Col } from '../index';

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
        if (typeof onChange === 'function') onChange(tags, input);
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
            inline,
            meta: { touched, error, data },
        } = this.props;
        const { suggestions, tags } = this.state;

        return (
            <Form.Row
                className={classNames(
                    className,
                    'wfui-form-item',
                    { 'wfui-form-item-error': touched && error },
                    {
                        'wfui-form-item-warning': touched && data.warning,
                    },
                    { 'wfui-form-disabled': disabled },
                    { 'wfui-form-preview': preview },
                    { 'wfui-form-item-full-width': fullWidth }
                )}
            >
                {label && (
                    <Col
                        xs={12}
                        lg={inline ? 2 : 12}
                        className="wfui-form-label"
                    >
                        <ControlLabel>
                            {label}
                            {required && <b className="required"> *</b>}
                        </ControlLabel>
                    </Col>
                )}
                <FormGroup
                    as={Col}
                    xs={12}
                    lg={
                        inline && label
                            ? descDisplay && !preview
                                ? 4
                                : 10
                            : descDisplay && !preview
                            ? 6
                            : 12
                    }
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
                        <Form.Control.Feedback
                            className="wfui-form-error"
                            type="invalid"
                        >
                            <span>{error}</span>
                        </Form.Control.Feedback>
                    )}
                    {touched && data.warning && (
                        <Form.Control.Feedback
                            className="wfui-form-warning"
                            type="valid"
                        >
                            <span>{data.warning}</span>
                        </Form.Control.Feedback>
                    )}
                    {touched && globalError && (
                        <Form.Control.Feedback
                            className="wfui-form-error"
                            type="invalid"
                        >
                            <span>{globalError}</span>
                        </Form.Control.Feedback>
                    )}
                    {help && !preview && (
                        <HelpBlock className="wfui-form-help text-muted">
                            <div dangerouslySetInnerHTML={{ __html: help }} />
                        </HelpBlock>
                    )}
                </FormGroup>
                {descDisplay && !preview ? (
                    <Col
                        className="wfui-form-description"
                        xs={12}
                        lg={{ span: 6, offset: 0 }}
                    >
                        {cloneElement(descDisplay)}
                    </Col>
                ) : null}
            </Form.Row>
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
