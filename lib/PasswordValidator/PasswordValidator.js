function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from '../index';
import style from './style';
var Component = React.Component;
/**
 * Check if password is greater than specific characters
 */

export var validateCharacterLength = function validateCharacterLength(password) {
  return !!(password.length >= 8);
};
/**
 * Check if a password contains both upper and lower case.
 */

export var validateAtLeastOneLower = function validateAtLeastOneLower(password) {
  var regAtLeastOneLower = /(?=.*[a-z])/;
  return !!regAtLeastOneLower.exec(password);
};
/**
 * Check if a password contains both upper and lower case.
 */

export var validateAtLeastOneUpper = function validateAtLeastOneUpper(password) {
  var regAtLeastOneUpper = /(?=.*[A-Z])/;
  return !!regAtLeastOneUpper.exec(password);
};
/**
 * Check if a password contains at lease one number
 */

export var validateAtLeastOneNumber = function validateAtLeastOneNumber(password) {
  var regAtLeastOneNumber = /(?=.*\d)/;
  return !!regAtLeastOneNumber.exec(password);
};
/**
 * Check if a passwords are same
 */

export var validateConfirmPasswords = function validateConfirmPasswords(password, passwordConfirm) {
  return password !== '' && password === passwordConfirm;
};

var PasswordValidator =
/*#__PURE__*/
function (_Component) {
  _inherits(PasswordValidator, _Component);

  function PasswordValidator() {
    var _this;

    _classCallCheck(this, PasswordValidator);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PasswordValidator).call(this));
    _this.state = {
      validated: false
    };
    return _this;
  }

  _createClass(PasswordValidator, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.onValidateStatusChange({
        validated: false
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this$props = this.props,
          validations = _this$props.validations,
          onValidateStatusChange = _this$props.onValidateStatusChange,
          password = _this$props.password,
          password_confirm = _this$props.password_confirm,
          validateWith = _this$props.validateWith;
      var validated = this.state.validated;
      var allValidated = true;
      validations.filter(function (validation) {
        return validateWith.includes(validation.type);
      }).forEach(function (validation) {
        allValidated = allValidated && validation.validate(password, password_confirm);
      });

      if (validated !== allValidated) {
        /*eslint-disable */
        // Only setState when state is different.
        this.setState({
          validated: allValidated
        });
        /* eslint-enable */

        onValidateStatusChange({
          validated: allValidated
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          className = _this$props2.className,
          label = _this$props2.label,
          validations = _this$props2.validations,
          password = _this$props2.password,
          password_confirm = _this$props2.password_confirm,
          validateWith = _this$props2.validateWith;
      var classes = 'wfui-password-validator';
      return React.createElement("div", {
        className: classNames(className, classes)
      }, React.createElement("p", {
        style: style.title
      }, label), React.createElement("ul", {
        style: style.ul
      }, validations.filter(function (validation) {
        return validateWith.includes(validation.type);
      }).map(function (validation, i) {
        var validated = validation.validate(password, password_confirm);
        return React.createElement("li", {
          key: i,
          className: "password-validate-".concat(i),
          style: validated ? style.li_active : style.li
        }, React.createElement("span", {
          className: "icon-wrapper",
          style: style.icon
        }, validated ? React.createElement(Icon, {
          name: "check"
        }) : React.createElement(Icon, {
          name: "times"
        })), validation.title);
      })));
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
  className: PropTypes.string,
  validateWith: PropTypes.arrayOf(PropTypes.string)
};
PasswordValidator.defaultProps = {
  label: 'Your password must have:',
  password: '',
  password_confirm: '',
  onValidateStatusChange: function onValidateStatusChange() {
    return undefined;
  },
  validations: [{
    type: 'length',
    title: '8 or more characters (eg. 1BdenVer8)',
    validate: validateCharacterLength
  }, {
    type: 'uppercase',
    title: 'At least one uppercase letter (example: A, B, C, ...)',
    validate: validateAtLeastOneUpper
  }, {
    type: 'lowercase',
    title: 'At least one lowercase letter (example: a, b, c, ...)',
    validate: validateAtLeastOneLower
  }, {
    type: 'number',
    title: 'At least one number (example: 0, 1, 2, 3, ...)',
    validate: validateAtLeastOneNumber
  }, {
    type: 'match',
    title: 'Passwords must match',
    validate: validateConfirmPasswords
  }],
  validateWith: ['length', 'uppercase', 'lowercase', 'number', 'match']
};
export default PasswordValidator;