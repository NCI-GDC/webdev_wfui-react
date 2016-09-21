import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ContainerCounter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0
    }
  }

  onClick(e) {
    this.setState({
      counter: this.state.counter + 1
    });
  }

  render() {
    var { data: {content, isCounter} } = this.props;
    var { counter } = this.state;

    var render_counter;
    if(isCounter) {
      render_counter = (<div className="wfui-container__counter">Click Counter: {counter}</div>);
    } else {
      render_counter = '';
    }

    return (
      <div
        className="wfui-container"
        onClick={this.onClick.bind(this)}>
        {render_counter}
        {content}
      </div>
    );
  }
}

export default ContainerCounter;
