WFUIJS = WFUIJS || {}
WFUIJS.modules = WFUIJS.modules || {}

//React
window.React = require('react');
window.ReactDOM = require('react-dom');

//Redux
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
window.WFUIJS.modules.createStore = createStore;
window.WFUIJS.modules.combineReducers = combineReducers;
window.WFUIJS.modules.Provider = Provider;

//Flux
window.WFUIJS.modules.EventEmitter = require('events').EventEmitter;
window.WFUIJS.modules.assign = require('object-assign');
var Dispatcher = require('flux').Dispatcher;
window.WFUIJS.modules.AppDispatcher = WFUIJS.modules.assign(new Dispatcher(), {
    handleViewAction: function(action){
        this.dispatch({
            source: 'VIEW_ACTION',
            action: action
        });
    }
});

//Fixed Data Table
window.WFUIJS.modules.FixedDataTable = require('fixed-data-table');

//Utilities
require('./legacy/wfui-rct/util.js');
window.WFUIJS.modules.ReactRouter = require('react-router');
window.WFUIJS.modules.ReactCSSTransitionGroup = require('react-addons-css-transition-group');

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
require('./legacy/wfui-widget.0.js');
require('./legacy/wfui-browser.0.js');
require('./legacy/wfui-blanket.0');
require('./legacy/wfui-layer.0.js');
require('./src/Dialog/dialog.js');

//Dropdown
require('./src/Dropdown/dropdown.js');

//Tabs
require('./src/Tabs/tabs');

//Label
require('./src/Label/label');

//Tooltip
require('./src/Tooltip/tooltip');