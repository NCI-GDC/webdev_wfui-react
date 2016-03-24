import React, { Component } from 'react';

/**
 * ListboxOption
 */
class ListboxOption extends Component {
  render() {
    var {value} = this.props;

    return (
      <option value={value}>
        {value}
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
}
ListboxOption.defaultProps = {
  value: '',
}

export default ListboxOption