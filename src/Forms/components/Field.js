import React from 'react';
import TypeMarkup from './TypeMarkup';
import TypeInputField from './TypeInputField';
import TypeTextarea from './TypeTextarea';
import TypeListbox from './TypeListbox';
import TypeTableFormat from './TypeTableFormat';
import TypeFollowUp from './TypeFollowUp';
import TypeFieldset from './TypeFieldset';
import TypeAddAnother from './TypeAddAnother';
import TypeSelectionHybrid from './TypeSelectionHybrid';

/**
 * Field: Render a field based on webform field type
 */
class Field extends React.Component {
    constructor() {
        super();
        this.state = { shouldUpdate: 0 };
    }
    render() {
        const { fieldCharLimit, field, renderingFollowup } = this.props;
        const { language } = this.context;

        if (field) {
            if (!renderingFollowup && field.showIf && field.showIf.length > 0) { 
                return <TypeFollowUp question={field} lang={language} />
            } else {
                let data;
                switch (field.type) {
                    case 'text':
                        return <TypeMarkup question={field} lang={language} />;
                    case 'textarea':
                        return <TypeTextarea question={field} lang={language} />;
                    case 'listbox':
                        return <TypeListbox question={field} lang={language} />;
                    case 'input-hybrid':
                        return <TypeSelectionHybrid question={field} lang={language} />;
                    case 'input-text':
                        data = field.values[language] || {};
                        if (data.children && data.children.length > 1) {
                            return <TypeTableFormat limits={fieldCharLimit} question={field} lang={language} />
                        }
                        return <TypeInputField limits={fieldCharLimit} question={field} lang={language} />;

                    case 'question-group':
                        data = field.values[language] || {};
                        if (data.add_multiple) {
                            return <TypeAddAnother question={field} lang={language} />;
                        } else {
                            return <TypeFieldset question={field} lang={language} />;
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
