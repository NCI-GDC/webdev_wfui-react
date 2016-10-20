import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Label extends Component {
	render(){
		var {name, content, is_link, href, is_closeable} = this.props;

		var container_classes = "wfui-label";
		var container_href = "#";
		if(is_link){
			container_href = href;
		}

		var close_button;
		if(is_closeable){
			container_classes += " wfui-label-closeable";
			close_button = <i className="wfui-icon wfui-icon-close" tabIndex="0"></i>;
		}
		else{
			close_button = <i></i>;
		}

		if(is_link){
			return (
		      <span className={container_classes} title={name}>
		      	<a href={container_href}>
		      		{content}
		      	</a>
		      	{close_button}
		      </span>
		    );
		}
		else{
			return (
		      <span className={container_classes} title={name}>
		      	{content}
		      	{close_button}
		      </span>
		    );
		}
	}
}

export default Label