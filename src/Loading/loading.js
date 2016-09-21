import React, { Component } from 'react';

class Loading extends Component {
  render() {
    const {width, height, type} = this.props;
    return (
        <div className={"wfui-loading wfui-loading__type-"+type}><i className="fa fa-spinner fa-spin"></i></div>
    );
  }
}
Loading.defaultProps = {
  type: 'fixed',
}

export default Loading 