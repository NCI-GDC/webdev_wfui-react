function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
/**
 * Description
 */

var Description =
/*#__PURE__*/
function (_Component) {
  _inherits(Description, _Component);

  function Description() {
    var _this;

    _classCallCheck(this, Description);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Description).call(this));
    _this.state = {
      descriptionImagePopUpIsOpen: false,
      imgWidth: 0,
      imgHeight: 0
    };
    _this._onClickToggleViewImage = _this._onClickToggleViewImage.bind(_assertThisInitialized(_this));
    _this._onClickCloseViewImage = _this._onClickCloseViewImage.bind(_assertThisInitialized(_this));
    _this.onESCKeyup = _this.onESCKeyup.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Description, [{
    key: "_onClickToggleViewImage",
    value: function _onClickToggleViewImage(e) {
      if (this.state.descriptionImagePopUpIsOpen) {
        this._onClickCloseViewImage();
      } else {
        this.setState({
          descriptionImagePopUpIsOpen: true
        });
        document.body.appendChild(this.PORTAL);
        ReactDOM.render(this.portalContent, this.PORTAL);
      }
    }
  }, {
    key: "_onClickCloseViewImage",
    value: function _onClickCloseViewImage(e) {
      this.setState({
        descriptionImagePopUpIsOpen: false
      });
      var portalNode = document.getElementById('descriptionImagePortalId');
      document.body.removeChild(portalNode);
    }
  }, {
    key: "onESCKeyup",
    value: function onESCKeyup(e) {
      if (e.keyCode == 27 && this.state.descriptionImagePopUpIsOpen) {
        this._onClickCloseViewImage();
      }
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this2 = this;

      var _this$props = this.props,
          src = _this$props.src,
          maxImageWidth = _this$props.maxImageWidth,
          maxImageHeight = _this$props.maxImageHeight;

      if (src) {
        var img = new Image();
        img.src = src;

        img.onload = function (e) {
          if (e.target.width > maxImageWidth) {
            _this2.setState({
              imgWidth: maxImageWidth,
              imgHeight: 'auto'
            });
          } else if (e.target.height > maxImageHeight) {
            _this2.setState({
              imgWidth: 'auto',
              imgHeight: maxImageHeight
            });
          } else {
            _this2.setState({
              imgWidth: e.target.width,
              imgHeight: e.target.height
            });
          }
        };
      }

      document.addEventListener('keyup', this.onESCKeyup);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('keyup', this.onESCKeyup);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          src = _this$props2.src,
          imageTitle = _this$props2.imageTitle,
          content = _this$props2.content,
          type = _this$props2.type,
          classNames = _this$props2.classNames,
          errors = _this$props2.errors;
      var _this$state = this.state,
          imgWidth = _this$state.imgWidth,
          imgHeight = _this$state.imgHeight;

      if (!content && !src) {
        return React.createElement("noscript", null);
      }

      var image_config = {
        onClick: this._onClickToggleViewImage
      }; // check error flag

      var errorClassName = '';

      if (errors) {
        errorClassName += ' wfui-description--theme-error';
      }

      var containerClassName = "wfui-description ".concat(classNames).concat(errorClassName, " ").concat(type ? "wfui-description--".concat(type) : ''); // based off of adding the dialog to the <body> tag,
      // we remove/add the content directly instead of toggling --theme-visible.

      var imageDialogClassName = 'wfui-description__imageDialog--theme-visible';
      var imageDialogOverlayClassName = 'wfui-description__imageDialogOverlay--theme-visible'; // if imageSrc is passed, setup all image content and dialog

      if (src) {
        var imageContent = React.createElement("div", _extends({
          className: "wfui-description__imageContainer__imageGroup"
        }, image_config), React.createElement("i", {
          className: "fa fa-search-plus fa-2x wfui-description__imageContainer__imageGroup__enlargerIcon"
        }), React.createElement("img", {
          className: "wfui-description__imageContainer__imageGroup__image",
          src: src
        }));
        var imageDialogContent = React.createElement("div", {
          className: "wfui-description__imageDialog",
          onClick: this._onClickCloseViewImage
        }, React.createElement("div", {
          className: imageDialogClassName,
          onClick: function onClick(e) {
            e.stopPropagation();
          }
        }, React.createElement("span", {
          onClick: this._onClickCloseViewImage,
          className: "wfui-description__imageDialog__closeButton"
        }, React.createElement("i", {
          className: "fa fa-times"
        })), React.createElement("div", {
          className: "wfui-description__imageDialog__body"
        }, React.createElement("img", {
          className: "wfui-description__imageDialog__body__image",
          src: src,
          width: imgWidth,
          height: imgHeight
        })), imageTitle ? React.createElement("div", {
          className: "wfui-description__imageDialog__footer"
        }, React.createElement("span", null, imageTitle)) : '')); // content to be rendered for the dialog and overlay/blanket

        this.portalContent = React.createElement("div", null, imageDialogContent, React.createElement("div", {
          onClick: this._onClickCloseViewImage,
          className: imageDialogOverlayClassName
        })); // create div node for where the dialog will be

        this.PORTAL = document.createElement('div'); // add appropriate id so we can track it

        this.PORTAL.setAttribute('id', 'descriptionImagePortalId');
      }
      /* END IF IMAGESRC ====== */
      // RENDER


      if (typeof content === 'string' && !src) {
        return React.createElement("div", {
          className: containerClassName,
          dangerouslySetInnerHTML: {
            __html: content.replace(/\n/g, '<br/>')
          }
        });
      }

      if (typeof content === 'string' && src) {
        return React.createElement("div", {
          className: containerClassName
        }, React.createElement("div", {
          className: "wfui-description__textContainer",
          dangerouslySetInnerHTML: {
            __html: content.replace(/\n/g, '<br/>')
          }
        }), React.createElement("div", {
          className: "wfui-description__imageContainer"
        }, imageContent));
      }

      if (_typeof(content) === 'object' && src) {
        return React.createElement("div", {
          className: containerClassName
        }, React.createElement("div", {
          className: "wfui-description__textContainer"
        }, content), React.createElement("div", {
          className: "wfui-description__imageContainer"
        }, imageContent));
      } // typeof(content)==object && !src


      return React.createElement("div", {
        className: containerClassName
      }, content);
    }
  }]);

  return Description;
}(Component);
/**
 * Property types
 */


Description.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  type: PropTypes.string,
  classNames: PropTypes.string,
  errors: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  maxImageWidth: PropTypes.number,
  maxImageHeight: PropTypes.number
};
Description.defaultProps = {
  content: '',
  type: '',
  classNames: '',
  errors: '',
  maxImageWidth: 800,
  maxImageHeight: 400
};
export default Description;