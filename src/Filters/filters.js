import React from 'react';
import {connect} from 'react-redux'
var {Util, ListFilter, KeywordFilter, AlphabetFilter, Pagenate, Showing, filter} = require('./index');
const NumberPerPage = 3;

const mapStateToFiltersProps = (state) => {

    var filtered = Util.applyListFilter(state.dataReducer, state.visibilityFilterReducer.companyFilter, 'company')
    filtered = Util.applyKeywordFilter(filtered, state.visibilityFilterReducer.keywordFilter)
    filtered = Util.applyAlphabetFilter(filtered, state.visibilityFilterReducer.alphabetFilter, 'fname')
    
    var pagenated = Util.applyPageFilter(filtered, state.visibilityFilterReducer.pageFilter, NumberPerPage)

    return {
        data: state.dataReducer,
        filtered: filtered,
        pagenated: pagenated,
        filters: state.visibilityFilterReducer,
        companyMap: Util.genListMap(state.dataReducer, 'company'),
        alphabetMap: Util.genAlphabetMap(state.dataReducer, 'fname')
    }
}
@connect(mapStateToFiltersProps)
class Filters extends React.Component{
    onHandleTagChange(e){
        const {dispatch} = this.props;
        e.preventDefault();
        dispatch(filter('companyFilter', e.target.value));
    }
    render(){
        const {pagenated, filtered, data, filters, companyMap, alphabetMap} = this.props;

        return(
            <div>
                <div>
                    <label>By Tag:</label>
                    <ListFilter filterName="company" filterMap={companyMap} />
                    <label>By Keyword:</label>
                    <KeywordFilter />
                    <AlphabetFilter alphabetMap={alphabetMap} />
                    <Showing numPerPage={NumberPerPage} total={filtered.length} />
                </div>
                <Pagenate items={filtered} numPerPage={NumberPerPage} scroll={true} />
                <ul>
                {pagenated.map((item, i)=>{
                    return (
                        <li key={i}>
                            <p><b>Name: </b>{item.fname} {item.lname}</p>
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