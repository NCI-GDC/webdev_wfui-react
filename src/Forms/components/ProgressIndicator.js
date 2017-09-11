import React from 'react';
export default class ProgressIndicator extends React.Component{
    render(){
    	const {completed, total} = this.props;

        var percentage = 360 * (completed / total);
        var style = {"backgroundColor": "#13b497"}; // default green

        if (percentage <= 180) {
            style.backgroundImage = "linear-gradient(" + (percentage + 90) + "deg, transparent 50%, white 50%), linear-gradient(90deg, white 50%, transparent 50%)";
        }
        else {
            style.backgroundImage = "linear-gradient(" + (percentage - 90) + "deg, transparent 50%, " + style.backgroundColor + " 50%), linear-gradient(90deg, white 50%, transparent 50%)";
        }

        return(
            <div className="progress-circle">
                <div 
                    className="progress-circle-change" 
                    style={style}>
                    <div className="progress-circle-inner">
                        {percentage == 360 ? <img src="/images/progress-check.png" /> : ""}
                    </div>
                </div>
            </div>
        )
    }
}