import React, { Component } from 'react';

/**
 * Input table
 */
class InputTable extends Component {
  render() {
    const that = this;
    if(this.props.fields){
      var fields = (
        <ul>
          {this.props.fields.map(function(field, i){
            if(that.props.fields.length-1 > i){
              var condition = <span>{that.props.fieldType}</span>
            }
            return <li key={i}>{field}{condition}</li>
          })}
        </ul>
      )
    }
    return (
      <div className="wfui-input-table">
          <label>{this.props.label}</label>
          {this.props.description}
          <div className="wfui-input-table__form">
            <p>{this.props.fieldLabel}</p>
            {fields}
          </div>
      </div>
    )
  }
}

/**
 * Property types
 */
InputTable.propTypes = {
  fieldType: React.PropTypes.oneOf(['and','or']),
}
InputTable.defaultProps = {
  fieldType: 'and'
}

export default InputTable