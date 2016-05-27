window.React = require('react');
window.ReactDOM = require('react-dom');

//WFUI
require('../../legacy/jquery-1.8.3.min.js');
require('../../legacy/wfui.js');
require('../../legacy/wfui-jquery-noconflict.js');
require('../../legacy/wfui-rct/util.js');
require('../../src/Icon/icon');
const css = require('../../dist/wfui.bundle.css');

ReactDOM.render( <WFUIJS.RCT.Icon_2 data={{name: 'spinner', size: '1x', is_spinning:true}} />, document.getElementById('icon1'));
ReactDOM.render( <WFUIJS.RCT.Icon_2 data={{name: 'envelope', size: '2x'}} />, document.getElementById('icon2'));
ReactDOM.render( <WFUIJS.RCT.Icon_2 data={{name: 'info', size: '3x'}} />, document.getElementById('icon3'));
ReactDOM.render( <WFUIJS.RCT.Icon_2 data={{name: 'tag', size: '4x'}} />, document.getElementById('icon4'));
ReactDOM.render( <WFUIJS.RCT.Icon_2 data={{name: 'times', size: '5x'}} />, document.getElementById('icon5'));