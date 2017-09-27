import React from 'react';
import Fields from './Fields'
import { connect } from 'react-redux';
import { getSubmissionCount, setInActionState } from '../actions'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Button } from 'react-bootstrap/lib/index';
import { Field } from 'redux-form';

/**
 * Section: Render a page. Filter all fields and categolize by parent section ID
 */

class Section extends React.Component{
    constructor(){
        super();
        this.state = {
            validated: false,
            errors: {},
            saving: false,
            grecaptchaState: false,
            setRecaptcha: false,
        }
        this.onHandleSubmit = this.onHandleSubmit.bind(this);
        this.onClickNext = this.onClickNext.bind(this);
    }
    onClickNext() {
        const { dispatch, submission, id, errors } = this.props;
        const { nid, language, activeId, last} = this.context;
        var that = this;
        let fields = [];
        
        if (activeId == last) {
            that.context.confirm();
        } else {
            that.context.next(that.props.index);
        }

    }
    onClickPrev(e){
        e.preventDefault();
        this.context.prev(this.props.index);
    }
    onHandleSubmit(values) {
        this.onClickNext();
    }
    render() {

        const that = this;
        const { user, section, isActive, index, translated, form_width, parent_name, review} = this.props;
        const { language } = this.context;
        const data = section.values[language];
        
        if (!user) {
            greptchaToggle = function() {
                this.setState({ grecaptchaState: true });
            }
            greptchaToggle = greptchaToggle.bind(this);
        }

        let className = isActive ? "form active": "form";
        if(isActive){
            return(
                <div>
                    <div className={className} style={{ width: form_width }}>
                        {/* <a className="help-icon" href="#"><img src="/icgc-images/icon-help.svg" /></a> */}
                        <h2 className="survey-current">{index+1}. {parent_name ? parent_name : data.title}</h2>

                        <div className="survey-question"> 
                            <Fields {...this.props} />
                        </div>
                    </div>
                    <div>
                        {this.renderNav()}
                        <ReactCSSTransitionGroup transitionAppear={true} transitionName="fade" transitionEnterTimeout={500} transitionLeaveTimeout={500} transitionAppearTimeout={500}>
                            {this.renderChecked()}
                        </ReactCSSTransitionGroup>
                    </div>
                </div>
            )
        }else{
            return (
                <div className={className} style={{ width: form_width }}>&nbsp;</div>
            )
        }
    }
    renderNav(){
        const {isActive, id, index, errors, section, handleSubmit, user} = this.props;
        const {saving, grecaptchaState} = this.state;
        const {allowPrev} = this.context;
        let prev, next, recaptcha;
    
        if(isActive){
            if(index && allowPrev){
                prev = <div className="survey-previous-section"><a href="#" id={index} onClick={this.onClickPrev.bind(this)} >{i18n('previous section')}</a></div>
            }
            if (index != this.context.last) {
                next = <Button disabled={saving} className="btn-survey-submit survey-trigger" id={index} onClick={handleSubmit(this.onHandleSubmit)} >{i18n('Continue')}</Button>
            } else if (!user) {
                // Display reCaptcha for Annonymous user.
                next = (
                    <div>
                        <div id="greptcha-insert"></div>
                        <Button disabled={saving || !grecaptchaState} className="btn-survey-submit survey-trigger" id={index} onClick={handleSubmit(this.onHandleSubmit)} ><span className="button-survey-text">{i18n('Submit your Survey Answers')}</span></Button>
                    </div>
                )
            } else{
                next = <Button disabled={saving} className="btn-survey-submit survey-trigger" id={index} onClick={handleSubmit(this.onHandleSubmit)} ><span className="button-survey-text">{i18n('Submit your Survey Answers')}</span></Button>
            }
        }
        return(
            <div className="survey-end-container">
                {prev}
                {next}
            </div>
        )
    }
    componentDidUpdate() {
        // Display reCaptcha
        const { isActive, index, recaptchaSiteKey, user } = this.props;
        if (isActive && index == this.context.last && !user) {
            const target = document.getElementById('greptcha-insert');
            if (target && !target.innerHTML) {
                this.setState({ grecaptchaState: false });
                grecaptcha.render('greptcha-insert', {
                    sitekey: recaptchaSiteKey,
                    callback: 'greptchaToggle',
                });
            }
        }
    }
    renderChecked(){
        if(this.state.validated){
            return <div className='icon-checked'></div>
        }
    }
}
Section.contextTypes = {
    nid: React.PropTypes.string,
    language: React.PropTypes.string,
    allowPrev: React.PropTypes.bool,
    next: React.PropTypes.any,
    prev: React.PropTypes.any,
    confirm: React.PropTypes.any,
    form_width: React.PropTypes.number,
    changeEmitter: React.PropTypes.object,
    last: React.PropTypes.number,
    activeId: React.PropTypes.number,
};
export default Section;
