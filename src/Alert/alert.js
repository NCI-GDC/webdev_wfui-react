var React = require("react");

var Growl = require("Growl/growl.react");

var Alert = React.createClass({

    growler: null,

    componentDidMount: function() {

        // Setup your Growl Settings
        Growl.setPosition("tr"); // Bottom-Right(br) by default
        Growl.setMaxToShow(1); // Default is 8

        // set our internal variable to a reference to an instance of the growler
        this.growler = this.refs.growler;
    },

    // Give your whole app a method to call and trigger a notification.
    growl: function(level, msg) {
        this.growler.addNotification(level, msg);
    },

    // Somewhere in your main application view (so that it doesn't get unmounted) add an instance of Growl.
    render: function() {
        return (
            <div className="alert-message">
                <Growl ref="growler" />
            </div>
        );
    }

});

module.exports = Alert;