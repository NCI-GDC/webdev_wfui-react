import React from 'react';
import {connect} from 'react-redux'
import {filter} from '../actions/action_creators';

const mapStateToAlphabetFilterProps = (state) => {
    return { AlphabetFilter: state.visibilityFilterReducer["keywordFilter"] };
};
@connect(mapStateToAlphabetFilterProps)
export default class AlphabetFilter extends React.Component{
    onHandleAlphabet(e){
        e.preventDefault();
        const {dispatch, onHandleClick} = this.props;
        dispatch(filter('alphabetFilter', e.target.dataset.key));
        dispatch(filter('pageFilter', 1));

        if(onHandleClick && typeof onHandleClick == 'function'){
            onHandleClick(e);
        }
    }
    render(){
        const {alphabetMap, alphabetFilter, showing} = this.props;
        return (
            <div className="alphabet-paginate">
                <div className="container">
                    <nav className="alphabet-nav">
                        <span><a href="#" data-key="" onClick={this.onHandleAlphabet.bind(this)}>#</a></span>
                        {Object.keys(alphabetMap).map((key, i)=>{
                            let activeClass = (alphabetFilter == key) ? "active": "";
                            if(alphabetMap[key]){
                                return <span key={i} className={activeClass}><a href="#" data-key={key} onClick={this.onHandleAlphabet.bind(this)}>{key.toUpperCase()}</a></span>        
                            }else{
                                return <span key={i} >{key.toUpperCase()}</span> 
                            }
                        })}
                        <span>showing {showing}</span>
                    </nav>
                </div>
            </div>
        )
    }
}
