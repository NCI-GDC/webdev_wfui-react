'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _NavigationList = require('./NavigationList');

var _NavigationList2 = _interopRequireDefault(_NavigationList);

var _burger_navigation = require('../helpers/burger_navigation');

var _burger_navigation2 = _interopRequireDefault(_burger_navigation);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SideBar = function (_React$Component) {
    _inherits(SideBar, _React$Component);

    function SideBar() {
        _classCallCheck(this, SideBar);

        return _possibleConstructorReturn(this, (SideBar.__proto__ || Object.getPrototypeOf(SideBar)).apply(this, arguments));
    }

    _createClass(SideBar, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            // TODO: Removed
            // BurgerNav.init();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                survey_info = _props.survey_info,
                survey_data = _props.survey_data,
                submission_info = _props.submission_info,
                translated = _props.translated,
                activeId = _props.activeId;
            var language = this.context.language;

            var className = "";

            if (activeId) {
                className = "category" + (activeId % 8 + 1);
            }

            return _react2.default.createElement(
                'div',
                { className: 'application-sidebar ' + className },
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'h3',
                        null,
                        'Application Sections'
                    ),
                    _react2.default.createElement(_NavigationList2.default, { survey_data: survey_data, activeId: activeId, translated: translated })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'survey-side-expand main' },
                    _react2.default.createElement(
                        'div',
                        { className: 'survey-icon-container' },
                        _react2.default.createElement('img', { src: '/images/survey.png' }),
                        _react2.default.createElement('span', { className: 'glyphicon glyphicon-menu-hamburger' })
                    )
                )
            );
        }
    }]);

    return SideBar;
}(_react2.default.Component);

SideBar.contextTypes = {
    language: _react2.default.PropTypes.string
};

exports.default = (0, _reactRedux.connect)(function (state) {
    return {};
})(SideBar);