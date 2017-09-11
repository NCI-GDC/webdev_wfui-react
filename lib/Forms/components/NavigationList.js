'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _NavigationListItem = require('./NavigationListItem');

var _NavigationListItem2 = _interopRequireDefault(_NavigationListItem);

var _AllProgress = require('./AllProgress');

var _AllProgress2 = _interopRequireDefault(_AllProgress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavigationList = function (_React$Component) {
    _inherits(NavigationList, _React$Component);

    function NavigationList() {
        _classCallCheck(this, NavigationList);

        return _possibleConstructorReturn(this, (NavigationList.__proto__ || Object.getPrototypeOf(NavigationList)).apply(this, arguments));
    }

    _createClass(NavigationList, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                survey_data = _props.survey_data,
                sections = _props.sections,
                is_subsection = _props.is_subsection,
                activeId = _props.activeId;


            if (!is_subsection) {
                return _react2.default.createElement(
                    'ol',
                    { className: 'survey-menu' },
                    survey_data.map(function (section, i) {
                        return _react2.default.createElement(_NavigationListItem2.default, { key: i, section: section, index: i, activeId: activeId });
                    }),
                    _react2.default.createElement(_AllProgress2.default, { survey_data: survey_data })
                );
            } else {
                return _react2.default.createElement(
                    'ul',
                    { className: 'survey-menu survey-subsection' },
                    survey_data.map(function (section, i) {
                        return _react2.default.createElement(_NavigationListItem2.default, { key: i, section: section, index: i, activeId: activeId, is_subsection: is_subsection });
                    }),
                    _react2.default.createElement(_AllProgress2.default, { survey_data: survey_data })
                );
            }
        }
    }]);

    return NavigationList;
}(_react2.default.Component);

exports.default = NavigationList;