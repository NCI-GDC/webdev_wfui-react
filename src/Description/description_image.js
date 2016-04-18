import React, { Component } from 'react';

/**
 * Description
 */
class Description extends Component {
  constructor() {
    super();
    this.state = {
      descriptionImagePopUp: false,
    }
    this._onClickToggleViewImage = this._onClickToggleViewImage.bind(this);
    this._onClickCloseViewImage = this._onClickCloseViewImage.bind(this);
  }
  _onClickToggleViewImage(e) {
    if(this.state.descriptionImagePopUp) {
      this.setState({descriptionImagePopUp: false});
    }
    else {
      this.setState({descriptionImagePopUp: true});
    }
  }
  _onClickCloseViewImage(e) {
    this.setState({
      descriptionImagePopUp: false,
    })
  }

  render() {
    var {content, type, imageSrc, imageDescription, classNames} = this.props;
    

  }
}

/**
 * Property types
 */
Description.propTypes = {
  imageSrc: React.PropTypes.string,
}
Description.defaultProps = {
  imageSrc: '',
}

export default DescriptionImage