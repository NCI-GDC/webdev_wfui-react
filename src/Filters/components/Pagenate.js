import React from 'react';
import {connect} from 'react-redux'
import {filter} from '../actions/action_creators';
import Util from '../../Util/util';

const getPages = (items, numOfContents) => {
    var num = Math.ceil(items.length/numOfContents);
    var pages = [];
    for(var i=0; i<num; i++){
        pages.push(i+1);
    }
    return pages;
}

const mapStateToPagenateProps = (state) => {
    return { current: Number(state.visibilityFilterReducer.pageFilter) };
};

@connect(mapStateToPagenateProps)
export default class Pagenate extends React.Component{
    onHandleClick(e){
        e.preventDefault();
        const {dispatch, scroll, onHandleClick} = this.props;
        if(scroll) Util.scrollTop();
        dispatch(filter('pageFilter', e.target.getAttribute("data-page")));

        if(onHandleClick && typeof onHandleClick == 'function'){
            onHandleClick(e);
        }
    }
    render(){
        const {items, numPerPage, current} = this.props;
        let pages = getPages(items, numPerPage);

        if(pages.length > 1){
            return (
                <div className="paginate">
                    <ul>
                        {current > 1 ? <li><a href="#" data-page={current - 1} onClick={this.onHandleClick.bind(this)}>&laquo; Prev</a></li> : "" }
                        {pages.map((page,i)=>{
                            return <li key={i} className={page==current ? "active": ""}><a href="#" data-page={page} onClick={this.onHandleClick.bind(this)} >{page}</a></li>
                        })}
                        {current < pages.length ? <li><a href="#" data-page={current + 1} onClick={this.onHandleClick.bind(this)}>Next &raquo;</a></li> : "" }
                    </ul>
                </div>
            )
        }else{
            return <noscript/>
        }
    }
}