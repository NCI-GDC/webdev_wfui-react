'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _index = require('react-bootstrap/lib/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SwitchLangConfirmDialog = function (_React$Component) {
    _inherits(SwitchLangConfirmDialog, _React$Component);

    function SwitchLangConfirmDialog() {
        _classCallCheck(this, SwitchLangConfirmDialog);

        var _this = _possibleConstructorReturn(this, (SwitchLangConfirmDialog.__proto__ || Object.getPrototypeOf(SwitchLangConfirmDialog)).call(this));

        _this.state = { show: false };
        return _this;
    }

    _createClass(SwitchLangConfirmDialog, [{
        key: 'save',
        value: function save() {
            var clickEvent = this.state.clickEvent;

            window.onbeforeunload = undefined;
            window.location.href = $(clickEvent.target).parent('a').attr('href');
        }
    }, {
        key: 'hideModal',
        value: function hideModal(e) {
            if (e) e.preventDefault();
            this.setState({ show: false });
        }
    }, {
        key: 'showModal',
        value: function showModal(clickEvent) {
            this.setState({ show: true, clickEvent: clickEvent });
        }
    }, {
        key: 'render',
        value: function render() {
            var title = this.props.title;


            return _react2.default.createElement(
                _index.Modal,
                { className: 'modal-custom-small switch-lang-confirm-dialog', bsSize: 'large', show: this.state.show, onHide: this.hideModal.bind(this) },
                _react2.default.createElement(
                    _index.Modal.Header,
                    null,
                    _react2.default.createElement(
                        'div',
                        null,
                        i18n('Warning')
                    )
                ),
                _react2.default.createElement(
                    _index.Modal.Body,
                    null,
                    _react2.default.createElement(
                        'p',
                        null,
                        i18n("Switching the questionnaire language will erase your answers.")
                    )
                ),
                _react2.default.createElement(
                    _index.Modal.Footer,
                    null,
                    _react2.default.createElement(
                        'div',
                        { className: 'question-preview-footer' },
                        _react2.default.createElement(
                            'div',
                            { className: 'footer-action-container' },
                            _react2.default.createElement(
                                _index.Button,
                                { bsStyle: 'info', onClick: this.hideModal.bind(this) },
                                i18n('Cancel')
                            ),
                            _react2.default.createElement(
                                _index.Button,
                                { bsStyle: 'default', onClick: this.save.bind(this) },
                                i18n('Change')
                            )
                        )
                    )
                )
            );
        }
    }]);

    return SwitchLangConfirmDialog;
}(_react2.default.Component);

exports.default = SwitchLangConfirmDialog;