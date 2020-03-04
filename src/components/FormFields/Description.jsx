import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
        };
        this._onClickToggleViewImage = this._onClickToggleViewImage.bind(this);
        this._onClickCloseViewImage = this._onClickCloseViewImage.bind(this);
        this.onESCKeyup = this.onESCKeyup.bind(this);
    }

    _onClickToggleViewImage(e) {
        if (this.state.descriptionImagePopUpIsOpen) {
            this._onClickCloseViewImage();
        } else {
            this.setState({ descriptionImagePopUpIsOpen: true });
            document.body.appendChild(this.PORTAL);
            ReactDOM.render(this.portalContent, this.PORTAL);
        }
    }

    _onClickCloseViewImage(e) {
        this.setState({ descriptionImagePopUpIsOpen: false });
        const portalNode = document.getElementById('descriptionImagePortalId');
        document.body.removeChild(portalNode);
    }

    onESCKeyup(e) {
        if (e.keyCode == 27 && this.state.descriptionImagePopUpIsOpen) {
            this._onClickCloseViewImage();
        }
    }

    componentWillMount() {
        const { src, maxImageWidth, maxImageHeight } = this.props;
        if (src) {
            const img = new Image();
            img.src = src;
            img.onload = e => {
                const imgWidth = e.target.width;
                const imgHeight = e.target.height;
                const maxWidth = Math.min(
                    maxImageWidth,
                    window.innerWidth * 0.8
                );
                const maxHeight = Math.min(
                    maxImageHeight,
                    window.innerHeight * 0.8
                );

                if (imgWidth > maxWidth && imgHeight > maxHeight) {
                    const widthRatio = maxWidth / imgWidth;
                    const heightRatio = maxHeight / imgHeight;
                    if (widthRatio < heightRatio) {
                        this.setState({
                            imgWidth: maxWidth,
                            imgHeight: 'auto',
                        });
                    } else {
                        this.setState({
                            imgWidth: 'auto',
                            imgHeight: maxHeight,
                        });
                    }
                } else if (imgWidth > maxWidth) {
                    this.setState({
                        imgWidth: maxWidth,
                        imgHeight: 'auto',
                    });
                } else if (imgHeight > maxHeight) {
                    this.setState({
                        imgWidth: 'auto',
                        imgHeight: maxHeight,
                    });
                } else {
                    this.setState({
                        imgWidth: imgWidth,
                        imgHeight: imgHeight,
                    });
                }
            };
        }
        document.addEventListener('keyup', this.onESCKeyup);
    }

    componentWillUnmount() {
        document.removeEventListener('keyup', this.onESCKeyup);
    }

    render() {
        const {
            src,
            imageTitle,
            content,
            type,
            classNames,
            errors,
        } = this.props;
        const { imgWidth, imgHeight } = this.state;
        if (!content && !src) {
            return <noscript />;
        }

        const image_config = {
            onClick: this._onClickToggleViewImage,
        };

        // check error flag
        let errorClassName = '';
        if (errors) {
            errorClassName += ' wfui-description--theme-error';
        }

        const containerClassName = `wfui-description ${classNames}${errorClassName} ${
            type ? `wfui-description--${type}` : ''
        }`;

        // based off of adding the dialog to the <body> tag,
        // we remove/add the content directly instead of toggling --theme-visible.
        const imageDialogClassName =
            'wfui-description__imageDialog--theme-visible';
        const imageDialogOverlayClassName =
            'wfui-description__imageDialogOverlay--theme-visible';

        // if imageSrc is passed, setup all image content and dialog
        if (src) {
            var imageContent = (
                <div
                    className="wfui-description__imageContainer__imageGroup"
                    {...image_config}
                >
                    <i className="fa fa-search-plus fa-2x wfui-description__imageContainer__imageGroup__enlargerIcon" />
                    <img
                        className="wfui-description__imageContainer__imageGroup__image"
                        src={src}
                    />
                </div>
            );
            const imageDialogContent = (
                <div
                    className="wfui-description__imageDialog"
                    onClick={this._onClickCloseViewImage}
                >
                    <div
                        className={imageDialogClassName}
                        onClick={e => {
                            e.stopPropagation();
                        }}
                    >
                        <span
                            onClick={this._onClickCloseViewImage}
                            className="wfui-description__imageDialog__closeButton"
                        >
                            <i className="fa fa-times" />
                        </span>
                        <div className="wfui-description__imageDialog__body">
                            <img
                                className="wfui-description__imageDialog__body__image"
                                src={src}
                                width={imgWidth}
                                height={imgHeight}
                            />
                        </div>
                        {imageTitle ? (
                            <div className="wfui-description__imageDialog__footer">
                                <span>{imageTitle}</span>
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            );

            // content to be rendered for the dialog and overlay/blanket
            this.portalContent = (
                <div>
                    {imageDialogContent}
                    <div
                        onClick={this._onClickCloseViewImage}
                        className={imageDialogOverlayClassName}
                    />
                </div>
            );

            // create div node for where the dialog will be
            this.PORTAL = document.createElement('div');
            // add appropriate id so we can track it
            this.PORTAL.setAttribute('id', 'descriptionImagePortalId');
        } /* END IF IMAGESRC ====== */

        // RENDER
        if (typeof content === 'string' && !src) {
            return (
                <div
                    className={containerClassName}
                    dangerouslySetInnerHTML={{
                        __html: content.replace(/\n/g, '<br/>'),
                    }}
                />
            );
        }
        if (typeof content === 'string' && src) {
            return (
                <div className={containerClassName}>
                    <div
                        className="wfui-description__textContainer"
                        dangerouslySetInnerHTML={{
                            __html: content.replace(/\n/g, '<br/>'),
                        }}
                    />
                    <div className="wfui-description__imageContainer">
                        {imageContent}
                    </div>
                </div>
            );
        }
        if (typeof content === 'object' && src) {
            return (
                <div className={containerClassName}>
                    <div className="wfui-description__textContainer">
                        {content}
                    </div>
                    <div className="wfui-description__imageContainer">
                        {imageContent}
                    </div>
                </div>
            );
        }
        // typeof(content)==object && !src
        return <div className={containerClassName}>{content}</div>;
    }
}

/**
 * Property types
 */
Description.propTypes = {
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    type: PropTypes.string,
    classNames: PropTypes.string,
    errors: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
    ]),
    maxImageWidth: PropTypes.number,
    maxImageHeight: PropTypes.number,
};

Description.defaultProps = {
    content: '',
    type: '',
    classNames: '',
    errors: '',
    maxImageWidth: 800,
    maxImageHeight: 800,
};

export default Description;
