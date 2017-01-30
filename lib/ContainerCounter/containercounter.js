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

var ContainerCounter = function (_Component) {
  _inherits(ContainerCounter, _Component);

  function ContainerCounter(props) {
    _classCallCheck(this, ContainerCounter);

    var _this = _possibleConstructorReturn(this, (ContainerCounter.__proto__ || Object.getPrototypeOf(ContainerCounter)).call(this, props));

    _this.state = {
      counter: 0
    };
    return _this;
  }

  _createClass(ContainerCounter, [{
    key: 'onClick',
    value: function onClick(e) {
      this.setState({
        counter: this.state.counter + 1
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props$data = this.props.data,
          content = _props$data.content,
          isCounter = _props$data.isCounter;
      var counter = this.state.counter;


      var render_counter;
      if (isCounter) {
        render_counter = _react2.default.createElement(
          'div',
          { className: 'wfui-container__counter' },
          'Click Counter: ',
          counter
        );
      } else {
        render_counter = '';
      }

      return _react2.default.createElement(
        'div',
        {
          className: 'wfui-container',
          onClick: this.onClick.bind(this) },
        render_counter,
        content
      );
    }
  }]);

  return ContainerCounter;
}(_react.Component);

exports.default = ContainerCounter;