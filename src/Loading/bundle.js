import React from 'react';
import ReactDOM from 'react-dom';

//WFUI
import Loading from '../../src/Loading/loading';
const css = require('../../dist/wfui.bundle.css');

ReactDOM.render( <Loading width="100" height="100" />, document.getElementById('loading'));