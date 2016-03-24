import React, { Component } from 'react';

/**
 * Input field
 */
class InputField extends Component {
  render() {
    var {label, type, defaultValue, placeholder, suffix, name} = this.props;
    
    return (
      <div className={"wfui-input-field wfui-input-field--"+ type}>
          <label className="wfui-input-field__label">{label}</label>
          <input className="wfui-input-field__input" type={type} defaultValue={defaultValue} placeholder={placeholder} name={name} />
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
  name: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  defaultValue: React.PropTypes.string,
  suffix: React.PropTypes.string,
}
InputField.defaultProps = {
  label: '',
  type: 'text',
  name: '',
  placeholder: '',
  defaultValue: '',
  suffix: ''
}

export default InputField