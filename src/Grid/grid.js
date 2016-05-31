import React, { Component } from 'react';

/**
 * Grid
 */
class Grid extends Component {
  render() {
    var {label, description, children, columnNumber, errors} = this.props;
    var last = children.length -(children.length%columnNumber);

    //check error flag for default
    var errorClassName = "";
    if(errors) {
      errorClassName = 'wfui-grid__main--error';
    }
    
    //Render rows and columns ( except last row if number of columns is different from columnNumber)
    //==========
    var grid, grid_rows = [[]], index = 0;
    children.map(function(child, i){
      if(i < last){
        if(i!=0 && i%columnNumber==0){ grid_rows[++index] = []; }
        grid_rows[index].push(child);
      }
    })
    grid = (
      <div className={"wfui-grid__container"}>
        {grid_rows.map(function(row, i){
          return (
            <div className="wfui-grid__row" key={i}>
            {row.map(function(child, j){
              let className = "wfui-grid__column wfui-grid--col-"+columnNumber;
              return <div className={className} key={j}>{child}</div>
            })}
            </div>
          );
        })}
      </div>
    )//==========

    //Render last row (in case last row has different number of columns)
    var grid_last, grid_rows_last = [];
    children.map(function(child, i){
      if(i >= last){
        grid_rows_last.push(child);
      }
    })
    grid_last = (
      <div className={"wfui-grid__container wfui-grid__container--last"}>
        <div className="wfui-grid__row">
          {grid_rows_last.map(function(child, i){
            let className = "wfui-grid__column wfui-grid--col-"+grid_rows_last.length;
            return <div className={className} key={i}>{child}</div>
          })}
        </div>
      </div>
    )//==========

    return (
      <div className="wfui-grid">
          <label className="wfui-grid__label">{label}</label>
          <div className="wfui-grid__description">{description}</div>
          <div className={"wfui-grid__main "+errorClassName}>
            {grid}
            {grid_last}
          </div>
      </div>
    )
  }
}

/**
 * Property types
 */
Grid.propTypes = {
  label: React.PropTypes.string,
  description: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element,
  ]),
  columnNumber: React.PropTypes.number,
  errors: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.bool
  ])
}
Grid.defaultProps = {
  label: '',
  description: '',
  columnNumber: 1,
  errors: '',
}

export default Grid