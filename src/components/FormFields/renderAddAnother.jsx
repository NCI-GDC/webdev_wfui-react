import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import * as form from 'redux-form';
import classNames from 'classnames';

import {
    Draggable,
    DraggableWithContext,
    Button,
    Form,
    Col,
    Row,
    FormGroup,
    ControlLabel,
    HelpBlock,
    Icon,
    FormControl,
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
            meta: { submitFailed, data },
            minimumItem,
            descDisplay,
            fullWidth,
            defaultValue,
            inline,
            showErrors,
        } = this.props;

        const Comp = withContext ? DraggableWithContext : Draggable;
        const DeleteButton = ({ index }) => {
            if (!disabled && fields.length > minimumItem) {
                return (
                    <Button
                        variant="link"
                        className="delete-icon"
                        onClick={() => {
                            debugger;
                            fields.remove(index);
                            this.touched = true;
                        }}
                    >
                        Delete
                    </Button>
                );
            }
            return null;
        };

        return (
            <Form.Row
                className={classNames(
                    className,
                    'wfui-form-item',
                    {
                        'wfui-form-item-error':
                            (this.touched || showErrors) && globalError,
                    },
                    {
                        'wfui-form-item-warning':
                            (this.touched || showErrors) &&
                            data &&
                            data.warning,
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
                            : 9
                    }
                    className={`wfui-form-field ${
                        descDisplay
                            ? 'wfui-form-field-with-description'
                            : 'wfui-form-field-no-description'
                    } wfui-form-addAnother`}
                >
                    <FormControl
                        isInvalid={(this.touched || showErrors) && globalError}
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

                    <div className="custom-form-control-wrapper">
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
                                            <Icon icon="arrows-alt" />
                                        </Comp.Handle>
                                        {childComponent(field, i)}
                                        {
                                            <DeleteButton
                                                type="DeleteButton"
                                                index={i}
                                            />
                                        }
                                    </Comp.Item>
                                ))}
                            </Comp>
                        )}
                        {(!draggable || disabled) &&
                            fields.map((field, i) => (
                                <div
                                    className="wfui-form-addAnother-item"
                                    key={i}
                                >
                                    <div className="wfui-form-addAnother-content">
                                        {childComponent(field, i)}
                                    </div>
                                    <div className="wfui-form-addAnother-delete">
                                        <DeleteButton
                                            type="DeleteButton"
                                            index={i}
                                        />
                                    </div>
                                </div>
                            ))}
                        {!disabled && (
                            <div className="wfui-form-addAnother-btn-container">
                                <Button
                                    variant="outline-primary"
                                    onClick={() => {
                                        fields.push(defaultValue);
                                    }}
                                    plus
                                >
                                    <span>{labelAddAnother}</span>
                                </Button>
                            </div>
                        )}
                    </div>
                    {(this.touched || showErrors || submitFailed) &&
                        globalError && (
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
                    {(this.touched || showErrors) && data && data.warning && (
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
                        <div
                            className="wfui-form-help"
                            dangerouslySetInnerHTML={{ __html: help }}
                        />
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
