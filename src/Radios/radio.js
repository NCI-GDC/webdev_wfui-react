import React, { Component } from 'react';

/**
 * Radio
 */
class Radio extends Component {
  render() {
    var {label, name, value, checked} = this.props;

    return (
      <div className="">
        <label>
          <input type="radio" name={name} value={value} checked={checked} />
          {label}
        </label>
      </div>
    )
  }
}

/**
 * Property types
 */
Radio.propTypes = {
  label: React.PropTypes.string,
  name: React.PropTypes.string,
  value: React.PropTypes.string,
  checked: React.PropTypes.bool
}
Radio.defaultProps = {
  label: '',
  name: '',
  value: '',
  checked: false
}

export default Radio