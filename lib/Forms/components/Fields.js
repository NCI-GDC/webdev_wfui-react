'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Field = require('./Field');

var _Field2 = _interopRequireDefault(_Field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import BaseWebformField from './BaseWebformField'


/**
 * Fields: Render array of field
 */
var Fields = function (_React$Component) {
    _inherits(Fields, _React$Component);

    function Fields() {
        _classCallCheck(this, Fields);

        return _possibleConstructorReturn(this, (Fields.__proto__ || Object.getPrototypeOf(Fields)).apply(this, arguments));
    }

    _createClass(Fields, [{
        key: 'render',
        value: function render() {
            var that = this;
            var _props = this.props,
                section = _props.section,
                className = _props.className,
                translated = _props.translated,
                groupId = _props.groupId,
                groupIndex = _props.groupIndex;

            if (section.children) {

                return _react2.default.createElement(
                    'div',
                    { className: className },
                    section.children.map(function (field, i) {
                        var _field = JSON.parse(JSON.stringify(field));
                        _field.sectionId = section.sectionId || section.id;
                        _field.parent = section.id;
                        _field.groupId = groupId;
                        _field.groupIndex = groupIndex;
                        return _react2.default.createElement(
                            'div',
                            { className: 'fields', key: i },
                            _react2.default.createElement(_Field2.default, { field: _field, translated: translated })
                        );
                    })
                );
            }
            console.error('The prop field data does not have \'#field\'', 'Fields');
            return null;
        }
    }]);

    return Fields;
}(_react2.default.Component);

exports.default = Fields;