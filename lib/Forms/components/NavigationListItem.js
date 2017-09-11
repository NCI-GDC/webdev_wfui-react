'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reduxForm = require('redux-form');

var _NavigationList = require('./NavigationList');

var _NavigationList2 = _interopRequireDefault(_NavigationList);

var _ProgressIndicator = require('./ProgressIndicator');

var _ProgressIndicator2 = _interopRequireDefault(_ProgressIndicator);

var _questions = require('../selectors/questions');

var _progressCounter = require('../helpers/progressCounter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavigationListItem = function (_React$Component) {
    _inherits(NavigationListItem, _React$Component);

    function NavigationListItem() {
        _classCallCheck(this, NavigationListItem);

        return _possibleConstructorReturn(this, (NavigationListItem.__proto__ || Object.getPrototypeOf(NavigationListItem)).apply(this, arguments));
    }

    _createClass(NavigationListItem, [{
        key: 'goto',
        value: function goto() {
            var _props = this.props,
                index = _props.index,
                activeId = _props.activeId;

            if (index >= 0) {
                this.context.goto(index);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                activeId = _props2.activeId,
                section = _props2.section,
                is_subsection = _props2.is_subsection,
                index = _props2.index,
                completed = _props2.completed,
                total = _props2.total,
                lang = _props2.lang;


            var data = section.values['en'] || {};

            return _react2.default.createElement(
                'li',
                { className: 'survey-section ' + (activeId === index ? 'active' : '') + ' ' + (is_subsection ? '' : 'survey-section') },
                _react2.default.createElement(
                    'div',
                    { onClick: this.goto.bind(this) },
                    _react2.default.createElement(_ProgressIndicator2.default, { completed: completed, total: total }),
                    _react2.default.createElement(
                        'a',
                        null,
                        index + 1,
                        '. ',
                        data.title
                    )
                ),
                section.sub_sections && _react2.default.createElement(_NavigationList2.default, { section_rules: section.sub_sections, is_subsection: true })
            );
        }
    }]);

    return NavigationListItem;
}(_react2.default.Component);

NavigationListItem.contextTypes = {
    goto: _react2.default.PropTypes.any,
    language: _react2.default.PropTypes.string
};

exports.default = (0, _reactRedux.connect)(function (state, props) {
    var formId = 'form_' + props.section.id;
    var values = (0, _reduxForm.getFormValues)(formId)(state);
    var syncErrors = (0, _reduxForm.getFormSyncErrors)(formId)(state);
    var questions = (0, _questions.questionSelector)(props.section.id)(state).children.filter(function (question, i) {
        if (question.showIf && question.showIf.length || question.type === 'text') return false;
        return true;
    });

    var counts = {
        completed: 0,
        total: questions.length
    };

    if (values) (0, _progressCounter.countSubmissions)(questions, values, syncErrors, syncErrors.global, counts);

    return counts;
})(NavigationListItem);