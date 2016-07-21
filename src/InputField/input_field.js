import React, { Component } from 'react';

/**
 * Input field
 */
class InputField extends Component {
  constructor(){
    super();
    this.state={value:""}
  }
  onHandleClick(e){
    const {stopPropagation} = this.props;
    if(stopPropagation) e.stopPropagation();
  }
  onHandleChange(e){
    var {type, min, max} = this.props;
    var val = e.target.value;
    
    if(type == "number"){
      val = (typeof min != "undefined") ? Math.max(min, Number(val)) : Number(val);
      val = (typeof max != "undefined") ? Math.min(max, Number(val)) : Number(val);
    }

    this.setState({value: val})
    const {onHandleChange, preview} = this.props;
    if(onHandleChange && !preview){
      onHandleChange(e, val);
    }
  }
  componentDidMount() {
    this.setState({value: this.props.value})
  }
  componentWillReceiveProps(props) {
    this.setState({value: props.value})
  }
  render() {
    var {label, type, defaultValue, placeholder, postfix, prefix, name, className, errors, description, preview, hideField, maxLength, onBlur, min, max} = this.props;
    var {value} = this.state;

    if(prefix){
      var prefixField = <span className="wfui-input-field__prefix">{prefix}</span>
    }
    if(postfix){
      var postfixField = <span className="wfui-input-field__postfix">{postfix}</span>
    }
    //check error flag
    var errorClassName = '';
    if(errors) {
      errorClassName += ' wfui-input-field__input--theme-error';
    }
    var inputFieldElement = hideField ? "" :
          <span>
            {prefixField}
              <input className={"wfui-input-field__input"+ errorClassName} type={type} defaultValue={defaultValue} value={value} placeholder={placeholder} name={name} onChange={this.onHandleChange.bind(this)} onClick={this.onHandleClick.bind(this)} onBlur={onBlur} disabled={preview} maxLength={maxLength} min={min} max={max} />
              {postfixField}
          </span>;
    return (
      <div className={"wfui-input-field"}>
        {description}
        <div className={"wfui-input-field--"+ type + ' ' + className}>
            <label className="wfui-input-field__label">{label}</label>
            {inputFieldElement}
        </div>
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
  errors: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.bool
  ]),
  stopPropagation: React.PropTypes.bool
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
  errors: '',
  stopPropagation: false
}

export default InputField
