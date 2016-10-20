WFUIJS.BB.ModalView = Backbone.View.extend({
	originalEvents: {
		'click .cancel': 'hide',
		'click .wfui-dialog2-header-close': 'hide',
	},
	events: function() {
		return _.extend({},this.originalEvents,this.additionalEvents);
	},
	initialize: function(opts) {
		
	},
	render: function() {
		var $dialog = Backbone.$(this.template(this.model.attributes));
		Backbone.$('body').append($dialog);
		this.setElement($dialog);

		return this;
	},
	show: function() {
		var that = this;
		if (!this.dialog2)
			this.dialog2 = new WFUIJS.dialog2(this.el);

		this.dialog2.show();

		Backbone.$('.wfui-blanket').on('click',function(){ that.hide(); });
	},
	hide: function() {
		this.dialog2.hide();
		Backbone.$('.wfui-blanket').off('click');
		this.remove();
	},
});