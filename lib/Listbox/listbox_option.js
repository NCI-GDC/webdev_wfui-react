'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * ListboxOption
 */
var ListboxOption = function (_Component) {
  _inherits(ListboxOption, _Component);

  function ListboxOption() {
    _classCallCheck(this, ListboxOption);

    return _possibleConstructorReturn(this, (ListboxOption.__proto__ || Object.getPrototypeOf(ListboxOption)).apply(this, arguments));
  }

  _createClass(ListboxOption, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          value = _props.value,
          label = _props.label,
          className = _props.className;


      return _react2.default.createElement(
        'option',
        { value: value, className: className },
        label
      );
    }
  }]);

  return ListboxOption;
}(_react.Component);

/**
 * Property types
 */


ListboxOption.propTypes = {
  value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string]),
  label: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string]),
  className: _react2.default.PropTypes.string
};
ListboxOption.defaultProps = {
  value: '',
  label: '',
  className: ''
};

exports.default = ListboxOption;