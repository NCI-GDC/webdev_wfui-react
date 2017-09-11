'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
// Check if the question is answered
var validateAnswered = function validateAnswered(question, value) {
    var result = true;
    if (!value) {
        // console.log('SubmissionCount not answered!', value);
        result = false;
    } else {

        // Check empty checkbox.
        if (question.type === 'input-hybrid') {
            Object.keys(value).forEach(function (cid) {
                //console.log('SubmissionCount checkbox is not answered!')
                if (Array.isArray(value[cid]) && !value[cid].length) result = false;
            });
        }
    }
    return result;
};

// Check if answers are valid
var validateValidAnswered = function validateValidAnswered(syncError, globalError) {
    var result = true;
    // console.log(syncError, 'SubmissionCount syncErrors');
    // Check local errors
    Object.keys(syncError).forEach(function (key) {
        if (syncError[key] !== '') {
            //console.log('SubmissionCount local error!', syncError);
            result = false;
        }
    });

    // Check global errors
    if (globalError && globalError !== '') {
        result = false;
        //console.log('SubmissionCount global error!', globalError);
    }
    return result;
};

var countSubmissions = exports.countSubmissions = function countSubmissions(questions, values, syncErrors, globalErrors, counts) {
    var groupIndex = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : -1;


    // Go through answered questions and check if it's valid answer.

    // console.log(questions, 'SubmissionCount questions');
    // console.log(syncErrors, 'SubmissionCount syncErrors');
    // console.log(values, 'SubmissionCount values');
    // console.log(globalErrors, 'SubmissionCount globalErrors');
    // console.log('SubmissionCount =======================================================');

    if (!values) return false;
    var allResults = true;

    questions.forEach(function (question) {

        var result = true;
        if (question.type !== 'text') {
            if (question.type === 'question-group') {

                // console.log('GroupSubmissionCount question-group', question);
                if (!values[question.id]) {
                    result = false;
                } else {
                    values[question.id].forEach(function (value, i) {
                        // console.log('GroupSubmissionCount question.id', question.id);
                        // console.log('GroupSubmissionCount question.children', question.children);
                        // console.log('GroupSubmissionCount value', value);
                        // console.log('GroupSubmissionCount syncError', syncErrors[question.id][i]);
                        // console.log('GroupSubmissionCount >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
                        var res = countSubmissions(question.children, value, syncErrors[question.id][i], globalErrors, null, i);
                        // console.log('GroupSubmissionCount <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
                        // console.log('GroupSubmissionCount res', i, res);
                        result = result && res;
                    });
                }
            } else {
                // if (values[question.id]) {
                //     console.log(values[question.id], TAG + ' values[question.id]');
                // }

                // Is it answered ?
                result = result && validateAnswered(question, values[question.id]);

                // Is it valid ?
                var globalError = void 0;
                if (globalErrors) globalError = groupIndex > -1 ? globalErrors[question.id + '[' + groupIndex + ']'] : globalErrors[question.id];
                result = result && validateValidAnswered(syncErrors[question.id], globalError);
            }
        }
        if (counts && result) counts.completed += 1;
        allResults = allResults && result;
    });
    return allResults;
};