window.React = require('react');
window.ReactDOM = require('react-dom');

//WFUI
require('../../legacy/jquery-1.8.3.min.js');
require('../../legacy/wfui.js');
require('../../legacy/wfui-jquery-noconflict.js');
require('../../legacy/wfui-rct/util.js');
require('../../src/Tabs/tabs');
const css = require('../../dist/wfui_bundle.css');

ReactDOM.render( <WFUIJS.RCT.Tabs_1 />, document.getElementById('tabs'));