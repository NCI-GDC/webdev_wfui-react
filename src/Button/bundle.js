import React from 'react';
import ReactDOM from 'react-dom';

//WFUI
require('../../legacy/jquery-1.8.3.min.js');
require('../../legacy/wfui.js');
require('../../legacy/wfui-jquery-noconflict.js');
require('../../legacy/wfui-rct/util.js');

require('../../src/Icon/icon');
require('../../src/Button/button');
const css = require('../../dist/wfui_bundle.css');

ReactDOM.render( 
    <WFUIJS.RCT.Button_1 data={{ title: "button" }}/>, document.getElementById('button1')
);