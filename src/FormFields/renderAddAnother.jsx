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
        const { fields, minimumItem } = this.props;
        if (!this.init) {
            // Work around for validation.
            fields.push();
            fields.remove(fields.length);

            // Initialize minimum item.
            if (minimumItem) {
                for (let i = 0; i < minimumItem - fields.length; i++) {
                    fields.push();
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
                        'wfui-form-item-error': error || globalError,
                    },
                    { 'wfui-form-disabled': disabled },
                    { 'wfui-form-preview': preview },
                )}
            >
                <div className="wfui-form-label">
                    <ControlLabel>{label}</ControlLabel>
                    {required && <b className="required"> *</b>}
                </div>
                <FormGroup
                    className={`wfui-form-field ${
                        descDisplay ? 'wfui-form-field-with-desctipton' : ''
                    } wfui-form-addAnother`}
                    validationState={error || globalError ? 'error' : null}
                >
                    {!disabled &&
                        draggable &&
                        fields.length > 0 && (
                            <Comp
                                onHandleItemMove={(from, to) => {
                                    fields.move(from, to);
                                    setTimeout(() => this.forceUpdate(), 1);
                                }}
                                onHandleEndDrag={() => {
                                    this.forceUpdate();
                                }}
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
                            <div key={i}>
                                {childComponent(field, i)}
                                {<DeleteButton index={i} />}
                            </div>
                        ))}
                    {!disabled && (
                        <Button
                            bsStyle="default"
                            className="add-btn"
                            onClick={() => {
                                fields.push();
                            }}
                        >
                            {labelAddAnother}
                        </Button>
                    )}
                    {error && (
                        <HelpBlock className="wfui-form-error">
                            <span>{error}</span>
                        </HelpBlock>
                    )}
                    {(this.touched || submitFailed) &&
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
                {descDisplay ? cloneElement(descDisplay) : ''}
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
};
renderAddAnother.defaultProps = {
    labelAddAnother: 'Add Another Item',
    minimumItem: 0,
};

export default renderAddAnother;
