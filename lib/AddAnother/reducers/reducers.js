'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//dev


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _deepFreeze = require('deep-freeze');

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

var _chai = require('chai');

var _action_creators = require('../../../src/AddAnother/actions/action_creators');

var _action_creators2 = _interopRequireDefault(_action_creators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var addAnotherAction = _action_creators2.default.addAnotherAction;
var editAnotherAction = _action_creators2.default.editAnotherAction;
var removeAnotherAction = _action_creators2.default.removeAnotherAction;

/**
 * Reducers
 **/

/**
 * Recursively iterate through children and change input field name ( In order to distinguish each fields )
 */

var renameFieldName = function renameFieldName(props, postfix) {
  var _props = Object.assign({}, props);
  Object.keys(_props).map(function (key, i) {
    if (key === 'children') {
      _props[key] = _props[key].map(function (child, j) {
        return _react2.default.cloneElement(child, renameFieldName(child.props, postfix));
      });
    } else if (key === 'name') {
      _props[key] += '_' + postfix;
    }
  });
  return _props;
};

var anotherReducer = function anotherReducer(state, action) {
  switch (action.type) {
    case 'ADD_ANOTHER':
      var newComponent = void 0;
      if (action.component.length === undefined) {
        var newProps = renameFieldName(action.component.props, action.id);
        newComponent = _react2.default.cloneElement(action.component, newProps);
      } else {
        newComponent = action.component.map(function (component, i) {
          var props = renameFieldName(component.props, action.id);
          props.key = i;
          return _react2.default.cloneElement(component, props);
        });
      }
      return {
        id: action.id,
        component: newComponent,
        edited: false
      };
    case 'EDIT_ANOTHER':
      if (action.id != state.id) {
        return state;
      }
      return _extends({}, state, {
        edited: !state.edited
      });
      break;
  }
};
var anothersReducer = function anothersReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];

  switch (action.type) {
    case 'INIT_ANOTHER':
      if (state.length == 0) {
        return [].concat(_toConsumableArray(state), [anotherReducer(undefined, Object.assign({}, action, { type: "ADD_ANOTHER" }))]);
      } else {
        return state;
      }
      break;
    case 'ADD_ANOTHER':
      return [].concat(_toConsumableArray(state), [anotherReducer(undefined, action)]);
      break;
    case 'EDIT_ANOTHER':
      return state.map(function (another) {
        return anotherReducer(another, action);
      });
      break;
    case 'REMOVE_ANOTHER':
      var stateNext = void 0;
      state.forEach(function (val, i) {
        if (val.id == action.id) {
          stateNext = [].concat(_toConsumableArray(state.slice(0, i)), _toConsumableArray(state.slice(i + 1)));
        }
      });
      return stateNext || state;
      break;
  }
  return state;
};

var anothersReducers = (0, _redux.combineReducers)({
  anothersReducer: anothersReducer
});

exports.default = {
  _renameFieldName: renameFieldName,
  _anotherReducer: anotherReducer,
  _anothersReducer: anothersReducer,
  AddAnotherReducer: anothersReducers
};