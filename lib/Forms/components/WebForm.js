'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _SideBar = require('./SideBar');

var _SideBar2 = _interopRequireDefault(_SideBar);

var _SectionForm = require('./SectionForm');

var _SectionForm2 = _interopRequireDefault(_SectionForm);

var _SubmitConfirmDialog = require('./SubmitConfirmDialog');

var _SubmitConfirmDialog2 = _interopRequireDefault(_SubmitConfirmDialog);

var _SwitchLangConfirmDialog = require('./SwitchLangConfirmDialog');

var _SwitchLangConfirmDialog2 = _interopRequireDefault(_SwitchLangConfirmDialog);

var _sticky_menu = require('../helpers/sticky_menu');

var _sticky_menu2 = _interopRequireDefault(_sticky_menu);

var _body_resize_listener = require('../helpers/body_resize_listener');

var _body_resize_listener2 = _interopRequireDefault(_body_resize_listener);

var _actions = require('../actions');

var actionCreators = _interopRequireWildcard(_actions);

var _const = require('../constants/const');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global window */


/**
 * WebForm: Parent App
 */
var WebForm = function (_React$Component) {
    _inherits(WebForm, _React$Component);

    function WebForm(props) {
        _classCallCheck(this, WebForm);

        var _this = _possibleConstructorReturn(this, (WebForm.__proto__ || Object.getPrototypeOf(WebForm)).call(this));

        _this.state = {
            surveyDataState: [],
            translated: false,
            activeId: props.activeId
        };
        _this.onResize = _this.onResize.bind(_this);
        _this.onClickLanguage = _this.onClickLanguage.bind(_this);
        _this.onHandleLanguageLoaded = _this.onHandleLanguageLoaded.bind(_this);
        _this.fieldsMap = {};
        return _this;
    }

    _createClass(WebForm, [{
        key: 'getChildContext',
        value: function getChildContext() {
            var _props = this.props,
                language = _props.language,
                allowPrev = _props.allowPrev,
                survey_data = _props.survey_data,
                survey_info = _props.survey_info;
            var activeId = this.state.activeId;

            return {
                nid: survey_info.nid,
                vid: Number(survey_info.vid),
                language: language,
                allowPrev: allowPrev,
                next: this.next.bind(this),
                prev: this.prev.bind(this),
                confirm: this.confirm.bind(this),
                goto: this.goto.bind(this),
                last: survey_data.length - 1,
                activeId: activeId,
                autoSave: survey_info.autoSave ? survey_info.autoSave[language] : true
            };
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _props2 = this.props,
                survey_data = _props2.survey_data,
                user = _props2.user,
                allowAnonymousSubmission = _props2.allowAnonymousSubmission;

            var surveyDataState = JSON.parse(JSON.stringify(survey_data));
            if (allowAnonymousSubmission) {
                surveyDataState[survey_data.length - 1].children = _const.anonymousFormFields.map(function (field) {
                    return Object.assign({}, field, { disabled: !!user });
                }).concat(surveyDataState[survey_data.length - 1].children);
            }
            this.setState({ surveyDataState: surveyDataState });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            // TODO: Removed
            // $(window).on('resize', this.onResize);

            // $('.language-switcher-locale-url a').on('click', this.onClickLanguage);
            // WFUIJS.$(window).on('got_string_overwrite_table', this.onHandleLanguageLoaded);
            // this.setState({
            //     form_width: $('form').width(),
            //     activeId: this.props.activeId,
            // });
            // stickyMenu.init();
            // this.resizeListener = bodyResizeListener($, '.survey-question', stickyMenu.update);

            // Display confirmation before user leave
            window.onbeforeunload = function () {
                return 'Les changements effectués ne seront pas sauvegardés'; // Changes you made may not be saved.
            };
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            // TODO: Removed
            // $(window).off('resize', this.onResize);
            // $('.language-switcher-locale-url a').off('click', this.onClickLanguage);
            // WFUIJS.$(window).off('got_string_overwrite_table', this.onHandleLanguageLoaded);
            // this.resizeListener.off();

            window.onbeforeunload = undefined;
        }
    }, {
        key: 'onHandleLanguageLoaded',
        value: function onHandleLanguageLoaded() {
            this.forceUpdate();
            this.setState({ translated: true });
        }
    }, {
        key: 'getTotalAnsweredQuestions',
        value: function getTotalAnsweredQuestions() {}
        // TODO
        // const { survey_data, submission, mapQidsToCids } = this.props;
        // return countTotalAnsweredQuestions(survey_data, submission, mapQidsToCids);


        /*****************************************************************************
         * Actions
         ****************************************************************************/

    }, {
        key: 'saveSubmission',
        value: function saveSubmission(callback) {
            var _props3 = this.props,
                survey_data = _props3.survey_data,
                language = _props3.language,
                errors = _props3.errors,
                dispatch = _props3.dispatch,
                survey_info = _props3.survey_info,
                saveSubmission = _props3.saveSubmission,
                parentURL = _props3.parentURL,
                getConfig = _props3.getConfig,
                user = _props3.user;
            var activeId = this.state.activeId;

            var autoSave = survey_info.autoSave ? survey_info.autoSave[language] : true;
            // const { completed, total } = this.getTotalAnsweredQuestions();

            /**
             * Save entire section
             */
            var sectionId = survey_data[activeId].id;
            var that = this;

            // if ( errors[sectionId] && Object.keys(errors[sectionId]).length > 0 ) {
            //     showMessage({
            //         title: "Question Action",
            //         text: "Il y a des erreurs dans le formulaire. SVP faire la correction avant de procéder.", // There are errors on the form. Please fix them before continuing.
            //         type: "error"
            //     });
            //     return
            // }

            // dispatch(setInActionState(true));
            saveSubmission(survey_info.nid, sectionId, language, user, parentURL, getConfig).then(callback);
        }
    }, {
        key: 'next',
        value: function next(id) {
            var survey_data = this.props.survey_data;
            var activeId = this.state.activeId;

            var that = this;

            this.saveSubmission(function () {
                $(window).trigger('webform_changed', id + 1);
                if (id == activeId && id < survey_data.length - 1) {
                    setTimeout(function () {
                        window.scrollTo(0, 0);
                        that.setState({ activeId: parseInt(id) + 1 });
                    }, 5);
                }
            });
        }
    }, {
        key: 'prev',
        value: function prev(id) {
            var _this2 = this;

            var that = this;

            this.saveSubmission(function () {
                $(window).trigger('webform_changed', id - 1);
                if (id == _this2.state.activeId && id >= 0) {
                    setTimeout(function () {
                        window.scrollTo(0, 0);
                        that.setState({ activeId: parseInt(id) - 1 });
                    }, 5);
                }
            });
        }
    }, {
        key: 'confirm',
        value: function confirm() {
            var _props4 = this.props,
                submission = _props4.submission,
                survey_data = _props4.survey_data,
                onComplete = _props4.onComplete;
            // const { completed, total } = this.getTotalAnsweredQuestions();

            this.saveSubmission(function () {
                if (typeof onComplete === 'function') onComplete();
                // let all_answered = (total == completed)
                // this.refs['submit_conform_dialog'].showModal();
            });
        }
    }, {
        key: '_submit',
        value: function _submit() {
            var _props5 = this.props,
                nid = _props5.nid,
                allowPublish = _props5.allowPublish,
                dispatch = _props5.dispatch,
                submitSubmission = _props5.submitSubmission;
            // dispatch(setInActionState(true));

            window.onbeforeunload = undefined;
            if (allowPublish) {
                submitSubmission(nid, function () {
                    window.location.href = '/dashboard';
                });
            } else {
                window.location.href = '/dashboard';
            }
        }
    }, {
        key: 'goto',
        value: function goto(id) {
            var _this3 = this;

            var that = this;

            if (id == this.state.activeId) return;
            this.saveSubmission(function () {
                $(window).trigger('webform_changed', id);
                if (id != _this3.state.activeId) {
                    setTimeout(function () {
                        window.scrollTo(0, 0);
                        that.setState({ activeId: parseInt(id) });
                    }, 5);
                }
            });
        }
        /*****************************************************************************
         * Events
         ****************************************************************************/

    }, {
        key: 'onResize',
        value: function onResize(e) {
            this.setState({
                form_width: $('form').width()
            });
        }
    }, {
        key: 'onClickLanguage',
        value: function onClickLanguage(e) {
            e.preventDefault();
            e.stopPropagation();
            this.refs['switch_lang_confirm_dialog'].showModal(e);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props6 = this.props,
                displaySubmit = _props6.displaySubmit,
                survey_data = _props6.survey_data,
                in_action = _props6.in_action,
                submissions = _props6.submissions,
                recaptchaSiteKey = _props6.recaptchaSiteKey,
                user = _props6.user,
                review = _props6.review;
            var _state = this.state,
                activeId = _state.activeId,
                form_width = _state.form_width,
                translated = _state.translated,
                surveyDataState = _state.surveyDataState;

            // Submit Button

            if (displaySubmit) {
                var submit = _react2.default.createElement('input', { type: 'submit', value: 'submit' });
            }
            //Settings for Slide Animation
            var formStyle = {
                overflow: 'hidden',
                width: form_width
            };
            var posX = -1 * (activeId * form_width) || 0;
            var sliderStyle = {
                WebkitTransition: 'all .2s linear',
                transition: 'all .2s linear',
                width: surveyDataState && surveyDataState.length * form_width || 'auto',
                msTransform: 'translate(' + posX + 'px, 0)',
                WebkitTransform: 'translate(' + posX + 'px, 0)',
                transform: 'translate(' + posX + 'px, 0)'
            };

            //Coming from top
            var rowClasses = 'row row-eq-height'; // "row vertical_align";

            if (surveyDataState) {
                return _react2.default.createElement(
                    'div',
                    {
                        className: 'application-app ' + (surveyDataState.length > 1 ? 'multi-section' : 'single-section')
                    },
                    _react2.default.createElement(
                        'div',
                        { className: 'container' },
                        in_action ? _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'p',
                                {
                                    className: 'page_loading',
                                    style: { opacity: 0.5 }
                                },
                                _react2.default.createElement('i', { className: 'fa fa-spinner fa-spin' })
                            )
                        ) : '',
                        surveyDataState.length > 1 && _react2.default.createElement(_SideBar2.default, _extends({}, this.props, {
                            activeId: activeId,
                            translated: translated
                        })),
                        _react2.default.createElement(
                            'div',
                            { className: 'application-main section-' + activeId },
                            _react2.default.createElement(
                                _reactAddonsCssTransitionGroup2.default,
                                {
                                    transitionName: 'fade',
                                    transitionEnterTimeout: 500,
                                    transitionLeaveTimeout: 500,
                                    transitionAppearTimeout: 500,
                                    transitionAppear: true
                                },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'row' },
                                    _react2.default.createElement(
                                        'div',
                                        { style: formStyle },
                                        _react2.default.createElement(
                                            'div',
                                            {
                                                className: 'default_slide',
                                                style: sliderStyle
                                            },
                                            surveyDataState.map(function (section, i) {
                                                return _react2.default.createElement(_SectionForm2.default, {
                                                    key: i,
                                                    index: i,
                                                    form_width: form_width,
                                                    translated: translated,
                                                    section: section,
                                                    isActive: activeId == i,
                                                    submissions: submissions,
                                                    recaptchaSiteKey: recaptchaSiteKey,
                                                    user: user,
                                                    review: review
                                                });
                                            }),
                                            submit
                                        )
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(_SubmitConfirmDialog2.default, {
                            ref: 'submit_conform_dialog',
                            onHandleSubmit: this._submit.bind(this)
                        }),
                        _react2.default.createElement(_SwitchLangConfirmDialog2.default, { ref: 'switch_lang_confirm_dialog' })
                    )
                );
            } else {
                console.log('Error: The data provided is broken.');
                return _react2.default.createElement('noscript', null);
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            _sticky_menu2.default.update();
        }
    }]);

    return WebForm;
}(_react2.default.Component);

WebForm.propTypes = {
    vid: _react2.default.PropTypes.number,
    language: _react2.default.PropTypes.string,
    activeId: _react2.default.PropTypes.number,
    allowPrev: _react2.default.PropTypes.bool,
    displaySubmit: _react2.default.PropTypes.bool,
    action: _react2.default.PropTypes.string,
    parentURL: _react2.default.PropTypes.string,
    allowPublish: _react2.default.PropTypes.bool,
    recaptchaSiteKey: _react2.default.PropTypes.string,
    onComplete: _react2.default.PropTypes.func,
    getConfig: _react2.default.PropTypes.func,
    user: _react2.default.PropTypes.object,
    review: _react2.default.PropTypes.bool,
    allowAnonymousSubmission: _react2.default.PropTypes.bool
};
WebForm.defaultProps = {
    activeId: 0,
    allowPrev: true,
    language: 'en',
    displaySubmit: true,
    action: '',
    allowPublish: true,
    review: false,
    allowAnonymousSubmission: false
};
WebForm.childContextTypes = {
    nid: _react2.default.PropTypes.string,
    vid: _react2.default.PropTypes.number,
    language: _react2.default.PropTypes.string,
    allowPrev: _react2.default.PropTypes.bool,
    next: _react2.default.PropTypes.any,
    prev: _react2.default.PropTypes.any,
    confirm: _react2.default.PropTypes.any,
    goto: _react2.default.PropTypes.any,
    last: _react2.default.PropTypes.number,
    activeId: _react2.default.PropTypes.number,
    autoSave: _react2.default.PropTypes.bool,
    getConfig: _react2.default.PropTypes.func
};

exports.default = (0, _reactRedux.connect)(function (state, props) {
    return {
        in_action: state.in_action
    };
}, actionCreators)(WebForm);