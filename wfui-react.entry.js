WFUIJS = WFUIJS || {}
WFUIJS.modules = WFUIJS.modules || {}

/*****************************************************************
 * Third Party
 *****************************************************************/

//React
window.React = require('react');
window.ReactDOM = require('react-dom');
window.update = require('react/lib/update');

//Redux
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

window.WFUIJS.modules.Redux = require('redux');
window.WFUIJS.modules.ReactRedux = require('react-redux');

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

//Fixed Data Table [ https://facebook.github.io/fixed-data-table/ ]
window.WFUIJS.modules.FixedDataTable = require('fixed-data-table');

//React Drag And Drop [ https://gaearon.github.io/react-dnd/ ]
window.WFUIJS.modules.HTML5Backend = require('react-dnd-html5-backend');
window.WFUIJS.modules.ReactDnD = require('react-dnd');

//Utilities
require('./legacy/wfui-rct/util.js');
window.WFUIJS.modules.ReactRouter = require('react-router');
window.WFUIJS.modules.ReactCSSTransitionGroup = require('react-addons-css-transition-group');

/*****************************************************************
 * Own Components
 *****************************************************************/

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

window.WFUIJS.modules.BootStrap = {
    "Button": require('react-bootstrap/lib/Button'),
    "Tabs": require('react-bootstrap/lib/Tabs'),
    "Popover": require('react-bootstrap/lib/Popover'),
    "Modal": require('react-bootstrap/lib/Modal'),
    "Form": require('react-bootstrap/lib/Form'),
    "FormGroup": require('react-bootstrap/lib/FormGroup'),
    "FormControl": require('react-bootstrap/lib/FormControl'),
    "Col": require('react-bootstrap/lib/Col'),
    "ControlLabel": require('react-bootstrap/lib/ControlLabel'),
}

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
