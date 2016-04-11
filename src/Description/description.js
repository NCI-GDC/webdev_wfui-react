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
    let image_config = {
      onClick: this._onClickToggleViewImage,
    };
    var {content, type, imageSrc, imageDescription, classNames} = this.props;
    var containerClassName = "wfui-description wfui-description--" + type + " " + classNames;
    
    //check if pop-up image needs to be rendered
    var imageDialogClassName = "wfui-description__imageDialog";
    var imageDialogOverlayClassName ="wfui-description__imageDialogOverlay";
    if (this.state.descriptionImagePopUp) {
      imageDialogClassName += "--theme-visible";
      imageDialogOverlayClassName += "--theme-visible";
    }
    if (imageSrc) {
      var imageContent = <img {...image_config} className="wfui-description__imageContainer__image" src={imageSrc} />;
      var imageDialogContent = (
        <div className={imageDialogClassName}>
          <span onClick={this._onClickCloseViewImage} className="wfui-description__imageDialog__closeButton">x</span>
          <div className="wfui-description__imageDialog__body">
            <img className="wfui-description__imageDialog__body__image" src={imageSrc} />
          </div>
          <div className="wfui-description__imageDialog__footer">
            <span>{imageDescription}</span>
          </div>
        </div>
      );
    }





    if (typeof(content) == 'string') {
      return (
        <div className={containerClassName} dangerouslySetInnerHTML={{__html: content}} >
        </div>
      );
    }
    else if (typeof(content) == 'string' && imageSrc) {
      return (
        <div className={containerClassName} >
          <div className="wfui-description__textContainer" dangerouslySetInnerHTML={{__html: content}} >
          </div>
          <div className="wfui-description__imageContainer">
            {imageContent}
          </div>
          {imageDialogContent}
          <div onClick={this._onClickCloseViewImage} className={imageDialogOverlayClassName}>
          </div>

        </div>
      );
    }
    else if (typeof(content) != 'string' && imageSrc) {
      return (
        <div className={containerClassName}>
          <div className="wfui-description__textContainer">
            {content}
          </div>
          <div className="wfui-description__imageContainer">
            {imageContent}
          </div>
          {imageDialogContent}
          <div onClick={this._onClickCloseViewImage} className={imageDialogOverlayClassName}>
          </div>
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
  imageSrc: React.PropTypes.string,
  imageDescription: React.PropTypes.string,
}
Description.defaultProps = {
  content: '',
  type: '',
  classNames: '',
  imageSrc: '',
  imageDescription: '',
}

export default Description