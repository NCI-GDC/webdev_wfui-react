import React from 'react';
import {connect} from 'react-redux'
import {filter} from '../actions/action_creators';

const mapStateToKeywordFilterProps = (state) => {
    return { keywordFilter: state.visibilityFilterReducer["keywordFilter"] };
};
@connect(mapStateToKeywordFilterProps)
class KeywordFilter extends React.Component{
    onHandleChange(e){
        e.preventDefault();
        const {dispatch, onHandleChange} = this.props;
        dispatch(filter('keywordFilter', e.target.value));
        dispatch(filter('pageFilter', 1));

        if(onHandleChange && typeof onHandleChange == 'function'){
            onHandleChange(e);
        }
    }
    render(){
        const {keywordFilter, placeholder} = this.props;
        return (
            <input onChange={this.onHandleChange.bind(this)} type="text" defaultValue={keywordFilter} placeholder={placeholder} />
        )
    }
}
KeywordFilter.defaultProps = {
  placeholder: 'Enter Keywords'
}
export default KeywordFilter