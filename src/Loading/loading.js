import React, { Component } from 'react';

class Loading extends Component {
  render() {
    const {width, height, type, color} = this.props;
    return (
        <div className={"wfui-loading wfui-loading__type-"+type} style={{color, width, height}}>
            <p><i className="fa fa-spinner fa-spin"></i></p>
        </div>
    );
  }
}
Loading.defaultProps = {
  type: 'fixed',
  color: '#000000',
  width: 'auto',
  height: 'auto'
}

export default Loading 