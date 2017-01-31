'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Selection
 */
var Selection = function (_Component) {
  _inherits(Selection, _Component);

  function Selection() {
    _classCallCheck(this, Selection);

    return _possibleConstructorReturn(this, (Selection.__proto__ || Object.getPrototypeOf(Selection)).call(this));
  }

  _createClass(Selection, [{
    key: 'onHandleClick',
    value: function onHandleClick(e) {

      console.log(e);

      var type = this.props.type;

      if (type == "radio") {
        this.refs.selection.checked = true;
      }
      //Pass data to a callback.
      if (this.props.onHandleChange) {
        var res = {
          checked: this.refs.selection.checked,
          value: this.refs.selection.value,
          name: this.refs.selection.name
        };
        this.props.onHandleChange(res);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          label = _props.label,
          name = _props.name,
          value = _props.value,
          defaultChecked = _props.defaultChecked,
          children = _props.children,
          type = _props.type,
          className = _props.className,
          active = _props.active;

      var activeClassName = active ? " active" : "";

      return _react2.default.createElement(
        'div',
        { className: 'wfui-selection ' + className + ' ' + activeClassName },
        _react2.default.createElement(
          'label',
          { className: 'wfui-selection__label', onClick: this.onHandleClick.bind(this) },
          _react2.default.createElement('input', { onClick: function onClick(e) {
              e.stopPropagation();
            }, className: "wfui-selection__input-" + type, ref: 'selection', 'data-ref': 'selection', type: type, name: name, value: value, defaultChecked: defaultChecked }),
          _react2.default.createElement(
            'span',
            { onClick: function onClick(e) {
                e.stopPropagation();
              } },
            label
          ),
          children ? children : null
        )
      );
    }
  }]);

  return Selection;
}(_react.Component);

/**
 * Property types
 */


Selection.propTypes = {
  label: _react2.default.PropTypes.string,
  name: _react2.default.PropTypes.string,
  value: _react2.default.PropTypes.string,
  type: _react2.default.PropTypes.oneOf(['radio', 'checkbox']),
  defaultChecked: _react2.default.PropTypes.bool,
  className: _react2.default.PropTypes.string,
  active: _react2.default.PropTypes.bool
};
Selection.defaultProps = {
  label: '',
  name: '',
  value: '',
  type: 'radio',
  defaultChecked: false,
  className: ''
};

exports.default = Selection;