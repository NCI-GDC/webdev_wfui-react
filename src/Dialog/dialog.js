import React, { Component } from 'react';

(function($){

    /*
     IE8 doesn't support calc(), so we emulate all our calc stuff here. This needs to be kept in sync with the CSS.
     */
    function makeCalcShimEvents() {
        var openDialogs = [];
        var $window = $(window);
        var windowHeight;
        var windowWidth;

        var onShow = function (dialog) {
            if (!openDialogs.length) {
                windowHeight = $window.height();
                windowWidth = $window.width();
                $window.on('resize', resizeHandler);
            }
            setDialogHeight(dialog);
            openDialogs.push(dialog);
        };
        var onHide = function (dialog) {
            openDialogs = $.grep(openDialogs, function(openDialog) {
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
        $.each(defaults, function(key, value) {
            var dataKey = "data-" + key;
            if (!$el[0].hasAttribute(dataKey)) {
                $el.attr(dataKey, value);
            }
        });
    }

    function Dialog2(selector) {
        if (selector) {
            this.$el = $(selector);
        }
        else {
            this.$el = $(WFUIJS.parseHtml($(wfui.dialog.dialog2({}))));
        }
        applyDefaults(this.$el);
    }

    Dialog2.prototype.on = function(event, fn) {
        WFUIJS.layer(this.$el).on(event, fn);
        return this;
    };

    Dialog2.prototype.show = function() {
        var that = this;
        triggerCalcShimEvent(this, "show");

        this.$el.show();
        WFUIJS.dim();
        // WFUIJS.layer(this.$el).show();
        WFUIJS.$('.wfui-blanket').on('click',function(){
            // WFUIJS.layer(that.$el).hide();
            WFUIJS.undim();
            that.$el.hide();
        });

        return this;
    };

    Dialog2.prototype.hide = function() {
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

    Dialog2.prototype.remove = function() {
        triggerCalcShimEvent(this, "hide");
        WFUIJS.layer(this.$el).remove();
        return this;
    };

    WFUIJS.dialog2 = WFUIJS._internal.widget('dialog2', Dialog2);

    WFUIJS.dialog2.on = function(eventName, fn) {
        WFUIJS.layer.on(eventName, function(e, $el) {
            if ($el.is(".wfui-dialog2")) {
                fn.apply(this, arguments);
            }
        });
    };

    $(document).on('click', '.wfui-dialog2-header-close', function(e) {
        e.preventDefault();
        WFUIJS.dialog2($(this).closest('.wfui-dialog2')).hide();
    });

    ///////////////////////////////////////////////////////////

    class Dialog2_1 extends React.Component{
        constructor(props){
            super();
            this.state = {
                'size' : 'medium',
                'has_searchbox' : false,
                'has_close' : true,
                'is_modal' : true,
            };
            this.windowResizeHandler = this.windowResizeHandler.bind(this);
        }
        componentDidMount(){
            $(window).on('resize', this.windowResizeHandler);
            this.windowResizeHandler();
        }
        componentWillMount(){
            if(typeof this.props.data == 'string'){
              var data = JSON.parse(this.props.data);
            }else{
              data = this.props.data;
            }
            this.setState(this.props.data);
            if(!data.attrs || !data.attrs.id){
                this.setState({id: WFUIJS.RCT._oicr_wfui_gen_uniqid('dialog2')});
            }
        }
        componentWillUnmount(){
            $(window).off('resize', this.windowResizeHandler);
        }
        componentWillReceiveProps(props){
            if(typeof props.data == 'string'){
              var data = JSON.parse(props.data);
            }else{
              data = props.data;
            }
            this.setState(props.data);
            if(!data.attrs || !data.attrs.id){
                this.setState({id: WFUIJS.RCT._oicr_wfui_gen_uniqid('dialog2')});
            }
        }
        setDialogHeight(dialog) {

            // fast hasClass evaluation, seeing as this runs in a resize loop
            var dialogClass = " " + dialog.$el[0].className + " ";
            function dialogHasClass(selector) {
                return dialogClass.indexOf(" " + selector + " ") >= 0;
            }

            var dialogSize = dialogHasClass('wfui-dialog2-small')   ? 'small'   :
                             dialogHasClass('wfui-dialog2-medium')  ? 'medium'  :
                             dialogHasClass('wfui-dialog2-large')   ? 'large'   :
                             dialogHasClass('wfui-dialog2-xlarge')  ? 'xlarge'  :
                                                                     'custom';

            var dialogFitsWidth;
            var dialogFitsHeight;
            switch(dialogSize) {
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
            dialog.$el
                .toggleClass('wfui-dialog2-fullscreen', !dialogFitsWidth)
                .css('height', this.windowHeight - $footer.outerHeight() - $header.outerHeight() );

            dialog.$el.find('.wfui-dialog2-content')
                .css('min-height', dialogFitsHeight ?   '' :
                                 this.windowHeight > 500 ? '193px' :
                                                      '93px');

            var dialog_height = $content.outerHeight() + $footer.outerHeight() + $header.outerHeight();

            //Added in order to make dialog resize properly.
            if(dialog_height + 100 >= this.windowHeight){
                dialog.$el.css('top', (this.windowHeight-dialog_height)/2);
            }else if(dialog_height >= this.windowHeight){
                dialog.$el.css('top', 0);
            }else{
                dialog.$el.css('top', 100); //default 100px margin
            }

        }
        show(event){
            var dialog2 = WFUIJS.dialog2('#'+this.state.id);
            dialog2.show();
            this.setDialogHeight(dialog2);
        }
        hide(event){
            WFUIJS.dialog2('#'+this.state.id).hide();
        }
        windowResizeHandler(event){
            this.windowWidth = $(window).width();
            this.windowHeight = $(window).height();
            this.setDialogHeight(WFUIJS.dialog2('#'+this.state.id));
        }
        render(){
            const that = this;

            //Control Attributes
            let attrs = $.extend({
                role : "dialog",
                "aria-hidden": true,
                id : this.state.id,
                className: ""
            }, this.state.attrs);
            attrs.className += " wfui-layer wfui-dialog2 wfui-dialog2-"+this.state.size;
            
            //Register instance to WFUIJS
            WFUIJS.RCT._oicr_wfui_component_instance('Dialog2', attrs.id, {'click_trigger': this.state.click_trigger});

            if(this.state.is_modal){
                attrs['data-wfui-modal'] = true
            }

            //Controll element to render
            let elements = {}

            //header_close
            if(this.state.has_close){
                let data = {name:'times'}
                elements.header_close = (
                    <a className="wfui-dialog2-header-close" onClick={this.hide.bind(this)}><WFUIJS.RCT.Icon_2 data={data} /></a>
                )
            }
            //Buttons for footer
            if(this.state.buttons && this.state.buttons.length > 0){
                elements.buttons = (
                    <div className="wfui-dialog2-footer-actions">
                        {this.state.buttons.map(function(data, i){
                            data.onClick = data.onClick.bind(that) // Pass dialog2 context to button.
                            return <WFUIJS.RCT.Button_1 key={i} data={data} />
                        })}
                    </div>
                )
            }
            //Buttons for header
            if(this.state.header_buttons && this.state.header_buttons.length > 0){
                elements.header_buttons = (
                    <div className="wfui-dialog2-header-actions">
                        {this.state.header_buttons.map(function(data, i){
                            return <WFUIJS.RCT.Button_1 key={i} data={data} />
                        })}
                    </div>
                )
            }
            //hint
            if(this.state.hint){
                elements.hint = <div className="wfui-dialog2-footer-hint">{this.state.hint}</div>
            }
            //content
            if(typeof this.state.content == 'string'){
                elements.content = <div dangerouslySetInnerHTML={{__html: this.state.content }}></div>;
            }else{
                elements.content = <this.state.content.component {...this.state.content.props} />
            }

            //Render
            return (
                <div>
                    <div {...attrs}>
                        <div className="wfui-dialog2-header">
                            <h2 className="wfui-dialog2-header-main">{this.state.title}</h2>
                            {elements.header_buttons}
                            {elements.header_close}
                        </div>
                        <div className="wfui-dialog2-content">{elements.content}</div>
                        <div className="wfui-dialog2-footer">
                            {elements.buttons}
                            {elements.hint}
                        </div>
                    </div>
                </div>
            )
        }
        componentDidUpdate(){
            this.setDialogHeight(WFUIJS.dialog2('#'+this.state.id));
        }
    }
    WFUIJS.RCT.Dialog2_1 = Dialog2_1;

})(WFUIJS.$)