import React from 'react';
import { connect } from 'react-redux';
import { Field, getFormSyncErrors, reduxForm } from 'redux-form';
import { renderField } from '../../FormFields/';
import Description from '../../FormFields/Description';
import { parseAgeToken } from '../helpers/input_hybrid.js';
import { generateValidatorMap, validator } from '../helpers/validator';

/**
 * Wrapper for Question Type 2 (InputField)
 */
class TypeInputField extends React.Component {
    constructor() {
        super();
        this.state = {value:undefined, saving: false};
    }
    render() {
        const { value, saving } = this.state;
        const { question, limits, lang, preview, submitted, token, errors, globalError, review } = this.props;

        const data = question.values[lang] || {};
        const groupId = question.groupId;
        const child = (data.children && data.children[0]) || {};
        const cid = child.cid || child.id;

        return (
            <div className={'wfui-type-input-field'} >
                {data.description && <Description content={data.description} src={data.image && data.image.src} imageTitle={data.image && data.image.title} />}
                {Object.keys(child).length > 0 && <Field
                    label={data.title}
                    name={`${groupId ? `${groupId}.` : ''}${question.id}.${cid}`}
                    type={child.field_type || 'text'}
                    component={renderField}
                    placeholder={''}
                    postfix={child.field_suffix}
                    maxlength={limits && limits.fieldLimit}
                    min={parseAgeToken(child.range_lower, token)}
                    max={parseAgeToken(child.range_upper, token)}
                    globalError={globalError}
                    inline
                    required={question.required}
                    disabled={review}
                />}
            </div>
        )
        
    }
}
const TypeInputFieldContainer = connect((state, props) => {
    const formID = props.preview ? 'form_preview' : `form_${props.question.sectionId}`;
    const syncErrors = getFormSyncErrors(formID)(state);
    const qid = typeof props.question.groupIndex !== 'undefined' ? `${props.question.id}[${props.question.groupIndex}]` : props.question.id;

    return {
        globalError: syncErrors && syncErrors.global && syncErrors.global[qid],
    };
})(TypeInputField);

export default TypeInputFieldContainer;

/**
 * Preview Component
 */
export const TypeInputFieldPreview = reduxForm({
    form: 'form_preview',
    validate: (values, props) => {
        const validatorMap = generateValidatorMap([props.question], 'en');
        return validator(validatorMap)(values);
    },
    destroyOnUnmount: true,
})(TypeInputFieldContainer);
