import React, { Component } from 'react';

/**
 * Input table
 */
class InputTable extends Component {
  render() {
    var {label, fieldLabel, fieldType, description, children} = this.props;

    //Render input fields
    //==========
    var fields;
    if(children){
      fields = (
        <div className="wfui-input-table__form">
          <p>{fieldLabel}</p>
          <ul>
            {children.map(function(field, i){
              if(children.length-1 > i){
                var condition = <span>{fieldType.toUpperCase()}</span>
              }
              return <li key={i}>{field}{condition}</li>
            })}
          </ul>
        </div>
      )
    }//==========

    return (
      <div className="wfui-input-table">
          <label>{label}</label>
          {description}
          {fields}
      </div>
    )
  }
}

/**
 * Property types
 */
InputTable.propTypes = {
  label: React.PropTypes.string,
  fieldLabel: React.PropTypes.string,
  fieldType: React.PropTypes.oneOf(['and','or']),
  description: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element,
  ]),
}
InputTable.defaultProps = {
  label: '',
  fieldLabel: '',
  fieldType: 'and',
  description: ''
}

export default InputTable