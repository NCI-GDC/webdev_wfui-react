import React, { Component } from 'react';

/**
 * Input table
 */
class Radios extends Component {
  render() {
    var {label, description, children} = this.props;

    return (
      <div className="wfui-input-radios">
          <label>{label}</label>
          {description}
          {children}
      </div>
    )
  }
}

/**
 * Property types
 */
Radios.propTypes = {
  label: React.PropTypes.string,
  description: React.PropTypes.element,
}
Radios.defaultProps = {
  label: '',
  description: ''
}

export default Radios