import React from 'react';
import { connect } from 'react-redux';
import { FieldArray, getFormSyncErrors } from 'redux-form';
import Description from '../../FormFields/Description';
import { renderFilterTable } from '../../FormFields/';
import Fields from './Fields';


/**
 * Wrapper for Question Type 9 (Add Another)
 */
class TypeFilterTable extends React.Component {
    render() {
        const { question, lang, globalError, localErrors } = this.props;
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

        console.log(globalError, 'TypeFilterTableContainer');
        
        return (
            <div className={'wfui-type-field-table'} >
                {data.description && <Description content={data.description} src={data.image && data.image.src} imageTitle={data.image && data.image.title} />}
                <FieldArray
                    name={question.id}
                    questions={question.children}
                    lang={lang}
                    type="select"
                    className="bluetext"
                    component={renderFilterTable}
                    label={data.title}
                    globalError={globalError}
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
    const qid = typeof props.question.groupIndex !== 'undefined' ? `${props.question.id}[${props.question.groupIndex}]` : props.question.id;

    console.log(syncErrors, 'TypeFilterTableContainer');

    return {
        globalError: syncErrors && syncErrors.global && syncErrors.global[qid],
    };
})(TypeFilterTable);

export default TypeFilterTableContainer;
