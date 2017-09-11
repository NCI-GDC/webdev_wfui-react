import React from 'react';
import { connect } from 'react-redux';
import { getFormValues, getFormSyncErrors } from 'redux-form';

import NavigationList from './NavigationList';
import ProgressIndicator from './ProgressIndicator';
import { questionSelector } from '../selectors/questions';
import { countSubmissions } from '../helpers/progressCounter';

class NavigationListItem extends React.Component {
    goto() {
        const {index, activeId} = this.props;
        if (index >= 0) {
            this.context.goto(index);
        }
    }
    render() { 
        const { activeId, section, is_subsection, index, completed, total, lang } = this.props;

        const data = section.values['en'] || {}

        return (
            <li className={`survey-section ${activeId === index ? 'active': ''} ${is_subsection ? '':'survey-section'}`}>
                <div onClick={this.goto.bind(this)}>
                    <ProgressIndicator completed={completed} total={total} />
                    <a>{index+1}. {data.title}</a>
                </div>
                {section.sub_sections && <NavigationList section_rules={section.sub_sections} is_subsection={true}/>}
            </li>
        );
    }
}
NavigationListItem.contextTypes = {
    goto: React.PropTypes.any,
    language: React.PropTypes.string,
};

export default connect((state, props) => {
    const formId = `form_${props.section.id}`;
    const values = getFormValues(formId)(state);
    const syncErrors = getFormSyncErrors(formId)(state);
    const questions = questionSelector(props.section.id)(state).children.filter((question, i) => {
        if ((question.showIf && question.showIf.length) || question.type === 'text') return false;
        return true;
    });

    const counts = {
        completed: 0,
        total: questions.length,
    };

    if (values) countSubmissions(questions, values, syncErrors, syncErrors.global, counts);

    return counts;
})(NavigationListItem);
