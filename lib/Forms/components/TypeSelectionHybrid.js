'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TypeSelectionHybridPreview = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxForm = require('redux-form');

var _reactRedux = require('react-redux');

var _input_hybrid = require('../helpers/input_hybrid');

var inputHybridUtils = _interopRequireWildcard(_input_hybrid);

var _input_hybrid2 = require('../helpers/input_hybrid.js');

var _validator = require('../helpers/validator');

var _FormFields = require('../../FormFields/');

var _Description = require('../../FormFields/Description');

var _Description2 = _interopRequireDefault(_Description);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Wrapper for Question Type 8 (Input hybrid)
 */
var TypeSelectionHybrid = function (_React$Component) {
    _inherits(TypeSelectionHybrid, _React$Component);

    function TypeSelectionHybrid() {
        _classCallCheck(this, TypeSelectionHybrid);

        var _this = _possibleConstructorReturn(this, (TypeSelectionHybrid.__proto__ || Object.getPrototypeOf(TypeSelectionHybrid)).call(this));

        _this.state = { value: undefined, values: {}, exc: [], other: "", saving: false };
        return _this;
    }

    _createClass(TypeSelectionHybrid, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                question = _props.question,
                limits = _props.question.limits,
                lang = _props.lang,
                submitted = _props.submitted,
                token = _props.token,
                errors = _props.errors,
                preview = _props.preview,
                globalError = _props.globalError;


            var data = question.values[lang] || {};
            var groupId = question.groupId;
            var options = data.options || [];

            var fieldMap = {};
            if (data.children) {
                data.children.forEach(function (child, i) {
                    var _child = JSON.parse(JSON.stringify(child));
                    if (child.type === 'input') {
                        _child.maxlength = limits && limits.fieldLimit;
                        _child.min = (0, _input_hybrid2.parseAgeToken)(child.range_lower, token);
                        _child.max = (0, _input_hybrid2.parseAgeToken)(child.range_upper, token);
                    }
                    fieldMap[child.input_id || '_' + data.select_type] = _child;
                });
            }

            if (data.select_type === 'radio') {
                return _react2.default.createElement(
                    'div',
                    { className: 'wfui-type-selection-hybrid' },
                    data.description && _react2.default.createElement(_Description2.default, { content: data.description, src: data.image && data.image.src, imageTitle: data.image && data.image.title }),
                    _react2.default.createElement(_reduxForm.Fields, _extends({
                        label: data.title,
                        name: '' + (groupId ? groupId + '.' : '') + question.id,
                        names: data.children.map(function (child) {
                            return '' + (groupId ? groupId + '.' : '') + question.id + '.' + child.cid;
                        }),
                        type: 'checkbox',
                        selectType: data.select_type,
                        component: _FormFields.renderSelectionHybridRadio,
                        options: options,
                        fieldMap: fieldMap,
                        columnCount: question.column_count
                    }, inputHybridUtils, {
                        globalError: globalError,
                        required: question.required
                    }))
                );
            } else {
                return _react2.default.createElement(
                    'div',
                    { className: 'wfui-type-selection-hybrid' },
                    data.description && _react2.default.createElement(_Description2.default, { content: data.description, src: data.image && data.image.src, imageTitle: data.image && data.image.title }),
                    _react2.default.createElement(_reduxForm.Fields, _extends({
                        label: data.title,
                        name: '' + (groupId ? groupId + '.' : '') + question.id,
                        names: data.children.map(function (child) {
                            return '' + (groupId ? groupId + '.' : '') + question.id + '.' + child.cid;
                        }),
                        type: 'checkbox',
                        selectType: data.select_type,
                        component: _FormFields.renderSelectionHybridCheckbox,
                        options: options,
                        fieldMap: fieldMap,
                        columnCount: question.column_count
                    }, inputHybridUtils, {
                        globalError: globalError,
                        required: question.required
                    }))
                );
            }
        }
    }]);

    return TypeSelectionHybrid;
}(_react2.default.Component);

var TypeSelectionHybridContainer = (0, _reactRedux.connect)(function (state, props) {
    var formID = props.preview ? 'form_preview' : 'form_' + props.question.sectionId;
    var syncErrors = (0, _reduxForm.getFormSyncErrors)(formID)(state);
    var qid = typeof props.question.groupIndex !== 'undefined' ? props.question.id + '[' + props.question.groupIndex + ']' : props.question.id;

    return {
        globalError: syncErrors && syncErrors.global && syncErrors.global[qid]
    };
})(TypeSelectionHybrid);

exports.default = TypeSelectionHybridContainer;

/**
 * Preview Component
 */

var TypeSelectionHybridPreview = exports.TypeSelectionHybridPreview = (0, _reduxForm.reduxForm)({
    form: 'form_preview',
    validate: function validate(values, props) {
        var validatorMap = (0, _validator.generateValidatorMap)([props.question], 'en');
        return (0, _validator.validator)(validatorMap)(values);
    },
    destroyOnUnmount: true
})(TypeSelectionHybridContainer);