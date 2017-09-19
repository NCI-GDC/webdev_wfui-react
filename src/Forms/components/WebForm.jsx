/* global window */
import React from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import SideBar from './SideBar';
import SectionForm from './SectionForm';

import SubmitConfirmDialog from './SubmitConfirmDialog';
import SwitchLangConfirmDialog from './SwitchLangConfirmDialog';

import stickyMenu from '../helpers/sticky_menu';
import bodyResizeListener from '../helpers/body_resize_listener';

import * as actionCreators from '../actions';
import { anonymousFormFields } from '../constants/const';

/**
 * WebForm: Parent App
 */
class WebForm extends React.Component {
    constructor(props) {
        super();
        this.state = { surveyDataState: [], translated: false, activeId: props.activeId };
        this.onResize = this.onResize.bind(this);
        this.onClickLanguage = this.onClickLanguage.bind(this);
        this.onHandleLanguageLoaded = this.onHandleLanguageLoaded.bind(this)
        this.fieldsMap = {};
    }
    getChildContext() {
        const { language, allowPrev, survey_data, survey_info } = this.props
        const { activeId } = this.state;
        return {
            nid: survey_info.nid,
            vid: Number(survey_info.vid),
            language,
            allowPrev,
            next: this.next.bind(this),
            prev: this.prev.bind(this),
            confirm: this.confirm.bind(this),
            goto: this.goto.bind(this),
            last: survey_data.length - 1,
            activeId,
            autoSave: survey_info.autoSave ? survey_info.autoSave[language] : true,
        };
    }
    componentWillMount() {
        const { survey_data, loggedin } = this.props;
        const surveyDataState = JSON.parse(JSON.stringify(survey_data));
        if (!loggedin) {
            surveyDataState[survey_data.length - 1].children = anonymousFormFields.concat(surveyDataState[survey_data.length - 1].children);
        }
        this.setState({ surveyDataState });
    }

    componentDidMount() {
        // TODO: Removed
        // $(window).on('resize', this.onResize);

        // $('.language-switcher-locale-url a').on('click', this.onClickLanguage);
        // WFUIJS.$(window).on('got_string_overwrite_table', this.onHandleLanguageLoaded);
        // this.setState({
        //     form_width: $('form').width(),
        //     activeId: this.props.activeId,
        // });
        // stickyMenu.init();
        // this.resizeListener = bodyResizeListener($, '.survey-question', stickyMenu.update);

        // Display confirmation before user leave
        window.onbeforeunload = () => {
            return 'Les changements effectués ne seront pas sauvegardés' // Changes you made may not be saved.
        };
    }
    componentWillUnmount() {

        // TODO: Removed
        // $(window).off('resize', this.onResize);
        // $('.language-switcher-locale-url a').off('click', this.onClickLanguage);
        // WFUIJS.$(window).off('got_string_overwrite_table', this.onHandleLanguageLoaded);
        // this.resizeListener.off();

        window.onbeforeunload = undefined;
    }
    onHandleLanguageLoaded(){
        this.forceUpdate();
        this.setState({translated: true});    
    }
    getTotalAnsweredQuestions() {
        // TODO 
        // const { survey_data, submission, mapQidsToCids } = this.props;
        // return countTotalAnsweredQuestions(survey_data, submission, mapQidsToCids);
    }

    /*****************************************************************************
     * Actions
     ****************************************************************************/
    saveSubmission(callback){

        const { survey_data, language, errors, dispatch, survey_info, saveSubmission, getConfig, loggedin } = this.props;
        const { activeId } = this.state;
        const autoSave = survey_info.autoSave ? survey_info.autoSave[language] : true;
        // const { completed, total } = this.getTotalAnsweredQuestions();
        
        /**
         * Save entire section
         */
        const sectionId = survey_data[activeId].id;
        const that = this;

        // if ( errors[sectionId] && Object.keys(errors[sectionId]).length > 0 ) { 
        //     showMessage({
        //         title: "Question Action",
        //         text: "Il y a des erreurs dans le formulaire. SVP faire la correction avant de procéder.", // There are errors on the form. Please fix them before continuing.
        //         type: "error"
        //     });
        //     return 
        // }
                
        // dispatch(setInActionState(true));
        saveSubmission(survey_info.nid, sectionId, language, loggedin, getConfig)
        .then(callback);

    }
    next(id){
        const {survey_data} = this.props
        const {activeId} = this.state
        const that = this;

        this.saveSubmission(()=>{
            $(window).trigger('webform_changed', id+1);
            if(id == activeId && id < survey_data.length-1){
                setTimeout(function(){
                    window.scrollTo(0, 0);
                    that.setState({activeId: parseInt(id) + 1});
                }, 5)
            }
        });
    }
    prev(id){
        const that = this;

        this.saveSubmission(()=>{
            $(window).trigger('webform_changed', id-1);
            if(id == this.state.activeId && id >= 0){
                setTimeout(function(){
                    window.scrollTo(0, 0);
                    that.setState({activeId: parseInt(id) - 1});
                }, 5)
            }
        });
    }
    confirm(){           
        const {submission, survey_data, onComplete } = this.props;
        // const { completed, total } = this.getTotalAnsweredQuestions();

        this.saveSubmission(() => {
            if (typeof onComplete === 'function') onComplete();
            // let all_answered = (total == completed)
            // this.refs['submit_conform_dialog'].showModal();
        });

    }
    _submit(){

        const {nid, allowPublish, dispatch, submitSubmission} = this.props;
        // dispatch(setInActionState(true));
        window.onbeforeunload = undefined;
        if(allowPublish){
            submitSubmission(nid, ()=>{
                window.location.href = "/dashboard";
            });
        }else{
            window.location.href = "/dashboard";
        }
    }
    goto(id){
        const that = this;

        if(id == this.state.activeId) return;
        this.saveSubmission(()=>{
            $(window).trigger('webform_changed', id);
            if(id != this.state.activeId){
                setTimeout(function(){
                    window.scrollTo(0, 0);
                    that.setState({activeId: parseInt(id)});
                }, 5)
            }
        });
    }
    /*****************************************************************************
     * Events
     ****************************************************************************/
    onResize(e) {
        this.setState({
            form_width: $('form').width()
        });
    }
    onClickLanguage(e) {
        e.preventDefault();
        e.stopPropagation();
        this.refs['switch_lang_confirm_dialog'].showModal(e);
    }
    render() {
        const { displaySubmit, survey_data, in_action, submissions, recaptchaSiteKey, loggedin } = this.props;
        const { activeId, form_width, translated, surveyDataState } = this.state;

        // Submit Button
        if (displaySubmit) {
            var submit = <input type="submit" value="submit" />
        }
        //Settings for Slide Animation
        let formStyle = {
            'overflow': 'hidden',
            'width': form_width
        }
        let posX = -1*(activeId * form_width) || 0;
        let sliderStyle = {
            'WebkitTransition': 'all .2s linear',
            'transition': 'all .2s linear',
            'width': surveyDataState && surveyDataState.length * form_width || 'auto',
            'msTransform': 'translate('+posX+'px, 0)',
            'WebkitTransform': 'translate('+posX+'px, 0)',
            'transform': 'translate('+posX+'px, 0)',
        }

        //Coming from top
        let rowClasses = "row row-eq-height"; // "row vertical_align";
        
        if(surveyDataState){
            return(
                <div className={`application-app ${surveyDataState.length > 1 ? 'multi-section' : 'single-section'}`}>
                    <div className="container">
                        {in_action ? <div><p className="page_loading" style={{opacity: 0.5}}><i className="fa fa-spinner fa-spin"></i></p></div> : ""}
                        {surveyDataState.length > 1 && <SideBar {...this.props} activeId={activeId} translated={translated} />}
                        <div className={`application-main section-${activeId}`}>
                            <ReactCSSTransitionGroup transitionAppear={true} transitionName="fade" transitionEnterTimeout={500} transitionLeaveTimeout={500} transitionAppearTimeout={500}>
                            <div className="row">
                                <div style={formStyle}>
                                    <div className="default_slide" style={sliderStyle}>
                                    {surveyDataState.map(function(section, i){
                                        return (
                                            <SectionForm
                                                key={i}
                                                index={i}
                                                form_width={form_width}
                                                translated={translated}
                                                section={section}
                                                isActive={(activeId == i)}
                                                submissions={submissions}
                                                recaptchaSiteKey={recaptchaSiteKey}
                                                loggedin={loggedin}
                                            />
                                        )
                                    })}
                                    {submit}
                                    </div>
                                </div>
                            </div>
                            </ReactCSSTransitionGroup>
                        </div>
                        <SubmitConfirmDialog ref="submit_conform_dialog" onHandleSubmit={this._submit.bind(this)} />
                        <SwitchLangConfirmDialog ref="switch_lang_confirm_dialog" />
                    </div>
                </div>
            );
        } else {
            console.log('Error: The data provided is broken.');
            return <noscript />
        }
    }
    componentDidUpdate(){
        stickyMenu.update();
    }
}

WebForm.propTypes = {
    vid: React.PropTypes.number,
    language: React.PropTypes.string,
    activeId: React.PropTypes.number,
    allowPrev: React.PropTypes.bool,
    displaySubmit: React.PropTypes.bool,
    action: React.PropTypes.string,
    redirect: React.PropTypes.string,
    allowPublish: React.PropTypes.bool,
    recaptchaSiteKey: React.PropTypes.string,
    onComplete: React.PropTypes.func,
    getConfig: React.PropTypes.func,
    loggedin: React.PropTypes.bool,
};
WebForm.defaultProps = {
    activeId: 0,
    allowPrev: true,
    language: 'en',
    displaySubmit: true,
    action: '',
    allowPublish: true,
    loggedin: false,
};
WebForm.childContextTypes = {
    nid: React.PropTypes.string,
    vid: React.PropTypes.number,
    language: React.PropTypes.string,
    allowPrev: React.PropTypes.bool,
    next: React.PropTypes.any,
    prev: React.PropTypes.any,
    confirm: React.PropTypes.any,
    goto: React.PropTypes.any,
    last: React.PropTypes.number,
    activeId: React.PropTypes.number,
    autoSave: React.PropTypes.bool,
    getConfig: React.PropTypes.func,
};

export default connect(
    (state, props) => {
        return {
            in_action: state.in_action,
        };
    },
    actionCreators,
)(WebForm);
