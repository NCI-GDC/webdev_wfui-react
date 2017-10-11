'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _reactBootstrap = require('react-bootstrap');

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _selector = require('wfui-react/lib/ModalDialog/selector');

var _action = require('wfui-react/lib/ModalDialog/action');

var actionCreators = _interopRequireWildcard(_action);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global i18n */


var ModalDialog = function (_React$Component) {
    _inherits(ModalDialog, _React$Component);

    function ModalDialog() {
        _classCallCheck(this, ModalDialog);

        var _this = _possibleConstructorReturn(this, (ModalDialog.__proto__ || Object.getPrototypeOf(ModalDialog)).call(this));

        _this.onHandleSubmit = _this.onHandleSubmit.bind(_this);
        _this.onHandleCancel = _this.onHandleCancel.bind(_this);
        return _this;
    }

    _createClass(ModalDialog, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _props = this.props,
                initialize = _props.initialize,
                initialValues = _props.initialValues;

            initialize(initialValues);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _props2 = this.props,
                destroy = _props2.destroy,
                initialize = _props2.initialize;

            if (!(0, _deepEqual2.default)(this.props.initialValues, nextProps.initialValues)) {
                destroy();
                initialize(nextProps.initialValues);
            }
        }
    }, {
        key: 'onHandleSubmit',
        value: function onHandleSubmit(values) {
            var _props3 = this.props,
                id = _props3.id,
                onSubmit = _props3.onSubmit,
                hideModal = _props3.hideModal,
                destroy = _props3.destroy;

            onSubmit(values);
            hideModal(id);
            destroy();
        }
    }, {
        key: 'onHandleCancel',
        value: function onHandleCancel() {
            var _props4 = this.props,
                id = _props4.id,
                hideModal = _props4.hideModal,
                onHide = _props4.onHide,
                destroy = _props4.destroy,
                initialize = _props4.initialize,
                initialValues = _props4.initialValues;

            hideModal(id);
            onHide();
            destroy();
            initialize(initialValues);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props5 = this.props,
                show = _props5.show,
                label = _props5.label,
                id = _props5.id,
                bodyDisplay = _props5.bodyDisplay,
                txtSubmit = _props5.txtSubmit,
                txtCancel = _props5.txtCancel,
                handleSubmit = _props5.handleSubmit,
                invalid = _props5.invalid,
                submitting = _props5.submitting;


            return _react2.default.createElement(
                _reactBootstrap.Modal,
                {
                    show: show,
                    onHide: this.onHandleCancel,
                    bsSize: 'large',
                    className: 'modal-' + id
                },
                _react2.default.createElement(
                    _reactBootstrap.Modal.Header,
                    { closeButton: true },
                    _react2.default.createElement(
                        'h2',
                        { className: 'modaltitle' },
                        label
                    )
                ),
                _react2.default.createElement(
                    _reactBootstrap.Modal.Body,
                    null,
                    bodyDisplay && _react2.default.cloneElement(bodyDisplay, Object.assign({}, this.props, {
                        setValues: this.setValues
                    }))
                ),
                _react2.default.createElement(
                    _reactBootstrap.Modal.Footer,
                    null,
                    _react2.default.createElement(
                        _reactBootstrap.Button,
                        {
                            type: 'submit',
                            bsStyle: 'primary',
                            className: 'text-uppercase',
                            onClick: handleSubmit ? handleSubmit(this.onHandleSubmit) : this.onHandleSubmit,
                            disabled: invalid || submitting
                        },
                        txtSubmit
                    ),
                    _react2.default.createElement(
                        _reactBootstrap.Button,
                        {
                            className: 'text-uppercase',
                            onClick: this.onHandleCancel
                        },
                        txtCancel
                    )
                )
            );
        }
    }]);

    return ModalDialog;
}(_react2.default.Component);

ModalDialog.propTypes = {
    show: _propTypes2.default.bool,
    id: _propTypes2.default.string,
    label: _propTypes2.default.string,
    bodyDisplay: _propTypes2.default.element,
    txtSubmit: _propTypes2.default.string,
    txtCancel: _propTypes2.default.string,
    onSubmit: _propTypes2.default.func,
    onHide: _propTypes2.default.func,
    hideModal: _propTypes2.default.func,
    handleSubmit: _propTypes2.default.func,
    destroy: _propTypes2.default.func,
    initialize: _propTypes2.default.func,
    invalid: _propTypes2.default.bool,
    submitting: _propTypes2.default.bool,
    initialValues: _propTypes2.default.object
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

exports.default = (0, _reactRedux.connect)(function (state, props) {
    return _extends({}, (0, _selector.modalsSelector)(props.id)(state));
}, actionCreators)(ModalDialog);