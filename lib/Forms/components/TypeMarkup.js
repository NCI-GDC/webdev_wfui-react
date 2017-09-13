'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Description = require('../../FormFields/Description');

var _Description2 = _interopRequireDefault(_Description);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Wrapper for Question Type 2 (InputField)
 */
var TypeMarkup = function (_React$Component) {
    _inherits(TypeMarkup, _React$Component);

    function TypeMarkup() {
        _classCallCheck(this, TypeMarkup);

        return _possibleConstructorReturn(this, (TypeMarkup.__proto__ || Object.getPrototypeOf(TypeMarkup)).apply(this, arguments));
    }

    _createClass(TypeMarkup, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                question = _props.question,
                lang = _props.lang;

            var data = question.values[lang] || {};
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'question-type-text' },
                    _react2.default.createElement(_Description2.default, { content: data.description, src: data.image && data.image.src, imageTitle: data.image && data.image.title })
                )
            );
        }
    }]);

    return TypeMarkup;
}(_react2.default.Component);

exports.default = TypeMarkup;