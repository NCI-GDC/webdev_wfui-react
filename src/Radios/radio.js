import React, { Component } from 'react';

/**
 * Radio
 */
class Radio extends Component {
  
  /**
   * onHandleClick will check the radio if user focus on children elements (especially for input field)
   * @param  {event} e
   */
  onHandleClick(e) {
      this.refs.radio.checked = true;
  }
  render() {
    var {label, name, value, defaultChecked, children} = this.props;
    
    return (
      <div className="wfui-input-radios__radio">
        <label onClick={this.onHandleClick.bind(this)}>
          <input ref="radio" type="radio" name={name} value={value} defaultChecked={defaultChecked} />
          {label}
          {children}
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
  defaultChecked: React.PropTypes.bool
}
Radio.defaultProps = {
  label: '',
  name: '',
  value: '',
  defaultChecked: false
}

export default Radio