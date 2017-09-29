'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Fields = require('./Fields');

var _Fields2 = _interopRequireDefault(_Fields);

var _reactRedux = require('react-redux');

var _actions = require('../actions');

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _index = require('react-bootstrap/lib/index');

var _reduxForm = require('redux-form');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Section: Render a page. Filter all fields and categolize by parent section ID
 */

var Section = function (_React$Component) {
    _inherits(Section, _React$Component);

    function Section() {
        _classCallCheck(this, Section);

        var _this = _possibleConstructorReturn(this, (Section.__proto__ || Object.getPrototypeOf(Section)).call(this));

        _this.state = {
            validated: false,
            errors: {},
            saving: false,
            grecaptchaState: false,
            setRecaptcha: false
        };
        _this.onHandleSubmit = _this.onHandleSubmit.bind(_this);
        _this.onClickNext = _this.onClickNext.bind(_this);
        return _this;
    }

    _createClass(Section, [{
        key: 'onClickNext',
        value: function onClickNext() {
            var _props = this.props,
                dispatch = _props.dispatch,
                submission = _props.submission,
                id = _props.id,
                errors = _props.errors;
            var _context = this.context,
                nid = _context.nid,
                language = _context.language,
                activeId = _context.activeId,
                last = _context.last;

            var that = this;
            var fields = [];

            if (activeId == last) {
                that.context.confirm();
            } else {
                that.context.next(that.props.index);
            }
        }
    }, {
        key: 'onClickPrev',
        value: function onClickPrev(e) {
            e.preventDefault();
            this.context.prev(this.props.index);
        }
    }, {
        key: 'onHandleSubmit',
        value: function onHandleSubmit(values) {
            this.onClickNext();
        }
    }, {
        key: 'render',
        value: function render() {
            var that = this;
            var _props2 = this.props,
                user = _props2.user,
                section = _props2.section,
                isActive = _props2.isActive,
                index = _props2.index,
                translated = _props2.translated,
                form_width = _props2.form_width,
                parent_name = _props2.parent_name,
                review = _props2.review;
            var language = this.context.language;

            var data = section.values[language];

            if (!user) {
                greptchaToggle = function greptchaToggle() {
                    this.setState({ grecaptchaState: true });
                };
                greptchaToggle = greptchaToggle.bind(this);
            }

            var className = isActive ? 'form active' : 'form';
            if (isActive) {
                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'div',
                        { className: className, style: { width: form_width } },
                        _react2.default.createElement(
                            'h2',
                            { className: 'survey-current' },
                            index + 1,
                            '.',
                            ' ',
                            parent_name ? parent_name : data.title
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'survey-question' },
                            _react2.default.createElement(_Fields2.default, this.props)
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        !review && this.renderNav(),
                        _react2.default.createElement(
                            _reactAddonsCssTransitionGroup2.default,
                            {
                                transitionAppear: true,
                                transitionName: 'fade',
                                transitionEnterTimeout: 500,
                                transitionLeaveTimeout: 500,
                                transitionAppearTimeout: 500
                            },
                            this.renderChecked()
                        )
                    )
                );
            } else {
                return _react2.default.createElement(
                    'div',
                    { className: className, style: { width: form_width } },
                    '\xA0'
                );
            }
        }
    }, {
        key: 'renderNav',
        value: function renderNav() {
            var _props3 = this.props,
                isActive = _props3.isActive,
                id = _props3.id,
                index = _props3.index,
                errors = _props3.errors,
                section = _props3.section,
                handleSubmit = _props3.handleSubmit,
                user = _props3.user;
            var _state = this.state,
                saving = _state.saving,
                grecaptchaState = _state.grecaptchaState;
            var allowPrev = this.context.allowPrev;

            var prev = void 0,
                next = void 0,
                recaptcha = void 0;

            if (isActive) {
                if (index && allowPrev) {
                    prev = _react2.default.createElement(
                        'div',
                        { className: 'survey-previous-section' },
                        _react2.default.createElement(
                            'a',
                            {
                                href: '#',
                                id: index,
                                onClick: this.onClickPrev.bind(this)
                            },
                            i18n('previous section')
                        )
                    );
                }
                if (index != this.context.last) {
                    next = _react2.default.createElement(
                        _index.Button,
                        {
                            disabled: saving,
                            className: 'btn-survey-submit survey-trigger',
                            id: index,
                            onClick: handleSubmit(this.onHandleSubmit)
                        },
                        i18n('Continue')
                    );
                } else if (!user) {
                    // Display reCaptcha for Annonymous user.
                    next = _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement('div', { id: 'greptcha-insert' }),
                        _react2.default.createElement(
                            _index.Button,
                            {
                                disabled: saving || !grecaptchaState,
                                className: 'btn-survey-submit survey-trigger',
                                id: index,
                                onClick: handleSubmit(this.onHandleSubmit)
                            },
                            _react2.default.createElement(
                                'span',
                                { className: 'button-survey-text' },
                                i18n('Submit your Survey Answers')
                            )
                        )
                    );
                } else {
                    next = _react2.default.createElement(
                        _index.Button,
                        {
                            disabled: saving,
                            className: 'btn-survey-submit survey-trigger',
                            id: index,
                            onClick: handleSubmit(this.onHandleSubmit)
                        },
                        _react2.default.createElement(
                            'span',
                            { className: 'button-survey-text' },
                            i18n('Submit your Survey Answers')
                        )
                    );
                }
            }
            return _react2.default.createElement(
                'div',
                { className: 'survey-end-container' },
                prev,
                next
            );
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            // Display reCaptcha
            var _props4 = this.props,
                isActive = _props4.isActive,
                index = _props4.index,
                recaptchaSiteKey = _props4.recaptchaSiteKey,
                user = _props4.user;

            if (isActive && index == this.context.last && !user) {
                var target = document.getElementById('greptcha-insert');
                if (target && !target.innerHTML) {
                    this.setState({ grecaptchaState: false });
                    grecaptcha.render('greptcha-insert', {
                        sitekey: recaptchaSiteKey,
                        callback: 'greptchaToggle'
                    });
                }
            }
        }
    }, {
        key: 'renderChecked',
        value: function renderChecked() {
            if (this.state.validated) {
                return _react2.default.createElement('div', { className: 'icon-checked' });
            }
        }
    }]);

    return Section;
}(_react2.default.Component);

Section.contextTypes = {
    nid: _react2.default.PropTypes.string,
    language: _react2.default.PropTypes.string,
    allowPrev: _react2.default.PropTypes.bool,
    next: _react2.default.PropTypes.any,
    prev: _react2.default.PropTypes.any,
    confirm: _react2.default.PropTypes.any,
    form_width: _react2.default.PropTypes.number,
    changeEmitter: _react2.default.PropTypes.object,
    last: _react2.default.PropTypes.number,
    activeId: _react2.default.PropTypes.number
};
exports.default = Section;