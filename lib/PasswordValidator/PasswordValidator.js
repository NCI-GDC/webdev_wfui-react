'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = _react2.default.Component,
    PropTypes = _react2.default.PropTypes;

/**
 * Check if password is greater than specific characters
 */

var validateCharacterLength = function validateCharacterLength(password) {
    return !!(password.length >= 8);
};

/**
 * Check if a password contains both upper and lower case.
 */
var validateAtLeastOneLower = function validateAtLeastOneLower(password) {
    var regAtLeastOneLower = /(?=.*[a-z])/;
    return !!regAtLeastOneLower.exec(password);
};

/**
 * Check if a password contains both upper and lower case.
 */
var validateAtLeastOneUpper = function validateAtLeastOneUpper(password) {
    var regAtLeastOneUpper = /(?=.*[A-Z])/;
    return !!regAtLeastOneUpper.exec(password);
};

/**
 * Check if a password contains at lease one number
 */
var validateAtLeastOneNumber = function validateAtLeastOneNumber(password) {
    var regAtLeastOneNumber = /(?=.*\d)/;
    return !!regAtLeastOneNumber.exec(password);
};

/**
 * Check if a passwords are same
 */
var validateConfirmPasswords = function validateConfirmPasswords(password, passwordConfirm) {
    return password !== '' && password === passwordConfirm;
};

var PasswordValidator = function (_Component) {
    _inherits(PasswordValidator, _Component);

    function PasswordValidator() {
        _classCallCheck(this, PasswordValidator);

        var _this = _possibleConstructorReturn(this, (PasswordValidator.__proto__ || Object.getPrototypeOf(PasswordValidator)).call(this));

        _this.state = {
            validated: false
        };
        return _this;
    }

    _createClass(PasswordValidator, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.props.onValidateStatusChange({ validated: false });
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var _props = this.props,
                validations = _props.validations,
                onValidateStatusChange = _props.onValidateStatusChange,
                password = _props.password,
                password_confirm = _props.password_confirm;
            var validated = this.state.validated;

            var allValidated = true;
            validations.forEach(function (validation) {
                allValidated = allValidated && validation.validate(password, password_confirm);
            });
            if (validated !== allValidated) {
                /*eslint-disable */ // Only setState when state is different.
                this.setState({ validated: allValidated });
                /*eslint-enable */
                onValidateStatusChange({ validated: allValidated });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                className = _props2.className,
                label = _props2.label,
                validations = _props2.validations,
                password = _props2.password,
                password_confirm = _props2.password_confirm;

            var classes = 'wfui-password-validator';

            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)(className, classes) },
                _react2.default.createElement(
                    'p',
                    { style: _style2.default.title },
                    label
                ),
                _react2.default.createElement(
                    'ul',
                    { style: _style2.default.ul },
                    validations.map(function (validation, i) {
                        var validated = validation.validate(password, password_confirm);
                        return _react2.default.createElement(
                            'li',
                            { key: i, className: 'password-validate-' + i, style: validated ? _style2.default.li_active : _style2.default.li },
                            validated ? _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'ok', style: _style2.default.icon }) : '',
                            validation.title
                        );
                    })
                )
            );
        }
    }]);

    return PasswordValidator;
}(Component);

PasswordValidator.propTypes = {
    label: PropTypes.string,
    validations: PropTypes.arrayOf(PropTypes.object),
    password: PropTypes.string,
    password_confirm: PropTypes.string,
    onValidateStatusChange: PropTypes.func,
    className: PropTypes.string
};
PasswordValidator.defaultProps = {
    label: 'Your password must have:',
    password: '',
    password_confirm: '',
    onValidateStatusChange: function onValidateStatusChange() {
        return undefined;
    },
    validations: [{ title: '8 or more characters (eg. 1BdenVer8)', validate: validateCharacterLength }, { title: 'At least one uppercase letter (example: A, B, C, ...)', validate: validateAtLeastOneUpper }, { title: 'At least one lowercase letter (example: a, b, c, ...)', validate: validateAtLeastOneLower }, { title: 'At least one number (example: 0, 1, 2, 3, ...)', validate: validateAtLeastOneNumber }, { title: 'Passwords must match', validate: validateConfirmPasswords }]
};

exports.default = PasswordValidator;