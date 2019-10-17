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

class Example extends React.Component {
    constructor() {
        super();
        this.state = { info: undefined, sections: undefined };
    }
    componentDidMount() {
        fetch('/sections.json')
            .then(response => response.json())
            .then((response) => {
                this.setState({ sections: response });
            });
        fetch('/survey.json')
            .then(response => response.json())
            .then((response) => {
                this.setState({ info: response });
            });
    }
    render() {
        const { info, sections } = this.state;
        if (info && sections) {
            console.log(info, sections);
            return (
                <Provider store={store}>
                    <WebForm
                        nid={"aa"}
                        displaySubmit={false}
                        allowPrev={true}
                        language={"en"}
                        survey_data={sections}
                        survey_info={info}
                        allowPublish={false}
                        recaptchaSiteKey="6LdU_C8UAAAAAKuomqs1T4_EFWX_iHeblyBB8BYs"
                        onComplete={() => { console.log('submit') }}
                        getConfig={() => ({ API_HOST: '' })}
                        user={{
                            email: "11@11.com",
                            firstname: "Koji",
                            lastname: "Miyauchi"
                        }}
                        allowAnonymousSubmission
                        reviewSubmission
                    />
                </Provider>
            )
        }
        return <div>Loading...</div>
    }
}
export default <Example />;