import React, { Component } from 'react';

/**
 * Listbox
 */
class Listbox extends Component {
  onHandleChange(e){
    if(this.props.onHandleChange){
      this.props.onHandleChange(e);
    }
  }
  render() {
    var {label, placeholder, defaultOption, children, description, errors, value} = this.props;

    var options = [];
    children.map(function(list_box_option, i) {
      options.push(list_box_option);
    });

    var placeholder_option = placeholder ? <option value="">{placeholder}</option> : null; 

    //check error flag
    var errorClassName = '';
    if(errors) {
      errorClassName += ' wfui-list-box--theme-error';
    }

    return (
      <div className={"wfui-list-box"}>
       	{description}
	    <div className={"wfui-list-box-fields"}>
		  <label>{label}</label>
          <select className={errorClassName} defaultValue={defaultOption} value={value} onChange={this.onHandleChange.bind(this)}>
      	    {placeholder_option}
       	    {options}
          </select>
        </div>
      </div>
    )
  }
}

/**
 * Property types
 */
Listbox.propTypes = {
  label: React.PropTypes.string,
  placeholder: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  defaultOption: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  description: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
  ]),
  errors: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.bool
  ]),
}
Listbox.defaultProps = {
  label: '',
  placeholder: '',
  defaultOption: '',
  description: '',
  children: [],
  errors: '',
}

export default Listbox
