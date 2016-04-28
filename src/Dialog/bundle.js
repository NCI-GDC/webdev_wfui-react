import React from 'react';
import ReactDOM from 'react-dom';

//WFUI
require('../../legacy/jquery-1.8.3.min.js');
require('../../legacy/wfui.js');
require('../../legacy/wfui-jquery-noconflict.js');
require('../../legacy/wfui-rct/util.js');

//Dependencies
require('../../legacy/wfui-widget.0.js');
require('../../legacy/wfui-browser.0.js');
require('../../legacy/wfui-blanket.0');
require('../../legacy/wfui-layer.0.js');

require('../../src/Icon/icon');
require('../../src/Button/button');
require('../../src/Dialog/dialog');
const css = require('../../dist/wfui_bundle.css');

let config = {
    title: 'Are you sure you want to delete this participant?',
    size : "large",
    has_searchbox: true,
    has_close: true,
    content: "Are you sure you want to delete: %{name}? <br>This action cannot be undone and all of the participant's personal and survey data will be permanently deleted from the system.",
}
ReactDOM.render( <WFUIJS.RCT.Dialog2_1 data={config} />, document.getElementById('dialog'));