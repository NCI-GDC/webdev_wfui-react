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

var Label = function (_Component) {
	_inherits(Label, _Component);

	function Label() {
		_classCallCheck(this, Label);

		return _possibleConstructorReturn(this, (Label.__proto__ || Object.getPrototypeOf(Label)).apply(this, arguments));
	}

	_createClass(Label, [{
		key: 'render',
		value: function render() {
			var _props = this.props;
			var name = _props.name;
			var content = _props.content;
			var is_link = _props.is_link;
			var href = _props.href;
			var is_closeable = _props.is_closeable;


			var container_classes = "wfui-label";
			var container_href = "#";
			if (is_link) {
				container_href = href;
			}

			var close_button;
			if (is_closeable) {
				container_classes += " wfui-label-closeable";
				close_button = _react2.default.createElement('i', { className: 'wfui-icon wfui-icon-close', tabIndex: '0' });
			} else {
				close_button = _react2.default.createElement('i', null);
			}

			if (is_link) {
				return _react2.default.createElement(
					'span',
					{ className: container_classes, title: name },
					_react2.default.createElement(
						'a',
						{ href: container_href },
						content
					),
					close_button
				);
			} else {
				return _react2.default.createElement(
					'span',
					{ className: container_classes, title: name },
					content,
					close_button
				);
			}
		}
	}]);

	return Label;
}(_react.Component);

exports.default = Label;