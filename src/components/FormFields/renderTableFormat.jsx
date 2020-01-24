import React, { cloneElement } from 'react';
import { Field } from 'redux-form';
import classNames from 'classnames';
import _ from 'lodash';
import { Form, FormGroup, ControlLabel, HelpBlock, Col } from '../index';

import { renderField } from './index';

class renderTableFormat extends React.Component {
    componentWillReceiveProps(nextProps) {
        const { name, logic } = this.props;

        // If logic is "or"
        if (logic === 'or') {
            const childComponents = _.get(this.props, name);
            const nextChildComponents = nextProps[name];

            // Modify other fields when user edit one of the fields.
            Object.keys(childComponents).map(cid => {
                if (
                    childComponents[cid].input.value !==
                    nextChildComponents[cid].input.value
                ) {
                    const modifyingCid = cid;
                    const targetCid = Object.keys(childComponents).filter(
                        n => n !== cid
                    );

                    if (
                        nextChildComponents[modifyingCid].input.value &&
                        modifyingCid &&
                        targetCid.length > 0
                    ) {
                        targetCid.map(cid => {
                            nextChildComponents[cid].input.onChange('');
                        });
                    }
                }
            });
        }
    }

    render() {
        const {
            className,
            limits,
            name,
            label,
            required,
            help,
            globalError,
            logic,
            fieldMap,
            disabled,
            preview,
            descDisplay,
            inline,
            showErrors
        } = this.props;

        const components = [];
        let allTouched = true;
        let allPristine = true;
        const childComponents = _.get(this.props, name);

        Object.keys(childComponents).map(key => {
            const props = childComponents[key];
            allTouched = allTouched && props.meta.touched;
            allPristine = allPristine && props.meta.pristine;
            components.push(props);
        });

        return (
            <Form.Row
                className={classNames(
                    className,
                    'wfui-form-item',
                    { 'wfui-form-item-error': (allTouched || showErrors) && globalError },
                    { 'wfui-form-disabled': disabled },
                    { 'wfui-form-preview': preview },
                    { 'wfui-form-with-description': descDisplay }
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
                        inline
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
                        } wfui-table-format multiple-inputs-${
                        Object.keys(fieldMap).length
                        }`}
                // validationState={(allTouched || showErrors) && globalError ? 'error' : null}
                >
                    <ul className="wfui-input-table__ul">
                        {Object.keys(fieldMap).map((key, i) => {
                            const lists = [];

                            lists.push(
                                <li className="wfui-input-table__li">
                                    <Field
                                        key={i}
                                        {...fieldMap[key]}
                                        name={`${name}.${key}`}
                                        type={
                                            fieldMap[key].field_type || 'text'
                                        }
                                        component={renderField}
                                        disabled={disabled}
                                    />
                                </li>
                            );
                            if (Object.keys(fieldMap).length - 1 > i) {
                                lists.push(
                                    <li className="wfui-input-table__li">
                                        <span className="wfui-input-table__condition">
                                            {logic}
                                        </span>
                                    </li>
                                );
                            }
                            return lists;
                        })}
                    </ul>
                    {(allTouched || showErrors) && globalError && (
                        <Form.Control.Feedback
                            className="wfui-form-error"
                            type="invalid"
                        >
                            <span>{Array.isArray(globalError) ? globalError.join(', ') : globalError}</span>
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
export default renderTableFormat;
