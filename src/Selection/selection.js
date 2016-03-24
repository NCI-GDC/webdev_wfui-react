import React, { Component } from 'react';

/**
 * Selection
 */
class Selection extends Component {
  
  /**
   * onHandleClick will check the radio if user focus on children elements (especially for input field)
   * @param  {event} e
   */
  onHandleClick(e) {
    var {type} = this.props;
    if(type=="radio"){
      this.refs.radio.checked = true;
    }else{
      this.refs.radio.checked = !this.refs.radio.checked;
    }
  }
  render() {
    var {label, name, value, defaultChecked, children, type} = this.props;
    var className = "wfui-selection__input-"+type;
    return (
      <div className="wfui-selection">
        <label className="wfui-selection__label" onClick={this.onHandleClick.bind(this)}>
          <input className={className} ref="radio" type={type} name={name} value={value} defaultChecked={defaultChecked} />
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
Selection.propTypes = {
  label: React.PropTypes.string,
  name: React.PropTypes.string,
  value: React.PropTypes.string,
  type: React.PropTypes.oneOf(['radio','checkbox']),
  defaultChecked: React.PropTypes.bool
}
Selection.defaultProps = {
  label: '',
  name: '',
  value: '',
  type: 'radio',
  defaultChecked: false,
}

export default Selection