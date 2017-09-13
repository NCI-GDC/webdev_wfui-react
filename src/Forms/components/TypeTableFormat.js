import React from 'react';
import { connect } from 'react-redux';
import { Fields, getFormSyncErrors, reduxForm } from 'redux-form';

import { generateValidatorMap, validator } from '../helpers/validator';
import { parseAgeToken } from '../helpers/input_hybrid.js';

import { renderTableFormat } from '../../FormFields/';
import Description from '../../FormFields/Description';

/**
 * Wrapper for Question Type 3 (Input Table Formaat)
 */
class TypeTableFormat extends React.Component {
    constructor() {
        super();
        this.state = { values:{} , saving: false, cids:[] };
    }
    render(){
        const {values, saving} = this.state;
        const {question, limits, lang, preview, submitted, token, errors, globalError} = this.props;
        const data = question.values[lang] || {}
        const groupId = question.groupId;
        
        let props = {
            // className: error == 1 ? "input-table-error" : "",
            fieldLabel: data.title,
            fieldType: data.logic ? data.logic.toLowerCase() : "and",
            description: <Description content={data.description} src={data.image && data.image.src} imageTitle={data.image && data.image.title} />,
        };

        const fieldMap = {};
        if (data.children) {
            data.children.forEach((child, i) => {
                const _child = JSON.parse(JSON.stringify(child));
                if (child.type === 'input') {
                    _child.maxlength = limits && limits.fieldLimit;
                    _child.min = parseAgeToken(child.range_lower, token);
                    _child.max = parseAgeToken(child.range_upper, token);
                    _child.postfix = child.field_suffix;
                }
                fieldMap[child.cid] = _child;
            });
        }
        
        const names = data.children.map(child => (`${groupId ? `${groupId}.` : ''}${question.id}.${child.cid}`));
        return (
            <div className={'wfui-type-table-format'} >
                {data.description && <Description content={data.description} src={data.image && data.image.src} imageTitle={data.image && data.image.title} />}
                <Fields
                    label={data.title}
                    name={`${groupId ? `${groupId}.` : ''}${question.id}`}
                    names={names}
                    type="text"
                    component={renderTableFormat}
                    globalError={globalError}
                    logic={props.fieldType}
                    fieldMap={fieldMap}
                    required={question.required}
                />
            </div>
        );
    }
}
const TypeTableFormatContainer = connect((state, props) => {
    const formID = props.preview ? 'form_preview' : `form_${props.question.sectionId}`;
    const syncErrors = getFormSyncErrors(formID)(state);
    const qid = typeof props.question.groupIndex !== 'undefined' ? `${props.question.id}[${props.question.groupIndex}]` : props.question.id;

    return {
        globalError: syncErrors && syncErrors.global && syncErrors.global[qid],
    };
})(TypeTableFormat);

export default TypeTableFormatContainer;

/**
 * Preview Component
 */ 
export const TypeTableFormatPreview = reduxForm({
    form: 'form_preview',
    validate: (values, props) => {
        const validatorMap = generateValidatorMap([props.question], 'en');
        return validator(validatorMap)(values);
    },
    destroyOnUnmount: true,
})(TypeTableFormatContainer);
