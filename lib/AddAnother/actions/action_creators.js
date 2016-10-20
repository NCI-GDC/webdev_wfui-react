'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

/**
 * Action Creators
 **/
var nextAnotherId = 0;
var initAnotherAction = function initAnotherAction(component) {
  return {
    type: 'INIT_ANOTHER',
    id: nextAnotherId++,
    component: component
  };
};
var addAnotherAction = function addAnotherAction(component) {
  return {
    type: 'ADD_ANOTHER',
    id: nextAnotherId++,
    component: component
  };
};
var editAnotherAction = function editAnotherAction(id) {
  return {
    type: 'EDIT_ANOTHER',
    id: id
  };
};
var removeAnotherAction = function removeAnotherAction(id) {
  return {
    type: 'REMOVE_ANOTHER',
    id: id
  };
};

var nextTodoId = 0;
var addTodoAction = function addTodoAction(text) {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text: text
  };
};

var toggleTodoAction = function toggleTodoAction(id) {
  return {
    type: 'TOGGLE_TODO',
    id: id
  };
};

var setVisibilityFilterAction = function setVisibilityFilterAction(filter) {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter: filter
  };
};

exports.default = {
  initAnotherAction: initAnotherAction,
  addAnotherAction: addAnotherAction,
  editAnotherAction: editAnotherAction,
  removeAnotherAction: removeAnotherAction,
  addTodoAction: addTodoAction,
  toggleTodoAction: toggleTodoAction,
  setVisibilityFilterAction: setVisibilityFilterAction
};