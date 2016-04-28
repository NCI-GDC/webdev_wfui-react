(function($) {
	WFUIJS.Nav = function(selector) {
		return new WFUIJS.nav(selector);
	}
	WFUIJS.nav = function(selector) {
		this.$container = $(selector);
	}

	WFUIJS.nav.prototype.setup = function(widths) {
		this.handleNavItemClicks();
	}

	WFUIJS.nav.prototype.handleNavItemClicks = function() {
		var that = this;
		$(this.$container).on('click', 'ul li a', function() {
			$('.wfui-nav-selected', that.$container).trigger('wfui-nav-loseCurrent').removeClass('wfui-nav-selected');
			$(this).parent().trigger('wfui-nav-gainCurrent').addClass('wfui-nav-selected');

			// If this is a simple markup tab, put the markup back into the
			// source elm
			var $cur = $(that.$container.data('wfui-nav-cur'));
			if ($cur) {
				var $source = $($cur.data('wfui-nav-source'));
				if ($source) {
					$source.append($(that.$container.data('wfui-nav-controls')).children().detach());
				}
			}
			that.$container.data('wfui-nav-cur', $(this));

			if ($(this).data('wfui-nav-view')) {
				if (that.getCurrentView()) {
					var curView = that.getCurrentView();
					
					if (curView.destroy) {
						curView.destroy();
					} else if (curView.remove) {
						curView.remove();
					}
				}

				var args = $(this).data('wfui-nav-view-args');
				if ($(this).data('wfui-nav-view-ns')) {
					var view = new window[$(this).data('wfui-nav-view-ns')][$(this).data('wfui-nav-view')](args);
				} else {
					var view = new window[$(this).data('wfui-nav-view')](args);
				}

				that.setCurrentView(view);

				$(that.$container.data('wfui-nav-controls')).empty().append(view.render().el);
			} else if ($(this).data('wfui-nav-source')) {
				$(that.$container.data('wfui-nav-controls')).append($($(this).data('wfui-nav-source')).children().detach());
			}
		});
	}

	WFUIJS.nav.prototype.getCurrentView = function() {
		return this.$container.data('wfui-nav-curView');
	}

	WFUIJS.nav.prototype.setCurrentView = function(view) {
		this.$container.data('wfui-nav-curView', view);
	}

})(WFUIJS.$);