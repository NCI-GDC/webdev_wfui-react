window.React = require('react');
window.ReactDOM = require('react-dom');

window.WFUIJS = WFUIJS || {}

require('./src/Description/description.scss');
window.WFUIJS.modules.Description = require('./src/Description/description.js').default;

require('./src/InputField/input_field.scss');
window.WFUIJS.modules.InputField = require('./src/InputField/input_field.js').default;

require('./src/InputTable/input_table.scss');
window.WFUIJS.modules.InputTable = require('./src/InputTable/input_table.js').default;

require('./src/Selection/selection.scss');
window.WFUIJS.modules.Selection = require('./src/Selection/selection.js').default;

require('./src/Grid/grid.scss');
window.WFUIJS.modules.Grid = require('./src/Grid/grid.js').default;

window.WFUIJS.modules.ListboxOption = require('./src/Listbox/listbox_option.js').default;
window.WFUIJS.modules.Listbox = require('./src/Listbox/listbox.js').default;

require('./src/AddAnother/add_another.scss');
window.WFUIJS.modules.AddAnother = require('./src/AddAnother/add_another.js').default