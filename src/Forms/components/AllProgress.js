import React from 'react';
import { getFormValues, getFormSyncErrors } from 'redux-form';
import { connect } from 'react-redux';
import ProgressIndicator from './ProgressIndicator';
import { questionSelector } from '../selectors/questions';
import { countSubmissions } from '../helpers/progressCounter';

class AllProgress extends React.Component {
    render() {
        const { total, completed } = this.props;
        // const {submission, survey_data} = this.props;
        // const {language} = this.context;
        // const { completed, total } = countTotalAnsweredQuestions(survey_data, submission);

        return (
            <li className="overall-progress">
                <div>
                    <ProgressIndicator completed={completed} total={total} />
                    <h3 className="overall-progress">Overall Progress:</h3>
                    <h4 className="overall-progress">{Math.ceil(completed/total*100)}% Complete</h4>
                </div>
                
            </li>
        );
    }
}

export default connect((state, props) => {
    let total = 0;
    let completed = 0;
    
    if (props.survey_data) {
        props.survey_data.forEach((section) => {
            const formId = `form_${section.id}`;
            const values = getFormValues(formId)(state);
            const syncErrors = getFormSyncErrors(formId)(state);
            const questions = questionSelector(section.id)(state).children.filter((question, i) => {
                if ((question.showIf && question.showIf.length) || question.type === 'text') return false;
                return true;
            });

            const counts = { completed: 0 };
            if (values) countSubmissions(questions, values, syncErrors, syncErrors.global, counts);
            total += questions.length;
            completed += counts.completed;
        });
    }
    return {
        total,
        completed,
    };
})(AllProgress);

