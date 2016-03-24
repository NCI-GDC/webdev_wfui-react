import React, { Component } from 'react';

/**
 * Input field
 */
class InputField extends Component {
  render() {
    var {label, type, defaultValue, placeholder, suffix} = this.props;
    
    return (
      <div className={"wfui-input-field wfui-input-field--"+ type}>
          <label>{label}</label>
          <input type={type} defaultValue={defaultValue} placeholder={placeholder} />
          {suffix}
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