'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _Button = require('react-bootstrap/lib/Button');

var _Button2 = _interopRequireDefault(_Button);

var _action_creators = require('../../src/AddAnother/actions/action_creators');

var _action_creators2 = _interopRequireDefault(_action_creators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addTodoAction = _action_creators2.default.addTodoAction;
var toggleTodoAction = _action_creators2.default.toggleTodoAction;
var setVisibilityFilterAction = _action_creators2.default.setVisibilityFilterAction;
var initAnotherAction = _action_creators2.default.initAnotherAction;
var addAnotherAction = _action_creators2.default.addAnotherAction;
var editAnotherAction = _action_creators2.default.editAnotherAction;
var removeAnotherAction = _action_creators2.default.removeAnotherAction;

/**
 * Presentation Components
 **/

/**
 * Container Components
 **/

var Another = function Another(_ref) {
  var dispatch = _ref.dispatch;
  var component = _ref.component;
  var id = _ref.id;

  return _react2.default.createElement(
    'tr',
    { className: 'wfui-add-another__row' },
    _react2.default.createElement(
      'td',
      { className: 'wfui-add-another__col main-column' },
      component
    ),
    _react2.default.createElement(
      'td',
      { className: 'wfui-add-another__col wfui-add-another__remove del-column' },
      _react2.default.createElement(
        _Button2.default,
        { onClick: function onClick(e) {
            dispatch(removeAnotherAction(id));
          } },
        'Delete'
      )
    )
  );
};
Another = (0, _reactRedux.connect)()(Another);

var AnotherList = function AnotherList(_ref2) {
  var anothers = _ref2.anothers;
  var tableLabel = _ref2.tableLabel;

  if (anothers.length > 0) {
    var header = _react2.default.createElement(
      'tr',
      { className: 'wfui-add-another__row' },
      _react2.default.createElement(
        'th',
        { className: 'wfui-add-another__header main-column' },
        tableLabel
      ),
      _react2.default.createElement(
        'th',
        { className: 'wfui-add-another__header del-column' },
        'Remove'
      )
    );
  }
  return _react2.default.createElement(
    'table',
    { className: 'wfui-add-another' },
    _react2.default.createElement(
      'tbody',
      { className: 'wfui-add-another__tbody' },
      header,
      anothers.map(function (another) {
        return _react2.default.createElement(Another, _extends({ key: another.id }, another));
      })
    )
  );
};

var AddAnother = function AddAnother(_ref3) {
  var dispatch = _ref3.dispatch;
  var children = _ref3.children;
  var buttonLabel = _ref3.buttonLabel;

  dispatch(initAnotherAction(children));
  return _react2.default.createElement(
    'div',
    { className: 'wfui-add-another__add' },
    _react2.default.createElement(
      _Button2.default,
      { onClick: function onClick(e) {
          e.preventDefault();
          dispatch(addAnotherAction(children));
        } },
      '+ ',
      buttonLabel
    )
  );
};
AddAnother = (0, _reactRedux.connect)()(AddAnother);

//Connect to store
var mapStateToAnotherListProps = function mapStateToAnotherListProps(state) {
  return { anothers: state.anothersReducer };
};
AnotherList = (0, _reactRedux.connect)(mapStateToAnotherListProps)(AnotherList);

var AnotherTable = function AnotherTable(props) {
  var label = props.label;
  var description = props.description;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'label',
      null,
      label
    ),
    description,
    _react2.default.createElement(AnotherList, props),
    _react2.default.createElement(AddAnother, props)
  );
};

/**
 * Property types
 */
AnotherTable.propTypes = {
  label: _react2.default.PropTypes.string,
  buttonLabel: _react2.default.PropTypes.string,
  tableLabel: _react2.default.PropTypes.string,
  description: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element])
};
AnotherTable.defaultProps = {
  label: '',
  description: '',
  buttonLabel: 'Add',
  tableLabel: ''
};

exports.default = AnotherTable;