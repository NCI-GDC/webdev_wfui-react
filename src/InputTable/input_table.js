import React, { Component } from 'react';

/**
 * Input table
 */
class InputTable extends Component {
  render() {
    return (
      <div className="wfui-input-table">
          <style>

          </style>
          <label>1. What is your weight measurement?</label>
          <div>
            <p>Before you begin:</p>
            <ol>
              <li>Adjust your scale to zero</li>
              <li>Weigh your self with your clothes off, or wear light clothing. Remember to remove your shoe</li>
              <li>Step on the scale. Make sure both feet oare fully on the scale</li>
            </ol>
          </div>
          <div className="wfui-input-table__form">
            <p>Enter your Weight:</p>
            <ul>
              <li className="wfui-input-table__form"><input type={this.props.type} /></li>
              <li><input type={this.props.type} /></li>
            </ul>
          </div>
      </div>
    )
  }
}

/**
 * Property types
 */
InputTable.propTypes = {
}
InputTable.defaultProps = {
}

export default InputTable