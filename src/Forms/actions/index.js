import { getFormValues } from 'redux-form';
import { wfuiFetch } from 'wfui-react/lib/util';

export const getForm = (nid, getConfig) => (
    (dispatch) => {
        const config = getConfig();

        // Reset Quesetions
        dispatch({ type: 'RECEIVE_QUESTIONS', questions: [] });

        const req = wfuiFetch(`//${config.API_HOST}${config.API_FORM}/${nid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'app-id': config.APP_ID,
            },
            credentials: 'include',
            requestId: 'getForm',
        }, dispatch);
        return req.promise;
    }
);

export const getSubmission = (nid, lang, getConfig) => (
    (dispatch) => {
        const config = getConfig();
        const req = wfuiFetch(`//${config.API_HOST}${config.API_FORM_ANSWERS}?survey_nid=${nid}&lang=${lang}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'app-id': config.APP_ID,
            },
            credentials: 'include',
            requestId: 'getSubmission',
        }, dispatch);
        return req.promise;
    }
);

export const saveSubmission = (nid, sectionId, lang, getConfig) => (
    (dispatch, getState) => {
        const config = getConfig();
        const answer = getFormValues(`form_${sectionId}`)(getState());
          
        const req = wfuiFetch(`//${config.API_HOST}${config.API_FORM_ANSWERS}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'app-id': config.APP_ID,
            },
            body: JSON.stringify({
                survey_nid: nid,
                lang,
                answer,
            }),
            credentials: 'include',
            requestId: 'saveSubmission',
        }, dispatch);
        return req.promise;
    }
);

// export const saveAnswer = (nid, vid, value, qid, language, callback) => {
//   WFUIJS.$.post(Const.API_SAVE_ANSWER, { nid, vid, qid, val:[value], language }).done((res) => {
//     if(typeof callback === 'function'){
//         callback()
//     }
//   });
// }

// export const submitSubmission = (nid, callback) => {
//   WFUIJS.$.post(Const.API_SUBMIT_SUBMISSION + nid).done((res) => {
//     showMessage({
//       title: "Question Action",
//       text: "Complete Submission",
//       type: "success"
//     });
//     if(typeof callback === 'function'){
//         callback()
//     }
//   });
// }