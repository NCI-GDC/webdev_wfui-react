import React from 'react';
import {connect} from 'react-redux'
import {filter} from '../actions/action_creators';

const mapStateToListFilterProps = (state) => {
    return { filters: state.visibilityFilterReducer };
};
@connect(mapStateToListFilterProps)
class ListFilter extends React.Component{
    onHandleTagChange(e){
        const {dispatch, filterName} = this.props;
        e.preventDefault();
        dispatch(filter(filterName+'Filter', e.target.value));
        dispatch(filter('pageFilter', 1));
    }
    render(){
        const {filterName, filters, filterMap, labelShowAll} = this.props;
        var filterKey = filterName+'Filter';
        return (
            <select onChange={this.onHandleTagChange.bind(this)} value={filters[filterKey]}>
                <option default value="">{labelShowAll}</option>
                {filterMap && Object.keys(filterMap).map((key, i)=>{
                    return <option key={i} default value={key}>{filterMap[key]}</option>
                })}
            </select>
        )
    }
}
ListFilter.defaultProps = {
  labelShowAll: 'Show All'
}
export default ListFilter