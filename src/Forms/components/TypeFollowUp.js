import React from 'react';
// import BaseWebformField from './BaseWebformField'
import Field from './Field'
import { connect } from 'react-redux';
import { setError } from '../actions';
import { getFormValues } from 'redux-form';

/**
 * TypeFollowUp: Wrapper for followup questoin. It has a feature to check condition of following question.
 */

class TypeFollowUp extends React.Component {
    constructor(){
        super();
        this.visible = false;
    }
    op(values, {op, value}){
        if(!values || values.length == 0) return false;
        var result = false;
        //Parse
        const parseValue = (value) =>{
            if(value == "[blank]"){
                return "";
            }else if(value.charAt(0) == "[" && value.charAt(value.length-1) == "]"){
                return value.substring(1, value.length-1).replace(/\s/g, '').split(',')
            }else{
                return value
            }
        }
        var _value = parseValue(value);
    
        if(typeof _value != 'object'){
            var ex;
            switch (op) {
                case 'has':
                    ex = (val1, val2) => {
                        if(val1.includes("|")){
                            return val1.split("|").includes(val2);
                        }else{
                            return (val1 == val2)
                        }
                    };
                    break;
                case '==':
                    ex = (val1, val2) => (val1 == val2);
                    break;
                case '!=':
                    ex = (val1, val2) => (val1 != val2);
                    break;
                case '>':
                    ex = (val1, val2) => (!isNaN(Number(val1)) && val1 != "" && Number(val1) > Number(val2));
                    break;
                case '>=':
                    ex = (val1, val2) => (!isNaN(Number(val1)) && val1 != "" && Number(val1) >= Number(val2));
                    break;
                case '<':
                    ex = (val1, val2) => (!isNaN(Number(val1)) && val1 != "" && Number(val1) < Number(val2));
                    break;
                case '<=':
                    ex = (val1, val2) => (!isNaN(Number(val1)) && val1 != "" && Number(val1) <= Number(val2));
                    break;
            }
            Object.keys(values).forEach((key, i)=>{
                if(ex(values[key], _value)){
                    result = true
                }
            });
        }else{
            var ex;
            switch (op) {
                case '==':
                    ex = (val1, val2) => (val1 != val2);
                    break;
                case '!=':
                    ex = (val1, val2) => (val1 == val2);
                    break;
                case '>':
                    ex = (val1, val2) => (isNaN(Number(val1)) || val1 == "" || Number(val1) <= Number(val2))
                    break;
                case '>=':
                    ex = (val1, val2) => (isNaN(Number(val1)) || val1 == "" || Number(val1) < Number(val2));
                    break;
                case '<':
                    ex = (val1, val2) => (isNaN(Number(val1)) || val1 == "" || Number(val1) >= Number(val2));
                    break;
                case '<=':
                    ex = (val1, val2) => (isNaN(Number(val1)) || val1 == "" || Number(val1) > Number(val2));

            }
            let _result = true;
            if(Object.keys(values).length != _value.length) _result = false;
            Object.keys(values).forEach((key, i)=>{
                if(ex(values[key],_value[i])){
                    _result = false;
                }
            });
            result = _result;
        }
        return result
    }
    and(value1, value2){ return value1 && value2; }
    or(value1, value2){ return value1 || value2; }

    /**
     * TypeFolloUp will receive changes from following questions.
     */
    checkFollowUpCondition(){
        const {submission, question, className, lang} = this.props;
        var data = question.values[lang];
        var showIf = question.showIf;

        /**
         * Logic to evaluate AND/OR( Only evaluate from left to right)
         */
        let result = false;
        showIf.forEach((condition, i) => {

            const {op, and, or} = this;
            var values = submission[condition.qid];
            
            if(condition.value == "[blank]" && !values){
                values = {[condition.qid]: "" };
            }

            if(i==0){
                result = op(values, condition);
            }else{
                //Include previous result to current operation.
                result = (condition.logic == 'or') ? 
                        or( op(values, condition), result ) :
                        and( op(values, condition), result ) ;
            }
        });
        this.visible = result;
        return result
    }

    render(){
        const that = this;
        const {question, submission} = this.props;

        // TODO: Check condition in render is bad idea.
        if( this.checkFollowUpCondition() ){
            return (
                <div className="followup_question followup">
                    <Field field={question} renderingFollowup={true} />
                </div>
            )
        }else{
            return (
                <noscript/>
            )
        }
        
    }
    componentDidUpdate(props, state){
        const {submission, question, lang, errors, dispatch} = this.props;
        var data = question.values[lang];
        if(!this.visible){ //Clear error if it's invisible.
            if(errors[question.parent]){
                if(errors[question.parent][data.cid]){
                    dispatch(setError(question.parent, data.cid, []));
                }
                this.getChildrenCIDs(data).forEach((cid, i)=>{
                    if(errors[question.parent][cid]){
                        dispatch(setError(question.parent, cid, []));
                    }
                })
            }
            
        }
    }
}

const mapStateToSectionProps = (state, props) => {
    return {
        submission: getFormValues(`form_${props.question.parent}`)(state) || {},
        errors: state.submissionReducers.errors,
    };
};
export default connect(mapStateToSectionProps)(TypeFollowUp);
