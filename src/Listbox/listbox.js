import React, { Component } from 'react';

/**
 * Listbox
 */
class Listbox extends Component {
  render() {
    var {label, placeholder, defaultOption, children, description, errors} = this.props;

    var options = [];
    children.map(function(list_box_option, i) {
      options.push(list_box_option);
    });

    var placeholder_option = placeholder ? <option value="">{placeholder}</option> : null; 

    //check error flag
    var errorClassName = '';
    if(errors) {
      errorClassName += ' error';
    }

    return (
      <div className={"wfui-list-box"}>
        <label>{label}</label>
        {description}
        <select className={errorClassName} defaultValue={defaultOption}>
          {placeholder_option}
          {options}
        </select>
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