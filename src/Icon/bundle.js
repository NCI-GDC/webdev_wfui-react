import React from 'react';
import ReactDOM from 'react-dom';

//WFUI
import Icon from '../../src/Icon/icon';
const css = require('../../dist/wfui.bundle.css');

ReactDOM.render( <Icon data={{name: 'spinner', size: '1x', is_spinning:true}} />, document.getElementById('icon1'));
ReactDOM.render( <Icon data={{name: 'envelope', size: '2x'}} />, document.getElementById('icon2'));
ReactDOM.render( <Icon data={{name: 'info', size: '3x'}} />, document.getElementById('icon3'));
ReactDOM.render( <Icon data={{name: 'tag', size: '4x'}} />, document.getElementById('icon4'));
ReactDOM.render( <Icon data={{name: 'times', size: '5x'}} />, document.getElementById('icon5'));