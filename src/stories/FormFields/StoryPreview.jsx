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

// Modal Dialog
import { modalReducer } from '../../components/ModalDialog/reducer';

const store = createStore(
    combineReducers({
        form: formReducer,
        fetch: fetchReducer,
        modal: modalReducer,
    }),
    {},
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
);

const {
    renderField,
    renderTextArea,
    renderRadios,
    renderSingleCheckbox,
    renderSelect,
    renderCheckboxes,
    renderAddAnother,
    renderPhoto,
    renderTimezone,
    renderDate,
    renderTags,
    renderFileUpload,
    Description,
} = FormFields;

const validate = values => {
    const errors = {};

    if (!values.title) {
        errors.title = 'Required';
    }

    return errors;
};

class Forms extends React.Component {
    render() {
        const {
            handleSubmit,
            pristine,
            submitting,
            pubTypes,
            patentsStatus,
            initialValues,
            intl,
            pageAll,
        } = this.props;

        return (
            <form>
                <Field
                    name="renderField"
                    type="text"
                    className="title-box"
                    component={renderField}
                    label="renderField"
                    placeholder=""
                    help="Help Texts Help Texts Help Texts Help Texts Help Texts Help Texts"
                    required
                    disabled
                    preview
                />
                <Field
                    name="renderTextArea"
                    type="textarea"
                    label="renderTextArea"
                    component={renderTextArea}
                    help="Help Texts Help Texts Help Texts Help Texts Help Texts Help Texts"
                    placeholder="renderTextArea"
                    disabled
                    preview
                />
                <Field
                    name="renderSingleCheckbox"
                    type="checkbox"
                    option="renderSingleCheckbox"
                    className="active-checkbox"
                    help="Help Texts Help Texts Help Texts Help Texts Help Texts Help Texts"
                    component={renderSingleCheckbox}
                    disabled
                    preview
                />
                <Field
                    name="renderCheckboxes"
                    type="checkbox"
                    component={renderCheckboxes}
                    options={['OptionA', 'OptionB', 'OptionC']}
                    label="renderCheckboxes"
                    help="Help Texts Help Texts Help Texts Help Texts Help Texts Help Texts"
                    required
                    disabled
                    preview
                />
                <Field
                    name="renderCheckboxes2"
                    type="checkbox"
                    component={renderCheckboxes}
                    options={['OptionA', 'OptionB', 'OptionC']}
                    label="renderCheckboxes2"
                    help="Help Texts Help Texts Help Texts Help Texts Help Texts Help Texts"
                    required
                    disabled
                    preview
                />
                <Field
                    name="renderRadios"
                    type="checkbox"
                    component={renderRadios}
                    options={['OptionA', 'OptionB', 'OptionC']}
                    help="Help Texts Help Texts Help Texts Help Texts Help Texts Help Texts"
                    label="renderRadios"
                    disabled
                    preview
                />
                <Field
                    name="renderRadios2"
                    type="checkbox"
                    component={renderRadios}
                    options={['OptionA', 'OptionB', 'OptionC']}
                    help="Help Texts Help Texts Help Texts Help Texts Help Texts Help Texts"
                    label="renderRadios2"
                    disabled
                    preview
                />
                <Field
                    name="renderSelect"
                    type="select"
                    className="dev-stage"
                    component={renderSelect}
                    label="renderSelect"
                    help="Help Texts Help Texts Help Texts Help Texts Help Texts Help Texts"
                    options={['-- Select an Option --', 'A', 'B']}
                    disabled
                    preview
                />
                <Field
                    name="renderPhoto"
                    label="renderPhoto"
                    help="Help Texts Help Texts Help Texts Help Texts Help Texts Help Texts"
                    component={renderPhoto}
                    disabled
                    preview
                />
                <Field
                    name="renderTimezone"
                    help="Help Texts Help Texts Help Texts Help Texts Help Texts Help Texts"
                    placeholder="Choose timezone"
                    label="renderTimezone"
                    component={renderTimezone}
                    disabled
                    preview
                />
                <Field
                    name="renderDate2"
                    label="renderDate2"
                    component={renderDate}
                    disabled
                    preview
                />
                <Field
                    name="renderTags"
                    help="Help Texts Help Texts Help Texts Help Texts Help Texts Help Texts"
                    label="renderTags"
                    component={renderTags}
                    withContext
                    disabled
                    preview
                />
                <FieldArray
                    name="renderAddAnother"
                    type="select"
                    component={renderAddAnother}
                    label="renderAddAnother"
                    childComponent={renderAddAnother => (
                        <div>
                            <Field
                                name={`${renderAddAnother}.FirstName_txt`}
                                type="text"
                                component={renderField}
                                label="First Name:"
                                placeholder=""
                                disabled
                                preview
                            />
                            <Field
                                name={`${renderAddAnother}.LastName_txt`}
                                type="text"
                                component={renderField}
                                label="Last Name"
                                placeholder=""
                                required
                                disabled
                                preview
                            />
                        </div>
                    )}
                    disabled
                    preview
                />
                <Field
                    name="renderFileUpload"
                    type="text"
                    component={renderFileUpload}
                    maxFileSize={10000000}
                    fileTypes={['pdf', 'jpg', 'png']}
                    onUpload={() => {
                        console.log('aaaa');
                    }}
                    required
                    disabled
                    preview
                />
                <Field
                    name="renderFileUpload2"
                    type="text"
                    component={renderFileUpload}
                    maxFileSize={10000000}
                    fileTypes={['pdf', 'jpg', 'png']}
                    onUpload={() => {
                        console.log('aaaa');
                    }}
                    descDisplay={
                        <Description content="Text Text Text Text Text TextText Text TextText Text TextText Text TextText Text Text" />
                    }
                    required
                    disabled
                    preview
                />
            </form>
        );
    }
}

const FormsReduxForm = reduxForm({
    form: 'test',
    validate,
    initialValues: {
        renderField: 'renderField text',
        renderTextArea: 'renderTextArea text renderTextArea text renderTextArea text renderTextArea text renderTextArea text renderTextArea text renderTextArea text renderTextArea text renderTextArea text renderTextArea text renderTextArea text renderTextArea text renderTextArea text renderTextArea text renderTextArea text renderTextArea text renderTextArea text renderTextArea text renderTextArea text renderTextArea text renderTextArea text renderTextArea text renderTextArea text renderTextArea text renderTextArea text renderTextArea text renderTextArea text renderTextArea text renderTextArea text renderTextArea text renderTextArea text renderTextArea text renderTextArea text renderTextArea text',
        renderSingleCheckbox: true,
        renderCheckboxes: ['OptionA'],
        renderRadios: 'OptionB',
        renderSelect: 'A',
        renderPhoto: {
            title: 'title',
            src:
                'data:image/png;base64,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',
        },
        renderTimezone: '(GMT-11:00) Niue',
        renderTags: ['test', 'test2'],
        renderAddAnother: [
            {
                FirstName_txt: 'Test',
                LastName_txt: 'Test',
            },
        ],
        renderFileUpload: {
            blobPath:
                'blob:http://0.0.0.0:6006/06466299-bf1c-4e87-bc70-3bbe0df37ae2',
            data:
                'data:image/png;base64,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',
            name: 'Screen Shot 2018-04-06 at 2.52.02 PM.png',
            type: 'image/png',
        },
        renderDate2: '2018-04-10T14:30:00.000Z',
    },
})(Forms);

const example = (
    <Provider store={store}>
        <FormsReduxForm />
    </Provider>
);
export default example;
