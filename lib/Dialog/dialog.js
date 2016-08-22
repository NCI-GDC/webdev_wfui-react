'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function ($) {

    /*
     IE8 doesn't support calc(), so we emulate all our calc stuff here. This needs to be kept in sync with the CSS.
     */
    function makeCalcShimEvents() {
        var openDialogs = [];
        var $window = $(window);
        var windowHeight;
        var windowWidth;

        var onShow = function onShow(dialog) {
            if (!openDialogs.length) {
                windowHeight = $window.height();
                windowWidth = $window.width();
                $window.on('resize', resizeHandler);
            }
            setDialogHeight(dialog);
            openDialogs.push(dialog);
        };
        var onHide = function onHide(dialog) {
            openDialogs = $.grep(openDialogs, function (openDialog) {
                return dialog !== openDialog;
            });
            if (!openDialogs.length) {
                $window.off('resize', resizeHandler);
            }
        };

        return {
            show: onShow,
            hide: onHide
        };
    }

    var calcShimEvents;

    function triggerCalcShimEvent(dialog, event) {
        if (!calcShimEvents) {
            calcShimEvents = WFUIJS._internal.browser.supportsCalc() ? {} : makeCalcShimEvents();
        }
        calcShimEvents[event] && calcShimEvents[event](dialog);
    }

    var defaults = {
        "wfui-focus-selector": ".wfui-dialog2-content :input:visible:enabled",
        "wfui-blanketed": "true"
    };

    function applyDefaults($el) {
        $.each(defaults, function (key, value) {
            var dataKey = "data-" + key;
            if (!$el[0].hasAttribute(dataKey)) {
                $el.attr(dataKey, value);
            }
        });
    }

    function Dialog2(selector) {
        if (selector) {
            this.$el = $(selector);
        } else {
            this.$el = $(WFUIJS.parseHtml($(wfui.dialog.dialog2({}))));
        }
        applyDefaults(this.$el);
    }

    Dialog2.prototype.on = function (event, fn) {
        WFUIJS.layer(this.$el).on(event, fn);
        return this;
    };

    Dialog2.prototype.show = function () {
        var that = this;
        triggerCalcShimEvent(this, "show");

        this.$el.show();
        WFUIJS.dim();
        // WFUIJS.layer(this.$el).show();
        WFUIJS.$('.wfui-blanket').on('click', function () {
            // WFUIJS.layer(that.$el).hide();
            WFUIJS.undim();
            that.$el.hide();
        });

        return this;
    };

    Dialog2.prototype.hide = function () {
        triggerCalcShimEvent(this, "hide");
        // WFUIJS.layer(this.$el).hide();
        // if (this.$el.data("wfui-remove-on-hide")) {
        //     WFUIJS.layer(this.$el).remove();
        // }
        WFUIJS.undim();
        this.$el.hide();

        WFUIJS.$('.wfui-blanket').off('click');
        return this;
    };

    Dialog2.prototype.remove = function () {
        triggerCalcShimEvent(this, "hide");
        WFUIJS.layer(this.$el).remove();
        return this;
    };

    WFUIJS.dialog2 = WFUIJS._internal.widget('dialog2', Dialog2);

    WFUIJS.dialog2.on = function (eventName, fn) {
        WFUIJS.layer.on(eventName, function (e, $el) {
            if ($el.is(".wfui-dialog2")) {
                fn.apply(this, arguments);
            }
        });
    };

    $(document).on('click', '.wfui-dialog2-header-close', function (e) {
        e.preventDefault();
        WFUIJS.dialog2($(this).closest('.wfui-dialog2')).hide();
    });

    ///////////////////////////////////////////////////////////

    var Dialog2_1 = function (_React$Component) {
        _inherits(Dialog2_1, _React$Component);

        function Dialog2_1(props) {
            _classCallCheck(this, Dialog2_1);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Dialog2_1).call(this));

            _this.state = {
                'size': 'medium',
                'has_searchbox': false,
                'has_close': true,
                'is_modal': true
            };
            _this.windowResizeHandler = _this.windowResizeHandler.bind(_this);
            return _this;
        }

        _createClass(Dialog2_1, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                $(window).on('resize', this.windowResizeHandler);
                this.windowResizeHandler();
            }
        }, {
            key: 'componentWillMount',
            value: function componentWillMount() {
                if (typeof this.props.data == 'string') {
                    var data = JSON.parse(this.props.data);
                } else {
                    data = this.props.data;
                }
                this.setState(this.props.data);
                if (!data.attrs || !data.attrs.id) {
                    this.setState({ id: WFUIJS.RCT._oicr_wfui_gen_uniqid('dialog2') });
                }
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                $(window).off('resize', this.windowResizeHandler);
            }
        }, {
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(props) {
                if (typeof props.data == 'string') {
                    var data = JSON.parse(props.data);
                } else {
                    data = props.data;
                }
                this.setState(props.data);
                if (!data.attrs || !data.attrs.id) {
                    this.setState({ id: WFUIJS.RCT._oicr_wfui_gen_uniqid('dialog2') });
                }
            }
        }, {
            key: 'setDialogHeight',
            value: function setDialogHeight(dialog) {

                // fast hasClass evaluation, seeing as this runs in a resize loop
                var dialogClass = " " + dialog.$el[0].className + " ";
                function dialogHasClass(selector) {
                    return dialogClass.indexOf(" " + selector + " ") >= 0;
                }

                var dialogSize = dialogHasClass('wfui-dialog2-small') ? 'small' : dialogHasClass('wfui-dialog2-medium') ? 'medium' : dialogHasClass('wfui-dialog2-large') ? 'large' : dialogHasClass('wfui-dialog2-xlarge') ? 'xlarge' : 'custom';

                var dialogFitsWidth;
                var dialogFitsHeight;
                switch (dialogSize) {
                    case 'small':
                        dialogFitsWidth = this.windowWidth > 420;
                        dialogFitsHeight = this.windowHeight > 500;
                        break;
                    case 'medium':
                        dialogFitsWidth = this.windowWidth > 620;
                        dialogFitsHeight = this.windowHeight > 500;
                        break;
                    case 'large':
                        dialogFitsWidth = this.windowWidth > 820;
                        dialogFitsHeight = this.windowHeight > 700;
                        break;
                    case 'xlarge':
                        dialogFitsWidth = this.windowWidth > 1000;
                        dialogFitsHeight = this.windowHeight > 700;
                        break;
                    default:
                        // custom sizers can do their own thing
                        dialogFitsWidth = true;
                        dialogFitsHeight = true;
                }

                var $footer = dialog.$el.find('.wfui-dialog2-footer');
                var $content = dialog.$el.find('.wfui-dialog2-content');
                var $header = dialog.$el.find('.wfui-dialog2-header');

                // dialog.$el
                //     .toggleClass('wfui-dialog2-fullscreen', !dialogFitsWidth)
                //     .css('height', this.windowHeight - 107 - (dialogFitsWidth ? 200 : 0));

                //Calculate header and footer height, instead of fixing size.
                dialog.$el.toggleClass('wfui-dialog2-fullscreen', !dialogFitsWidth).css('height', this.windowHeight - $footer.outerHeight() - $header.outerHeight());

                dialog.$el.find('.wfui-dialog2-content').css('min-height', dialogFitsHeight ? '' : this.windowHeight > 500 ? '193px' : '93px');

                var dialog_height = $content.outerHeight() + $footer.outerHeight() + $header.outerHeight();

                //Added in order to make dialog resize properly.
                if (dialog_height + 100 >= this.windowHeight) {
                    dialog.$el.css('top', (this.windowHeight - dialog_height) / 2);
                } else if (dialog_height >= this.windowHeight) {
                    dialog.$el.css('top', 0);
                } else {
                    dialog.$el.css('top', 100); //default 100px margin
                }
            }
        }, {
            key: 'show',
            value: function show(event) {
                var dialog2 = WFUIJS.dialog2('#' + this.state.id);
                dialog2.show();
                this.setDialogHeight(dialog2);
            }
        }, {
            key: 'hide',
            value: function hide(event) {
                WFUIJS.dialog2('#' + this.state.id).hide();
            }
        }, {
            key: 'windowResizeHandler',
            value: function windowResizeHandler(event) {
                this.windowWidth = $(window).width();
                this.windowHeight = $(window).height();
                this.setDialogHeight(WFUIJS.dialog2('#' + this.state.id));
            }
        }, {
            key: 'render',
            value: function render() {
                var that = this;

                //Control Attributes
                var attrs = $.extend({
                    role: "dialog",
                    "aria-hidden": true,
                    id: this.state.id,
                    className: ""
                }, this.state.attrs);
                attrs.className += " wfui-layer wfui-dialog2 wfui-dialog2-" + this.state.size;

                //Register instance to WFUIJS
                WFUIJS.RCT._oicr_wfui_component_instance('Dialog2', attrs.id, { 'click_trigger': this.state.click_trigger });

                if (this.state.is_modal) {
                    attrs['data-wfui-modal'] = true;
                }

                //Controll element to render
                var elements = {};

                //header_close
                if (this.state.has_close) {
                    var data = { name: 'times' };
                    elements.header_close = React.createElement(
                        'a',
                        { className: 'wfui-dialog2-header-close', onClick: this.hide.bind(this) },
                        React.createElement(WFUIJS.RCT.Icon_2, { data: data })
                    );
                }
                //Buttons for footer
                if (this.state.buttons && this.state.buttons.length > 0) {
                    elements.buttons = React.createElement(
                        'div',
                        { className: 'wfui-dialog2-footer-actions' },
                        this.state.buttons.map(function (data, i) {
                            data.onClick = data.onClick.bind(that); // Pass dialog2 context to button.
                            return React.createElement(WFUIJS.RCT.Button_1, { key: i, data: data });
                        })
                    );
                }
                //Buttons for header
                if (this.state.header_buttons && this.state.header_buttons.length > 0) {
                    elements.header_buttons = React.createElement(
                        'div',
                        { className: 'wfui-dialog2-header-actions' },
                        this.state.header_buttons.map(function (data, i) {
                            return React.createElement(WFUIJS.RCT.Button_1, { key: i, data: data });
                        })
                    );
                }
                //hint
                if (this.state.hint) {
                    elements.hint = React.createElement(
                        'div',
                        { className: 'wfui-dialog2-footer-hint' },
                        this.state.hint
                    );
                }
                //content
                if (typeof this.state.content == 'string') {
                    elements.content = React.createElement('div', { dangerouslySetInnerHTML: { __html: this.state.content } });
                } else {
                    elements.content = React.createElement(this.state.content.component, this.state.content.props);
                }

                //Render
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'div',
                        attrs,
                        React.createElement(
                            'div',
                            { className: 'wfui-dialog2-header' },
                            React.createElement(
                                'h2',
                                { className: 'wfui-dialog2-header-main' },
                                this.state.title
                            ),
                            elements.header_buttons,
                            elements.header_close
                        ),
                        React.createElement(
                            'div',
                            { className: 'wfui-dialog2-content' },
                            elements.content
                        ),
                        React.createElement(
                            'div',
                            { className: 'wfui-dialog2-footer' },
                            elements.buttons,
                            elements.hint
                        )
                    )
                );
            }
        }, {
            key: 'componentDidUpdate',
            value: function componentDidUpdate() {
                this.setDialogHeight(WFUIJS.dialog2('#' + this.state.id));
            }
        }]);

        return Dialog2_1;
    }(React.Component);

    WFUIJS.RCT.Dialog2_1 = Dialog2_1;
})(WFUIJS.$);