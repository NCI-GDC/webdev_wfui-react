'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reduxForm = require('redux-form');

var _Field = require('./Field');

var _Field2 = _interopRequireDefault(_Field);

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import BaseWebformField from './BaseWebformField'


/**
 * TypeFollowUp: Wrapper for followup questoin. It has a feature to check condition of following question.
 */

var TypeFollowUp = function (_React$Component) {
    _inherits(TypeFollowUp, _React$Component);

    function TypeFollowUp() {
        _classCallCheck(this, TypeFollowUp);

        var _this = _possibleConstructorReturn(this, (TypeFollowUp.__proto__ || Object.getPrototypeOf(TypeFollowUp)).call(this));

        _this.visible = false;
        return _this;
    }

    _createClass(TypeFollowUp, [{
        key: 'op',
        value: function op(values, _ref) {
            var _op = _ref.op,
                value = _ref.value;

            if (!values || values.length == 0) return false;
            var result = false;
            //Parse
            var parseValue = function parseValue(value) {
                if (value == "[blank]") {
                    return "";
                } else if (value.charAt(0) == "[" && value.charAt(value.length - 1) == "]") {
                    return value.substring(1, value.length - 1).replace(/\s/g, '').split(',');
                } else {
                    return value;
                }
            };
            var _value = parseValue(value);

            if ((typeof _value === 'undefined' ? 'undefined' : _typeof(_value)) != 'object') {
                var ex;
                switch (_op) {
                    case 'has':
                        ex = function ex(val1, val2) {
                            if (val1.includes("|")) {
                                return val1.split("|").includes(val2);
                            } else {
                                return val1 == val2;
                            }
                        };
                        break;
                    case '==':
                        ex = function ex(val1, val2) {
                            return val1 == val2;
                        };
                        break;
                    case '!=':
                        ex = function ex(val1, val2) {
                            return val1 != val2;
                        };
                        break;
                    case '>':
                        ex = function ex(val1, val2) {
                            return !isNaN(Number(val1)) && val1 != "" && Number(val1) > Number(val2);
                        };
                        break;
                    case '>=':
                        ex = function ex(val1, val2) {
                            return !isNaN(Number(val1)) && val1 != "" && Number(val1) >= Number(val2);
                        };
                        break;
                    case '<':
                        ex = function ex(val1, val2) {
                            return !isNaN(Number(val1)) && val1 != "" && Number(val1) < Number(val2);
                        };
                        break;
                    case '<=':
                        ex = function ex(val1, val2) {
                            return !isNaN(Number(val1)) && val1 != "" && Number(val1) <= Number(val2);
                        };
                        break;
                }
                Object.keys(values).forEach(function (key, i) {
                    if (ex(values[key], _value)) {
                        result = true;
                    }
                });
            } else {
                var ex;
                switch (_op) {
                    case '==':
                        ex = function ex(val1, val2) {
                            return val1 != val2;
                        };
                        break;
                    case '!=':
                        ex = function ex(val1, val2) {
                            return val1 == val2;
                        };
                        break;
                    case '>':
                        ex = function ex(val1, val2) {
                            return isNaN(Number(val1)) || val1 == "" || Number(val1) <= Number(val2);
                        };
                        break;
                    case '>=':
                        ex = function ex(val1, val2) {
                            return isNaN(Number(val1)) || val1 == "" || Number(val1) < Number(val2);
                        };
                        break;
                    case '<':
                        ex = function ex(val1, val2) {
                            return isNaN(Number(val1)) || val1 == "" || Number(val1) >= Number(val2);
                        };
                        break;
                    case '<=':
                        ex = function ex(val1, val2) {
                            return isNaN(Number(val1)) || val1 == "" || Number(val1) > Number(val2);
                        };

                }
                var _result = true;
                if (Object.keys(values).length != _value.length) _result = false;
                Object.keys(values).forEach(function (key, i) {
                    if (ex(values[key], _value[i])) {
                        _result = false;
                    }
                });
                result = _result;
            }
            return result;
        }
    }, {
        key: 'and',
        value: function and(value1, value2) {
            return value1 && value2;
        }
    }, {
        key: 'or',
        value: function or(value1, value2) {
            return value1 || value2;
        }

        /**
         * TypeFolloUp will receive changes from following questions.
         */

    }, {
        key: 'checkFollowUpCondition',
        value: function checkFollowUpCondition() {
            var _this2 = this;

            var _props = this.props,
                submission = _props.submission,
                question = _props.question,
                className = _props.className,
                lang = _props.lang;

            var data = question.values[lang];
            var showIf = question.showIf;

            /**
             * Logic to evaluate AND/OR( Only evaluate from left to right)
             */
            var result = false;
            showIf.forEach(function (condition, i) {
                var op = _this2.op,
                    and = _this2.and,
                    or = _this2.or;

                var values = submission[condition.qid];

                if (condition.value == "[blank]" && !values) {
                    values = _defineProperty({}, condition.qid, "");
                }

                if (i == 0) {
                    result = op(values, condition);
                } else {
                    //Include previous result to current operation.
                    result = condition.logic == 'or' ? or(op(values, condition), result) : and(op(values, condition), result);
                }
            });
            this.visible = result;
            return result;
        }
    }, {
        key: 'render',
        value: function render() {
            var that = this;
            var _props2 = this.props,
                question = _props2.question,
                submission = _props2.submission;

            // TODO: Check condition in render is bad idea.

            if (this.checkFollowUpCondition()) {
                return _react2.default.createElement(
                    'div',
                    { className: 'followup_question followup' },
                    _react2.default.createElement(_Field2.default, { field: question, renderingFollowup: true })
                );
            } else {
                return _react2.default.createElement('noscript', null);
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(props, state) {
            var _props3 = this.props,
                submission = _props3.submission,
                question = _props3.question,
                lang = _props3.lang,
                errors = _props3.errors,
                dispatch = _props3.dispatch;

            var data = question.values[lang];
            if (!this.visible) {
                //Clear error if it's invisible.
                if (errors[question.parent]) {
                    if (errors[question.parent][data.cid]) {
                        dispatch((0, _actions.setError)(question.parent, data.cid, []));
                    }
                    this.getChildrenCIDs(data).forEach(function (cid, i) {
                        if (errors[question.parent][cid]) {
                            dispatch((0, _actions.setError)(question.parent, cid, []));
                        }
                    });
                }
            }
        }
    }]);

    return TypeFollowUp;
}(_react2.default.Component);

var mapStateToSectionProps = function mapStateToSectionProps(state, props) {
    return {
        submission: (0, _reduxForm.getFormValues)('form_' + props.question.parent)(state) || {},
        errors: state.submissionReducers.errors
    };
};
exports.default = (0, _reactRedux.connect)(mapStateToSectionProps)(TypeFollowUp);