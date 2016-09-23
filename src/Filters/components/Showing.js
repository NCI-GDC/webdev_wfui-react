import React from 'react';
import {connect} from 'react-redux'

const mapStateToShowingProps = (state) => {
    return {
        pageFilter: state.visibilityFilterReducer.pageFilter,
    };
};
@connect(mapStateToShowingProps)
export default class Showing extends React.Component{
    render(){
        const {numPerPage, total, pageFilter} = this.props;
        var showing = 0;
        if(pageFilter){
            if(total > 0){
                if((pageFilter)*numPerPage > total){
                    showing = (pageFilter-1)*numPerPage+1 + "-" + total;
                }else{
                    showing = (pageFilter-1)*numPerPage+1 + "-" + (pageFilter)*numPerPage;
                }
            }
        }else{
            showing = numPerPage;
        }
        return (
            <span>Showing {showing} of {total}</span>
        )
    }
}