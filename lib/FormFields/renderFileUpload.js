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

import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';
import { FormGroup, ControlLabel, HelpBlock, Form, Col, Button } from '../index';

var generateAcceptText = function generateAcceptText(props) {
  if (!props.fileTypes) return '';
  var list = props.fileTypes.reduce(function (types, type) {
    return props.mimeTypes[type] ? props.mimeTypes[type].concat(types) : types;
  }, []);
  return list.join(',');
};

var renderFileUpload =
/*#__PURE__*/
function (_React$Component) {
  _inherits(renderFileUpload, _React$Component);

  function renderFileUpload(props) {
    var _this;

    _classCallCheck(this, renderFileUpload);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(renderFileUpload).call(this));
    _this.state = {
      src: _this.setFile(props),
      file: false,
      fileError: '',
      data: '',
      type: '',
      accept: generateAcceptText(props),
      removing: [],
      initialValue: props.input.value
    };
    _this.getFileKey = _this.getFileKey.bind(_assertThisInitialized(_this));
    _this.renderFile = _this.renderFile.bind(_assertThisInitialized(_this));
    _this.renderRemoveBtn = _this.renderRemoveBtn.bind(_assertThisInitialized(_this));
    _this.renderDropzone = _this.renderDropzone.bind(_assertThisInitialized(_this));
    _this.renderDisabledDropzone = _this.renderDisabledDropzone.bind(_assertThisInitialized(_this));
    _this.renderChildComponets = _this.renderChildComponets.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(renderFileUpload, [{
    key: "getFileKey",
    value: function getFileKey(mime) {
      var mimeTypes = this.props.mimeTypes;
      var key = '';
      Object.keys(mimeTypes).forEach(function (k) {
        if (mimeTypes[k].includes(mime)) {
          key = k;
        }
      });
      return key ? "file-".concat(key) : '';
    }
  }, {
    key: "renderRemoveBtn",
    value: function renderRemoveBtn() {
      var _this2 = this;

      var _this$props = this.props,
          input = _this$props.input,
          onRemove = _this$props.onRemove,
          txtRemove = _this$props.txtRemove,
          disabled = _this$props.disabled;
      var removing = this.state.removing;

      if (!disabled) {
        return React.createElement(Button, {
          variant: "danger",
          className: "remove-file",
          type: "button",
          onClick: function onClick() {
            input.onChange('');
            onRemove(input);

            _this2.setState({
              name: '',
              date: '',
              type: '',
              removing: input.value.id ? removing.concat(input.value.id) : removing
            });
          }
        }, txtRemove);
      }

      return null;
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this$props2 = this.props,
          fileTypes = _this$props2.fileTypes,
          input = _this$props2.input;

      if (nextProps.fileTypes !== fileTypes) {
        this.setState({
          accept: generateAcceptText(nextProps)
        });
      }

      if (JSON.stringify(input.value) !== JSON.stringify(nextProps.input.value)) {
        this.setFile(nextProps);
      }
    }
  }, {
    key: "setFile",
    value: function setFile(props) {
      var _this3 = this;

      var input = props.input,
          fileDownloadPath = props.fileDownloadPath,
          fallbackPath = props.fallbackPath;
      var src = '';

      if (input.value.blobPath) {
        // Check if blob is available at the moment.
        fetch(input.value.blobPath).then(function (res) {
          // If images is blob object just uploaded.
          src = input.value.blobPath;

          _this3.setState({
            src: src
          });
        }).catch(function (err) {
          input.onChange('');
        });
      } else if (input.value.data) {
        src = input.value.data;
        this.setState({
          src: src
        });
      } else if (input.value.id) {
        // If images is from image API.
        src = fileDownloadPath.replace(':id', input.value.id);
        this.setState({
          src: src
        });
      } else if (input.value.src) {
        // Verify
        fetch(input.value.src).then(function (res) {
          if (res.ok) {
            _this3.setState({
              src: input.value.src
            });
          } else {
            _this3.setState({
              src: "".concat(fallbackPath).concat(encodeURI(input.value.src))
            });
          }
        });
      }

      return src;
    }
  }, {
    key: "renderFile",
    value: function renderFile() {
      var _this$props3 = this.props,
          input = _this$props3.input,
          onRemove = _this$props3.onRemove,
          review = _this$props3.review,
          txtRemove = _this$props3.txtRemove,
          fileDownloadPath = _this$props3.fileDownloadPath;
      var src = this.state.src;

      if (input.value && Object.keys(input.value).length) {
        // Image File
        if (input.value.type && input.value.type.indexOf('image') === 0) {
          return React.createElement("div", null, src ? React.createElement("a", {
            className: "".concat(review ? 'review-page' : '', " ").concat(this.getFileKey(input.value.type)),
            type: "button",
            href: src,
            target: "_blank"
          }, React.createElement("img", {
            src: src,
            alt: input.value.name,
            width: "150"
          })) : React.createElement("span", null, "The image is not available."), !review && this.renderRemoveBtn());
        } // None Image File


        return React.createElement("div", {
          className: "btn-group"
        }, input.value.name && React.createElement("a", {
          className: "btn btn-outline-primary ".concat(review ? 'review-page' : '', " ").concat(this.getFileKey(input.value.type)),
          href: src,
          target: "_blank"
        }, input.value.name), !review && this.renderRemoveBtn());
      }
    }
  }, {
    key: "renderChildComponets",
    value: function renderChildComponets() {
      var _this$props4 = this.props,
          componentId = _this$props4.componentId,
          placeholder = _this$props4.placeholder,
          input = _this$props4.input,
          onUpload = _this$props4.onUpload,
          maxFileSize = _this$props4.maxFileSize,
          fileTypes = _this$props4.fileTypes,
          txtUpload = _this$props4.txtUpload,
          maxFileSizeText = _this$props4.maxFileSizeText,
          allowedExtensionText = _this$props4.allowedExtensionText,
          errorFileType = _this$props4.errorFileType,
          errorFileSize = _this$props4.errorFileSize,
          errorReject = _this$props4.errorReject,
          attrs = _this$props4.attrs,
          disabled = _this$props4.disabled;
      var _this$state = this.state,
          accept = _this$state.accept,
          removing = _this$state.removing;
      var child = [React.createElement("div", {
        className: "input-group",
        style: {
          position: 'relative'
        },
        key: "input-group"
      }, React.createElement("span", {
        style: {
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 10,
          cursor: 'pointer',
          left: 0
        }
      }), React.createElement("input", _extends({
        type: "text",
        className: "wfui-input-field__input form-control"
      }, input, {
        value: "",
        placeholder: placeholder,
        disabled: disabled
      })), React.createElement("div", {
        className: "input-group-append"
      }, React.createElement(Button, {
        variant: "primary"
      }, txtUpload)))];

      if (removing) {
        child.push(removing.map(function (fileid, i) {
          return React.createElement("input", {
            key: i,
            name: input.name,
            className: "render-file-upload-removing-file file-upload-componentid-".concat(componentId),
            type: "hidden",
            value: fileid
          });
        }));
      }

      return child;
    }
  }, {
    key: "renderDisabledDropzone",
    value: function renderDisabledDropzone() {
      var _this$props5 = this.props,
          input = _this$props5.input,
          preview = _this$props5.preview;

      if (preview && (!input.value || Object.keys(input.value).length === 0)) {
        return React.createElement("span", {
          className: "no-item"
        }, "( No File )");
      }

      return React.createElement("div", {
        className: "render-file-upload file-upload-componentid-undefined",
        style: {
          width: '100%',
          borderStyle: 'none',
          display: input.value && Object.keys(input.value).length ? 'none' : 'block'
        }
      }, this.renderChildComponets());
    }
  }, {
    key: "renderDropzone",
    value: function renderDropzone() {
      var _this4 = this;

      var _this$props6 = this.props,
          componentId = _this$props6.componentId,
          placeholder = _this$props6.placeholder,
          input = _this$props6.input,
          onUpload = _this$props6.onUpload,
          maxFileSize = _this$props6.maxFileSize,
          fileTypes = _this$props6.fileTypes,
          txtUpload = _this$props6.txtUpload,
          maxFileSizeText = _this$props6.maxFileSizeText,
          allowedExtensionText = _this$props6.allowedExtensionText,
          errorFileType = _this$props6.errorFileType,
          errorFileSize = _this$props6.errorFileSize,
          errorReject = _this$props6.errorReject,
          attrs = _this$props6.attrs,
          isPublic = _this$props6.isPublic;
      var _this$state2 = this.state,
          accept = _this$state2.accept,
          removing = _this$state2.removing,
          initialValue = _this$state2.initialValue;
      return React.createElement(Dropzone, _extends({
        className: "render-file-upload file-upload-componentid-".concat(componentId),
        name: "".concat(input.name),
        multiple: false,
        maxSize: maxFileSize,
        style: {
          width: '100%',
          borderStyle: 'none',
          display: input.value && Object.keys(input.value).length ? 'none' : 'block'
        }
      }, attrs, {
        accept: accept,
        onDrop: function onDrop(acceptedFiles, rejectedFiles) {
          if (acceptedFiles.length > 0) {
            _this4.setState({
              fileError: ''
            });

            var name = acceptedFiles[0].name;
            var reader = new FileReader();
            reader.readAsDataURL(acceptedFiles[0]);

            reader.onloadend = function () {
              var value = {
                name: name,
                blobPath: acceptedFiles[0].preview,
                data: reader.result,
                type: acceptedFiles[0].type,
                size: acceptedFiles[0].size,
                isPublic: isPublic
              };

              if (initialValue.src) {
                value.src = initialValue.src;
              }

              if (initialValue.id) {
                value.id = initialValue.id;
              }

              input.onChange(value);
              onUpload(value, input, acceptedFiles[0]);
            };
          } else {
            input.onChange('');

            if (!accept.includes(rejectedFiles[0].type)) {
              _this4.setState({
                fileError: "".concat(errorFileType, " ").concat(fileTypes.join(', '))
              });
            } else if (rejectedFiles[0].size > maxFileSize) {
              _this4.setState({
                fileError: "".concat(errorFileSize.replace('{maxFileSize}', Math.round(maxFileSize / 1000000)))
              });
            } else {
              _this4.setState({
                fileError: errorReject
              });
            }
          }
        }
      }), this.renderChildComponets());
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props7 = this.props,
          className = _this$props7.className,
          globalError = _this$props7.globalError,
          label = _this$props7.label,
          required = _this$props7.required,
          help = _this$props7.help,
          input = _this$props7.input,
          maxFileSize = _this$props7.maxFileSize,
          disabled = _this$props7.disabled,
          _this$props7$meta = _this$props7.meta,
          touched = _this$props7$meta.touched,
          error = _this$props7$meta.error,
          data = _this$props7$meta.data,
          preview = _this$props7.preview,
          descDisplay = _this$props7.descDisplay,
          maxFileSizeText = _this$props7.maxFileSizeText,
          allowedExtensionText = _this$props7.allowedExtensionText,
          fileTypes = _this$props7.fileTypes,
          fullWidth = _this$props7.fullWidth,
          inline = _this$props7.inline;
      var fileError = this.state.fileError;
      var fileSizeTextConvert = Math.floor(maxFileSize / 1000000);
      return React.createElement(Form.Row, {
        className: classNames(className, 'wfui-form-item', {
          'wfui-form-item-error': touched && (error || globalError)
        }, {
          'wfui-form-item-warning': touched && data.warning
        }, {
          'wfui-form-disabled': disabled
        }, {
          'wfui-form-preview': preview
        }, {
          answered: input.value
        }, {
          'wfui-form-item-full-width': fullWidth
        })
      }, label && React.createElement(Col, {
        xs: 12,
        lg: inline ? 2 : 12,
        className: "wfui-form-label"
      }, React.createElement(ControlLabel, null, label, required && React.createElement("b", {
        className: "required"
      }, " *"))), React.createElement(FormGroup, {
        as: Col,
        xs: 12,
        lg: inline ? descDisplay && !preview ? 4 : 10 : descDisplay && !preview ? 6 : 12,
        className: "wfui-form-field ".concat(descDisplay ? 'wfui-form-field-with-description' : 'wfui-form-field-no-description', " wfui-file-upload"),
        validationState: touched && (error || globalError || fileError) ? 'error' : null
      }, React.createElement(FormControl, {
        isInvalid: touched && (error || globalError),
        isValid: touched && data.warning,
        className: classNames('d-none', 'custom-form-control', {
          'is-valid-warning': touched && data.warning
        })
      }), React.createElement("div", {
        className: "custom-form-control-wrapper"
      }, this.renderFile(), !disabled ? this.renderDropzone() : this.renderDisabledDropzone(), !preview && React.createElement("p", {
        className: "wfui-form-file-upload-spec",
        key: "wfui-form-file-upload-spec"
      }, React.createElement("span", {
        className: "filesize"
      }, maxFileSizeText.replace('{maxFileSize}', fileSizeTextConvert > 1000 ? Math.floor(fileSizeTextConvert / 1000) : fileSizeTextConvert).replace('{unit}', fileSizeTextConvert > 1000 ? 'GB' : 'MB')), fileTypes && fileTypes.length > 0 && React.createElement("span", {
        className: "filetypes"
      }, allowedExtensionText.replace('{fileTypes}', fileTypes.join(', '))))), fileError && React.createElement(Form.Control.Feedback, {
        className: "wfui-form-error",
        type: "invalid"
      }, React.createElement("span", {
        dangerouslySetInnerHTML: {
          __html: fileError
        }
      })), touched && globalError && React.createElement(Form.Control.Feedback, {
        className: "wfui-form-error",
        type: "invalid"
      }, React.createElement("span", null, Array.isArray(globalError) ? globalError.join(', ') : globalError)), touched && data.warning && React.createElement(Form.Control.Feedback, {
        className: "wfui-form-warning",
        type: "valid"
      }, React.createElement("span", null, Array.isArray(data.warning) ? data.warning.join(', ') : data.warning)), help && !preview && React.createElement(HelpBlock, {
        className: "wfui-form-help text-muted"
      }, React.createElement("div", {
        dangerouslySetInnerHTML: {
          __html: help
        }
      }))), descDisplay && !preview ? React.createElement(Col, {
        className: "wfui-form-description",
        xs: 12,
        lg: {
          span: 6,
          offset: 0
        }
      }, cloneElement(descDisplay)) : null);
    }
  }]);

  return renderFileUpload;
}(React.Component);

renderFileUpload.propTypes = {
  onUpload: PropTypes.func,
  onRemove: PropTypes.func,
  mimeTypes: PropTypes.object,
  txtRemove: PropTypes.string,
  txtUpload: PropTypes.string,
  maxFileSizeText: PropTypes.string,
  errorFileType: PropTypes.string,
  errorFileSize: PropTypes.string,
  errorReject: PropTypes.string,
  fileDownloadPath: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  isPublic: PropTypes.bool
};
renderFileUpload.defaultProps = {
  onUpload: function onUpload() {},
  onRemove: function onRemove() {},
  maxFileSize: 100000000,
  txtRemove: 'Remove',
  txtUpload: 'Upload',
  errorFileType: 'Only files with the following extensions are allowed:',
  errorFileSize: 'The file is exceeding the maximum file size of <i>{maxFileSize} MB</i>',
  errorReject: 'The file is rejected to upload.',
  maxFileSizeText: 'Max file size: {maxFileSize}{unit}',
  allowedExtensionText: 'Allowed extensions: {fileTypes}',
  mimeTypes: {
    pdf: ['application/pdf'],
    doc: ['application/msword'],
    dot: ['application/msword'],
    docx: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    dotx: ['application/vnd.openxmlformats-officedocument.wordprocessingml.template'],
    docm: ['application/vnd.ms-word.document.macroEnabled.12'],
    dotm: ['application/vnd.ms-word.template.macroEnabled.12'],
    word: ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    xls: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    ppt: ['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
    txt: ['text/plain'],
    png: ['image/png'],
    jpg: ['image/jpeg', 'image/pjpeg'],
    gif: ['image/gif'],
    svg: ['image/svg+xml']
  },
  fileDownloadPath: '',
  fallbackPath: '',
  fullWidth: false,
  isPublic: false
};
export default renderFileUpload;