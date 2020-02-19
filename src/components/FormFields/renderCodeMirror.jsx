/* global FileReader */
/* eslint react/prop-types : 0 */
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
    Form,
    Col,
    FormGroup,
    ControlLabel,
    HelpBlock,
    ReactCodeMirror,
    Utils,
    FormControl,
} from '../index';
import { connect } from 'react-redux';
import S from 'string';
import * as actionCreators from '../../actions';

const { Controlled: CodeMirror } = ReactCodeMirror;

class renderCodeMirror extends React.Component {
    constructor(props) {
        super();
        this.touched = false;
        this.state = { pandocParseFailed: false, bodyText: props.input.value };
        this.onHandleChange = this.onHandleChange.bind(this);
        this.stripHTMLTimer = undefined;
    }

    componentWillMount() {
        const {
            parseWithPandoc,
            input,
            pandocParseFailed,
            isIE,
            enableMarkdownParser,
        } = this.props;

        this.setState({ bodyText: input.value });
    }

    onHandleChange(editor, data, value) {
        const { input } = this.props;

        this.setState({ bodyText: value });
        this.touched = true;

        if (this.stripHTMLTimer) {
            clearTimeout(this.stripHTMLTimer);
        }

        // Strip HTML Tag
        this.stripHTMLTimer = setTimeout(() => {
            const _value = S(value).stripTags(
                'object',
                'script',
                'style',
                'embed',
                'object',
                'iframe',
                'canvas'
            ).s;
            input.onChange(_value);
            this.setState({ bodyText: _value });
        }, 1000);

        // Update redux form state 1s after when typing is stopped.
        // Did this due to the performance issue on CodeMirror x Redux conbination.
        if (this.setReduxFormTimer) clearTimeout(this.setReduxFormTimer);
        this.setReduxFormTimer = setTimeout(() => {
            input.onChange(value);
        }, 10);
    }

    renderTextLimit() {
        const { textLimit, wordLimit, input, preview } = this.props;
        if (wordLimit && !preview) {
            const words =
                input && input.value
                    ? input.value
                          .replace(/\n/g, ' ')
                          .split(' ')
                          .filter(f => f).length
                    : 0;
            return (
                <span className="wfui-form-char-count">
                    {`${words} / ${wordLimit} words`}
                </span>
            );
        }
        if (textLimit && !preview) {
            return (
                <span className="wfui-form-char-count">
                    {`${
                        input && input.value ? input.value.length : 0
                    } / ${textLimit} characters`}
                </span>
            );
        }
        return null;
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
            meta: { touched, error, data },
            help,
            globalError,
            textLimitLabel,
            showErrors,
        } = this.props;
        const { bodyText } = this.state;

        return (
            <Form.Row
                className={classNames(
                    className,
                    'wfui-form-item',
                    {
                        'wfui-form-item-error':
                            (this.touched || showErrors) &&
                            (error || globalError),
                    },
                    { 'wfui-form-disabled': disabled },
                    { 'wfui-form-preview': preview },
                    { 'wfui-form-item-full-width': fullWidth },
                    { 'wfui-form-with-description': descDisplay }
                )}
            >
                {label && (
                    <Col xs={12} className="wfui-form-label">
                        <ControlLabel>
                            {label}
                            {required && <b className="required"> *</b>}
                            {textLimitLabel ? (
                                <span className="text-muted">
                                    {textLimitLabel}
                                </span>
                            ) : null}
                        </ControlLabel>
                    </Col>
                )}
                <FormGroup
                    as={Col}
                    xs={12}
                    lg={descDisplay && !preview ? 6 : 12}
                    className={`wfui-form-field ${
                        descDisplay
                            ? 'wfui-form-field-with-description'
                            : 'wfui-form-field-no-description'
                    } wfui-form-textarea`}
                    // validationState={
                    //     (this.touched || showErrors) && (error || globalError)
                    //         ? 'error'
                    //         : null
                    // }
                >
                    <FormControl
                        isInvalid={
                            (this.touched || showErrors) &&
                            (error || globalError)
                        }
                        isValid={
                            (this.touched || showErrors) && data && data.warning
                        }
                        className={classNames('d-none', 'custom-form-control', {
                            'is-valid-warning':
                                (this.touched || showErrors) &&
                                data &&
                                data.warning,
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
                                onBlur={e => {
                                    this.touched = true;
                                }}
                                onBeforeChange={this.onHandleChange}
                            />
                        </div>
                    ) : (
                        <div className="wfui-form-textarea-preview-value">
                            {input.value}
                        </div>
                    )}
                    {(this.touched || showErrors) && error && (
                        <Form.Control.Feedback
                            className="wfui-form-error"
                            type="invalid"
                        >
                            <span>{error}</span>
                            {this.renderTextLimit()}
                        </Form.Control.Feedback>
                    )}
                    {(this.touched || showErrors) && globalError && (
                        <Form.Control.Feedback
                            className="wfui-form-error"
                            type="invalid"
                        >
                            <span>{globalError}</span>
                            {this.renderTextLimit()}
                        </Form.Control.Feedback>
                    )}
                    {!(
                        (this.touched || showErrors) &&
                        (error || globalError)
                    ) && this.renderTextLimit()}
                    {help && !preview && (
                        <HelpBlock className="wfui-form-help text-muted">
                            <div dangerouslySetInnerHTML={{ __html: help }} />
                        </HelpBlock>
                    )}
                </FormGroup>
                {descDisplay && !preview ? (
                    <Col className="wfui-form-description" xs={12} lg={6}>
                        {cloneElement(descDisplay)}
                    </Col>
                ) : null}
            </Form.Row>
        );
    }
}

renderCodeMirror.propTypes = {
    enableMarkdownParser: PropTypes.bool,
};
renderCodeMirror.defaultProps = {
    enableMarkdownParser: true,
};

export default connect((state, props) => {
    const { pandocParseFailed, isIE } = props;
    let fetchPandoc;
    if (pandocParseFailed || isIE) {
        fetchPandoc = { status: 'success' };
    } else {
        fetchPandoc = Utils.fetchSelector('parseHTMLToMD')(state) || {};
    }
    return {
        fetchPandoc,
    };
}, actionCreators)(renderCodeMirror);
