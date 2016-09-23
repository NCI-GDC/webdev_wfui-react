import React from 'react';
import {connect} from 'react-redux'
import {filter} from '../actions/action_creators';

const mapStateToKeywordFilterProps = (state) => {
    return { keywordFilter: state.visibilityFilterReducer["keywordFilter"] };
};
@connect(mapStateToKeywordFilterProps)
export default class KeywordFilter extends React.Component{
    onHandleChange(e){
        e.preventDefault();
        const {dispatch} = this.props;
        dispatch(filter('keywordFilter', e.target.value));
        dispatch(filter('pageFilter', 1));
    }
    render(){
        const {keywordFilter} = this.props;
        return (
            <input onChange={this.onHandleChange.bind(this)} type="text" defaultValue={keywordFilter} placeholder="Enter Keywords"/>
        )
    }
}