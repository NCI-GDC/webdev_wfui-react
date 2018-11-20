'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n            0% {transform: rotate(0deg) scale(1)} \n            50% {transform: rotate(180deg) scale(0.8)}\n            100% {transform: rotate(360deg) scale(1)}\n        '], ['\n            0% {transform: rotate(0deg) scale(1)} \n            50% {transform: rotate(180deg) scale(0.8)}\n            100% {transform: rotate(360deg) scale(1)}\n        ']),
    _templateObject2 = _taggedTemplateLiteral(['\n             {\n                background: transparent !important;\n                width: ', ';\n                height: ', ';\n                border-radius: 100%;\n                border: 2px solid;\n                border-color: ', ';\n                border-bottom-color: transparent;\n                display: inline-block;\n                animation: ', ' 0.75s 0s infinite linear;\n                animation-fill-mode: both;\n            }\n        '], ['\n             {\n                background: transparent !important;\n                width: ', ';\n                height: ', ';\n                border-radius: 100%;\n                border: 2px solid;\n                border-color: ', ';\n                border-bottom-color: transparent;\n                display: inline-block;\n                animation: ', ' 0.75s 0s infinite linear;\n                animation-fill-mode: both;\n            }\n        ']),
    _templateObject3 = _taggedTemplateLiteral(['\n                  ', ';\n                  ', '\n              '], ['\n                  ', ';\n                  ', '\n              ']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _onlyUpdateForKeys = require('recompose/onlyUpdateForKeys');

var _onlyUpdateForKeys2 = _interopRequireDefault(_onlyUpdateForKeys);

var _createEmotion = require('create-emotion');

var _createEmotion2 = _interopRequireDefault(_createEmotion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Loader = function (_React$Component) {
    _inherits(Loader, _React$Component);

    function Loader(props) {
        _classCallCheck(this, Loader);

        var _this = _possibleConstructorReturn(this, (Loader.__proto__ || Object.getPrototypeOf(Loader)).call(this));

        _this.emotion = (0, _createEmotion2.default)(props.context);
        var keyframes = _this.emotion.keyframes;

        _this.clip = keyframes(_templateObject);
        return _this;
    }

    _createClass(Loader, [{
        key: 'style',
        value: function style() {
            var _props = this.props,
                size = _props.size,
                sizeUnit = _props.sizeUnit,
                color = _props.color,
                className = _props.className;
            var css = this.emotion.css;


            var style = css(_templateObject2, '' + size + sizeUnit, '' + size + sizeUnit, color, this.clip);

            return className ? css(_templateObject3, style, className) : style;
        }
    }, {
        key: 'render',
        value: function render() {
            var loading = this.props.loading;

            return loading ? _react2.default.createElement('div', { className: this.style() }) : null;
        }
    }]);

    return Loader;
}(_react2.default.Component);

Loader.propTypes = {
    loading: _propTypes2.default.bool,
    color: _propTypes2.default.string,
    size: _propTypes2.default.number,
    sizeUnit: _propTypes2.default.string,
    className: _propTypes2.default.string
};

Loader.defaultProps = {
    loading: true,
    color: '#9B9B9B',
    size: 35,
    sizeUnit: 'px',
    className: ''
};

var Component = (0, _onlyUpdateForKeys2.default)(['loading', 'color', 'size', 'sizeUnit', 'className'])(Loader);
Component.defaultProps = Loader.defaultProps;
exports.default = Component;