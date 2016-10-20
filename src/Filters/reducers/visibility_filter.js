/**
 * Reducer for visibility filter
 */
const visibilityFilterReducer = (state = {pageFilter:1}, action) => {
    switch(action.type){

        case 'SET_VISIBILITY_FILTER':
            var newState = JSON.parse(JSON.stringify(state));
            if(typeof action.checked == 'undefined'){
                newState[action.filter] = action.keyword;
            }else{
                newState[action.filter][action.keyword] = action.checked;
            }
            return newState;

        case 'RESET_VISIBILITY_FILTER':
            var newState = JSON.parse(JSON.stringify(state));
            Object.keys(newState).map((key, i)=>{
                newState[key] = "";
            })
            return newState;

    }
    return state;
}
export default visibilityFilterReducer
