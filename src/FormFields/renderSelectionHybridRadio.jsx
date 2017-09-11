import React from 'react';
import { Field } from 'redux-form';
import { FormFields, FormGroup, ControlLabel, Radio, HelpBlock } from '../index';
import classNames from 'classnames';
import _ from 'lodash';

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
        
        const radioCid = fieldMap['_radio'].cid;
        const childComponents = _.get(this.props, name);
        const radioProps = childComponents[radioCid];

        // Reset input fields logic
        const exceptions = ['_radio', value];
        Object.keys(fieldMap).map((key) => {
            if (!exceptions.includes(key)) {
                // Reset value
                const fieldProps = childComponents[fieldMap[key].cid];
                fieldProps.input.onChange('');
            }
        });

        radioProps.input.onChange(value);
    }
    parseOptions(props) {
        return props.options.map((option) => {
            return {
                key: props.getOptKey(option),
                value: props.getOptVal(option),
            };
        });
    }
    render() {

        const { className, name, label, required, help, globalError, fieldMap, columnCount, disabled } = this.props;
        const { options } = this.state;

        const radioCid = fieldMap['_radio'].cid;
        const childComponents = _.get(this.props, name);
        const radioProps = childComponents[radioCid];

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
                <FormGroup className={`wfui-radios-hybrid column-count-${columnCount}`} validationState={allTouched && globalError ? 'error' : null}>
                    {options.map((option, i) => {
                        const _key = typeof option === 'string' ? option : option.key;
                        const _option = typeof option === 'string' ? option : option.value;
                        const renderRadio = (
                            <Radio
                                key={i}
                                className={radioProps.input.value === _key ? 'active' : ''}
                                name={`${name}.${radioCid}`}
                                value={_key}
                                checked={radioProps.input.value === _key}
                                onClick={e => (this.onHandleChange(e.target.value))}
                                disabled={disabled}
                            >
                                {_option}
                                {fieldMap[_key] && <div key={i} className="radioHybrid">
                                    <Field
                                        {...fieldMap[_key]}
                                        name={`${name}.${fieldMap[_key].cid}`}
                                        type={fieldMap[_key].field_type || 'text'}
                                        component={renderField}
                                        onFocus={() => { this.onHandleChange(_key) }} // Change radio when it's focused.
                                    />
                                </div>}
                            </Radio>
                        );
                        
                        return renderRadio;
                    })}
                    <HelpBlock> {allTouched && globalError && <span>{globalError}</span>} </HelpBlock>
                    {help && <div className="wfui-form-description" dangerouslySetInnerHTML={{ __html: help }} />}
                </FormGroup>
            </div>
        );
    }
}