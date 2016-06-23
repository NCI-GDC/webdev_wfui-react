var React = require('react');
require('./pnotify.custom.min.js');

var PNotify = React.createClass({

	getInitialState: function() {
		return {
		}
	},

	getDefaultProps: function() {		
		return {};
	},

	testFunction: function(){
		return (new PNotify({
            title: 'Regular Notice',
            text: 'Check me out! I\'m a notice.'
        }));
	},

	render: function() {
		new PNotify({
            title: 'Regular Notice',
            text: 'Check me out! I\'m a notice.'
        });

		return (
			<div></div>
		);
	
	}
});

module.exports = PNotify;