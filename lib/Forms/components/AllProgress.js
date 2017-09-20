'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxForm = require('redux-form');

var _reactRedux = require('react-redux');

var _ProgressIndicator = require('./ProgressIndicator');

var _ProgressIndicator2 = _interopRequireDefault(_ProgressIndicator);

var _questions = require('../selectors/questions');

var _progressCounter = require('../helpers/progressCounter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AllProgress = function (_React$Component) {
    _inherits(AllProgress, _React$Component);

    function AllProgress() {
        _classCallCheck(this, AllProgress);

        return _possibleConstructorReturn(this, (AllProgress.__proto__ || Object.getPrototypeOf(AllProgress)).apply(this, arguments));
    }

    _createClass(AllProgress, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                total = _props.total,
                completed = _props.completed;


            return _react2.default.createElement(
                'li',
                { className: 'overall-progress' },
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(_ProgressIndicator2.default, { completed: completed, total: total }),
                    _react2.default.createElement(
                        'h3',
                        { className: 'overall-progress' },
                        'Overall Progress:'
                    ),
                    _react2.default.createElement(
                        'h4',
                        { className: 'overall-progress' },
                        Math.ceil(completed / total * 100),
                        '% Complete'
                    )
                )
            );
        }
    }]);

    return AllProgress;
}(_react2.default.Component);

exports.default = (0, _reactRedux.connect)(function (state, props) {
    var total = 0;
    var completed = 0;

    if (props.survey_data) {
        props.survey_data.forEach(function (section) {
            var formId = 'form_' + section.id;
            var values = (0, _reduxForm.getFormValues)(formId)(state);
            var syncErrors = (0, _reduxForm.getFormSyncErrors)(formId)(state);
            var questions = (0, _questions.questionSelector)(section.id)(state).children.filter(function (question, i) {
                if (question.showIf && question.showIf.length || question.type === 'text') return false;
                return true;
            });

            var counts = { completed: 0 };
            if (values) (0, _progressCounter.countSubmissions)(questions, values, syncErrors, syncErrors.global, counts);
            total += questions.length;
            completed += counts.completed;
        });
    }
    return {
        total: total,
        completed: completed
    };
})(AllProgress);