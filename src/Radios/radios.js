import React, { Component } from 'react';

/**
 * Radios
 */
class Radios extends Component {
  render() {
    var {label, description, children} = this.props;
    var className = "wfui-input-radios wfui-input-radios--col-" + this.props.columnNumber
    return (
      <div className={className}>
          <label className="wfui-input-radios__label">{label}</label>
          <div className="wfui-input-radios__description">{description}</div>
          <div className="wfui-input-radios__container">
            {children}
          </div>
      </div>
    )
  }
}

/**
 * Property types
 */
Radios.propTypes = {
  label: React.PropTypes.string,
  description: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element,
  ]),
  columnNumber: React.PropTypes.number
}
Radios.defaultProps = {
  label: '',
  description: '',
  columnNumber: 1
}

export default Radios