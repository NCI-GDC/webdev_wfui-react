import React from 'react';
import { connect } from 'react-redux';
import { Field, getFormSyncErrors, reduxForm } from 'redux-form';
import { generateValidatorMap, validator } from '../helpers/validator';
import { renderField } from '../../FormFields/';

/**
 * Wrapper for Question Type 7 (Listbox)
 */

class TypeHidden extends React.Component {
    render() {
        const { question, lang, globalError, review } = this.props;

        const data = question.values[lang] || {};
        const groupId = question.groupId;
        // const options = data.options ? data.options.slice(0) : [];

        return (
            <div className={'wfui-type-hidden'} >
                <Field
                    label={data.title}
                    name={`${groupId ? `${groupId}.` : ''}${question.id}.value`}
                    type="input"
                    component={renderField}
                    placeholder=""
                    globalError={globalError}
                    required={question.required}
                    disabled={review}
                />
            </div>
        );
    }
}

const TypeHiddenContainer = connect((state, props) => {
    const formID = props.preview ? 'form_preview' : `form_${props.question.sectionId}`;
    const syncErrors = getFormSyncErrors(formID)(state);
    const qid = typeof props.question.groupIndex !== 'undefined' ? `${props.question.id}[${props.question.groupIndex}]` : props.question.id;

    return {
        globalError: syncErrors && syncErrors.global && syncErrors.global[qid],
    };
})(TypeHidden);

export default TypeHiddenContainer;
