import React from 'react';
import TypeMarkup from './TypeMarkup';
import TypeInputField from './TypeInputField';
import TypeTextarea from './TypeTextarea';
import TypeListbox from './TypeListbox';
import TypeTableFormat from './TypeTableFormat';
import TypeFollowUp from './TypeFollowUp';
import TypeFieldset from './TypeFieldset';
import TypeAddAnother from './TypeAddAnother';
import TypeFilterTable from './TypeFilterTable';
import TypeSelectionHybrid from './TypeSelectionHybrid';
import TypeAddInputs from './TypeAddInputs';
import TypeTagInput from './TypeTagInput';

/**
 * Field: Render a field based on webform field type
 */
class Field extends React.Component {
    constructor() {
        super();
        this.state = { shouldUpdate: 0 };
    }
    render() {
        const { fieldCharLimit, field, renderingFollowup, review } = this.props;
        const { language } = this.context;

        if (field) {
            if (!renderingFollowup && field.showIf && field.showIf.length > 0) { 
                return <TypeFollowUp question={field} lang={language} review={review} />
            } else {
                let data;
                switch (field.type) {
                    case 'text':
                        return <TypeMarkup question={field} lang={language} review={review} />;
                    case 'textarea':
                        return <TypeTextarea question={field} lang={language} review={review} />;
                    case 'listbox':
                        return <TypeListbox question={field} lang={language} review={review} />;
                    case 'add-inputs':
                        return <TypeAddInputs question={field} lang={language} review={review} />;
                    case 'input-hybrid':
                        return <TypeSelectionHybrid question={field} lang={language} review={review} />;
                    case 'input-tag':
                        return <TypeTagInput question={field} lang={language} review={review} />;
                    case 'input-text':
                        data = field.values[language] || {};
                        if (data.children && data.children.length > 1) {
                            return <TypeTableFormat limits={fieldCharLimit} question={field} lang={language} review={review} />
                        }
                        return <TypeInputField limits={fieldCharLimit} question={field} lang={language} review={review} />;

                    case 'question-group':
                        data = field.values[language] || {};
                        if (data.add_multiple) {
                            if (data.filter) {
                                return <TypeFilterTable question={field} lang={language} review={review} />;
                            } else {
                                return <TypeAddAnother question={field} lang={language} review={review} />;
                            }
                        } else {
                            return <TypeFieldset question={field} lang={language} review={review} />;
                        }
                    default:
                        if(field.type){
                            console.log("Type \'"+ field.type +"\' is not available to render.")
                        }else{
                            console.log("Error: This is not field object.")
                        }
                        return null;
                }
            }
        }
        return null;
    }
}
Field.propTypes = {
    fieldCharLimit: React.PropTypes.number,
};
Field.defaultProps = {
    fieldCharLimit: 140,
};
Field.contextTypes = {
    language: React.PropTypes.string,
};

export default Field;
