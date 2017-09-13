import React from 'react';
import { FieldArray } from 'redux-form';
import { renderAddAnother } from '../../FormFields/';

// import Fields from './Fields';

// import renderAddAnother from './FormFields/renderAddAnother';

// import Field from './Field'
// import anothersReducers from '../reducers/CustomAddAnotherReducer.jsx'
// import { Provider, AnotherTable, Description, createStore } from 'wfui-react/lib/CaGForms/';

/**
 * Wrapper for Question Type 9 (Add Another)
 */
class TypeAddAnother extends React.Component {
    constructor() {
        super();
        // this.onHandleChange = this.onHandleChange.bind(this);
        // this.store = createStore(anothersReducers);
    }
    render() {
        const { question } = this.props;
        
        // const that = this;
        // const {field} = this.props;
        // //TODO Lables for field button and table.
        // let props = {
        //     label: this.getTitle(field),
        //     description: <Description content={field['#description']} type={this.getDescriptionType(field)} />,
        //     tableLabel: field['#table_label'],
        //     buttonLabel: field['#button_label'],
        // }

        // return(
        //     <div className={this.getClassName(field) + "show-table-" + field['#show_table']}>
        //         <Provider store={this.store}>
        //             <AnotherTable {...props} >
        //                 {field['#fields'].map(function(_field, i){
        //                     return <Field key={i} field={_field} />
        //                 })}
        //             </AnotherTable>
        //         </Provider>
        //     </div>
        // );
        
        return (
            <FieldArray
                name={question.id}
                type="select"
                className="bluetext"
                component={renderAddAnother}
                label={'test'}
                childComponent={(groupId, i) => (
                    <Fields groupId={groupId} groupIndex={i} section={question} />
                )}
                draggable
            />
        );
    }
}
export default TypeAddAnother;

/**

const { renderField, renderTextArea, renderAddAnother, renderRadios, renderCheckboxs, renderSingleCheckbox, renderSelect } = FormFields;


<FieldArray
    name="License_list"
    type="select"
    className="bluetext"
    component={renderAddAnother}
    label={intl.formatMessage({ id: 'project_labels.licenses', defaultMessage: 'Licenses:' })}
    childComponent={item => (
        <div>
            <Field
                name={`${item}.Title_txt`}
                type="text"
                label={intl.formatMessage({ id: 'licenses_fields.license_name', defaultMessage: 'License Name:' })}
                component={renderTextArea}
                placeholder=""
                required
            />
            <Field
                name={`${item}.Comment_txt`}
                type="text"
                label={intl.formatMessage({ id: 'licenses_fields.comment', defaultMessage: 'Comments:' })}
                component={renderTextArea}
                placeholder=""
            />
            <Field
                name={`${item}.StartDate_tdt`}
                type="date"
                label={intl.formatMessage({ id: 'licenses_fields.start_date', defaultMessage: 'Start Date:' })}
                component={renderField}
                required
            />
        </div>
    )}
    draggable
/>
 */