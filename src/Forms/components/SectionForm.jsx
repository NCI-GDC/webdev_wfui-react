import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Section from './Section';
import { generateValidatorMap, validator } from '../helpers/validator';

/**
 * Fields: Render array of field
 */
export default class SectionForm extends React.Component {
    constructor(props) {
        super();
        const lang = 'en';
        this.state = { initialValues: undefined };

        // Need to build logic to validate.
        const validatorMap = generateValidatorMap(props.section.children, lang);
        this.SectionReduxForm = reduxForm({
            form: `form_${props.section.id}`,
            validate: validator(validatorMap),
            destroyOnUnmount: false,
        })(Section);

        // Populate data.
        const initialValues = {};
        if (props.user) {
            initialValues['firstname'] = { field: props.user.firstname };
            initialValues['lastname'] = { field: props.user.lastname };
            initialValues['email'] = { field: props.user.email };
        }

        // Add Inputs field.
        // const addInputsFields = props.section.children.filter(q => (q.type === 'add-inputs')).map(q => q.id);

        if (props.submissions) {
            const questionIDs = props.section.children.map(s => s.id);
            const answeredQuestionIDs = Object.keys(
                props.submissions,
            ).filter(key => questionIDs.includes(key));
            answeredQuestionIDs.forEach(key => {
                // Transform Data if it's add-inputs type question.
                // if (addInputsFields.includes(key) && props.submissions[key]) {
                //     initialValues[key] = props.submissions[key].value.map(val => ({ value: val }));
                // } else {

                initialValues[key] = props.submissions[key];

                // }
            });
        }

        this.state = { initialValues };
    }
    render() {
        const {
            index,
            isActive,
            section,
            form_width,
            submissions,
            user,
            recaptchaSiteKey,
            review,
            reviewSubmission,
        } = this.props;
        const { initialValues } = this.state;

        return (
            <this.SectionReduxForm
                isActive={isActive}
                section={section}
                {...section}
                index={index}
                form_width={form_width}
                initialValues={initialValues}
                recaptchaSiteKey={recaptchaSiteKey}
                user={user}
                review={review}
                reviewSubmission={reviewSubmission}
            />
        );
    }
}
