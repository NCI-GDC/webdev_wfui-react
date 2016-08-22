'use strict';

var React = require('react');
var SingleGrowl = require('./single-growl.react.js');

// Private vars
var holder = null;
var position = "br";
var valid_positions = ["tl", "tr", "bl", "br", "tc", "bc"];
var delay = 3000;
var animations = true;
var maxShown = 8;

var movePosition = function movePosition() {
	var topOffset = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

	var y = position.slice(0, 1);
	if (y == "t") {
		holder.style.top = String(topOffset + 30) + "px";
		holder.style.bottom = "auto";
	} else {
		holder.style.top = "auto";
		holder.style.bottom = "0px";
	}

	var x = position.slice(1, 2);
	if (x == "l") {
		holder.style.left = "0px";
		holder.style.right = "auto";
	} else if (x == "r") {
		holder.style.left = "auto";
		holder.style.right = "0px";
	} else {
		var neg = holder.clientWidth / 2;
		var left = window.innerWidth / 2 - neg;
		holder.style.left = left + "px";
		holder.style.right = "auto";
	}
};

var Growl = React.createClass({
	displayName: 'Growl',


	// This is just a counter, don't modify directly
	uid: 5200,

	levels: ['info', 'warn', 'error', 'success'],

	// Convenience constans for setting notification level
	WARN: 'warn',
	INFO: 'info',
	ERROR: 'error',
	SUCCESS: 'success',

	// // Use these statics to configure all Growls from anywhere in your application
	// statics: {
	setPosition: function setPosition(pos) {
		if (inArray(pos, valid_positions)) {
			position = pos;
		} else {
			console.log('Unknown position supplied.');
		}

		if (holder !== null) {
			movePosition(this.state.topOffset);
		}
	},
	setMaxToShow: function setMaxToShow(ct) {
		maxShown = ct;
	},
	setDelay: function setDelay(del) {
		delay = parseInt(del);
		SingleGrowl.setDelay(del);
	},
	getDelay: function getDelay() {
		return delay;
	},
	noAnimations: function noAnimations() {
		animations = false;
		SingleGrowl.noAnimations();
	},
	// },

	getInitialState: function getInitialState() {
		return {
			notifications: [],
			topOffset: 0
		};
	},

	getDefaultProps: function getDefaultProps() {
		return {};
	},

	handleRemovedNotification: function handleRemovedNotification(uid) {
		var notifications = this.state.notifications;
		var n = notifications.filter(function (ele) {
			return ele.uid !== uid;
		});
		this.setState({ notifications: n });
	},

	addNotification: function addNotification(note) {
		// Configuration
		if (holder === null) {
			holder = this.getDOMNode();
		}
		if (note.topOffset) {
			this.setState({ topOffset: note.topOffset });
		}
		if (note.delay) {
			this.setDelay(note.delay);
		}
		if (note.position && inArray(note.position, valid_positions)) {
			this.setPosition(note.position);
		}
		this.setMaxToShow(8);
		movePosition(this.state.topOffset);

		var n = this.state.notifications;
		var self = this;
		try {
			if (note.level) {
				if (!inArray(note.level, this.levels)) {
					throw "Invalid level supplied";
				} else {
					note.uid = this.uid;
					note.ref = "notification-" + this.uid;
					this.uid += 1;
					note.timeout = false;

					n.push(note);

					this.setState({ notifications: n });
				}
			}
		} catch (ex) {
			console.log('Error adding notification: ' + ex);
		}
	},

	componentDidMount: function componentDidMount() {
		if (holder === null) {
			holder = this.getDOMNode();
		}
		movePosition();
	},

	render: function render() {
		var that = this;

		if (this.state.notifications.length == 0) {
			return React.createElement('div', { className: 'growl-wrapper empty' });
		}
		var isMore = "";
		var count = 0;
		if (this.state.notifications.length > maxShown) {
			var amt = this.state.notifications.length - maxShown;
			isMore = React.createElement(
				'li',
				{ key: 'more-still' },
				React.createElement(
					'span',
					null,
					amt,
					' more'
				)
			);
		}

		return React.createElement(
			'div',
			{ className: 'growl-wrapper' },
			React.createElement(
				'ul',
				null,
				this.state.notifications.map(function (n) {
					count += 1;
					if (count >= maxShown) {
						return "";
					} else {
						return React.createElement(SingleGrowl, { key: n.uid, ref: n.ref, notification: n, onDidRemove: that.handleRemovedNotification });
					}
				}),
				isMore
			)
		);
	}
});

function inArray(needle, haystack) {
	var length = haystack.length;
	for (var i = 0; i < length; i++) {
		if (haystack[i] == needle) return true;
	}
	return false;
}

module.exports = Growl;