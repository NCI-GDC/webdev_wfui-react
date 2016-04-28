import React from 'react';
import ReactDOM from 'react-dom';

//WFUI
require('../../legacy/jquery-1.8.3.min.js');
require('../../legacy/wfui.js');
require('../../legacy/wfui-jquery-noconflict.js');
require('../../legacy/wfui-rct/util.js');

require('../../src/Icon/icon');
const css = require('../../dist/wfui_bundle.css');

ReactDOM.render( <WFUIJS.RCT.Icon_2 data={{name: 'envelope'}} />, document.getElementById('icon'));