import React, { Component } from 'react';

/**
 * Description
 */
class Description extends Component {
  render() {
    var {content, type} = this.props;
    
    return (
      <div className={"wfui-description-field wfui-description-field--"+ type} dangerouslySetInnerHTML={{__html: content}} >
      </div>
    )
  }
}

/**
 * Property types
 */
Description.propTypes = {
  content: React.PropTypes.string,
  type: React.PropTypes.string,
}
Description.defaultProps = {
  content: '',
  type: '',
}

export default Description