import React from 'react';
import ReactDOM from 'react-dom';
import Description from '../../src/Description/description';
const css = require('../../dist/wfui.bundle.css');


var htmlText1 = (
	"<p><b>Welcome to the beginning of the survey Nancy.</b> Please take your time and answer all of the questions as honestly as possible. the survey will automatically save your answers, so you can come back and continue the survey at any time.</p><p>To begin, we will ask you a few basic questions about your demographics.</p>"
);
var htmlText2 = (
	"<p><b>Welcome to the beginning of the survey Nancy.</b></p>"
);
var element1 = (
	<div>
		<b>Before you begin:</b>
		<br />
		<ol>
			<li>Adjust your scale to zero;</li>
			<li>Weigh yourself with your clothes off, or wear light clothing. Remember to remove your shoes;</li>
			<li>Step on the scale. Make sure both feet are fully on the scale.</li>
		</ol>
	</div>
);
var element2 = (
	<div>
		Hormonal contraceptives include birth control pills, implants, patches, injections, and rings or intra-uterine devices that release female hormones.
	</div>
);
var element3 = (
	<div>
		<p>
			The DIN is an 8 digit number that
		</p>
	</div>
);
ReactDOM.render( <Description content="simple text description" type="theme-blue" />, document.getElementById('description1'));
ReactDOM.render( <Description content={htmlText1} type="theme-blue" imageSrc="icon-cancer-types.svg" imageDescription="This is the image above" classNames="extra-lalalalla awdawd" />, document.getElementById('description2'));
ReactDOM.render( <Description content={htmlText2} errors={1} type="theme-purple" imageSrc="reg.png" imageDescription="" />, document.getElementById('description3'));
ReactDOM.render( <Description content={element1} type="theme-red" imageSrc="" imageDescription="This is the image above" />, document.getElementById('description4'));
ReactDOM.render( <Description content={element3} type="theme-purple" imageSrc="wawdwda" imageDescription="This is the image aboveThis is the image aboveThis is the image aboveThis is the image aboveThis is the image aboveThis is the image aboveThis is the image aboveThis is the image aboveThis is the image above" />, document.getElementById('description5'));