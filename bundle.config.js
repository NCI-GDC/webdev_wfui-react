window.React = require('react');
window.ReactDOM = require('react-dom');

window.WFUIJS = WFUIJS || {}
window.WFUIJS.Description = require('./src/Description/description.js');
window.WFUIJS.InputField = require('./src/InputField/input_field.js');
window.WFUIJS.InputTable = require('./src/InputTable/input_table.js');

require('./src/Selection/selection.scss');
window.WFUIJS.Selection = require('./src/Selection/selection.js');

require('./src/Grid/grid.scss');
window.WFUIJS.Grid = require('./src/Grid/grid.js');