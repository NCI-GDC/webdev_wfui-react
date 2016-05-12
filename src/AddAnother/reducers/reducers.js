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

/**
 * Recursively iterate through children and change input field name ( In order to distinguish each fields )
 */
const renameFieldName = (props, postfix) => {
  var _props = Object.assign({}, props);
  Object.keys(_props).map(function(key, i){
    if(key === 'children'){
      _props[key] = _props[key].map(function(child, j){
        return React.cloneElement(child, renameFieldName(child.props, postfix));
      });
    }else if(key === 'name'){
      _props[key] += '_'+postfix;
    }
  });
  return _props;
}

const anotherReducer = (state, action) => {
  switch(action.type){
      case 'ADD_ANOTHER':
        let newComponent;
        if(action.component.length === undefined){
          let newProps = renameFieldName(action.component.props, action.id);
          newComponent = React.cloneElement(action.component, newProps);
        }else{
          newComponent = action.component.map(function(component, i){
            let props = renameFieldName(component.props, action.id);
            props.key = i;
            return React.cloneElement(component, props);
          });
        }
        return {
          id: action.id,
          component: newComponent,
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
      case 'INIT_ANOTHER':
        if(state.length == 0){
          return [
            ...state,
            anotherReducer(undefined, Object.assign({}, action, {type:"ADD_ANOTHER"}))
          ];
        }else{
          return state;
        }
        break;
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

const anothersReducers = combineReducers({
  anothersReducer
});

export default anothersReducers