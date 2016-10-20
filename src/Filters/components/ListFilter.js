import React from 'react';
import {connect} from 'react-redux'
import {filter} from '../actions/action_creators';

const mapStateToListFilterProps = (state) => {
    return { filters: state.visibilityFilterReducer };
};
@connect(mapStateToListFilterProps)
class ListFilter extends React.Component{
    onHandleTagChange(e){
        const {dispatch, filterName, onHandleChange} = this.props;
        e.preventDefault();
        dispatch(filter(filterName+'Filter', e.target.value));
        dispatch(filter('pageFilter', 1));

        if(onHandleChange && typeof onHandleChange == 'function'){
            onHandleChange(e);
        }
    }
    sortObjectByValue(obj){

        var sorted = [];
        Object.keys(obj).forEach((key, i)=>{
            sorted.push({key:[key],value:obj[key]});
        })
        return sorted.sort((a, b)=>{
            var tA = (a.value && a.value.toUpperCase()) || a.value;
            var tB = (b.value && b.value.toUpperCase()) || b.value;
            return (tA < tB) ? -1 : (tA > tB) ? 1 : 0;
            return 
        })
    }
    render(){
        const {filterName, filters, filterMap, labelShowAll} = this.props;
        var filterKey = filterName+'Filter';
        var sorted = this.sortObjectByValue(filterMap)

        return (
            <select onChange={this.onHandleTagChange.bind(this)} value={filters[filterKey]}>
                <option default value="">{labelShowAll}</option>
                {sorted && sorted.map((obj, i)=>{
                    return <option key={i} value={obj.key}>{obj.value}</option>
                })}
            </select>
        )
    }
}
ListFilter.defaultProps = {
  labelShowAll: 'Show All'
}
export default ListFilter