import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Tooltip extends Component {
	render(){
		var {name, content, is_link, href, description, position} = this.props;

		var container_classes = "wfui-tooltip";
		var tooltip_text_classes = "wfui-tooltip-text";
		var container_href = "#";
		var render_content;
		if(is_link){
			container_href = href;
			render_content = (<a href={container_href}>{content}</a>);
		}
		else{
			render_content = (content);
		}

		if(position == "left"){
			tooltip_text_classes += " wfui-tooltip-text-left";
		}
		else if(position == "bottom"){
			tooltip_text_classes += " wfui-tooltip-text-down";
		}
		else if(position == "top"){
			tooltip_text_classes += " wfui-tooltip-text-up";
		}

		return (
			<div title={name} className={container_classes}>{render_content}
				<span className={tooltip_text_classes}>description</span>
			</div>
		);
	}
}

export default Tooltip