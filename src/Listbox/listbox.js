import React, { Component } from 'react';

/**
 * Listbox
 */
class Listbox extends Component {
  render() {
    var {label, placeholder, defaultOption, children} = this.props;

    var options = [];
    children.map(function(list_box_option, i) {
      options.push(list_box_option);
    });

    var placeholder_option = placeholder ? <option value="">{placeholder}</option> : ''; 


    return (
      <div>

        <label>{label}</label>

        <select defaultValue={defaultOption}>
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
}
Listbox.defaultProps = {
  label: '',
  placeholder: '',
  defaultOption: '',
}

export default Listbox