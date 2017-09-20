import React from 'react';
import { FieldArray } from 'redux-form';
import Description from '../../FormFields/Description';
import { renderAddAnother } from '../../FormFields/';
import Fields from './Fields';

/**
 * Wrapper for Question Type 9 (Add Another)
 */
class TypeAddAnother extends React.Component {
    render() {
        const { question, lang } = this.props;
        const data = question.values[lang] || {};

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
            <div className={'wfui-type-add-another'} >
                {data.description && <Description content={data.description} src={data.image && data.image.src} imageTitle={data.image && data.image.title} />}
                <FieldArray
                    name={question.id}
                    type="select"
                    className="bluetext"
                    component={renderAddAnother}
                    label={data.title}
                    childComponent={(groupId, i) => (
                        <Fields groupId={groupId} groupIndex={i} section={question} />
                    )}
                    draggable
                />
            </div>
        );
    }
}
export default TypeAddAnother;
