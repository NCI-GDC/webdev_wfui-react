'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.Test2 = exports.Test = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Test = function Test(_ref) {
   var var1 = _ref.var1,
       var2 = _ref.var2;
   return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
         'div',
         null,
         _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
               'div',
               null,
               'Test'
            )
         )
      )
   );
};

var Test2 = function Test2(props) {
   var newChildren = _react2.default.Children.toArray(props.children);
   newChildren.push(_react2.default.createElement(
      'div',
      null,
      'CATS'
   ));
   var test = _react2.default.cloneElement(props.lol, { children: _react2.default.createElement(
         'i',
         null,
         ' WHAT IS UP '
      ) });
   console.log(props);
   return _react2.default.createElement('div', null);
};

exports.Test = Test;
exports.Test2 = Test2;