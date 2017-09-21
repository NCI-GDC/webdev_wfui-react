import React from 'react';
import { connect } from 'react-redux';
import { FieldArray, getFormSyncErrors, getFormValues } from 'redux-form';
import Description from '../../FormFields/Description';
import { renderFilterTable } from '../../FormFields/';
import Fields from './Fields';
import deepEqual from 'deep-equal';

/**
 * Wrapper for Question Type 9 (Add Another)
 */
class TypeFilterTable extends React.Component {
    constructor() {
        super();
        this.state = { valueChanged: 0 };
    }
    componentWillReceiveProps(nextProps) {
        // Checkbox answers won't update FieldArray for some reason.
        // This is a work around to forcely update when user answers checkbox type questions.
        if (!deepEqual(this.props.values, nextProps.values)) { 
            this.setState({ valueChanged: new Date().getTime() });
        }
    }
    render() {
        const { question, lang, syncErrors } = this.props;
        const { valueChanged } = this.state;
        const data = question.values[lang] || {};
        
        // console.log(question, 'question!!');
        // const that = this;
        // const {field} = this.props;
        // //TODO Lables for field button and table.
        // let props = {
        //     label: this.getTitle(field),
        //     description: <Description content={field['#description']} type={this.getDescriptionType(field)} />,
        //     tableLabel: field['#table_label'],
        //     buttonLabel: field['#button_label'],
        // }
        
        return (
            <div className={'wfui-type-field-table'} >
                {data.description && <Description content={data.description} src={data.image && data.image.src} imageTitle={data.image && data.image.title} />}
                <FieldArray
                    name={question.id}
                    lang={lang}
                    type="select"
                    questions={question.children}
                    component={renderFilterTable}
                    label={data.title}
                    syncErrors={syncErrors}
                    valueChanged={valueChanged}
                    childComponent={(groupId, i) => (
                        <Fields groupId={groupId} groupIndex={i} section={question} />
                    )}
                    draggable
                />
            </div>
        );
    }
}

const TypeFilterTableContainer = connect((state, props) => {
    const formID = props.preview ? 'form_preview' : `form_${props.question.sectionId}`;
    const syncErrors = getFormSyncErrors(formID)(state);
    // const qid = typeof props.question.groupIndex !== 'undefined' ? `${props.question.id}[${props.question.groupIndex}]` : props.question.id;
    
    return {
        syncErrors: syncErrors || {},
        values: getFormValues(formID)(state),
    };
})(TypeFilterTable);

export default TypeFilterTableContainer;
