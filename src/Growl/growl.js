import React, { Component } from 'react';
import Growl from './Growl/growl.react';

class AppGrowl extends Component {

	constructor(){
		super()
		this.state = { growler: null, wrapper: null }
	}

	componentWillMount() {
		/** 
		* Example usage.
		*
		* If you do not have CSS transitions setup on each growl, you will need to call Growl.noAnimations() 
		* otherwise the growls will not be removed after the delay.
		*
		* When setting the delay(ms), include any time you have for the animation you use to show the growl. (2s animation + 6s visible = 8s)
		*
		*/
		//Growl.noAnimations();
		Growl.setDelay(5000);
	};

	componentDidMount() {
		if(this.wrapper === null) {
			this.setState({ wrapper: this.getDOMNode() });
		}
		this.setState({ growler: this.refs.growler });

		var self = this;

	};

	/*
	 * Somewhere in your app, you need a function that gets called and can reference the DemoApp.growler variable
	 * and call addNotification. Feel free to put in actions or in a App Model change observer, or leave in your root
	 * controller component.
	 *
	 */
	notify(level, msg) {
		this.state.growler.addNotification({ level: level, msg: msg });
	};

	/* 
	 * This just for demo.
	 */
	handleNotificationTrigger(e) {
		e.preventDefault();
		var form = e.target;
		var lvl = document.getElementById('growlLevel').value;
		var msg = document.getElementById('growlMsg').value;

		this.notify(lvl, msg);
	};


	/*
	 * Recommend creating the Growl component at the top-most level of you app that you can
	 * in order to make layout and redraws work optimally.
	 *
	 */
	render() {
		return (<div className="component-demo-app">
				<Growl ref="growler"></Growl>
				<form onSubmit={this.handleNotificationTrigger}>
					<h3>Trigger a growl notification.</h3>
					<select name="level" id="growlLevel">
						<option value="info">Info</option>
						<option value="warn">Warn</option>
						<option value="error">Error</option>
						<option value="success">Success</option>
					</select>
					<input type="text" name="msg" id="growlMsg" />
					<input type="submit" value="Growl!" />
				</form>
			</div>
		);
	};

}

export default AppGrowl

// React.render(
//   <AppGrowl />,
//   document.getElementById('appStage')
// );