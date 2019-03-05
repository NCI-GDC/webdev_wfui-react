/* global FileReader window $ */

import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import { fieldPropTypes } from 'redux-form';
import classNames from 'classnames';
import { FormGroup, ControlLabel, HelpBlock } from '../';
import FroalaEditor from 'react-froala-wysiwyg';
import 'froala-editor/js/froala_editor.pkgd.min.js';

class renderFroala extends React.Component {
    constructor(props) {
        super();
        const { input } = props;
        this.onHandleChange = this.onHandleChange.bind(this);
        this.state = {
            htmlText: '',
            selectedImagePosition: 'full-width',
        };
        this.initializeEditor = this.initializeEditor.bind(this);
        console.warn('This "renderFroala" is still under development.');
    }

    componentWillMount() {
        this.initializeEditor(this.props);
    }

    onHandleChange(text) {
        const { input } = this.props;
        input.onChange(text);
    }

    initializeEditor(props) {
        const { input, images } = props;
        const that = this;

        /** *********************************************************************
         * Froala Customization
         * ******************************************************************** */
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
            config,
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
                        <div className="wfui-froala">
                            <FroalaEditor
                                model={input.value}
                                onModelChange={this.onHandleChange}
                                config={{
                                    key: config.FROALA_ACTIVATION_KEY,
                                    toolbarStickyOffset:
                                        config.FROALA_STICKY_TOOLBAR_OFFSET,
                                    heightMin: 500,
                                    pasteDeniedAttrs: ['style'],
                                    toolbarButtons: [
                                        'undo',
                                        'redo',
                                        '|',
                                        'bold',
                                        'italic',
                                        'strikeThrough',
                                        '|',
                                        'formatOL',
                                        'formatUL',
                                        'insertLink',
                                        'insertTable',
                                        'quote',
                                        'add-image',
                                        '|',
                                        'html',
                                    ],
                                    quickInsertButtons: [
                                        'ol',
                                        'ul',
                                        'table',
                                        'quote',
                                    ],
                                    customPlugin: ['customPlugin'],
                                    formEditButtons: [],
                                    embedlyEditButtons: [],
                                    imageEditButtons: [],
                                    videoEditButtons: [],
                                }}
                                ref={(ref) => {
                                    this.froalaRef = ref;
                                }}
                            />
                        </div>
                    ) : (
                            <div className="wfui-quill-disabled">{input.value}</div>
                        )}
                    {touched && error && (
                        <HelpBlock className="wfui-form-error">
                            <span>{error}</span>
                        </HelpBlock>
                    )}
                </FormGroup>
                {descDisplay && !preview ? cloneElement(descDisplay) : ''}
            </div>
        );
    }
}

renderFroala.propTypes = {
    getContents: PropTypes.func,
    images: PropTypes.arrayOf(PropTypes.object),
    ...fieldPropTypes,
    config: PropTypes.object,
};
renderFroala.defaultProps = {
    config: {
        FROALA_STICKY_TOOLBAR_OFFSET: 0,
    },
};

export default renderFroala;
