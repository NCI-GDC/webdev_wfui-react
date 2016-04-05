import React, { Component } from 'react';

/**
 * Input field
 */
class InputField extends Component {
  render() {
    var {label, type, defaultValue, placeholder, postfix, prefix, name, className} = this.props;
    if(prefix){
      var prefixField = <span className="wfui-input-field__prefix">{prefix}</span>
    }
    if(postfix){
      var postfixField = <span className="wfui-input-field__postfix">{postfix}</span>
    }
    return (
      <div className={"wfui-input-field wfui-input-field--"+ type + ' ' + className}>
          <label className="wfui-input-field__label">{label}</label>
          {prefixField}
          <input className="wfui-input-field__input" type={type} defaultValue={defaultValue} placeholder={placeholder} name={name} />
          {postfixField}
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
  postfix: React.PropTypes.string,
  prefix: React.PropTypes.string,
  className: React.PropTypes.string,
}
InputField.defaultProps = {
  label: '',
  type: 'text',
  name: '',
  placeholder: '',
  defaultValue: '',
  postfix: '',
  prefix: '',
  className: '',
}

export default InputField