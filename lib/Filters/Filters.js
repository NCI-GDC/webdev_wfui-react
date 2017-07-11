'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Filters = function (_React$Component) {
    _inherits(Filters, _React$Component);

    function Filters() {
        _classCallCheck(this, Filters);

        return _possibleConstructorReturn(this, (Filters.__proto__ || Object.getPrototypeOf(Filters)).apply(this, arguments));
    }

    _createClass(Filters, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                label = _props.label,
                onClickReset = _props.onClickReset,
                textReset = _props.textReset,
                children = _props.children;

            return _react2.default.createElement(
                _reactBootstrap.Form,
                { className: (0, _classnames2.default)(className, 'wfui-filters'), componentClass: 'fieldset', inline: true },
                _react2.default.createElement(
                    _reactBootstrap.FormGroup,
                    null,
                    _react2.default.createElement(
                        _reactBootstrap.ControlLabel,
                        null,
                        label
                    ),
                    children,
                    _react2.default.createElement(
                        _reactBootstrap.FormGroup,
                        { className: 'wfui-filters-btn-reset' },
                        _react2.default.createElement(
                            _reactBootstrap.Button,
                            {
                                onClick: onClickReset
                            },
                            textReset
                        )
                    )
                )
            );
        }
    }]);

    return Filters;
}(_react2.default.Component);

Filters.propTypes = {
    className: _propTypes2.default.string,
    label: _propTypes2.default.string,
    textReset: _propTypes2.default.string,
    onClickReset: _propTypes2.default.func,
    children: _propTypes2.default.node
};

Filters.defaultProps = {
    label: 'Filters:',
    textReset: 'Reset',
    onClickReset: function onClickReset(f) {
        return f;
    },
    disableReset: false
};

exports.default = Filters;