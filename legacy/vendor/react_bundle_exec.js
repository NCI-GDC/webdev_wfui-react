window.React = require('react');
window.ReactDOM = require('react-dom');

WFUIJS = WFUIJS || {}
WFUIJS.modules = WFUIJS.modules || {}

WFUIJS.modules.EventEmitter = require('events').EventEmitter;
WFUIJS.modules.assign = require('object-assign');
WFUIJS.modules.FixedDataTable = require('fixed-data-table');
WFUIJS.modules.ReactCSSTransitionGroup = require('react-addons-css-transition-group');
WFUIJS.modules.ReactRouter = require('react-router');

var Dispatcher = require('flux').Dispatcher;
WFUIJS.modules.AppDispatcher = WFUIJS.modules.assign(new Dispatcher(), {
    handleViewAction: function(action){
        this.dispatch({
            source: 'VIEW_ACTION',
            action: action
        });
    }
});
