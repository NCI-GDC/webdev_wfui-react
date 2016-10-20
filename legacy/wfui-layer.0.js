(function($) {

    var EVENT_PREFIX = "_wfui-internal-layer-";
    var GLOBAL_EVENT_PREFIX = "_wfui-internal-layer-global-";

    function Layer(selector) {
        this.$el = $(selector || '<div class="wfui-layer" aria-hidden="true"></div>');
    }

    Layer.prototype.changeSize = function(width, height) {
        this.$el.css('width', width);
        this.$el.css('height', height === 'content' ? '' : height);
        return this;
    };

    Layer.prototype.on = function(event, fn) {
        this.$el.on(EVENT_PREFIX + event, fn);
        return this;
    };

    Layer.prototype.show = function() {
        if (this.$el.is(':visible')) {
            return this;
        }
        WFUIJS.LayerManager.global.push(this.$el);
        return this;
    };

    Layer.prototype.hide = function() {
        if (!this.$el.is(':visible')) {
            return this;
        }
        WFUIJS.LayerManager.global.popUntil(this.$el);
        return this;
    };

    Layer.prototype.remove = function() {
        this.hide();
        this.$el.remove();
        this.$el = null;
    };

    Layer.prototype._showLayer = function(zIndex) {
        if (!this.$el.parent().is('body')) {
            this.$el.appendTo(document.body);
        }
        // inverse order to hideLayer
        this.$el.data('_wfui-layer-cached-z-index', this.$el.css('z-index'));
        this.$el.css("z-index", zIndex);
        this.$el.attr("aria-hidden", "false");
        WFUIJS.FocusManager.global.enter(this.$el);
        this.$el.trigger(EVENT_PREFIX + "show");
        $(document).trigger(GLOBAL_EVENT_PREFIX + "show", [this.$el]);
    };

    Layer.prototype._hideLayer = function() {
        // inverse order to showLayer
        WFUIJS.FocusManager.global.exit(this.$el);
        this.$el.attr("aria-hidden", "true");
        this.$el.css('z-index', this.$el.data('_wfui-layer-cached-z-index') || '');
        this.$el.data('_wfui-layer-cached-z-index', '');
        this.$el.trigger(EVENT_PREFIX + "hide");
        $(document).trigger(GLOBAL_EVENT_PREFIX + "hide", [this.$el]);
    };

    Layer.prototype.isBlanketed = function() {
        return this.$el.attr("data-wfui-blanketed") === "true";
    };

    Layer.prototype.isModal = function() {
        return this.$el.attr("data-wfui-modal") === "true";
    };

    WFUIJS.layer = WFUIJS._internal.widget('layer', Layer);

    WFUIJS.layer.on = function(eventName, fn) {
        $(document).on(GLOBAL_EVENT_PREFIX + eventName, fn);
        return this;
    };

}(WFUIJS.$));