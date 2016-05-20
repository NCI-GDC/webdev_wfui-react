import React from 'react';
import ReactDOM from 'react-dom';
import Label from '../../src/Label/label';
const css = require('../../dist/wfui_bundle.css');

ReactDOM.render(
	<Label name="label" content="content" is_link={true} href="http://www.google.ca" is_closeable={true} />
    , document.getElementById("label"));
ReactDOM.render(
	<Label name="label2" content="content2" is_link={false} is_closeable={true} />
    , document.getElementById("label2"));
ReactDOM.render(
	<Label name="label3" content="content3" is_link={false} is_closeable={false} />
    , document.getElementById("label3"));
ReactDOM.render(
	<Label name="label4" content="content4" is_link={true} href="http://www.google.ca" is_closeable={false} />
    , document.getElementById("label4"));