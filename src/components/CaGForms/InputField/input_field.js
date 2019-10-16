import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Input field
 */
class InputField extends Component {
  constructor(){
    super();
    this.state={value:""}
  }
  onHandleBlur(e){
    const {onBlur, onHandleChange, preview, type, min, max} = this.props;
    var val = e.target.value;
    // if(type == "number"){
    //   val = (typeof min != "undefined") ? Math.max(min, Number(val)) : Number(val);
    //   val = (typeof max != "undefined") ? Math.min(max, Number(val)) : Number(val);
    // }
    this.setState({value: val})
    if(onHandleChange && !preview){
      onHandleChange(e, val);
    }
    if(onBlur){
      onBlur(e, val);
    }
  }
  onHandleFocus(e){
    const {onHandleFocus} = this.props;
    if(onHandleFocus){
      onHandleFocus(e);
    }
  }
  onHandleClick(e){
    const {stopPropagation} = this.props;
    if(stopPropagation) e.stopPropagation();
  }
  onHandleChange(e){
    var val = e.target.value;
    
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
              <input className={"wfui-input-field__input"+ errorClassName} type={type} defaultValue={defaultValue} value={value} placeholder={placeholder} name={name} onChange={this.onHandleChange.bind(this)} onClick={this.onHandleClick.bind(this)} onBlur={this.onHandleBlur.bind(this)} disabled={preview} maxLength={maxLength} min={min} max={max} />
              {postfixField}
          </span>;
    return (
      <div className={"wfui-input-field"}>
        {description}
        <div className={"wfui-input-field--"+ type + ' ' + className}>
            <label className="wfui-input-field__label" dangerouslySetInnerHTML={{__html: label.replace(/\n/g, "<br/>") }}></label>
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
  label: PropTypes.string,
  type: PropTypes.oneOf(['text','number','email']),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  postfix: PropTypes.string,
  prefix: PropTypes.string,
  className: PropTypes.string,
  errors: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  stopPropagation: PropTypes.bool
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
