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
    var {label, placeholder, defaultOption, children, description} = this.props;

    var options = [];
    children.map(function(list_box_option, i) {
      options.push(list_box_option);
    });

    var placeholder_option = placeholder ? <option value="">{placeholder}</option> : ''; 

    return (
      <div className={"wfui-list-box"}>
        <label>{label}</label>
        {description}
        <select defaultValue={defaultOption} onChange={this.onHandleChange.bind(this)}>
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
}
Listbox.defaultProps = {
  label: '',
  placeholder: '',
  defaultOption: '',
  description: '',
  children: [],
}

export default Listbox