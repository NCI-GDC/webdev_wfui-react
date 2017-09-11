"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProgressIndicator = function (_React$Component) {
    _inherits(ProgressIndicator, _React$Component);

    function ProgressIndicator() {
        _classCallCheck(this, ProgressIndicator);

        return _possibleConstructorReturn(this, (ProgressIndicator.__proto__ || Object.getPrototypeOf(ProgressIndicator)).apply(this, arguments));
    }

    _createClass(ProgressIndicator, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                completed = _props.completed,
                total = _props.total;


            var percentage = 360 * (completed / total);
            var style = { "backgroundColor": "#13b497" }; // default green

            if (percentage <= 180) {
                style.backgroundImage = "linear-gradient(" + (percentage + 90) + "deg, transparent 50%, white 50%), linear-gradient(90deg, white 50%, transparent 50%)";
            } else {
                style.backgroundImage = "linear-gradient(" + (percentage - 90) + "deg, transparent 50%, " + style.backgroundColor + " 50%), linear-gradient(90deg, white 50%, transparent 50%)";
            }

            return _react2.default.createElement(
                "div",
                { className: "progress-circle" },
                _react2.default.createElement(
                    "div",
                    {
                        className: "progress-circle-change",
                        style: style },
                    _react2.default.createElement(
                        "div",
                        { className: "progress-circle-inner" },
                        percentage == 360 ? _react2.default.createElement("img", { src: "/images/progress-check.png" }) : ""
                    )
                )
            );
        }
    }]);

    return ProgressIndicator;
}(_react2.default.Component);

exports.default = ProgressIndicator;