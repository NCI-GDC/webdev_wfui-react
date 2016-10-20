import React from 'react';
import ReactDOM from 'react-dom';
import Tooltip from '../../src/Tooltip/tooltip';
const css = require('../../dist/wfui.bundle.css');

ReactDOM.render(
	<Tooltip name="tooltip" content="content" is_link={false} href="http://www.google.ca" description="text tooltip 1" position="right" />
    , document.getElementById("tooltip"));
