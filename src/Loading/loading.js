import React, { Component } from 'react';

class Loading extends Component {
  render() {
    const {width, height, type, color} = this.props;
    return (
        <div className={"wfui-loading wfui-loading__type-"+type} style={{ width: width ? width : "auto", height: height ? height : "auto"}}>
            <p><i className="fa fa-spinner fa-spin" style={{color}}></i></p>
        </div>
    );
  }
}
Loading.defaultProps = {
  type: 'fixed',
  color: '#000000',
}

export default Loading 