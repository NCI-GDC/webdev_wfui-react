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
 * Listbox
 */
var Listbox = function (_Component) {
  _inherits(Listbox, _Component);

  function Listbox() {
    _classCallCheck(this, Listbox);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Listbox).apply(this, arguments));
  }

  _createClass(Listbox, [{
    key: 'onHandleChange',
    value: function onHandleChange(e) {
      if (this.props.onHandleChange) {
        this.props.onHandleChange(e);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var label = _props.label;
      var placeholder = _props.placeholder;
      var defaultOption = _props.defaultOption;
      var children = _props.children;
      var description = _props.description;
      var errors = _props.errors;
      var value = _props.value;


      var options = [];
      children.map(function (list_box_option, i) {
        options.push(list_box_option);
      });

      var placeholder_option = placeholder ? _react2.default.createElement(
        'option',
        { value: '' },
        placeholder
      ) : null;

      //check error flag
      var errorClassName = '';
      if (errors) {
        errorClassName += ' wfui-list-box--theme-error';
      }

      return _react2.default.createElement(
        'div',
        { className: "wfui-list-box" },
        description,
        _react2.default.createElement(
          'div',
          { className: "wfui-list-box-fields" },
          _react2.default.createElement('label', { dangerouslySetInnerHTML: { __html: label.replace(/\n/g, "<br/>") } }),
          _react2.default.createElement(
            'select',
            { className: errorClassName, defaultValue: defaultOption, value: value, onChange: this.onHandleChange.bind(this) },
            placeholder_option,
            options
          )
        )
      );
    }
  }]);

  return Listbox;
}(_react.Component);

/**
 * Property types
 */


Listbox.propTypes = {
  label: _react2.default.PropTypes.string,
  placeholder: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
  defaultOption: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
  description: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.object]),
  errors: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number, _react2.default.PropTypes.bool])
};
Listbox.defaultProps = {
  label: '',
  placeholder: '',
  defaultOption: '',
  description: '',
  children: [],
  errors: ''
};

exports.default = Listbox;