import React, { Component } from 'react';

/**
 * Description
 */
class Description extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: true,
    }
    this.portal = (
      <div>
        /*this is the actual dialog*/
        <div className="wfui-description__imageDialog--theme-visible">
          <span onClick={this._onClickCloseViewImage} className="wfui-description__imageDialog__closeButton">
            <i className="fa fa-times"></i>
          </span>
          <div className="wfui-description__imageDialog__body">
            <img className="wfui-description__imageDialog__body__image" src={imageSrc} />
          </div>
          <div className="wfui-description__imageDialog__footer">
            <span>{imageDescription}</span>
          </div>
        </div>
        /*this is the overlay*/
        <div onClick={this._onClickCloseViewImage} className="wfui-description__imageDialogOverlay--theme-visible">
        </div>
      </div>  
    );

    if(this.state.isOpen) {
      document.body.appendChild(this.state.imagePortal);
    }

  }

  _onClickCloseViewImage(e) {
    this.setState({ isOpen: false });
    document.body.removeChild(this.state.imagePortal);
  }

  _onRenderTogglePortal(e) {

  }

  render() {

    return null;

    

  }
}

/**
 * Property types
 */
Description.propTypes = {
  imageSrc: React.PropTypes.string,
  imageDescription: React.PropTypes.string,
}
Description.defaultProps = {
  imageSrc: '',
  imageDescription: '',
}

export default DescriptionImagePortal