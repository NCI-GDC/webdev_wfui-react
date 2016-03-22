import React, { Component } from 'react';

/**
 * Input field
 */
class InputField extends Component {
  render() {
    return (
      <div>
          <label>{this.props.label}:</label>
          <input type={this.props.type} />
      </div>
    )
  }
}

/**
 * Property types
 */
InputField.propTypes = {
  label: React.PropTypes.string,
  type: React.PropTypes.oneOf(['text','number','email'])
}
InputField.defaultProps = {
  label: 'Please insert label',
  type: 'text'
}

export default InputField