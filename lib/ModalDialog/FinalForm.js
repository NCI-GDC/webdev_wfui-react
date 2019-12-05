function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/* global i18n */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import deepEqual from 'deep-equal';
import * as modalReducers from './reducer';
import * as modalSelectors from './selector';
import * as modalActions from './action';

var ModalDialog =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ModalDialog, _React$Component);

  function ModalDialog() {
    var _this;

    _classCallCheck(this, ModalDialog);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ModalDialog).call(this));
    _this.onHandleSubmit = _this.onHandleSubmit.bind(_assertThisInitialized(_this));
    _this.onHandleCancel = _this.onHandleCancel.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ModalDialog, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this$props = this.props,
          initialize = _this$props.initialize,
          initialValues = _this$props.initialValues,
          form = _this$props.form;
      form.initialize(initialValues);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this$props2 = this.props,
          destroy = _this$props2.destroy,
          initialize = _this$props2.initialize,
          form = _this$props2.form;

      if (!deepEqual(this.props.initialValues, nextProps.initialValues)) {
        form.reset();
        form.initialize(nextProps.initialValues);
      }
    }
  }, {
    key: "onHandleSubmit",
    value: function onHandleSubmit(values) {
      var _this$props3 = this.props,
          id = _this$props3.id,
          onSubmit = _this$props3.onSubmit,
          hideModal = _this$props3.hideModal,
          destroy = _this$props3.destroy,
          initialize = _this$props3.initialize,
          initialValues = _this$props3.initialValues,
          form = _this$props3.form;
      onSubmit(values, this.props);
      hideModal(id);
      form.reset();
      form.initialize(initialValues);
    }
  }, {
    key: "onHandleCancel",
    value: function onHandleCancel() {
      var _this$props4 = this.props,
          id = _this$props4.id,
          hideModal = _this$props4.hideModal,
          onHide = _this$props4.onHide,
          destroy = _this$props4.destroy,
          initialize = _this$props4.initialize,
          initialValues = _this$props4.initialValues,
          form = _this$props4.form;
      hideModal(id);
      onHide();
      form.destroy();
      form.initialize(initialValues);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props5 = this.props,
          show = _this$props5.show,
          label = _this$props5.label,
          id = _this$props5.id,
          bodyDisplay = _this$props5.bodyDisplay,
          txtSubmit = _this$props5.txtSubmit,
          txtCancel = _this$props5.txtCancel,
          invalid = _this$props5.invalid,
          submitting = _this$props5.submitting,
          notForm = _this$props5.notForm,
          btnSubmitStyle = _this$props5.btnSubmitStyle,
          className = _this$props5.className,
          values = _this$props5.values;
      return React.createElement(Modal, {
        show: show,
        onHide: this.onHandleCancel,
        bsSize: "large",
        className: classNames("modal-".concat(id), className)
      }, React.createElement(Modal.Header, {
        closeButton: true
      }, React.createElement("h2", {
        className: "modaltitle"
      }, label)), React.createElement(Modal.Body, null, bodyDisplay && React.cloneElement(bodyDisplay, _extends({}, this.props, {
        setValues: this.setValues
      }))), React.createElement(Modal.Footer, null, notForm ? React.createElement("div", null, React.createElement(Button, {
        className: "text-uppercase",
        onClick: this.onHandleCancel
      }, txtCancel)) : React.createElement("div", null, React.createElement(Button, {
        type: "submit",
        bsStyle: btnSubmitStyle || 'primary',
        onClick: function onClick() {
          return _this2.onHandleSubmit(values);
        },
        disabled: invalid || submitting
      }, txtSubmit), React.createElement(Button, {
        onClick: this.onHandleCancel
      }, txtCancel))));
    }
  }]);

  return ModalDialog;
}(React.Component);

ModalDialog.propTypes = {
  show: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string,
  bodyDisplay: PropTypes.element,
  txtSubmit: PropTypes.string,
  txtCancel: PropTypes.string,
  onSubmit: PropTypes.func,
  onHide: PropTypes.func,
  hideModal: PropTypes.func,
  handleSubmit: PropTypes.func,
  destroy: PropTypes.func,
  initialize: PropTypes.func,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  initialValues: PropTypes.object,
  notForm: PropTypes.bool,
  btnSubmitStyle: PropTypes.string,
  className: PropTypes.string,
  form: PropTypes.object
};
ModalDialog.defaultProps = {
  show: false,
  id: '',
  label: '',
  txtSubmit: 'Submit',
  txtCancel: 'Cancel',
  onSubmit: function onSubmit(f) {
    return f;
  },
  onHide: function onHide(f) {
    return f;
  },
  invalid: false,
  submitting: false,
  destroy: function destroy(f) {
    return f;
  },
  initialize: function initialize(f) {
    return f;
  }
};
var ModalDialogContainer = connect(function (state, props) {
  return _extends({}, modalSelectors.modalsSelector(props.id)(state));
}, modalActions)(ModalDialog);
ModalDialogContainer.actions = modalActions;
ModalDialogContainer.selectors = modalSelectors;
ModalDialogContainer.reducers = modalReducers;
export default ModalDialogContainer;