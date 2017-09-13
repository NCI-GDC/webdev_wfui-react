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
        this.state = { initialValues: undefined }

        // Need to build logic to validate.
        const validatorMap = generateValidatorMap(props.section.children, lang);
        this.SectionReduxForm = reduxForm({
            form: `form_${props.section.id}`,
            validate: validator(validatorMap),
            destroyOnUnmount: false,
        })(Section);

        if (props.submissions) {
            const questionIDs = props.section.children.map((s) => (s.id));
            const answeredQuestionIDs = Object.keys(props.submissions).filter((key) => (questionIDs.includes(key)));
            const initialValues = {};
            answeredQuestionIDs.forEach((key) => {
                initialValues[key] = props.submissions[key];
            });
            this.state = { initialValues }
        }
    }
    render() {
        const { index, isActive, section, form_width, submissions, loggedin, recaptchaSiteKey } = this.props;
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
                loggedin={loggedin}
            />
        );
    }
}