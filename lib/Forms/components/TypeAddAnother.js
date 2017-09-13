'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxForm = require('redux-form');

var _FormFields = require('../../FormFields/');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import Fields from './Fields';

// import renderAddAnother from './FormFields/renderAddAnother';

// import Field from './Field'
// import anothersReducers from '../reducers/CustomAddAnotherReducer.jsx'
// import { Provider, AnotherTable, Description, createStore } from 'wfui-react/lib/CaGForms/';

/**
 * Wrapper for Question Type 9 (Add Another)
 */
var TypeAddAnother = function (_React$Component) {
    _inherits(TypeAddAnother, _React$Component);

    function TypeAddAnother() {
        _classCallCheck(this, TypeAddAnother);

        return _possibleConstructorReturn(this, (TypeAddAnother.__proto__ || Object.getPrototypeOf(TypeAddAnother)).call(this));
        // this.onHandleChange = this.onHandleChange.bind(this);
        // this.store = createStore(anothersReducers);
    }

    _createClass(TypeAddAnother, [{
        key: 'render',
        value: function render() {
            var question = this.props.question;

            // const that = this;
            // const {field} = this.props;
            // //TODO Lables for field button and table.
            // let props = {
            //     label: this.getTitle(field),
            //     description: <Description content={field['#description']} type={this.getDescriptionType(field)} />,
            //     tableLabel: field['#table_label'],
            //     buttonLabel: field['#button_label'],
            // }

            // return(
            //     <div className={this.getClassName(field) + "show-table-" + field['#show_table']}>
            //         <Provider store={this.store}>
            //             <AnotherTable {...props} >
            //                 {field['#fields'].map(function(_field, i){
            //                     return <Field key={i} field={_field} />
            //                 })}
            //             </AnotherTable>
            //         </Provider>
            //     </div>
            // );

            return _react2.default.createElement(_reduxForm.FieldArray, {
                name: question.id,
                type: 'select',
                className: 'bluetext',
                component: _FormFields.renderAddAnother,
                label: 'test',
                childComponent: function childComponent(groupId, i) {
                    return _react2.default.createElement(Fields, { groupId: groupId, groupIndex: i, section: question });
                },
                draggable: true
            });
        }
    }]);

    return TypeAddAnother;
}(_react2.default.Component);

exports.default = TypeAddAnother;

/**

const { renderField, renderTextArea, renderAddAnother, renderRadios, renderCheckboxs, renderSingleCheckbox, renderSelect } = FormFields;


<FieldArray
    name="License_list"
    type="select"
    className="bluetext"
    component={renderAddAnother}
    label={intl.formatMessage({ id: 'project_labels.licenses', defaultMessage: 'Licenses:' })}
    childComponent={item => (
        <div>
            <Field
                name={`${item}.Title_txt`}
                type="text"
                label={intl.formatMessage({ id: 'licenses_fields.license_name', defaultMessage: 'License Name:' })}
                component={renderTextArea}
                placeholder=""
                required
            />
            <Field
                name={`${item}.Comment_txt`}
                type="text"
                label={intl.formatMessage({ id: 'licenses_fields.comment', defaultMessage: 'Comments:' })}
                component={renderTextArea}
                placeholder=""
            />
            <Field
                name={`${item}.StartDate_tdt`}
                type="date"
                label={intl.formatMessage({ id: 'licenses_fields.start_date', defaultMessage: 'Start Date:' })}
                component={renderField}
                required
            />
        </div>
    )}
    draggable
/>
 */