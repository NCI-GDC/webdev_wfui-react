'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TypeAddInputsPreview = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reduxForm = require('redux-form');

var _FormFields = require('../../FormFields/');

var _Description = require('../../FormFields/Description');

var _Description2 = _interopRequireDefault(_Description);

var _input_hybrid = require('../helpers/input_hybrid');

var _validator = require('../helpers/validator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Wrapper for Question Type 7 (Listbox)
 */

var TypeAddInputs = function (_React$Component) {
    _inherits(TypeAddInputs, _React$Component);

    function TypeAddInputs() {
        _classCallCheck(this, TypeAddInputs);

        return _possibleConstructorReturn(this, (TypeAddInputs.__proto__ || Object.getPrototypeOf(TypeAddInputs)).apply(this, arguments));
    }

    _createClass(TypeAddInputs, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                limits = _props.limits,
                token = _props.token,
                question = _props.question,
                lang = _props.lang,
                globalError = _props.globalError,
                review = _props.review,
                withoutDnDContext = _props.withoutDnDContext,
                initialValues = _props.initialValues;

            // const options = data.options ? data.options.slice(0) : [];

            var data = question.values[lang] || {};
            var groupId = question.groupId;
            var child = data.children && data.children[0] || {};
            var cid = child.cid || child.id;

            return _react2.default.createElement(
                'div',
                { className: 'wfui-type-add-inputs' },
                data.description && _react2.default.createElement(_Description2.default, { content: data.description, src: data.image && data.image.src, imageTitle: data.image && data.image.title }),
                _react2.default.createElement(_reduxForm.FieldArray, {
                    name: question.id,
                    type: 'select',
                    className: 'bluetext',
                    component: _FormFields.renderAddAnother,
                    label: data.title,
                    childComponent: function childComponent(questionId, i) {
                        return _react2.default.createElement(_reduxForm.Field, {
                            label: '',
                            name: '' + (groupId ? groupId + '.' : '') + questionId + '.value',
                            type: child.field_type || 'text',
                            component: _FormFields.renderField,
                            placeholder: '',
                            postfix: child.field_suffix,
                            maxlength: limits && limits.fieldLimit,
                            min: (0, _input_hybrid.parseAgeToken)(child.range_lower, token),
                            max: (0, _input_hybrid.parseAgeToken)(child.range_upper, token),
                            globalError: globalError,
                            inline: true,
                            required: question.required,
                            disabled: review || question.disabled
                        });
                    },
                    disabled: review,
                    withoutDnDContext: withoutDnDContext,
                    draggable: true
                })
            );
        }
    }]);

    return TypeAddInputs;
}(_react2.default.Component);

var TypeAddInputsContainer = (0, _reactRedux.connect)(function (state, props) {
    var formID = props.preview ? 'form_preview' : 'form_' + props.question.sectionId;
    var syncErrors = (0, _reduxForm.getFormSyncErrors)(formID)(state);
    var qid = typeof props.question.groupIndex !== 'undefined' ? props.question.id + '[' + props.question.groupIndex + ']' : props.question.id;

    return {
        globalError: syncErrors && syncErrors.global && syncErrors.global[qid],
        withoutDnDContext: props.preview,
        initialValues: [{ value: 12 }]
    };
})(TypeAddInputs);

exports.default = TypeAddInputsContainer;

/**
 * Preview Component
 */

var TypeAddInputsPreview = exports.TypeAddInputsPreview = (0, _reduxForm.reduxForm)({
    form: 'form_preview',
    validate: function validate(values, props) {
        var validatorMap = (0, _validator.generateValidatorMap)([props.question], 'en');
        return (0, _validator.validator)(validatorMap)(values);
    },
    destroyOnUnmount: true
})(TypeAddInputsContainer);