import React from 'react';
import PropTypes from 'prop-types';
import * as form from 'redux-form';
import classNames from 'classnames';

import {
    Draggable,
    DraggableWithoutContext,
    Button,
    FormGroup,
    ControlLabel,
    HelpBlock,
    Glyphicon,
} from '../index';

class renderAddAnother extends React.Component {
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
            withoutDnDContext,
            meta: { error },
        } = this.props;

        const Comp = withoutDnDContext ? DraggableWithoutContext : Draggable;

        return (
            <div
                className={classNames(className, 'wfui-form-item', {
                    'wfui-form-item-error': error,
                })}
            >
                <ControlLabel>{label}</ControlLabel>
                {required && <b className="required"> *</b>}
                <FormGroup
                    className="wfui-form-addAnother"
                    validationState={error ? 'error' : null}
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
                                        {!disabled && (
                                            <a
                                                className="delete-icon"
                                                onClick={() => fields.remove(i)}
                                            >
                                                Delete
                                            </a>
                                        )}
                                    </Comp.Item>
                                ))}
                            </Comp>
                        )}
                    {!draggable &&
                        fields.map((field, i) => (
                            <div>
                                {childComponent(field, i)}
                                {!disabled && (
                                    <a
                                        className="delete-icon"
                                        onClick={() => fields.remove(i)}
                                    >
                                        Delete
                                    </a>
                                )}
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

renderAddAnother.propTypes = {
    className: PropTypes.string,
    childComponent: PropTypes.func,
    help: PropTypes.string,
    label: PropTypes.string,
    labelAddAnother: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    draggable: PropTypes.bool,
    withoutDnDContext: PropTypes.bool,
};
renderAddAnother.defaultProps = {
    labelAddAnother: 'Add Another Item',
};

export default renderAddAnother;
