import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import * as form from 'redux-form';
import classNames from 'classnames';

import {
    Draggable,
    DraggableWithContext,
    Button,
    FormGroup,
    ControlLabel,
    HelpBlock,
    Glyphicon,
} from '../index';

class renderAddAnother extends React.Component {
    constructor(props) {
        super();
        this.init = false;
        this.touched = false;
    }
    componentDidUpdate() {
        const { fields, minimumItem, defaultValue } = this.props;
        if (!this.init) {
            // Work around for validation.
            fields.push(defaultValue);
            fields.remove(fields.length);

            // Initialize minimum item.
            if (minimumItem) {
                for (let i = 0; i < minimumItem - fields.length; i++) {
                    fields.push(defaultValue);
                }
            }
            this.init = true;
        }
    }
    render() {
        const {
            className,
            fields,
            childComponent,
            draggable,
            label,
            labelAddAnother,
            help,
            required,
            disabled,
            preview,
            withContext,
            globalError,
            name,
            meta: { error, submitFailed },
            minimumItem,
            descDisplay,
            fullWidth,
            defaultValue,
        } = this.props;

        const Comp = withContext ? DraggableWithContext : Draggable;
        const DeleteButton = ({ index }) => {
            if (!disabled && fields.length > minimumItem) {
                return (
                    <a
                        className="delete-icon"
                        onClick={() => {
                            fields.remove(index);
                            this.touched = true;
                        }}
                    >
                        Delete
                    </a>
                );
            }
            return null;
        };

        return (
            <div
                className={classNames(
                    className,
                    'wfui-form-item',
                    {
                        'wfui-form-item-error':
                            this.touched && (error || globalError),
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
                    } wfui-form-addAnother`}
                    validationState={
                        this.touched && (error || globalError) ? 'error' : null
                    }
                >
                    {!disabled && draggable && fields.length > 0 && (
                        <Comp
                            onHandleItemMove={(from, to) => {
                                fields.move(from, to);
                                setTimeout(() => this.forceUpdate(), 1);
                            }}
                            onHandleEndDrag={() => {
                                this.forceUpdate();
                            }}
                            className="wfui-form-addAnother-item"
                        >
                            {fields.map((field, i) => (
                                <Comp.Item key={i} id={field}>
                                    <Comp.Handle>
                                        <Glyphicon
                                            glyph="fullscreen"
                                            style={{
                                                transform: 'rotate(45deg)',
                                            }}
                                        />
                                    </Comp.Handle>
                                    {childComponent(field, i)}
                                    {<DeleteButton index={i} />}
                                </Comp.Item>
                            ))}
                        </Comp>
                    )}
                    {(!draggable || disabled) &&
                        fields.map((field, i) => (
                            <div className="wfui-form-addAnother-item" key={i}>
                                {childComponent(field, i)}
                                {<DeleteButton index={i} />}
                            </div>
                        ))}
                    {!disabled && (
                        <Button
                            variant="default"
                            onClick={() => {
                                fields.push(defaultValue);
                            }}
                        >
                            <span className="span-plus">{labelAddAnother}</span>
                        </Button>
                    )}
                    {error && (
                        <HelpBlock className="wfui-form-error">
                            <span>{error}</span>
                        </HelpBlock>
                    )}
                    {(this.touched || submitFailed) && globalError && (
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

renderAddAnother.propTypes = {
    className: PropTypes.string,
    childComponent: PropTypes.func,
    help: PropTypes.string,
    label: PropTypes.string,
    labelAddAnother: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    preview: PropTypes.bool,
    draggable: PropTypes.bool,
    withContext: PropTypes.bool,
    minimumItem: PropTypes.number,
    descDisplay: PropTypes.element,
    fullWidth: PropTypes.bool,
    defaultValue: PropTypes.object,
};
renderAddAnother.defaultProps = {
    labelAddAnother: 'Add Another Item',
    minimumItem: 0,
    fullWidth: false,
    defaultValue: null,
};

export default renderAddAnother;
