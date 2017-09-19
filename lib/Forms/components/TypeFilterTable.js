'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reduxForm = require('redux-form');

var _Description = require('../../FormFields/Description');

var _Description2 = _interopRequireDefault(_Description);

var _FormFields = require('../../FormFields/');

var _Fields = require('./Fields');

var _Fields2 = _interopRequireDefault(_Fields);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Wrapper for Question Type 9 (Add Another)
 */
var TypeFilterTable = function (_React$Component) {
    _inherits(TypeFilterTable, _React$Component);

    function TypeFilterTable() {
        _classCallCheck(this, TypeFilterTable);

        return _possibleConstructorReturn(this, (TypeFilterTable.__proto__ || Object.getPrototypeOf(TypeFilterTable)).apply(this, arguments));
    }

    _createClass(TypeFilterTable, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                question = _props.question,
                lang = _props.lang,
                syncErrors = _props.syncErrors;

            var data = question.values[lang] || {};

            // console.log(question, 'question!!');
            // const that = this;
            // const {field} = this.props;
            // //TODO Lables for field button and table.
            // let props = {
            //     label: this.getTitle(field),
            //     description: <Description content={field['#description']} type={this.getDescriptionType(field)} />,
            //     tableLabel: field['#table_label'],
            //     buttonLabel: field['#button_label'],
            // }

            return _react2.default.createElement(
                'div',
                { className: 'wfui-type-field-table' },
                data.description && _react2.default.createElement(_Description2.default, { content: data.description, src: data.image && data.image.src, imageTitle: data.image && data.image.title }),
                _react2.default.createElement(_reduxForm.FieldArray, {
                    name: question.id,
                    questions: question.children,
                    lang: lang,
                    type: 'select',
                    className: 'bluetext',
                    component: _FormFields.renderFilterTable,
                    label: data.title,
                    syncErrors: syncErrors,
                    childComponent: function childComponent(groupId, i) {
                        return _react2.default.createElement(_Fields2.default, { groupId: groupId, groupIndex: i, section: question });
                    },
                    draggable: true
                })
            );
        }
    }]);

    return TypeFilterTable;
}(_react2.default.Component);

var TypeFilterTableContainer = (0, _reactRedux.connect)(function (state, props) {
    var formID = props.preview ? 'form_preview' : 'form_' + props.question.sectionId;
    var syncErrors = (0, _reduxForm.getFormSyncErrors)(formID)(state);
    var qid = typeof props.question.groupIndex !== 'undefined' ? props.question.id + '[' + props.question.groupIndex + ']' : props.question.id;

    return {
        syncErrors: syncErrors
    };
})(TypeFilterTable);

exports.default = TypeFilterTableContainer;