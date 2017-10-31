"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var transformDataFormToSubmission = exports.transformDataFormToSubmission = function transformDataFormToSubmission(data) {
    var newData = JSON.parse(JSON.stringify(data));
    Object.keys(newData).forEach(function (key) {
        // Data transformation for Add-Inputs type question.
        if (Array.isArray(newData[key])) {
            var answers = [];

            newData[key].forEach(function (answer) {
                answers.push(answer.value);
            });
            newData[key] = { value: answers };
        }
    });
    return newData;
};