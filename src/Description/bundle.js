import React from 'react';
import ReactDOM from 'react-dom';
import Description from '../../src/Description/description';


var htmlText1 = (
	"<div style='color:blue; width:600px; border: 1px solid black; padding:10px;'><p><b>Welcome to the beginning of the survey Nancy.</b> Please take your time and answer all of the questions as honestly as possible. the survey will automatically save your answers, so you can come back and continue the survey at any time.</p><p>To begin, we will ask you a few basic questions about your demographics.</p></div>"
);
var styleForElement1 = {
	'width':'600px', 
	'border':'none', 
	'background-color': '#FDDCD9', 
	'padding':'10px'
}
var element1 = (
	<div style={styleForElement1} >
		<b>Before you begin:</b>
		<br />
		<ol>
			<li>Adjust your scale to zero;</li>
			<li>Weigh yourself with your clothes off, or wear light clothing. Remember to remove your shoes;</li>
			<li>Step on the scale. Make sure both feet are fully on the scale.</li>
		</ol>
	</div>
);
ReactDOM.render( <Description content="simple text description" />, document.getElementById('description1'));
ReactDOM.render( <Description content={htmlText1} />, document.getElementById('description2'));
ReactDOM.render( <Description content="simple text description2" />, document.getElementById('description3'));
ReactDOM.render( <Description content={element1} />, document.getElementById('description4'));