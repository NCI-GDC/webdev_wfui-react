WFUIJS.BB.AugmentedTableView = Backbone.View.extend({
	originalEvents: {
		'click th.sortable': 'setSort',
		'click th.checkbox input': function(e) {
			this.model.each(function(v, k, l) {
				v.set('isChecked', $(e.target).is(':checked'));
			});
		},
		'keyup .filter input': 'applyFilter',
		'click .bulk-actions button': 'executeBulkAction',
		'click .quick-filters [data-quick-filter]': function(e) {
			var $target = Backbone.$(e.target);
			$target.toggleClass('active');
			this.toggleFilter($target.data('quick-filter'));

			var that = this;
			this.$('.quick-filters [data-quick-filter].active').not($target).each(function() {
				Backbone.$(this).toggleClass('active');
				that.toggleFilter(Backbone.$(this).data('quick-filter'));
			});
		},
	},
	events: function() {
		return _.extend({},this.originalEvents,this.additionalEvents);
	},
	initialize: function(opts) {
		this._views = [];
		this.parent = opts.parent;
		this.modelOrig = opts.modelOrig;

		var that = this;
		_.each(this.initFilters, function(e) {
			that.toggleFilter(e);
		});

		this.listenTo(this.model, 'reset add remove', this.reset);
		this.listenTo(this.model, 'destroy', this.render);
		// The checkbox column should reflect whether or not all of the
		// checkboxes are checked
		this.listenTo(this.model, 'change:isChecked', function(model, value) {
			if (!value) {
				this.$('th.checkbox input').prop('checked', false);
			} else if (this.model.findWhere({isChecked: false}) == undefined) {
				this.$('th.checkbox input').prop('checked', true);
			}
		});

		this.sortOpts = new Backbone.Model(this.defaultSort);
		this.modelOrig.comparator = this.getComparator();
		this.listenTo(this.sortOpts, 'change', this.applySort);
	},
	addOne: function(rowModel) {
		var view = new this.rowViewProto({ model: rowModel, parent: this });
		this._views.push(view);

		this.$('tbody').append(view.render().el);

		return view;
	},
	addAll: function() {
		this.model.each(this.addOne, this);

		this.$('.loading').remove();
		this.$('> *').show();
	},
	reset: function() {
		if (this.$('.loading').is(':visible')) {
			this.addAll();
			this.applySort();
		} else {
			this.sortFilterExistingRows();
		}

		this.render();
	},
	render: function() {
		if (!this.$el.html().length)
			this.$el.html(this.template());

		this.$('.count span').text(this.model.length);
		this.$('th').removeClass('sorted').removeClass('asc').removeClass('desc');

		var $sortedCol = this.$('th[data-col="'+this.sortOpts.get('col')+'"]');
		$sortedCol.addClass('sorted');
		$sortedCol.addClass(this.sortOpts.get('dir') == 1 ? 'asc' : 'desc');

		return this;
	},
	close: function() {
		_.each(this._views, function(v) { v.remove(); });
		this.remove();
	},
	destroy: function() {
		this.close();
	},
	setSort: function(e) {
		var col = this.$(e.target).data('col');

		if (this.sortOpts.get('col') != col) {
			this.sortOpts.set('col', col);
			this.sortOpts.set('dir', 1);
		} else {
			this.sortOpts.set('dir', -this.sortOpts.get('dir'));	
		}
	},
	getComparator: function() {
		var comparator = this.comparators[this.sortOpts.get('col')];
		var that = this;
		return function(m1, m2) {
			return that.sortOpts.get('dir')*comparator(m1, m2);
		};
	},
	applySort: function() {
		this.modelOrig.comparator = this.getComparator();

		if (this.modelOrig.length)
			this.modelOrig.sort();

		this.render();
	},
	sortFilterExistingRows: function() {
		var that = this;
		var els = this.model.map(function(m) {
			var thisView = _.find(that._views, function(view) {
				return view.model.id == m.id;
			});

			if (!thisView) {
				thisView = that.addOne(m);
			}
				
			return thisView.el;
		});

		this.$('tbody').children().detach();
		this.$('tbody').append(els);
	},
	applyFilter: function() {
		var that = this;
		var filterStr = that.$('.filter input').val();
		var filterWords = filterStr.trim().toLowerCase().split(' ');

		this.model.filterBy('string', function(model) {
			var matchFound = false;
			for (var i = 0, ii = that.filterTargets.length; i < ii; i++) {
				if (_.isFunction(that.filterTargets[i])) {
					var targetStr = that.filterTargets[i].call(this, model);
				} else {
					var targetStr = model.get(that.filterTargets[i]);
				}
				
				if (targetStr) {
					for (var j = 0, jj = filterWords.length; j < jj; j++) {
						matchFound |= targetStr.toLowerCase().indexOf(filterWords[j]) != -1;
					}
				}
			}
			return matchFound;
		});
	},
	toggleFilter: function(filterName) {
		if (this.model.hasFilter(filterName)) {
			this.model.removeFilter(filterName);
		} else {
			this.model.filterBy(filterName, this.filters[filterName]);
		}
	},
	executeBulkAction: function() {
		var action = this.$('.bulk-actions select').val();

		if (!action) return;

		this.trigger('bulk', action);

		this.$('th.checkbox input').prop('checked', false);
	},
});