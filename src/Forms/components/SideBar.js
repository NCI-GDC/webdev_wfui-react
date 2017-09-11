import React from 'react';
import NavigationList from './NavigationList';
import BurgerNav from '../helpers/burger_navigation'
import { connect } from 'react-redux';

class SideBar extends React.Component{
    componentDidMount(){
        // TODO: Removed
        // BurgerNav.init();
    }
    render() {

        const {survey_info, survey_data, submission_info, translated, activeId} = this.props;
        const {language} = this.context;
        var className = ""

        if(activeId){
            className = "category" + (activeId%8 + 1)
        }

        return(
            <div className={`application-sidebar ${className}`}>
                <div className="row">
                    <h3>Application Sections</h3>
                    <NavigationList survey_data={survey_data} activeId={activeId} translated={translated} />                    
                </div>
                <div className="survey-side-expand main">
                    <div className="survey-icon-container">
                        <img src="/images/survey.png" />
                        <span className="glyphicon glyphicon-menu-hamburger"></span>
                    </div>
                </div>
            </div>
        )
    }
}

SideBar.contextTypes = {
    language: React.PropTypes.string,
};

export default connect(
    (state) => ({})
)(SideBar)