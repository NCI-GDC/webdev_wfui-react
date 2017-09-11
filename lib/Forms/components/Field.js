'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TypeMarkup = require('./TypeMarkup');

var _TypeMarkup2 = _interopRequireDefault(_TypeMarkup);

var _TypeInputField = require('./TypeInputField');

var _TypeInputField2 = _interopRequireDefault(_TypeInputField);

var _TypeTextarea = require('./TypeTextarea');

var _TypeTextarea2 = _interopRequireDefault(_TypeTextarea);

var _TypeListbox = require('./TypeListbox');

var _TypeListbox2 = _interopRequireDefault(_TypeListbox);

var _TypeTableFormat = require('./TypeTableFormat');

var _TypeTableFormat2 = _interopRequireDefault(_TypeTableFormat);

var _TypeFollowUp = require('./TypeFollowUp');

var _TypeFollowUp2 = _interopRequireDefault(_TypeFollowUp);

var _TypeFieldset = require('./TypeFieldset');

var _TypeFieldset2 = _interopRequireDefault(_TypeFieldset);

var _TypeAddAnother = require('./TypeAddAnother');

var _TypeAddAnother2 = _interopRequireDefault(_TypeAddAnother);

var _TypeSelectionHybrid = require('./TypeSelectionHybrid');

var _TypeSelectionHybrid2 = _interopRequireDefault(_TypeSelectionHybrid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Field: Render a field based on webform field type
 */
var Field = function (_React$Component) {
    _inherits(Field, _React$Component);

    function Field() {
        _classCallCheck(this, Field);

        var _this = _possibleConstructorReturn(this, (Field.__proto__ || Object.getPrototypeOf(Field)).call(this));

        _this.state = { shouldUpdate: 0 };
        return _this;
    }

    _createClass(Field, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                fieldCharLimit = _props.fieldCharLimit,
                field = _props.field,
                renderingFollowup = _props.renderingFollowup;
            var language = this.context.language;


            if (field) {
                if (!renderingFollowup && field.showIf && field.showIf.length > 0) {
                    return _react2.default.createElement(_TypeFollowUp2.default, { question: field, lang: language });
                } else {
                    var data = void 0;
                    switch (field.type) {
                        case 'text':
                            return _react2.default.createElement(_TypeMarkup2.default, { question: field, lang: language });
                        case 'textarea':
                            return _react2.default.createElement(_TypeTextarea2.default, { question: field, lang: language });
                        case 'listbox':
                            return _react2.default.createElement(_TypeListbox2.default, { question: field, lang: language });
                        case 'input-hybrid':
                            return _react2.default.createElement(_TypeSelectionHybrid2.default, { question: field, lang: language });
                        case 'input-text':
                            data = field.values[language] || {};
                            if (data.children && data.children.length > 1) {
                                return _react2.default.createElement(_TypeTableFormat2.default, { limits: fieldCharLimit, question: field, lang: language });
                            }
                            return _react2.default.createElement(_TypeInputField2.default, { limits: fieldCharLimit, question: field, lang: language });

                        case 'question-group':
                            data = field.values[language] || {};
                            if (data.add_multiple) {
                                return _react2.default.createElement(_TypeAddAnother2.default, { question: field, lang: language });
                            } else {
                                return _react2.default.createElement(_TypeFieldset2.default, { question: field, lang: language });
                            }
                        default:
                            if (field.type) {
                                console.log("Type \'" + field.type + "\' is not available to render.");
                            } else {
                                console.log("Error: This is not field object.");
                            }
                            return null;
                    }
                }
            }
            return null;
        }
    }]);

    return Field;
}(_react2.default.Component);

Field.propTypes = {
    fieldCharLimit: _react2.default.PropTypes.number
};
Field.defaultProps = {
    fieldCharLimit: 140
};
Field.contextTypes = {
    language: _react2.default.PropTypes.string
};

exports.default = Field;