import React, { Component } from 'react';

/**
 * Input table
 */
class InputTable extends Component {
  constructor() {
    super();
    this.state = {
      refs: '',
    }
    this._onClickValidateOrAnd = this._onClickValidateOrAnd.bind(this);
  }
  _onClickValidateOrAnd(e) {
    //if there are no children then this function is not executed.
    /*
    this.setState({ refs: this.refs['allInputs'] });
    console.log(this.state.refs);
    console.log(this);
    console.log(this.numOfInputs);
    for (var i = 0; i < this.numOfInputs; i++) {
      console.log("child of <ul> ref #"+i, this.state.refs.children[i].children[0].children[1].value);
    };
    */
  }
  render() {
    var {label, fieldLabel, fieldType, description, children} = this.props;

    //Get the number of inputs
    this.numOfInputs = children.length;
    
    //Render input fields
    //==========
    var fields;
    if(children){
      fields = (
        <div className="wfui-input-table__form">
          <p className="wfui-input-table__label">{fieldLabel}</p>
          <ul className="wfui-input-table__ul" ref="allInputs">
            {children.map(function(field, i){
              if(children.length-1 > i){
                var condition = <span className="wfui-input-table__condition">{fieldType.toUpperCase()}</span>;
              }
              return <li key={i} className="wfui-input-table__li" ref="hello" >{field}{condition}</li>;
              this.numOfInputs = children.length;
            })}
          </ul>
        </div>
      )
    }//==========

    return (
      <div className="wfui-input-table" onClick={this._onClickValidateOrAnd}>
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