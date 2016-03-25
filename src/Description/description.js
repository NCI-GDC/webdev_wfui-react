import React, { Component } from 'react';

/**
 * Description
 */
class Description extends Component {
  render() {
    var {content, classNames} = this.props;
    
    if (typeof(content) == 'string') {
      return (
        <div className={"wfui-description-field " + classNames} dangerouslySetInnerHTML={{__html: content}} >
        </div>
      );
    }
    else {// (typeof(content) == 'object')
      return (
        <div className={"wfui-description-field " + classNames}>
          {content}
        </div>
      );
    }

  }
}

/**
 * Property types
 */
Description.propTypes = {
  content: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element,
  ]),
  classNames: React.PropTypes.string,
}
Description.defaultProps = {
  content: '',
  classNames: '',
}

export default Description