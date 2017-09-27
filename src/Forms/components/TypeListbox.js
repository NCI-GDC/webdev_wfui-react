import React from 'react';
import { connect } from 'react-redux';
import { Field, getFormSyncErrors, reduxForm } from 'redux-form';
import { generateValidatorMap, validator } from '../helpers/validator';
import { renderSelect } from '../../FormFields/';
import Description from '../../FormFields/Description';

/**
 * Wrapper for Question Type 7 (Listbox)
 */

class TypeListbox extends React.Component {
    render() {
        const { question, lang, globalError, review } = this.props;

        const data = question.values[lang] || {};
        const groupId = question.groupId;
        const options = data.options ? data.options.slice(0) : [];

        return (
            <div className={'wfui-type-listbox'} >
                {data.description && <Description content={data.description} src={data.image && data.image.src} imageTitle={data.image && data.image.title} />}
                <Field
                    label={data.title}
                    name={`${groupId ? `${groupId}.` : ''}${question.id}.listbox`}
                    type='select'
                    component={renderSelect}
                    globalError={globalError}
                    options={options.map(option => {
                        const res = option.split('|');
                        return { key: res[0], value: res[1] }
                    })}
                    required={question.required}
                    disabled={review}
                />
            </div>
        )
    }
}

const TypeListboxContainer = connect((state, props) => {
    const formID = props.preview ? 'form_preview' : `form_${props.question.sectionId}`;
    const syncErrors = getFormSyncErrors(formID)(state);
    const qid = typeof props.question.groupIndex !== 'undefined' ? `${props.question.id}[${props.question.groupIndex}]` : props.question.id;

    return {
        globalError: syncErrors && syncErrors.global && syncErrors.global[qid],
    };
})(TypeListbox);

export default TypeListboxContainer;

/**
 * Preview Component
 */
export const TypeListboxPreview = reduxForm({
    form: 'form_preview',
    validate: (values, props) => {
        const validatorMap = generateValidatorMap([props.question], 'en');
        return validator(validatorMap)(values);
    },
    destroyOnUnmount: true,
})(TypeListboxContainer);
