import React, { cloneElement } from 'react';
import { Field } from 'react-final-form';
import classNames from 'classnames';
import _ from 'lodash';
import { FormFields, FormGroup, ControlLabel, HelpBlock } from '../index';

import { renderField } from './index';

class renderTableFormat extends React.Component {
    componentWillReceiveProps(nextProps) {
        const { name, logic } = this.props;

        // If logic is "or"
        if (logic === 'or') {
            const childComponentKeys = Object.keys(this.props).filter(key =>
                key.includes(name)
            );

            // Modify other fields when user edit one of the fields.
            childComponentKeys.map(cid => {
                if (
                    this.props[cid].input.value !== nextProps[cid].input.value
                ) {
                    const modifyingCid = cid;
                    const targetCid = childComponentKeys.filter(n => n !== cid);

                    if (
                        nextProps[modifyingCid].input.value &&
                        modifyingCid &&
                        targetCid.length > 0
                    ) {
                        targetCid.map(cid => {
                            nextProps[cid].input.onChange('');
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
        } = this.props;

        const components = [];
        let allTouched = true;
        let allPristine = true;
        const childComponentKeys = Object.keys(this.props).filter(key =>
            key.includes(name)
        );

        childComponentKeys.map(key => {
            const props = this.props[key];
            allTouched = allTouched && props.meta.touched;
            allPristine = allPristine && props.meta.pristine;
            components.push(props);
        });

        return (
            <div
                className={classNames(
                    className,
                    'wfui-form-item',
                    { 'wfui-form-item-error': allTouched && globalError },
                    { 'wfui-form-disabled': disabled },
                    { 'wfui-form-preview': preview }
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
                    } wfui-table-format multiple-inputs-${
                        Object.keys(fieldMap).length
                    }`}
                    validationState={allTouched && globalError ? 'error' : null}
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
                    <HelpBlock>
                        {' '}
                        {allTouched && globalError && (
                            <span>{globalError}</span>
                        )}
{' '}
                    </HelpBlock>
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
export default renderTableFormat;
