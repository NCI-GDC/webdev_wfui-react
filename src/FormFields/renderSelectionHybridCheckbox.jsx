import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Checkbox, FormFields, FormGroup, ControlLabel, HelpBlock } from '../index';
import classNames from 'classnames';
import _ from 'lodash';

import { renderField } from './index';

class renderSelectionHybridCheckbox extends React.Component {
    constructor(props) {
        super();
        const exclusives = [];
        let options = [];
        this.state = this.parseOptionsAndSpecials(props);
        this.onHandleChange = this.onHandleChange.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.options.join('') !== nextProps.options.join('')) {
            this.setState(this.parseOptionsAndSpecials(nextProps));
        }
    }
    onHandleChange(values, checkedValue) {
        const { name, input, fieldMap } = this.props;
        const { exclusives } = this.state;
        
        const checkboxCid = fieldMap['_checkbox'].cid;
        const childComponents = _.get(this.props, name);
        const checkboxProps = childComponents[checkboxCid];

        let nextValues = values;
        // Exclusive feature
        if (exclusives.length > 0) {
            if (checkedValue !== false && exclusives.includes(checkedValue)) {
                nextValues = [checkedValue];
            } else if (checkedValue !== false && !exclusives.includes(checkedValue)) {
                nextValues = values.filter((value) => (!exclusives.includes(value)));
            }
        } 
        
        // Reset Value if it's not checked.
        Object.keys(fieldMap).forEach((key) => {
            if (key !== '_checkbox' && !nextValues.includes(key)) {
                const fieldProps = childComponents[fieldMap[key].cid];
                fieldProps.input.onChange('');
            }
        });

        checkboxProps.input.onChange(nextValues);

    }
    parseOptionsAndSpecials(props) {
        const exclusives = [];
        let options = [];
        props.options.forEach((option) => {
            const key = props.getOptKey(option);
            const special = props.getOptSpecial(option);
            if (special.includes('exclusive')) {
                exclusives.push(key);
            }
            options.push({
                key,
                value: props.getOptVal(option),
            });
        });
        return { options, exclusives };
    }
    render() {
        // const { questionId, className, label, input, help, required, disabled, fieldMap, meta: { touched, error } } = this.props;
        const { className, name, label, required, help, globalError, fieldMap, disabled, columnCount } = this.props;

        const { options } = this.state;

        const checkboxCid = fieldMap['_checkbox'].cid;
        const childComponents = _.get(this.props, name);
        const checkboxProps = childComponents[checkboxCid];

        const components = [];
        let allTouched = true;
        let allPristine = true;
        Object.keys(childComponents).map((key) => {
            const props = childComponents[key];
            allTouched = allTouched && props.meta.touched;
            allPristine = allPristine && props.meta.pristine;
            components.push(renderField(props));
        });

        return (
            <div className={classNames(className, 'wfui-form-item', { 'wfui-form-item-error': globalError })}>
                <ControlLabel>{label}</ControlLabel>{required && <b className="required"> *</b>}
                <FormGroup className={`wfui-checkboxes-hybrid column-count-${columnCount}`} validationState={allTouched && globalError ? 'error' : null}>
                    {options.map((option, i) => {
                        const _key = typeof option === 'string' ? option : option.key;
                        const _option = typeof option === 'string' ? option : option.value;
                        const renderCheckbox = (
                            <Checkbox
                                key={i}
                                name={`${name}.${checkboxCid}`}
                                value={_key}
                                disabled={disabled}
                                checked={checkboxProps.input.value && checkboxProps.input.value.includes(_key)}
                                className={checkboxProps.input.value && checkboxProps.input.value.includes(_key) ? 'active' : ''}
                                onChange={(e) => {
                                    const newValue = [...checkboxProps.input.value];
                                    if (e.target.checked) {
                                        newValue.push(_key);
                                    } else {
                                        newValue.splice(newValue.indexOf(_key), 1);
                                    }
                                    return this.onHandleChange(newValue, e.target.checked && e.target.value);
                                }}
                            >
                                {_option}
                                <div key={i} className="checkboxHybrid">
                                    { fieldMap[_key] && <Field
                                        {...fieldMap[_key]}
                                        name={`${name}.${fieldMap[_key].cid}`}
                                        type={fieldMap[_key].field_type || 'text'}
                                        component={renderField}
                                        disabled={disabled}
                                        onFocus={() => {
                                            const newValue = [...checkboxProps.input.value];
                                            let checked = false;
                                            if (!newValue.includes(_key)) {
                                                checked = true;
                                                newValue.push(_key);
                                            }
                                            this.onHandleChange(newValue, checked && _key);
                                        }}
                                    />}
                                </div>
                            </Checkbox>
                        );
                        return renderCheckbox;

                    })}
                    <HelpBlock> {allTouched && globalError && <span>{globalError}</span>} </HelpBlock>
                    {help && <div className="wfui-form-description" dangerouslySetInnerHTML={{ __html: help }} />}
                </FormGroup>
            </div>
        );
    }
}
renderSelectionHybridCheckbox.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    help: PropTypes.string,
    globalError: PropTypes.string,
    fieldMap: PropTypes.object,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
};

export default renderSelectionHybridCheckbox;
