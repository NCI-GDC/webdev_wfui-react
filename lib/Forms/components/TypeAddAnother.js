'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxForm = require('redux-form');

var _Description = require('../../FormFields/Description');

var _Description2 = _interopRequireDefault(_Description);

var _FormFields = require('../../FormFields/');

var _Fields = require('./Fields');

var _Fields2 = _interopRequireDefault(_Fields);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Wrapper for Question Type 9 (Add Another)
 */
var TypeAddAnother = function (_React$Component) {
    _inherits(TypeAddAnother, _React$Component);

    function TypeAddAnother() {
        _classCallCheck(this, TypeAddAnother);

        return _possibleConstructorReturn(this, (TypeAddAnother.__proto__ || Object.getPrototypeOf(TypeAddAnother)).apply(this, arguments));
    }

    _createClass(TypeAddAnother, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                question = _props.question,
                lang = _props.lang,
                review = _props.review;

            var data = question.values[lang] || {};

            // const that = this;
            // const {field} = this.props;
            // //TODO Lables for field button and table.
            // let props = {
            //     label: this.getTitle(field),
            //     description: <Description content={field['#description']} type={this.getDescriptionType(field)} />,
            //     tableLabel: field['#table_label'],
            //     buttonLabel: field['#button_label'],
            // }

            return _react2.default.createElement(
                'div',
                { className: 'wfui-type-add-another' },
                data.description && _react2.default.createElement(_Description2.default, { content: data.description, src: data.image && data.image.src, imageTitle: data.image && data.image.title }),
                _react2.default.createElement(_reduxForm.FieldArray, {
                    name: question.id,
                    type: 'select',
                    className: 'bluetext',
                    component: _FormFields.renderAddAnother,
                    label: data.title,
                    childComponent: function childComponent(groupId, i) {
                        return _react2.default.createElement(_Fields2.default, { review: review, groupId: groupId, groupIndex: i, section: question });
                    },
                    disabled: review,
                    draggable: true
                })
            );
        }
    }]);

    return TypeAddAnother;
}(_react2.default.Component);

exports.default = TypeAddAnother;