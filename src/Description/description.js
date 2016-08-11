import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * Description
 */
class Description extends Component {
  constructor() {
    super();
    this.state = {
      descriptionImagePopUpIsOpen: false,
      imgWidth: 0,
      imgHeight: 0,
    }
    this._onClickToggleViewImage = this._onClickToggleViewImage.bind(this);
    this._onClickCloseViewImage = this._onClickCloseViewImage.bind(this);
  }
  _onClickToggleViewImage(e) {
    if(this.state.descriptionImagePopUpIsOpen) {
      this._onClickCloseViewImage;
    }
    else {
      this.setState({ descriptionImagePopUpIsOpen: true });
      document.body.appendChild(this.PORTAL);
      ReactDOM.render(this.portalContent, this.PORTAL);
    }
  }
  _onClickCloseViewImage(e) {
    this.setState({ descriptionImagePopUpIsOpen: false })
    var portalNode = document.getElementById("descriptionImagePortalId");
    document.body.removeChild(portalNode);
  }
  componentDidMount(){
    const {src} = this.props;
    if(src){
      var img = new Image();
      img.src = src;
      img.onload = (e)=>{

        this.setState({
          imgWidth: e.target.width,
          imgHeight: e.target.height
        });
      }
    }
  }
  render() {
    var {src, imageTitle, content, type, classNames, errors} = this.props;
    var {imgWidth, imgHeight} = this.state;
    if (!content && !src){
      return <noscript />
    }

    var image_config = {
      onClick: this._onClickToggleViewImage,
    };
    
    //check error flag
    var errorClassName = '';
    if(errors) {
      errorClassName += ' wfui-description--theme-error';
    }

    var containerClassName = "wfui-description wfui-description--" + type + errorClassName + " " + classNames;

    
    //based off of adding the dialog to the <body> tag,
    //we remove/add the content directly instead of toggling --theme-visible.
    var imageDialogClassName = "wfui-description__imageDialog--theme-visible";
    var imageDialogOverlayClassName ="wfui-description__imageDialogOverlay--theme-visible";

    //if imageSrc is passed, setup all image content and dialog
    if (src) {
      var imageContent = (
        <div className="wfui-description__imageContainer__imageGroup" {...image_config}>
          <i className="fa fa-search-plus fa-2x wfui-description__imageContainer__imageGroup__enlargerIcon"></i>
          <img className="wfui-description__imageContainer__imageGroup__image" src={src} />
        </div>
      );
      var imageDialogContent = (
        <div className="wfui-description__imageDialog" onClick={this._onClickCloseViewImage}>
          <div className={imageDialogClassName} onClick={(e)=>{e.stopPropagation()}}>
            <span onClick={this._onClickCloseViewImage} className="wfui-description__imageDialog__closeButton">
              <i className="fa fa-times"></i>
            </span>
            <div className="wfui-description__imageDialog__body">
              <img className="wfui-description__imageDialog__body__image" src={src} width={imgWidth} height={imgHeight} />
            </div>
            {imageTitle?<div className="wfui-description__imageDialog__footer"><span>{imageTitle}</span></div>:""}
          </div>
        </div>
      );

      //content to be rendered for the dialog and overlay/blanket
      this.portalContent = (
        <div>
          {imageDialogContent}
          <div onClick={this._onClickCloseViewImage} className={imageDialogOverlayClassName}>
          </div>
        </div>
      );

      //create div node for where the dialog will be
      this.PORTAL = document.createElement('div');
      //add appropriate id so we can track it
      this.PORTAL.setAttribute("id", "descriptionImagePortalId");
    }/* END IF IMAGESRC ====== */

    //RENDER
    if (typeof(content) == 'string' && !src) {

      return (
        <div className={containerClassName} dangerouslySetInnerHTML={{__html: content.replace(/\n/g, "<br/>") }} >
        </div>
      );
    }
    else if (typeof(content) == 'string' && src) {
      return (
        <div className={containerClassName} >
          <div className="wfui-description__textContainer" dangerouslySetInnerHTML={{__html: content.replace(/\n/g, "<br/>") }} >
          </div>
          <div className="wfui-description__imageContainer">
            {imageContent}
          </div>
        </div>
      );
    }
    else if (typeof(content) == 'object' && src) {
      return (
        <div className={containerClassName} >
          <div className="wfui-description__textContainer">
            {content}
          </div>
          <div className="wfui-description__imageContainer">
            {imageContent}
          </div>
        </div>
      );
    }
    else {//typeof(content)==object && !src
      return (
        <div className={containerClassName} >
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
  errors: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.bool
  ]),
}
Description.defaultProps = {
  content: '',
  type: 'theme-grey',
  classNames: '',
  errors: '',
}

export default Description
