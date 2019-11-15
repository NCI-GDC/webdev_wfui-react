function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
import classNames from 'classnames';
import _ from 'lodash';
import { Modal, Button, FormGroup, ControlLabel, HelpBlock, SplitButton, MenuItem } from '../index';
import FilteredTable from '../FilteredTable/1/FilteredTable';
import { getValByKey, getOptKey, getOptVal } from './input_hybrid';
/**
 * Editing form.
 */

var FilterTableModal = function FilterTableModal(props) {
  /**
   * Check if there are errors, if yes, disable save button.
   */
  var invalid = false;

  if (props.index >= 0) {
    var localErrors = props.syncErrors[props.name][props.index];
    var globalErrors = props.syncErrors.global;
    props.questions.forEach(function (question) {
      // Global errors.
      if (globalErrors["".concat(question.id, "[").concat(props.index, "]")]) invalid = true; // Local Errors

      if (localErrors) {
        var localError = localErrors[question.id];

        if (Object.keys(localError).length) {
          Object.keys(localError).map(function (key) {
            if (localError[key]) invalid = true;
          });
        }
      }
    });
  }

  return React.createElement(Modal, {
    show: props.show,
    onHide: props.onHandleCancel,
    bsSize: "large",
    className: "add-modal"
  }, React.createElement(Modal.Header, {
    closeButton: true
  }, React.createElement("h2", {
    className: "modaltitle"
  }, props.label)), React.createElement(Modal.Body, null, props.bodyDisplay && React.cloneElement(props.bodyDisplay, {})), React.createElement(Modal.Footer, null, React.createElement(Button, {
    type: "submit",
    variant: "primary",
    className: "text-uppercase",
    onClick: props.onHandleSave,
    disabled: invalid
  }, "Save"), React.createElement(Button, {
    className: "text-uppercase",
    onClick: props.onHandleCancel
  }, "Cancel")));
};

FilterTableModal.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  index: PropTypes.number,
  show: PropTypes.bool,
  onHandleCancel: PropTypes.func,
  onHandleSave: PropTypes.func,
  bodyDisplay: PropTypes.element,
  syncErrors: PropTypes.object,
  questions: PropTypes.arrayOf(PropTypes.object)
};
/**
 * Deleting Confirmation Modal
 */

var DeleteConfirmationModal = function DeleteConfirmationModal(props) {
  return React.createElement(Modal, {
    show: props.show,
    onHide: props.onHandleDeleteCancel,
    bsSize: "large",
    className: "add-modal"
  }, React.createElement(Modal.Header, {
    closeButton: true
  }, React.createElement("h2", {
    className: "modaltitle"
  }, props.label)), React.createElement(Modal.Body, null, props.bodyDisplay && React.cloneElement(props.bodyDisplay, {})), React.createElement(Modal.Footer, null, React.createElement(Button, {
    type: "submit",
    variant: "primary",
    className: "text-uppercase",
    onClick: props.onHandleDeleteCancel
  }, "No Cancel"), React.createElement(Button, {
    className: "text-uppercase",
    onClick: props.onHandleDeleteSave
  }, "Yes, Delete")));
};

DeleteConfirmationModal.propTypes = {
  label: PropTypes.string,
  show: PropTypes.bool,
  onHandleDeleteCancel: PropTypes.func,
  onHandleDeleteSave: PropTypes.func,
  bodyDisplay: PropTypes.element
};

var renderFilterTable =
/*#__PURE__*/
function (_React$Component) {
  _inherits(renderFilterTable, _React$Component);

  function renderFilterTable() {
    var _this;

    _classCallCheck(this, renderFilterTable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(renderFilterTable).call(this));
    _this.state = {
      showAddModal: false,
      showEditModal: false,
      showDeleteModal: false,
      addingIndex: -1,
      edittingIndex: -1,
      currentValue: undefined,
      searchTerm: '',
      filterBy: {}
    }; // Add

    _this.onHandleAdd = _this.onHandleAdd.bind(_assertThisInitialized(_this));
    _this.onHandleAddSave = _this.onHandleAddSave.bind(_assertThisInitialized(_this));
    _this.onHandleAddCancel = _this.onHandleAddCancel.bind(_assertThisInitialized(_this)); // Edit

    _this.onHandleEdit = _this.onHandleEdit.bind(_assertThisInitialized(_this));
    _this.onHandleEditSave = _this.onHandleEditSave.bind(_assertThisInitialized(_this));
    _this.onHandleEditCancel = _this.onHandleEditCancel.bind(_assertThisInitialized(_this)); // Delete

    _this.onHandleDelete = _this.onHandleDelete.bind(_assertThisInitialized(_this));
    _this.onHandleDeleteSave = _this.onHandleDeleteSave.bind(_assertThisInitialized(_this));
    _this.onHandleDeleteCancel = _this.onHandleDeleteCancel.bind(_assertThisInitialized(_this)); // Filters

    _this.onFilterChange = _this.onFilterChange.bind(_assertThisInitialized(_this));
    return _this;
  } // Add Item


  _createClass(renderFilterTable, [{
    key: "onHandleAdd",
    value: function onHandleAdd() {
      var fields = this.props.fields;
      this.setState({
        showAddModal: true,
        addingIndex: fields.length
      });
      fields.push();
    }
  }, {
    key: "onHandleAddSave",
    value: function onHandleAddSave() {
      this.setState({
        showAddModal: false,
        addingIndex: -1
      });
    }
  }, {
    key: "onHandleAddCancel",
    value: function onHandleAddCancel() {
      var fields = this.props.fields;
      var addingIndex = this.state.addingIndex; // Remove if it's canceled.

      fields.remove(addingIndex);
      this.setState({
        showAddModal: false,
        addingIndex: -1
      });
    } // Edit Item

  }, {
    key: "onHandleEdit",
    value: function onHandleEdit(e) {
      var fields = this.props.fields;
      var index = e.target.getAttribute('data-index');
      this.setState({
        showEditModal: true,
        edittingIndex: index,
        edittingInitialValue: fields.get(index)
      });
    }
  }, {
    key: "onHandleEditSave",
    value: function onHandleEditSave() {
      this.setState({
        showEditModal: false,
        edittingIndex: -1
      });
    }
  }, {
    key: "onHandleEditCancel",
    value: function onHandleEditCancel() {
      var fields = this.props.fields;
      var _this$state = this.state,
          edittingIndex = _this$state.edittingIndex,
          edittingInitialValue = _this$state.edittingInitialValue; // Reset value with initialValue

      fields.remove(edittingIndex);
      fields.insert(edittingIndex, edittingInitialValue);
      this.setState({
        showEditModal: false,
        edittingIndex: -1,
        edittingInitialValue: undefined
      });
    } // Delete Item

  }, {
    key: "onHandleDelete",
    value: function onHandleDelete(e) {
      var index = e.target.getAttribute('data-index');
      this.setState({
        showDeleteModal: true,
        deletingIndex: index
      });
    }
  }, {
    key: "onHandleDeleteSave",
    value: function onHandleDeleteSave() {
      var fields = this.props.fields;
      var deletingIndex = this.state.deletingIndex;
      fields.remove(deletingIndex);
      this.setState({
        showDeleteModal: false,
        deletingIndex: -1
      });
    }
  }, {
    key: "onHandleDeleteCancel",
    value: function onHandleDeleteCancel() {
      this.setState({
        showDeleteModal: false,
        deletingIndex: -1
      });
    }
  }, {
    key: "getItemFormat",
    value: function getItemFormat() {
      var _this2 = this;

      var _this$props = this.props,
          questions = _this$props.questions,
          lang = _this$props.lang;
      return questions.map(function (q) {
        return {
          name: q.values[lang].title,
          display: function display(data) {
            var values = data[q.id];

            if (values) {
              switch (q.type) {
                case 'listbox':
                  return getValByKey(values.value, q.values[lang].options);

                case 'input-hybrid':
                  var hybridField = q.values[lang].children.filter(function (f) {
                    return f.type === 'hybrid';
                  })[0];
                  var displayValues = values[hybridField.cid].map(function (key) {
                    var assignedField = q.values[lang].children.filter(function (f) {
                      return f.input_id === key;
                    });

                    if (assignedField.length) {
                      // Get option value & assigned input field value.
                      return "".concat(values[assignedField[0].cid], "(").concat(getValByKey(key, q.values[lang].options), ")");
                    } // Get option value by key


                    return getValByKey(key, q.values[lang].options);
                  });
                  return displayValues.sort(function (a, b) {
                    return a.localeCompare(b);
                  }).join(', ');

                default:
                  return Object.keys(values).map(function (key) {
                    return values[key];
                  }).join(', ');
              }
            } // console.log(q);
            // if (values) {
            // console.log(values, 'getItemFormat');
            // console.log(Object.keys(values).map((key) => (values[key])).join(', '));
            // }
            // return JSON.stringify(values);

          }
        };
      }).concat([{
        name: 'Actions',
        display: function display(data) {
          return React.createElement(SplitButton, {
            variant: "primary",
            title: "Edit",
            "data-index": data.idx,
            onClick: _this2.onHandleEdit
          }, React.createElement(MenuItem, {
            "data-index": data.idx,
            onClick: _this2.onHandleEdit
          }, "Edit"), React.createElement(MenuItem, {
            "data-index": data.idx,
            onClick: _this2.onHandleDelete
          }, "Delete"));
        }
      }]);
    }
  }, {
    key: "getFilters",
    value: function getFilters() {
      var _this$props2 = this.props,
          questions = _this$props2.questions,
          lang = _this$props2.lang;
      var filterBy = this.state.filterBy;
      return [function (item) {
        var result = false;

        if (Object.keys(filterBy).length) {
          Object.keys(filterBy).forEach(function (key) {
            var val = _.get(item, key);

            if (Array.isArray(val) && val.includes(filterBy[key])) {
              result = true;
            } else if (val === filterBy[key]) {
              result = true;
            }

            if (!filterBy[key]) result = true;
          });
        } else {
          result = true;
        }

        return result;
      }];
    }
  }, {
    key: "onFilterChange",
    value: function onFilterChange(e) {
      var filterBy = this.state.filterBy;

      if (e.target.value) {
        this.setState({
          filterBy: _extends({}, filterBy, _defineProperty({}, e.target.getAttribute('data-name'), e.target.value))
        });
      }
    } // Filter UI

  }, {
    key: "generateFilterUI",
    value: function generateFilterUI() {
      var _this3 = this;

      var _this$props3 = this.props,
          questions = _this$props3.questions,
          lang = _this$props3.lang;
      var _this$state2 = this.state,
          searchTerm = _this$state2.searchTerm,
          filterBy = _this$state2.filterBy;
      var filters = [];
      filters.push(React.createElement("div", {
        key: "filters-applied",
        className: "filters-applied"
      }, questions.filter(function (question) {
        return question.type === 'listbox' || question.type === 'input-hybrid';
      }).map(function (question, i) {
        var questionInfo = question.values[lang];
        var field = questionInfo.children && questionInfo.children.filter(function (f) {
          return f.type === 'hybrid';
        })[0];
        var cid = field ? field.cid : 'value';
        return React.createElement("select", {
          key: i,
          "data-name": "".concat(question.id, ".").concat(cid),
          onChange: _this3.onFilterChange
        }, React.createElement("option", {
          value: ""
        }, "-- Filter by", ' ', questionInfo.title, ' ', "--"), questionInfo.options.map(function (option, j) {
          return React.createElement("option", {
            key: j,
            value: getOptKey(option)
          }, getOptVal(option));
        }));
      })));
      filters.push(React.createElement("div", {
        key: "filters-search",
        className: "filters-search"
      }, React.createElement("input", {
        type: "text",
        placeholder: "Enter keywords",
        value: searchTerm,
        onChange: function onChange(e) {
          return _this3.setState({
            searchTerm: e.target.value
          });
        }
      })));
      return filters;
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props4 = this.props,
          questions = _this$props4.questions,
          className = _this$props4.className,
          fields = _this$props4.fields,
          childComponent = _this$props4.childComponent,
          label = _this$props4.label,
          syncErrors = _this$props4.syncErrors,
          labelItem = _this$props4.labelItem,
          labelAddAnother = _this$props4.labelAddAnother,
          textDeleteConfirm = _this$props4.textDeleteConfirm,
          help = _this$props4.help,
          required = _this$props4.required,
          disabled = _this$props4.disabled,
          preview = _this$props4.preview,
          descDisplay = _this$props4.descDisplay,
          error = _this$props4.meta.error;
      var _this$state3 = this.state,
          showAddModal = _this$state3.showAddModal,
          showEditModal = _this$state3.showEditModal,
          showDeleteModal = _this$state3.showDeleteModal,
          addingIndex = _this$state3.addingIndex,
          edittingIndex = _this$state3.edittingIndex,
          searchTerm = _this$state3.searchTerm;
      return React.createElement("div", {
        className: classNames(className, 'wfui-form-item', {
          'wfui-form-item-error': error
        }, {
          'wfui-form-disabled': disabled
        }, {
          'wfui-form-preview': preview
        }, {
          inactive: fields.length >= 0
        })
      }, label && React.createElement("div", {
        className: "wfui-form-label"
      }, React.createElement(ControlLabel, null, label, required && React.createElement("b", {
        className: "required"
      }, " *"))), React.createElement(FormGroup, {
        className: "wfui-form-field ".concat(descDisplay ? 'wfui-form-field-with-description' : 'wfui-form-field-no-description', " wfui-form-addAnother"),
        validationState: error ? 'error' : null
      }, React.createElement("div", {
        className: "col-header"
      }, React.createElement("h4", {
        className: "col-h4"
      }, "Your ".concat(labelItem, " (").concat(fields.length, ")")), React.createElement(Button, {
        variant: "primary",
        className: "btn-add-col add-btn",
        onClick: this.onHandleAdd,
        plus: true
      }, labelAddAnother)), React.createElement("div", {
        className: "col-table"
      }, fields.length === 0 && React.createElement("div", {
        className: "inactive-overlay-wrapper"
      }, React.createElement("div", {
        className: "inactive-overlay"
      }, React.createElement("p", null, "You have not added any ".concat(labelItem.toLowerCase(), " yet. To get started, click the blue \"").concat(labelAddAnother, "\" button above.")))), React.createElement("div", {
        className: "filters-container"
      }, this.generateFilterUI()), fields.length !== 0 && React.createElement("div", {
        className: "table-responsive"
      }, React.createElement(FilteredTable, {
        searchTerm: searchTerm,
        data: fields.getAll(),
        filterList: this.getFilters(),
        itemFormat: this.getItemFormat(),
        onResultsNumUpdate: function onResultsNumUpdate(count) {
          return _this4.setState({
            count: count
          });
        },
        simpleSearch: true,
        searchLogic: "or"
      }))), React.createElement(FilterTableModal, {
        id: "AddModal",
        name: fields.name,
        questions: questions,
        index: addingIndex,
        show: showAddModal,
        onHandleCancel: this.onHandleAddCancel,
        onHandleSave: this.onHandleAddSave,
        syncErrors: syncErrors,
        bodyDisplay: React.createElement("div", null, childComponent("".concat(fields.name, "[").concat(addingIndex, "]"), addingIndex))
      }), React.createElement(FilterTableModal, {
        id: "EditModal",
        name: fields.name,
        questions: questions,
        index: edittingIndex,
        show: showEditModal,
        onHandleCancel: this.onHandleEditCancel,
        onHandleSave: this.onHandleEditSave,
        syncErrors: syncErrors,
        bodyDisplay: React.createElement("div", null, childComponent("".concat(fields.name, "[").concat(edittingIndex, "]"), edittingIndex))
      }), React.createElement(DeleteConfirmationModal, {
        id: "DeleteModal",
        show: showDeleteModal,
        onHandleDeleteSave: this.onHandleDeleteSave,
        onHandleDeleteCancel: this.onHandleDeleteCancel,
        bodyDisplay: React.createElement("div", null, textDeleteConfirm)
      }), error && React.createElement(HelpBlock, {
        className: "wfui-form-error"
      }, React.createElement("span", null, error)), help && React.createElement("div", {
        className: "wfui-form-help",
        dangerouslySetInnerHTML: {
          __html: help
        }
      })), descDisplay ? cloneElement(descDisplay) : '');
    }
  }]);

  return renderFilterTable;
}(React.Component);

renderFilterTable.propTypes = {
  label: PropTypes.string,
  lang: PropTypes.string,
  className: PropTypes.string,
  fields: PropTypes.object,
  childComponent: PropTypes.func,
  syncErrors: PropTypes.object,
  questions: PropTypes.arrayOf(PropTypes.object),
  labelAddAnother: PropTypes.string,
  labelItem: PropTypes.string,
  textDeleteConfirm: PropTypes.string
};
renderFilterTable.defaultProps = {
  labelAddAnother: 'Add Another',
  labelItem: 'Items',
  textDeleteConfirm: 'Are you sure you want to delete this item?'
};
export default renderFilterTable;