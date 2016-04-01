window.React = require('react');
window.ReactDOM = require('react-dom');

window.WFUIJS = WFUIJS || {}

require('./src/Description/description.scss');
window.WFUIJS.Description = require('./src/Description/description.js');

require('./src/InputField/input_field.scss');
window.WFUIJS.InputField = require('./src/InputField/input_field.js');

require('./src/InputTable/input_table.scss');
window.WFUIJS.InputTable = require('./src/InputTable/input_table.js');

require('./src/Selection/selection.scss');
window.WFUIJS.Selection = require('./src/Selection/selection.js');

require('./src/Grid/grid.scss');
window.WFUIJS.Grid = require('./src/Grid/grid.js');

require('./src/AddAnother/add_another.scss');
window.WFUIJS.AddAnother = require('./src/AddAnother/add_another.js');