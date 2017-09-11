'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Fields = require('./Fields');

var _Fields2 = _interopRequireDefault(_Fields);

var _wfuiReact = require('wfui-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Wrapper for regular Fieldset Group
 */
var TypeFieldset = function (_React$Component) {
    _inherits(TypeFieldset, _React$Component);

    function TypeFieldset() {
        _classCallCheck(this, TypeFieldset);

        return _possibleConstructorReturn(this, (TypeFieldset.__proto__ || Object.getPrototypeOf(TypeFieldset)).apply(this, arguments));
    }

    _createClass(TypeFieldset, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                question = _props.question,
                lang = _props.lang;

            var data = question.values[lang] || {};
            var groupId = question.groupId;

            return _react2.default.createElement(
                'div',
                { className: 'wfui-type-fieldset' },
                _react2.default.createElement(
                    'label',
                    null,
                    data.title
                ),
                data.description && _react2.default.createElement(_wfuiReact.Description, { content: data.description, src: data.image && data.image.src, imageTitle: data.image && data.image.title }),
                _react2.default.createElement(_Fields2.default, { groupId: '' + (groupId ? groupId + '.' : '') + question.id, section: question })
            );
        }
    }]);

    return TypeFieldset;
}(_react2.default.Component);

exports.default = TypeFieldset;