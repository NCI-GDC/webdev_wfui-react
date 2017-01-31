import React, { Component } from 'react';
import ReactDOM from 'react-dom'

/**
 * Selection
 */
class Selection extends Component {
  constructor(){
    super();
    this.onHandleClick = this.onHandleClick.bind(this);
  }
  onHandleClick(e) {
    
    if(e.target.id != 'ws-label'){

      var {type} = this.props;
      if(type=="radio"){
        this.refs.selection.checked = true;
      }

      //Pass data to a callback.
      if(this.props.onHandleChange){
        var res = {
          checked: this.refs.selection.checked,
          value: this.refs.selection.value,
          name: this.refs.selection.name
        }
        this.props.onHandleChange(res);
      }
      
    }
  }
  render() {
    const {label, name, value, defaultChecked, children, type, className, active} = this.props;
    let activeClassName = active ? " active" : "";

    return (
      <div className={`wfui-selection ${className} ${activeClassName}`}>
        <label id="ws-label" className="wfui-selection__label">
          <input id="ws-input" onClick={this.onHandleClick} className={"wfui-selection__input-"+type} ref="selection" data-ref="selection" type={type} name={name} value={value} defaultChecked={defaultChecked} />
          <span id="ws-label" onClick={(e)=>{ e.stopPropagation() }} >{label}</span>
          { children ? children : null }
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
  defaultChecked: React.PropTypes.bool,
  className: React.PropTypes.string,
  active: React.PropTypes.bool,
}
Selection.defaultProps = {
  label: '',
  name: '',
  value: '',
  type: 'radio',
  defaultChecked: false,
  className: '',
}

export default Selection