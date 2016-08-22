'use strict';

window.React = require('react');
window.ReactDOM = require('react-dom');

//WFUI
require('../../legacy/jquery-1.8.3.min.js');
require('../../legacy/wfui.js');
require('../../legacy/wfui-jquery-noconflict.js');
require('../../legacy/wfui-rct/util.js');

WFUIJS.modules = WFUIJS.modules || {};
window.WFUIJS.modules.EventEmitter = require('events').EventEmitter;
window.WFUIJS.modules.assign = require('object-assign');
var Dispatcher = require('flux').Dispatcher;
window.WFUIJS.modules.AppDispatcher = WFUIJS.modules.assign(new Dispatcher(), {
    handleViewAction: function handleViewAction(action) {
        this.dispatch({
            source: 'VIEW_ACTION',
            action: action
        });
    }
});

require('../../src/Icon/icon');
require('../../src/Dropdown/dropdown');
require('../../src/Button/button');
var css = require('../../dist/wfui.bundle.css');

ReactDOM.render(React.createElement(WFUIJS.RCT.Button_1, { data: {
        title: "button",
        is_split: true,
        dropdown: {
            uid: 'test',
            sections: [{
                items: [{ content: "View Campaigns", onClick: function onClick() {} }, { content: "View Activity", onClick: function onClick() {} }, { content: "Download Activity", onClick: function onClick() {} }, { content: "Delete", onClick: function onClick() {} }]
            }]
        }
    } }), document.getElementById('dropdown'));