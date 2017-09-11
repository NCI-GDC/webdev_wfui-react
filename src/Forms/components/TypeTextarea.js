import React from 'react';
import { connect } from 'react-redux';
import { Field, getFormSyncErrors, reduxForm } from 'redux-form';
import { FormFields, Description } from 'wfui-react';

import { generateValidatorMap, validator } from '../helpers/validator';

const { renderTextArea } = FormFields;

/**
 * Wrapper for Question Type 7 (Listbox)
 */

class TypeTextarea extends React.Component {
    render() {
        const { question, lang, globalError } = this.props;

        const data = question.values[lang] || {};
        const groupId = question.groupId;
        // const options = data.options ? data.options.slice(0) : [];

        return (
            <div className={'wfui-type-listbox'} >
                {data.description && <Description content={data.description} src={data.image && data.image.src} imageTitle={data.image && data.image.title} />}
                <Field
                    label={data.title}
                    name={`${groupId ? `${groupId}.` : ''}${question.id}.textarea`}
                    type="textarea"
                    component={renderTextArea}
                    placeholder=""
                    globalError={globalError}
                    required={question.required}
                />
            </div>
        );
    }
}

const TypeTextareaContainer = connect((state, props) => {
    const formID = props.preview ? 'form_preview' : `form_${props.question.sectionId}`;
    const syncErrors = getFormSyncErrors(formID)(state);
    const qid = typeof props.question.groupIndex !== 'undefined' ? `${props.question.id}[${props.question.groupIndex}]` : props.question.id;

    return {
        globalError: syncErrors && syncErrors.global && syncErrors.global[qid],
    };
})(TypeTextarea);

export default TypeTextareaContainer;

/**
 * Preview Component
 */
export const TypeTextareaPreview = reduxForm({
    form: 'form_preview',
    validate: (values, props) => {
        const validatorMap = generateValidatorMap([props.question], 'en');
        return validator(validatorMap)(values);
    },
    destroyOnUnmount: true,
})(TypeTextareaContainer);
