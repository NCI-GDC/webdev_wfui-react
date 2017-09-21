/**
 * Reducer for entire structore, including variables.
 */
export const questionsReducer = (state = [], action) => {
    switch(action.type) {
        case 'RECEIVE_FETCH_DATA':
            if (action.requestId === 'getForm') {
                return action.data.sections || state;
            }
            return state;
        default:
            return state;
    }
};
