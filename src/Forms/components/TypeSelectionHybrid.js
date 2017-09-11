import React from 'react';
import { Fields, getFormSyncErrors, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as inputHybridUtils from '../helpers/input_hybrid';
import { parseAgeToken } from '../helpers/input_hybrid.js';

import { renderSelectionHybridRadio, renderSelectionHybridCheckbox } from '../../FormFields/';
import Description from '../../FormFields/Description';

/**
 * Wrapper for Question Type 8 (Input hybrid)
 */
class TypeSelectionHybrid extends React.Component {
    constructor(){
        super();
        this.state = { value: undefined, values:{}, exc:[], other:"", saving: false };
    }
    render() {
        
        const { question, question: {limits}, lang, submitted, token, errors, preview, globalError } = this.props;

        const data = question.values[lang] || {}
        const groupId = question.groupId;
        const options = data.options || [];

        const fieldMap = {};
        if (data.children) {
            data.children.forEach((child, i) => {
                const _child = JSON.parse(JSON.stringify(child));
                if (child.type === 'input') {
                    _child.maxlength = limits && limits.fieldLimit;
                    _child.min = parseAgeToken(child.range_lower, token);
                    _child.max = parseAgeToken(child.range_upper, token);
                }
                fieldMap[child.input_id || `_${data.select_type}`] = _child;
            });
        }
        
        if (data.select_type === 'radio') {
            return (
                <div className={'wfui-type-selection-hybrid'} >
                    {data.description && <Description content={data.description} src={data.image && data.image.src} imageTitle={data.image && data.image.title} />}
                    <Fields
                        label={data.title}
                        name={`${groupId ? `${groupId}.` : ''}${question.id}`}
                        names={data.children.map((child) => (`${groupId ? `${groupId}.` : ''}${question.id}.${child.cid}`))}
                        type={'checkbox'}
                        selectType={data.select_type}
                        component={renderSelectionHybridRadio}
                        options={options}
                        fieldMap={fieldMap}
                        columnCount={question.column_count}
                        {...inputHybridUtils}
                        globalError={globalError}
                        required={question.required}
                    />
                </div>
            );
        } else {
            return (
                <div className={'wfui-type-selection-hybrid'} >
                    {data.description && <Description content={data.description} src={data.image && data.image.src} imageTitle={data.image && data.image.title} />}
                    <Fields
                        label={data.title}
                        name={`${groupId ? `${groupId}.` : ''}${question.id}`}
                        names={data.children.map((child) => (`${groupId ? `${groupId}.` : ''}${question.id}.${child.cid}`))}
                        type={'checkbox'}
                        selectType={data.select_type}
                        component={renderSelectionHybridCheckbox}
                        options={options}
                        fieldMap={fieldMap}
                        columnCount={question.column_count}
                        {...inputHybridUtils}
                        globalError={globalError}
                        required={question.required}
                    />
                </div>
            );
        }
    }
}
const TypeSelectionHybridContainer = connect((state, props) => {
    const formID = props.preview ? 'form_preview' : `form_${props.question.sectionId}`;
    const syncErrors = getFormSyncErrors(formID)(state);
    const qid = typeof props.question.groupIndex !== 'undefined' ? `${props.question.id}[${props.question.groupIndex}]` : props.question.id;
    
    return {
        globalError: syncErrors && syncErrors.global && syncErrors.global[qid],
    };
})(TypeSelectionHybrid);

export default TypeSelectionHybridContainer;

/**
 * Preview Component
 */
export const TypeSelectionHybridPreview = reduxForm({
    form: 'form_preview',
    validate: (values, props) => {
        const validatorMap = generateValidatorMap([props.question], 'en');
        return validator(validatorMap)(values);
    },
    destroyOnUnmount: true,
})(TypeSelectionHybridContainer);
