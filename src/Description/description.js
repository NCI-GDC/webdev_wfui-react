import React, { Component } from 'react';

/**
 * Description
 */
class Description extends Component {
  render() {
    var {content, type, classNames} = this.props;
    var containerClassName = "wfui-description--" + type + " " + classNames;

    if (typeof(content) == 'string') {
      return (
        <div className={containerClassName} dangerouslySetInnerHTML={{__html: content}} >
        </div>
      );
    }
    else {// (typeof(content) == 'object')
      return (
        <div className={containerClassName}>
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
  type: React.PropTypes.string,
  classNames: React.PropTypes.string,
}
Description.defaultProps = {
  content: '',
  type: '',
  classNames: '',
}

export default Description