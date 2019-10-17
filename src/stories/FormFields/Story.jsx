import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { reduxForm, Field, Fields, FieldArray } from 'redux-form';
import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { IntlProvider } from 'react-intl';
import * as FormFields from '../../components/FormFields';
// import '../../components/FormFields/index.scss';
import { fetchReducer } from '../../components/util/wfuiFetch/reducer';

const { renderField } = FormFields;

const validate = (values) => {
    const errors = {};

    if (!values.title) {
        errors.title = 'Required';
    }

    return errors;
};

class Forms extends React.Component {
    render() {
        return (
            <form>
                <Field
                    name="title"
                    type="text"
                    component={renderField}
                    label={'Text Field'}
                    help={'Provide a brief but descriptive job title. E.g. Senior Bioinformatics / Ontology Application Developer'}
                    placeholder={''}
                    required
                />
            </form>
        )
    }
}

const FormsReduxForm = reduxForm({
    form: 'test',
    validate,
})(Forms);

const example = (
    <Provider store={store}>
        <FormsReduxForm />
    </Provider>
);
export default example;