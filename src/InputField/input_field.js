import React, { Component } from 'react';

/**
 * Input field
 */
class InputField extends Component {
  render() {
    return (
      <div className={"wfui-input-field wfui-input-field--"+ this.props.type}>
          <label>{this.props.label}</label>
          <input type={this.props.type} defaultValue={this.props.defaultValue} placeholder={this.props.placeholder} />
          {this.props.suffix}
      </div>
    )
  }
}

/**
 * Property types
 */
InputField.propTypes = {
  label: React.PropTypes.string,
  type: React.PropTypes.oneOf(['text','number','email']),
  placeholder: React.PropTypes.string,
  defaultValue: React.PropTypes.string,
  suffix: React.PropTypes.string,
}
InputField.defaultProps = {
  label: '',
  type: 'text',
  placeholder: '',
  defaultValue: '',
  suffix: ''
}

export default InputField