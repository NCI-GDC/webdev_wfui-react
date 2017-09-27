'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TypeTableFormatPreview = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reduxForm = require('redux-form');

var _validator = require('../helpers/validator');

var _input_hybrid = require('../helpers/input_hybrid.js');

var _FormFields = require('../../FormFields/');

var _Description = require('../../FormFields/Description');

var _Description2 = _interopRequireDefault(_Description);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Wrapper for Question Type 3 (Input Table Formaat)
 */
var TypeTableFormat = function (_React$Component) {
    _inherits(TypeTableFormat, _React$Component);

    function TypeTableFormat() {
        _classCallCheck(this, TypeTableFormat);

        var _this = _possibleConstructorReturn(this, (TypeTableFormat.__proto__ || Object.getPrototypeOf(TypeTableFormat)).call(this));

        _this.state = { values: {}, saving: false, cids: [] };
        return _this;
    }

    _createClass(TypeTableFormat, [{
        key: 'render',
        value: function render() {
            var _state = this.state,
                values = _state.values,
                saving = _state.saving;
            var _props = this.props,
                question = _props.question,
                limits = _props.limits,
                lang = _props.lang,
                preview = _props.preview,
                submitted = _props.submitted,
                token = _props.token,
                errors = _props.errors,
                globalError = _props.globalError,
                review = _props.review;

            var data = question.values[lang] || {};
            var groupId = question.groupId;

            var props = {
                // className: error == 1 ? "input-table-error" : "",
                fieldLabel: data.title,
                fieldType: data.logic ? data.logic.toLowerCase() : "and",
                description: _react2.default.createElement(_Description2.default, { content: data.description, src: data.image && data.image.src, imageTitle: data.image && data.image.title })
            };

            var fieldMap = {};
            if (data.children) {
                data.children.forEach(function (child, i) {
                    var _child = JSON.parse(JSON.stringify(child));
                    if (child.type === 'input') {
                        _child.maxlength = limits && limits.fieldLimit;
                        _child.min = (0, _input_hybrid.parseAgeToken)(child.range_lower, token);
                        _child.max = (0, _input_hybrid.parseAgeToken)(child.range_upper, token);
                        _child.postfix = child.field_suffix;
                    }
                    fieldMap[child.cid] = _child;
                });
            }

            var names = data.children.map(function (child) {
                return '' + (groupId ? groupId + '.' : '') + question.id + '.' + child.cid;
            });
            return _react2.default.createElement(
                'div',
                { className: 'wfui-type-table-format' },
                data.description && _react2.default.createElement(_Description2.default, { content: data.description, src: data.image && data.image.src, imageTitle: data.image && data.image.title }),
                _react2.default.createElement(_reduxForm.Fields, {
                    label: data.title,
                    name: '' + (groupId ? groupId + '.' : '') + question.id,
                    names: names,
                    type: 'text',
                    component: _FormFields.renderTableFormat,
                    globalError: globalError,
                    logic: props.fieldType,
                    fieldMap: fieldMap,
                    required: question.required,
                    disabled: review
                })
            );
        }
    }]);

    return TypeTableFormat;
}(_react2.default.Component);

var TypeTableFormatContainer = (0, _reactRedux.connect)(function (state, props) {
    var formID = props.preview ? 'form_preview' : 'form_' + props.question.sectionId;
    var syncErrors = (0, _reduxForm.getFormSyncErrors)(formID)(state);
    var qid = typeof props.question.groupIndex !== 'undefined' ? props.question.id + '[' + props.question.groupIndex + ']' : props.question.id;

    return {
        globalError: syncErrors && syncErrors.global && syncErrors.global[qid]
    };
})(TypeTableFormat);

exports.default = TypeTableFormatContainer;

/**
 * Preview Component
 */

var TypeTableFormatPreview = exports.TypeTableFormatPreview = (0, _reduxForm.reduxForm)({
    form: 'form_preview',
    validate: function validate(values, props) {
        var validatorMap = (0, _validator.generateValidatorMap)([props.question], 'en');
        return (0, _validator.validator)(validatorMap)(values);
    },
    destroyOnUnmount: true
})(TypeTableFormatContainer);