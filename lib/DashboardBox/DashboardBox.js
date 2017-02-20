'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DashboardBox = function (_React$Component) {
    _inherits(DashboardBox, _React$Component);

    function DashboardBox() {
        _classCallCheck(this, DashboardBox);

        return _possibleConstructorReturn(this, (DashboardBox.__proto__ || Object.getPrototypeOf(DashboardBox)).apply(this, arguments));
    }

    _createClass(DashboardBox, [{
        key: 'renderConfigs',
        value: function renderConfigs() {
            var configs = this.props.configs;


            return _react2.default.createElement(
                _reactBootstrap.DropdownButton,
                {
                    bsStyle: 'default',
                    title: _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'cog' }),
                    id: 'wfui-dashboardBox-config',
                    noCaret: true
                },
                configs.map(function (item, idx) {
                    return _react2.default.createElement(
                        _reactBootstrap.MenuItem,
                        {
                            key: idx,
                            href: item.href,
                            onClick: item.onClick
                        },
                        item.name
                    );
                })
            );
        }
    }, {
        key: 'renderHeader',
        value: function renderHeader() {
            var _props = this.props,
                imageURL = _props.imageURL,
                title = _props.title,
                buttons = _props.buttons,
                configs = _props.configs;


            return _react2.default.createElement(
                'div',
                { className: 'widget__header' },
                _react2.default.createElement(
                    'div',
                    { className: 'widget__header__title' },
                    imageURL && _react2.default.createElement('img', { src: imageURL, alt: title + ' Logo' }),
                    _react2.default.createElement(
                        'h2',
                        { className: 'widget__header__title' },
                        title
                    )
                ),
                _react2.default.createElement(
                    _reactBootstrap.ButtonToolbar,
                    { className: 'widget__header__buttons' },
                    buttons && buttons.map(function (item, idx) {
                        return _react2.default.createElement(
                            _reactBootstrap.Button,
                            {
                                key: idx,
                                bsStyle: item.bsStyle || 'primary',
                                href: item.href,
                                onClick: item.onClick
                            },
                            item.name
                        );
                    }),
                    configs && this.renderConfigs()
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                className = _props2.className,
                children = _props2.children;


            return _react2.default.createElement(
                _reactBootstrap.Panel,
                { className: (0, _classnames2.default)(className, 'wfui-dashboardBox'), header: this.renderHeader() },
                _react2.default.createElement(
                    'div',
                    { className: 'widget__body', style: { overflowX: 'auto' } },
                    children
                )
            );
        }
    }]);

    return DashboardBox;
}(_react2.default.Component);

DashboardBox.propTypes = {
    title: _react2.default.PropTypes.string,
    imageURL: _react2.default.PropTypes.string,
    buttons: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
        href: _react2.default.PropTypes.string,
        name: _react2.default.PropTypes.string,
        onClick: _react2.default.PropTypes.func,
        bsStyle: _react2.default.PropTypes.string
    })),
    configs: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
        href: _react2.default.PropTypes.string,
        name: _react2.default.PropTypes.string,
        onClick: _react2.default.PropTypes.func
    })),
    children: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.arrayOf(_react2.default.PropTypes.node), _react2.default.PropTypes.node])
};

DashboardBox.defaultTypes = {
    title: '',
    imageURL: '',
    buttons: [],
    configs: [],
    children: []
};

exports.default = DashboardBox;