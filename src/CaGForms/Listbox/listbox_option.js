import React, { Component } from 'react';

/**
 * ListboxOption
 */
class ListboxOption extends Component {
  render() {
    var {value, label, className} = this.props;

    return (
      <option value={value} className={className}>
        {label}
      </option>
    );
  }
}

/**
 * Property types
 */
ListboxOption.propTypes = {
  value: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]),
  label: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]),
  className: React.PropTypes.string
}
ListboxOption.defaultProps = {
  value: '',
  label: '',
  className: ''
}

export default ListboxOption