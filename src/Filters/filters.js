import React from 'react';
import {connect} from 'react-redux'
import {filterByCompany, filterByKeyword} from './actions/action_creators';

const mapStateToFiltersProps = (state) => {
    const genCompanyMap = (state) => {
        var map = {}
        state.forEach((person, i)=>{
            if(!map[person.company]){
                map[person.company] = true
            }
        });
        return map
    }
    const applyCompanyFilter = (state, company) => {
        return state.filter((person, i)=>{
            if(!company){
                return true
            }
            return person.company == company
        });
    }

    const applyKeywordFilter = (state, keywords) => {
        return state.filter((state, i)=>{
            if(!keywords) return true;
            const keys = keywords.split(" ");
            let result = false;
            keys.forEach((key, j)=>{
                key = key.toLowerCase();
                if(!key) return false;
                if(state.name.fname.toLowerCase().includes(key)
                    || state.name.lname.toLowerCase().includes(key)
                    || state.company.toLowerCase().includes(key) ){
                        result = true
                }
            });
            return result;
        });
    }

    var filtered = applyCompanyFilter(state.dataReducer, state.visibilityFilterReducer.companyFilter)
    filtered = applyKeywordFilter(filtered, state.visibilityFilterReducer.keywordFilter)

    return {
        data: state.dataReducer,
        filtered: filtered,
        filters: state.visibilityFilterReducer,
        companyMap: genCompanyMap(state.dataReducer)
    }
}
@connect(mapStateToFiltersProps)
class Filters extends React.Component{
    onHandleChange(e){
        const {dispatch} = this.props;
        e.preventDefault();
        dispatch(filterByKeyword(e.target.value));
    }
    onHandleTagChange(e){
        const {dispatch} = this.props;
        e.preventDefault();
        dispatch(filterByCompany(e.target.value));
    }
    render(){
        const {filtered, data, filters, companyMap} = this.props;
        
        return(
            <div>
                <div>
                    <label>By Tag:</label>
                    <select onChange={this.onHandleTagChange.bind(this)} value={filters.companyFilter}>
                        <option default value="">show all</option>
                        {Object.keys(companyMap).map((key, i)=>{
                            return <option key={i} default value={key}>{key}</option>
                        })}
                    </select>
                    <label>By Keyword:</label>
                    <input onChange={this.onHandleChange.bind(this)} type="text" defaultValue={filtered.keywordFilter} placeholder="Enter Keywords"/>
                </div>
                <ul>
                {filtered.map((item, i)=>{
                    return (
                        <li key={i}>
                            <p><b>Name: </b>{item.name.fname} {item.name.lname}</p>
                            <p><b>Age: </b>{item.age}</p>
                            <p><b>Company: </b>{item.company}</p>
                        </li>
                    )
                })}
                </ul>
            </div>
        )
    }
}

export default Filters