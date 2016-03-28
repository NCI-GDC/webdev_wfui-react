import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { Provider, connect } from 'react-redux';

//dev
import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import actions from '../../../src/AddAnother/actions/action_creators';
const { addAnotherAction, editAnotherAction, removeAnotherAction } = actions;


/**
 * Reducers
 **/

const anotherReducer = (state, action) => {
  switch(action.type){
      case 'ADD_ANOTHER':
        return {
          id: action.id,
          component: action.component,
          edited: false
        }
      case 'EDIT_ANOTHER':
        if(action.id != state.id){
          return state;
        }
        return {
          ...state,
          edited: !state.edited
        };
      break;
  }
}
const anothersReducer = (state = [], action) => {
  switch(action.type){
      case 'ADD_ANOTHER':
        return [
          ...state,
          anotherReducer(undefined, action)
        ];
        break;
      case 'EDIT_ANOTHER':
        return state.map(another =>
          anotherReducer(another, action)
        );
        break;
      case 'REMOVE_ANOTHER':
        let stateNext;
        state.forEach(function(val, i){
          if(val.id == action.id){
            stateNext = [
              ...state.slice(0, i),
              ...state.slice(i+1)
            ]
          }
        });
        return stateNext || state;
        break;
  }
  return state;
}

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
};
const todosReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todoReducer(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t =>
        todoReducer(t, action)
      );
    default:
      return state;
  }
};
const visibilityFilterReducer = (
  state = 'SHOW_ALL',
  action
) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};
const todoAppReducers = combineReducers({
  todosReducer,
  visibilityFilterReducer
});

const anothersReducers = combineReducers({
  anothersReducer
});

export default anothersReducers