'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Description
 */
var Description = function (_Component) {
  _inherits(Description, _Component);

  function Description() {
    _classCallCheck(this, Description);

    var _this = _possibleConstructorReturn(this, (Description.__proto__ || Object.getPrototypeOf(Description)).call(this));

    _this.state = {
      descriptionImagePopUpIsOpen: false,
      imgWidth: 0,
      imgHeight: 0
    };
    _this._onClickToggleViewImage = _this._onClickToggleViewImage.bind(_this);
    _this._onClickCloseViewImage = _this._onClickCloseViewImage.bind(_this);
    return _this;
  }

  _createClass(Description, [{
    key: '_onClickToggleViewImage',
    value: function _onClickToggleViewImage(e) {
      if (this.state.descriptionImagePopUpIsOpen) {
        this._onClickCloseViewImage;
      } else {
        this.setState({ descriptionImagePopUpIsOpen: true });
        document.body.appendChild(this.PORTAL);
        _reactDom2.default.render(this.portalContent, this.PORTAL);
      }
    }
  }, {
    key: '_onClickCloseViewImage',
    value: function _onClickCloseViewImage(e) {
      this.setState({ descriptionImagePopUpIsOpen: false });
      var portalNode = document.getElementById("descriptionImagePortalId");
      document.body.removeChild(portalNode);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var src = this.props.src;

      if (src) {
        var img = new Image();
        img.src = src;
        img.onload = function (e) {

          _this2.setState({
            imgWidth: e.target.width,
            imgHeight: e.target.height
          });
        };
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var src = _props.src;
      var imageTitle = _props.imageTitle;
      var content = _props.content;
      var type = _props.type;
      var classNames = _props.classNames;
      var errors = _props.errors;
      var _state = this.state;
      var imgWidth = _state.imgWidth;
      var imgHeight = _state.imgHeight;

      if (!content && !src) {
        return _react2.default.createElement('noscript', null);
      }

      var image_config = {
        onClick: this._onClickToggleViewImage
      };

      //check error flag
      var errorClassName = '';
      if (errors) {
        errorClassName += ' wfui-description--theme-error';
      }

      var containerClassName = "wfui-description wfui-description--" + type + errorClassName + " " + classNames;

      //based off of adding the dialog to the <body> tag,
      //we remove/add the content directly instead of toggling --theme-visible.
      var imageDialogClassName = "wfui-description__imageDialog--theme-visible";
      var imageDialogOverlayClassName = "wfui-description__imageDialogOverlay--theme-visible";

      //if imageSrc is passed, setup all image content and dialog
      if (src) {
        var imageContent = _react2.default.createElement(
          'div',
          _extends({ className: 'wfui-description__imageContainer__imageGroup' }, image_config),
          _react2.default.createElement('i', { className: 'fa fa-search-plus fa-2x wfui-description__imageContainer__imageGroup__enlargerIcon' }),
          _react2.default.createElement('img', { className: 'wfui-description__imageContainer__imageGroup__image', src: src })
        );
        var imageDialogContent = _react2.default.createElement(
          'div',
          { className: 'wfui-description__imageDialog', onClick: this._onClickCloseViewImage },
          _react2.default.createElement(
            'div',
            { className: imageDialogClassName, onClick: function onClick(e) {
                e.stopPropagation();
              } },
            _react2.default.createElement(
              'span',
              { onClick: this._onClickCloseViewImage, className: 'wfui-description__imageDialog__closeButton' },
              _react2.default.createElement('i', { className: 'fa fa-times' })
            ),
            _react2.default.createElement(
              'div',
              { className: 'wfui-description__imageDialog__body' },
              _react2.default.createElement('img', { className: 'wfui-description__imageDialog__body__image', src: src, width: imgWidth, height: imgHeight })
            ),
            imageTitle ? _react2.default.createElement(
              'div',
              { className: 'wfui-description__imageDialog__footer' },
              _react2.default.createElement(
                'span',
                null,
                imageTitle
              )
            ) : ""
          )
        );

        //content to be rendered for the dialog and overlay/blanket
        this.portalContent = _react2.default.createElement(
          'div',
          null,
          imageDialogContent,
          _react2.default.createElement('div', { onClick: this._onClickCloseViewImage, className: imageDialogOverlayClassName })
        );

        //create div node for where the dialog will be
        this.PORTAL = document.createElement('div');
        //add appropriate id so we can track it
        this.PORTAL.setAttribute("id", "descriptionImagePortalId");
      } /* END IF IMAGESRC ====== */

      //RENDER
      if (typeof content == 'string' && !src) {

        return _react2.default.createElement('div', { className: containerClassName, dangerouslySetInnerHTML: { __html: content.replace(/\n/g, "<br/>") } });
      } else if (typeof content == 'string' && src) {
        return _react2.default.createElement(
          'div',
          { className: containerClassName },
          _react2.default.createElement('div', { className: 'wfui-description__textContainer', dangerouslySetInnerHTML: { __html: content.replace(/\n/g, "<br/>") } }),
          _react2.default.createElement(
            'div',
            { className: 'wfui-description__imageContainer' },
            imageContent
          )
        );
      } else if ((typeof content === 'undefined' ? 'undefined' : _typeof(content)) == 'object' && src) {
        return _react2.default.createElement(
          'div',
          { className: containerClassName },
          _react2.default.createElement(
            'div',
            { className: 'wfui-description__textContainer' },
            content
          ),
          _react2.default.createElement(
            'div',
            { className: 'wfui-description__imageContainer' },
            imageContent
          )
        );
      } else {
        //typeof(content)==object && !src
        return _react2.default.createElement(
          'div',
          { className: containerClassName },
          content
        );
      }
    }
  }]);

  return Description;
}(_react.Component);

/**
 * Property types
 */


Description.propTypes = {
  content: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
  type: _react2.default.PropTypes.string,
  classNames: _react2.default.PropTypes.string,
  errors: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number, _react2.default.PropTypes.bool])
};
Description.defaultProps = {
  content: '',
  type: 'theme-grey',
  classNames: '',
  errors: ''
};

exports.default = Description;