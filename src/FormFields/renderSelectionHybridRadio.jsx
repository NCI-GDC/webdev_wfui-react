import React, { cloneElement } from 'react';
import { Field } from 'redux-form';
import classNames from 'classnames';
import _ from 'lodash';

import {
    FormFields,
    FormGroup,
    ControlLabel,
    Radio,
    HelpBlock,
} from '../index';

import { renderField } from './index';

export default class renderSelectionHybridRadio extends React.Component {
    constructor(props) {
        super();
        this.onHandleChange = this.onHandleChange.bind(this);
        this.state = {
            options: this.parseOptions(props),
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.options.join('') !== nextProps.options.join('')) {
            this.setState({ options: this.parseOptions(nextProps) });
        }
    }

    onHandleChange(value) {
        const { name, input, fieldMap } = this.props;

        const radioCid = fieldMap._radio.cid;
        const childComponents = _.get(this.props, name);
        const radioProps = childComponents[radioCid];

        // Reset input fields logic
        const exceptions = ['_radio', value];
        Object.keys(fieldMap).map(key => {
            if (!exceptions.includes(key)) {
                // Reset value
                const fieldProps = childComponents[fieldMap[key].cid];
                fieldProps.input.onChange('');
            }
        });

        radioProps.input.onChange(value);
    }

    parseOptions(props) {
        return props.options.map(option => ({
            key: props.getOptKey(option),
            value: props.getOptVal(option),
        }));
    }

    render() {
        const {
            className,
            name,
            label,
            required,
            help,
            globalError,
            fieldMap,
            columnCount,
            disabled,
            preview,
            descDisplay,
            fullWidth,
            showErrors
        } = this.props;
        const { options } = this.state;

        const radioCid = fieldMap._radio.cid;
        const childComponents = _.get(this.props, name);
        const radioProps = childComponents[radioCid];

        const components = [];
        let allTouched = true;
        let allPristine = true;
        Object.keys(childComponents).map(key => {
            const props = childComponents[key];
            allTouched = allTouched && props.meta.touched;
            allPristine = allPristine && props.meta.pristine;
            components.push(renderField(props));
        });

        return (
            <div
                className={classNames(
                    className,
                    'wfui-form-item',
                    { 'wfui-form-item-error': (allTouched || showErrors) && globalError },
                    { 'wfui-form-disabled': disabled },
                    { 'wfui-form-preview': preview },
                    { 'wfui-form-item-full-width': fullWidth }
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
                        } wfui-radios-hybrid column-count-${columnCount}`}
                    validationState={(allTouched || showErrors) && globalError ? 'error' : null}
                >
                    {options.map((option, i) => {
                        const _key =
                            typeof option === 'string' ? option : option.key;
                        const _option =
                            typeof option === 'string' ? option : option.value;
                        const renderRadio = (
                            <Radio
                                key={i}
                                className={`${
                                    radioProps.input.value === _key
                                        ? 'active'
                                        : ''
                                    } ${
                                    fieldMap[_key]
                                        ? 'radio-with-radioHybrid'
                                        : ''
                                    }`}
                                name={`${name}.${radioCid}`}
                                value={_key}
                                checked={radioProps.input.value === _key}
                                onClick={e =>
                                    this.onHandleChange(e.target.value)
                                }
                                disabled={disabled}
                            >
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: _option,
                                    }}
                                />
                                {fieldMap[_key] && (
                                    <div key={i} className="radioHybrid">
                                        <Field
                                            {...fieldMap[_key]}
                                            name={`${name}.${
                                                fieldMap[_key].cid
                                                }`}
                                            type={
                                                fieldMap[_key].field_type ||
                                                'text'
                                            }
                                            component={renderField}
                                            disabled={disabled}
                                            onFocus={() => {
                                                this.onHandleChange(_key);
                                            }} // Change radio when it's focused.
                                        />
                                    </div>
                                )}
                            </Radio>
                        );

                        return renderRadio;
                    })}
                    <HelpBlock>
                        {' '}
                        {(allTouched || showErrors) && globalError && (
                            <span>{globalError}</span>
                        )}{' '}
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
