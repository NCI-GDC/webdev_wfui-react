'use strict';

window.React = require('react');
window.ReactDOM = require('react-dom');

//WFUI
require('../../legacy/jquery-1.8.3.min.js');
require('../../legacy/wfui.js');
require('../../legacy/wfui-jquery-noconflict.js');
require('../../legacy/wfui-rct/util.js');
require('../../src/Tabs/tabs');
var css = require('../../dist/wfui.bundle.css');

ReactDOM.render(React.createElement(WFUIJS.RCT.Tabs_1, null), document.getElementById('tabs'));