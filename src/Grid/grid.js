import React, { Component } from 'react';

/**
 * Grid
 */
class Grid extends Component {
  render() {
    var {label, description, children, columnNumber} = this.props;
    var last = children.length -(children.length%columnNumber);
    
    //Render Columns
    //==========
    var grid, grid_rows = [[]], index = 0;
    children.map(function(child, i){
      if(i < last){
        if(i!=0 && i%columnNumber==0){ grid_rows[++index] = []; }
        grid_rows[index].push(child);
      }
    })
    grid = (
      <div className="wfui-input-grid__container">
        {grid_rows.map(function(row, i){
          return (
            <div className="wfui-input-grid__row" key={i}>
            {row.map(function(child, j){
              let className = "wfui-input-grid__column wfui-input-grid--col-"+columnNumber;
              return <div className={className} key={j}>{child}</div>
            })}
            </div>
          );
        })}
      </div>
    )//==========

    //Render Last Lines of Columns (in case last row has different number of columns)
    var grid_last, grid_rows_last = [];
    children.map(function(child, i){
      if(i >= last){
        grid_rows_last.push(child);
      }
    })
    grid_last = (
      <div className="wfui-input-grid__container">
        <div className="wfui-input-grid__row">
          {grid_rows_last.map(function(child, i){
            let className = "wfui-input-grid__column wfui-input-grid--col-"+grid_rows_last.length;
            return <div className={className} key={i}>{child}</div>
          })}
        </div>
      </div>
    )//==========

    return (
      <div className="wfui-input-grid">
          <label className="wfui-input-grid__label">{label}</label>
          <div className="wfui-input-grid__description">{description}</div>
          {grid}
          {grid_last}
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
  columnNumber: React.PropTypes.number
}
Grid.defaultProps = {
  label: '',
  description: '',
  columnNumber: 1
}

export default Grid