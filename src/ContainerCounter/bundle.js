import React from 'react';
import ReactDOM from 'react-dom';
import ContainerCounter from '../../src/ContainerCounter/containercounter';
const css = require('../../dist/wfui.bundle.css');

var elementNode= <div><ul><li>hi</li><li>tom</li></ul></div>;
var props1 = { content: elementNode, isCounter: true };
var props2 = { content: elementNode, isCounter: false };


ReactDOM.render( <ContainerCounter data={props1} />, document.getElementById('container1'));
ReactDOM.render( <ContainerCounter data={props2} />, document.getElementById('container2'));
