WFUIJS = WFUIJS || {}
WFUIJS.modules = WFUIJS.modules || {}
window.React = require('react');
window.ReactDOM = require('react-dom');
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
window.WFUIJS.modules.createStore = createStore;
window.WFUIJS.modules.combineReducers = combineReducers;
window.WFUIJS.modules.Provider = Provider;

window.WFUIJS.modules.EventEmitter = require('events').EventEmitter;
window.WFUIJS.modules.assign = require('object-assign');
window.WFUIJS.modules.FixedDataTable = require('fixed-data-table');
window.WFUIJS.modules.ReactCSSTransitionGroup = require('react-addons-css-transition-group');
window.WFUIJS.modules.ReactRouter = require('react-router');
var Dispatcher = require('flux').Dispatcher;
window.WFUIJS.modules.AppDispatcher = WFUIJS.modules.assign(new Dispatcher(), {
    handleViewAction: function(action){
        this.dispatch({
            source: 'VIEW_ACTION',
            action: action
        });
    }
});

/**
 * Form components
 */
window.WFUIJS.modules.Description = require('./src/Description/description.js').default;
window.WFUIJS.modules.InputField = require('./src/InputField/input_field.js').default;
window.WFUIJS.modules.InputTable = require('./src/InputTable/input_table.js').default;
window.WFUIJS.modules.Selection = require('./src/Selection/selection.js').default;
window.WFUIJS.modules.Grid = require('./src/Grid/grid.js').default;
window.WFUIJS.modules.ListboxOption = require('./src/Listbox/listbox_option.js').default;
window.WFUIJS.modules.Listbox = require('./src/Listbox/listbox.js').default;
window.WFUIJS.modules.AnotherTable = require('./src/AddAnother/add_another.js').default;
window.WFUIJS.modules.AddAnotherReducer = require('./src/AddAnother/reducers/reducers').default;

/**
 * Old WFUI Components
 */
//Icon
require('./src/Icon/icon.js');

//Button
require('./src/Button/button.js');

//Dialog
require('./src/Dialog/dialog.js');

//Dropdown
require('./src/Dropdown/dropdown.js');