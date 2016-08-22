'use strict';

var React = require('react');

var animations = true;
var delay = 3000;

var SingleGrowl = React.createClass({
	displayName: 'SingleGrowl',


	getInitialState: function getInitialState() {
		return {
			remove: false
		};
	},

	setRemove: function setRemove() {

		// Just in case this was triggered some other way than the timeout itself.
		clearTimeout(this.props.notification.timeout);

		if (!animations) {
			this.props.onDidRemove(this.props.notification.uid);
		} else {
			this.setState({ remove: true });
		}
	},

	statics: {
		noAnimations: function noAnimations() {
			animations = false;
		},
		setDelay: function setDelay(ms) {
			delay = ms;
		},
		getDelay: function getDelay() {
			return delay;
		}
	},

	getDefaultProps: function getDefaultProps() {
		return {
			notification: null,
			onDidRemove: function onDidRemove(uid) {}
		};
	},

	startTimer: function startTimer() {
		var note = this.props.notification;
		var self = this;
		note.timeout = setTimeout(function () {
			self.setRemove();
		}, delay);
	},

	componentDidMount: function componentDidMount() {
		// This should always evaluate to true, but just in case...
		if (this.props.notification.timeout === false) {
			this.startTimer();
		}

		if (animations) {
			var self = this;
			var ele = this.getDOMNode();
			var transitionEvent = whichTransitionEvent();
			if (transitionEvent) {
				ele.addEventListener(transitionEvent, function () {
					if (self.state.remove) {
						self.props.onDidRemove(self.props.notification.uid);
					}
				});
			} else {
				// Force animations to false bc this browser doesn't support them... 
				console.log('Animations disabled. Browser does not support.');
				animations = false;
			}
		}
	},

	render: function render() {
		var cname = "growl " + this.props.notification.level;
		if (this.state.remove) {
			cname = cname + " removing";
		}
		return React.createElement(
			'li',
			{ className: cname },
			React.createElement(
				'span',
				null,
				'[',
				this.props.notification.level,
				'] ',
				this.props.notification.msg
			)
		);
	}

});

/* From Modernizr */
function whichTransitionEvent() {
	var t;
	var el = document.createElement('fakeelement');
	var transitions = {
		'transition': 'transitionend',
		'OTransition': 'oTransitionEnd',
		'MozTransition': 'transitionend',
		'WebkitTransition': 'webkitTransitionEnd'
	};

	for (t in transitions) {
		if (el.style[t] !== undefined) {
			return transitions[t];
		}
	}
}

module.exports = SingleGrowl;