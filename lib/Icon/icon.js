'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Icon = function (_Component) {
    _inherits(Icon, _Component);

    function Icon() {
        _classCallCheck(this, Icon);

        return _possibleConstructorReturn(this, (Icon.__proto__ || Object.getPrototypeOf(Icon)).apply(this, arguments));
    }

    _createClass(Icon, [{
        key: 'render',
        value: function render() {
            var data;
            var iconClasses = '';

            if (typeof this.props.data == 'string') {
                data = JSON.parse(this.props.data);
            } else {
                data = this.props.data;
            }

            //mandatory class
            iconClasses += 'wfui-icon fa fa-' + data.name;

            if (data.size) {
                iconClasses += ' fa-' + data.size;
            }
            if (data.is_fixed_width) {
                iconClasses += ' fa-fw';
            }
            if (data.is_li_icon) {
                iconClasses += ' fa-li';
            }
            if (data.has_border) {
                iconClasses += ' fa-border';
            }
            if (data.pull) {
                iconClasses += ' pull-' + data.pull;
            }
            if (data.is_spinning) {
                iconClasses += ' fa-spin';
            }
            if (data.rotate) {
                iconClasses += ' fa-rotate-' + data.rotate;
            }
            if (data.flip) {
                iconClasses += ' fa-flip-' + data.flip;
            }
            if (data.stack) {
                iconClasses += ' fa-stack-' + data.stack;
            }

            return _react2.default.createElement('i', { className: iconClasses });
        }
    }]);

    return Icon;
}(_react.Component);

exports.default = Icon;