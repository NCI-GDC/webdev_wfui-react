'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
window.CaG = window.CaG || {};

/**
 * Const file for registration form
 */
CaG.SurveyConst = function () {
    function get(key) {
        return constants[key];
    }
    var constants = {
        survey_form_nid: 90,
        survey_form_nid_fr: 91,
        survey_api_get_form: '/api/survey/get_form',
        survey_api_validate: '/api/survey/validate_fields'
    };
    return get;
};

var APIs = {
    API_LOAD_SURVEY: '/api/survey/load_survey/',
    API_SAVE_SUBMISSION: '/api/survey/save_answers',
    API_SAVE_ANSWER: '/api/survey/save_answer',
    API_LOAD_SUBMISSION: '/api/survey/load_submission/',
    API_SUBMIT_SUBMISSION: '/api/survey/submit_submission/'
};

var E = {
    //Error Codes
    ERR_MISSING_VALUES: "1000",
    ERR_OUT_OF_RANGE: "1001",
    ERR_MISSING_OTHER: "1002"

    //Error Messages
};var getErrorMessages = function getErrorMessages(code, vals) {
    switch (code.toString()) {
        //Common
        case E.ERR_MISSING_VALUES:
            return i18n("Please fill out every field in the table");
        case E.ERR_OUT_OF_RANGE:
            return i18n("The number has to be in the range") + " ( " + (vals.min ? i18n("from") + " " + vals.min + " " : "") + (vals.max ? i18n("to") + " " + vals.max : "") + " )";
        case E.ERR_MISSING_OTHER:
            return i18n("Please fill out a value for this input field");
    }
};

exports.default = Object.assign(APIs, E, { getErrorMessages: getErrorMessages });