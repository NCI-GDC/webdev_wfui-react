import { createSelector } from 'reselect';

export const questionsSelector = state => state.questionsReducer;

export const questionSelector = id => createSelector(
    questionsSelector,
    (questions) => {
        const res = questions.filter(question => (question.id === id));
        return (res.length ? res[0] : undefined);
    },
);
