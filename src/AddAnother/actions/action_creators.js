import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { Provider, connect } from 'react-redux';

/**
 * Action Creators
 **/
let nextAnotherId = 0;
const addAnotherAction = (component) => {
  return {
    type: 'ADD_ANOTHER',
    id: nextAnotherId++,
    component
  };
};
const editAnotherAction = (id) => {
  return {
    type: 'EDIT_ANOTHER',
    id
  };
};
const removeAnotherAction = (id) => {
  return {
    type: 'REMOVE_ANOTHER',
    id
  };
};

let nextTodoId = 0;
const addTodoAction = (text) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  };
};

const toggleTodoAction = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  };
};

const setVisibilityFilterAction = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  };
};

export default {
  addAnotherAction: addAnotherAction,
  editAnotherAction: editAnotherAction,
  removeAnotherAction: removeAnotherAction,
  addTodoAction: addTodoAction,
  toggleTodoAction: toggleTodoAction,
  setVisibilityFilterAction: setVisibilityFilterAction
}