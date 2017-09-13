import React from 'react';
import NavigationListItem from './NavigationListItem';
import AllProgress from './AllProgress';

export default class NavigationList extends React.Component {
    render() {

        const { survey_data, sections, is_subsection, activeId } = this.props;
        
        if(!is_subsection){
            return(
                <ol className="survey-menu">
                    {survey_data.map((section, i) => {
                        return <NavigationListItem key={i} section={section} index={i} activeId={activeId} />
                    })}
                    <AllProgress survey_data={survey_data} />
                </ol>
            )
        }else{
            return(
                <ul className="survey-menu survey-subsection">
                    {survey_data.map((section, i) => {
                        return <NavigationListItem key={i} section={section} index={i} activeId={activeId} is_subsection={is_subsection} />
                    })}
                    <AllProgress survey_data={survey_data} />
                </ul>
            )
        }
    }
}