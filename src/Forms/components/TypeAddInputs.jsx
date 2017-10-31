import React from 'react';
import { connect } from 'react-redux';
import { FieldArray, Field, getFormSyncErrors, reduxForm } from 'redux-form';
import { renderAddAnother, renderField } from '../../FormFields/';
import Description from '../../FormFields/Description';
import { parseAgeToken } from '../helpers/input_hybrid';
import { generateValidatorMap, validator } from '../helpers/validator';



/**
 * Wrapper for Question Type 7 (Listbox)
 */

class TypeAddInputs extends React.Component {
    render() {
        const { limits, token, question, lang, globalError, review, withoutDnDContext, initialValues } = this.props;

        // const options = data.options ? data.options.slice(0) : [];

        const data = question.values[lang] || {};
        const groupId = question.groupId;
        const child = (data.children && data.children[0]) || {};
        const cid = child.cid || child.id;

        return (
            <div className={'wfui-type-add-inputs'} >
                {data.description && <Description content={data.description} src={data.image && data.image.src} imageTitle={data.image && data.image.title} />}
                <FieldArray
                    name={question.id}
                    type="select"
                    className="bluetext"
                    component={renderAddAnother}
                    label={data.title}
                    childComponent={(questionId, i) => (
                        <Field
                            label=""
                            name={`${groupId ? `${groupId}.` : ''}${questionId}.value`}
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
                            disabled={review || question.disabled}
                        />
                    )}
                    disabled={review}
                    withoutDnDContext={withoutDnDContext}
                    draggable
                />
            </div>
        );
    }
}

const TypeAddInputsContainer = connect((state, props) => {
    const formID = props.preview ? 'form_preview' : `form_${props.question.sectionId}`;
    const syncErrors = getFormSyncErrors(formID)(state);
    const qid = typeof props.question.groupIndex !== 'undefined' ? `${props.question.id}[${props.question.groupIndex}]` : props.question.id;

    return {
        globalError: syncErrors && syncErrors.global && syncErrors.global[qid],
        withoutDnDContext: props.preview,
        initialValues: [{ value: 12 }],
    };
})(TypeAddInputs);

export default TypeAddInputsContainer;

/**
 * Preview Component
 */
export const TypeAddInputsPreview = reduxForm({
    form: 'form_preview',
    validate: (values, props) => {
        const validatorMap = generateValidatorMap([props.question], 'en');
        return validator(validatorMap)(values);
    },
    destroyOnUnmount: true,
})(TypeAddInputsContainer);
