'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxForm = require('redux-form');

var _reactRedux = require('react-redux');

var _Section = require('./Section');

var _Section2 = _interopRequireDefault(_Section);

var _validator = require('../helpers/validator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Fields: Render array of field
 */
var SectionForm = function (_React$Component) {
    _inherits(SectionForm, _React$Component);

    function SectionForm(props) {
        _classCallCheck(this, SectionForm);

        var _this = _possibleConstructorReturn(this, (SectionForm.__proto__ || Object.getPrototypeOf(SectionForm)).call(this));

        var lang = 'en';
        _this.state = { initialValues: undefined

            // Need to build logic to validate.
        };var validatorMap = (0, _validator.generateValidatorMap)(props.section.children, lang);
        _this.SectionReduxForm = (0, _reduxForm.reduxForm)({
            form: 'form_' + props.section.id,
            validate: (0, _validator.validator)(validatorMap),
            destroyOnUnmount: false
        })(_Section2.default);

        // Populate data.
        var initialValues = {};
        if (props.user) {
            initialValues['firstname'] = { field: props.user.firstname };
            initialValues['lastname'] = { field: props.user.lastname };
            initialValues['email'] = { field: props.user.email };
        }

        if (props.submissions) {
            var questionIDs = props.section.children.map(function (s) {
                return s.id;
            });
            var answeredQuestionIDs = Object.keys(props.submissions).filter(function (key) {
                return questionIDs.includes(key);
            });
            answeredQuestionIDs.forEach(function (key) {
                initialValues[key] = props.submissions[key];
            });
        }

        _this.state = { initialValues: initialValues };
        return _this;
    }

    _createClass(SectionForm, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                index = _props.index,
                isActive = _props.isActive,
                section = _props.section,
                form_width = _props.form_width,
                submissions = _props.submissions,
                user = _props.user,
                recaptchaSiteKey = _props.recaptchaSiteKey,
                review = _props.review;
            var initialValues = this.state.initialValues;


            return _react2.default.createElement(this.SectionReduxForm, _extends({
                isActive: isActive,
                section: section
            }, section, {
                index: index,
                form_width: form_width,
                initialValues: initialValues,
                recaptchaSiteKey: recaptchaSiteKey,
                user: user,
                review: review
            }));
        }
    }]);

    return SectionForm;
}(_react2.default.Component);

exports.default = SectionForm;