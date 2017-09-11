'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.questionSelector = exports.questionsSelector = undefined;

var _reselect = require('reselect');

var questionsSelector = exports.questionsSelector = function questionsSelector(state) {
    return state.questionsReducer;
};

var questionSelector = exports.questionSelector = function questionSelector(id) {
    return (0, _reselect.createSelector)(questionsSelector, function (questions) {
        var res = questions.filter(function (question) {
            return question.id === id;
        });
        return res.length ? res[0] : undefined;
    });
};