'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.verifyFormRegister = exports.saveSubmission = exports.getSubmission = exports.getForm = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reduxForm = require('redux-form');

var _util = require('../../util');

var getForm = exports.getForm = function getForm(nid, getConfig) {
    return function (dispatch) {
        var config = getConfig();

        // Reset Quesetions
        dispatch({ type: 'RECEIVE_QUESTIONS', questions: [] });

        var req = (0, _util.wfuiFetch)('//' + config.API_HOST + config.API_USER_FORM + '/' + nid, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'app-id': config.APP_ID
            },
            credentials: 'include',
            requestId: 'getForm'
        }, dispatch);
        return req.promise;
    };
};

var getSubmission = exports.getSubmission = function getSubmission(nid, lang, email, token, getConfig) {
    return function (dispatch) {
        var config = getConfig();
        var req = (0, _util.wfuiFetch)('//' + config.API_HOST + config.API_USER_FORM_ANSWERS + '?survey_nid=' + nid + '&lang=' + lang + (email ? '&email=' + email : '') + (token ? '&token=' + token : ''), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'app-id': config.APP_ID
            },
            credentials: 'include',
            requestId: 'getSubmission'
        }, dispatch);
        return req.promise;
    };
};

var saveSubmission = exports.saveSubmission = function saveSubmission(nid, sectionId, lang, user, parentURL, getConfig) {
    return function (dispatch, getState) {
        var config = getConfig();
        var answer = (0, _reduxForm.getFormValues)('form_' + sectionId)(getState());
        var userInfo = {};
        var meta = {
            linkView: config.FORM_REVIEW_LINK && config.FORM_REVIEW_LINK.replace(':form_id', nid).replace(':lang', lang),
            linkVerify: config.FORM_VERIFY_LINK,
            linkRedirect: parentURL
        };

        // Retrieve firstname, lastname and email for anonymous user.
        if (!user) {
            userInfo.firstname = answer.firstname.field;
            userInfo.lastname = answer.lastname.field;
            userInfo.email = answer.email.field;
        }

        var req = (0, _util.wfuiFetch)('//' + config.API_HOST + config.API_USER_FORM_ANSWERS + '/1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'app-id': config.APP_ID
            },
            body: JSON.stringify(_extends({
                survey_nid: nid,
                lang: lang,
                answer: answer,
                meta: meta
            }, userInfo)),
            credentials: 'include',
            requestId: 'saveSubmission'
        }, dispatch);
        return req.promise;
    };
};

var verifyFormRegister = exports.verifyFormRegister = function verifyFormRegister(values, getConfig) {
    return function (dispatch) {
        var config = getConfig();
        var req = (0, _util.wfuiFetch)('//' + config.API_HOST + config.API_USER_FORM_ANSWERS + '/2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'app-id': config.APP_ID
            },
            body: JSON.stringify(_extends({}, values)),
            requestId: 'verifyFormRegister',
            credentials: 'include'
        }, dispatch);
        return req.promise;
    };
};

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