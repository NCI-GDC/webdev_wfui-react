'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TypeInputFieldPreview = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reduxForm = require('redux-form');

var _FormFields = require('../../FormFields/');

var _Description = require('../../FormFields/Description');

var _Description2 = _interopRequireDefault(_Description);

var _input_hybrid = require('../helpers/input_hybrid.js');

var _validator = require('../helpers/validator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Wrapper for Question Type 2 (InputField)
 */
var TypeInputField = function (_React$Component) {
    _inherits(TypeInputField, _React$Component);

    function TypeInputField() {
        _classCallCheck(this, TypeInputField);

        var _this = _possibleConstructorReturn(this, (TypeInputField.__proto__ || Object.getPrototypeOf(TypeInputField)).call(this));

        _this.state = { value: undefined, saving: false };
        return _this;
    }

    _createClass(TypeInputField, [{
        key: 'render',
        value: function render() {
            var _state = this.state,
                value = _state.value,
                saving = _state.saving;
            var _props = this.props,
                question = _props.question,
                limits = _props.limits,
                lang = _props.lang,
                preview = _props.preview,
                submitted = _props.submitted,
                token = _props.token,
                errors = _props.errors,
                globalError = _props.globalError;


            var data = question.values[lang] || {};
            var groupId = question.groupId;
            var child = data.children && data.children[0] || {};
            var cid = child.cid || child.id;

            return _react2.default.createElement(
                'div',
                { className: 'wfui-type-input-field' },
                data.description && _react2.default.createElement(_Description2.default, { content: data.description, src: data.image && data.image.src, imageTitle: data.image && data.image.title }),
                Object.keys(child).length > 0 && _react2.default.createElement(_reduxForm.Field, {
                    label: data.title,
                    name: '' + (groupId ? groupId + '.' : '') + question.id + '.' + cid,
                    type: child.field_type || 'text',
                    component: _FormFields.renderField,
                    placeholder: '',
                    postfix: child.field_suffix,
                    maxlength: limits && limits.fieldLimit,
                    min: (0, _input_hybrid.parseAgeToken)(child.range_lower, token),
                    max: (0, _input_hybrid.parseAgeToken)(child.range_upper, token),
                    globalError: globalError,
                    inline: true,
                    required: question.required
                })
            );
        }
    }]);

    return TypeInputField;
}(_react2.default.Component);

var TypeInputFieldContainer = (0, _reactRedux.connect)(function (state, props) {
    var formID = props.preview ? 'form_preview' : 'form_' + props.question.sectionId;
    var syncErrors = (0, _reduxForm.getFormSyncErrors)(formID)(state);
    var qid = typeof props.question.groupIndex !== 'undefined' ? props.question.id + '[' + props.question.groupIndex + ']' : props.question.id;

    return {
        globalError: syncErrors && syncErrors.global && syncErrors.global[qid]
    };
})(TypeInputField);

exports.default = TypeInputFieldContainer;

/**
 * Preview Component
 */

var TypeInputFieldPreview = exports.TypeInputFieldPreview = (0, _reduxForm.reduxForm)({
    form: 'form_preview',
    validate: function validate(values, props) {
        var validatorMap = (0, _validator.generateValidatorMap)([props.question], 'en');
        return (0, _validator.validator)(validatorMap)(values);
    },
    destroyOnUnmount: true
})(TypeInputFieldContainer);