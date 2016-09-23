import React from 'react';
import {connect} from 'react-redux'
import {filter} from '../actions/action_creators';

const mapStateToListFilterProps = (state) => {
    return { filters: state.visibilityFilterReducer };
};
@connect(mapStateToListFilterProps)
export default class ListFilter extends React.Component{
    onHandleTagChange(e){
        const {dispatch, filterName} = this.props;
        e.preventDefault();
        dispatch(filter(filterName+'Filter', e.target.value));
        dispatch(filter('pageFilter', 1));
    }
    render(){
        const {filterName, filters, filterMap} = this.props;
        var filterKey = filterName+'Filter';
        return (
            <select onChange={this.onHandleTagChange.bind(this)} value={filters[filterKey]}>
                <option default value="">show all</option>
                {filterMap && Object.keys(filterMap).map((key, i)=>{
                    return <option key={i} default value={key}>{key}</option>
                })}
            </select>
        )
    }
}