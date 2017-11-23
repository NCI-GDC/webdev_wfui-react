'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('../index');

var _FilteredTable = require('../FilteredTable/FilteredTable');

var _FilteredTable2 = _interopRequireDefault(_FilteredTable);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _input_hybrid = require('./input_hybrid');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
            if (globalErrors[question.id + '[' + props.index + ']']) invalid = true;
            // Local Errors
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

    return _react2.default.createElement(
        _index.Modal,
        {
            show: props.show,
            onHide: props.onHandleCancel,
            bsSize: 'large',
            className: 'add-modal'
        },
        _react2.default.createElement(
            _index.Modal.Header,
            { closeButton: true },
            _react2.default.createElement(
                'h2',
                { className: 'modaltitle' },
                props.label
            )
        ),
        _react2.default.createElement(
            _index.Modal.Body,
            null,
            props.bodyDisplay && _react2.default.cloneElement(props.bodyDisplay, {})
        ),
        _react2.default.createElement(
            _index.Modal.Footer,
            null,
            _react2.default.createElement(
                _index.Button,
                {
                    type: 'submit',
                    bsStyle: 'primary',
                    className: 'text-uppercase',
                    onClick: props.onHandleSave,
                    disabled: invalid
                },
                'Save'
            ),
            _react2.default.createElement(
                _index.Button,
                {
                    className: 'text-uppercase',
                    onClick: props.onHandleCancel
                },
                'Cancel'
            )
        )
    );
};
FilterTableModal.propTypes = {
    label: _propTypes2.default.string,
    name: _propTypes2.default.string,
    index: _propTypes2.default.number,
    show: _propTypes2.default.bool,
    onHandleCancel: _propTypes2.default.func,
    onHandleSave: _propTypes2.default.func,
    bodyDisplay: _propTypes2.default.element,
    syncErrors: _propTypes2.default.object,
    questions: _propTypes2.default.arrayOf(_propTypes2.default.object)
};

/**
 * Deleting Confirmation Modal
 */
var DeleteConfirmationModal = function DeleteConfirmationModal(props) {
    return _react2.default.createElement(
        _index.Modal,
        {
            show: props.show,
            onHide: props.onHandleDeleteCancel,
            bsSize: 'large',
            className: 'add-modal'
        },
        _react2.default.createElement(
            _index.Modal.Header,
            { closeButton: true },
            _react2.default.createElement(
                'h2',
                { className: 'modaltitle' },
                props.label
            )
        ),
        _react2.default.createElement(
            _index.Modal.Body,
            null,
            props.bodyDisplay && _react2.default.cloneElement(props.bodyDisplay, {})
        ),
        _react2.default.createElement(
            _index.Modal.Footer,
            null,
            _react2.default.createElement(
                _index.Button,
                {
                    type: 'submit',
                    bsStyle: 'primary',
                    className: 'text-uppercase',
                    onClick: props.onHandleDeleteCancel
                },
                'No Cancel'
            ),
            _react2.default.createElement(
                _index.Button,
                {
                    className: 'text-uppercase',
                    onClick: props.onHandleDeleteSave
                },
                'Yes, Delete'
            )
        )
    );
};
DeleteConfirmationModal.propTypes = {
    label: _propTypes2.default.string,
    show: _propTypes2.default.bool,
    onHandleDeleteCancel: _propTypes2.default.func,
    onHandleDeleteSave: _propTypes2.default.func,
    bodyDisplay: _propTypes2.default.element
};

var renderFilterTable = function (_React$Component) {
    _inherits(renderFilterTable, _React$Component);

    function renderFilterTable() {
        _classCallCheck(this, renderFilterTable);

        var _this = _possibleConstructorReturn(this, (renderFilterTable.__proto__ || Object.getPrototypeOf(renderFilterTable)).call(this));

        _this.state = {
            showAddModal: false,
            showEditModal: false,
            showDeleteModal: false,
            addingIndex: -1,
            edittingIndex: -1,
            currentValue: undefined,
            searchTerm: '',
            filterBy: {}
        };
        // Add
        _this.onHandleAdd = _this.onHandleAdd.bind(_this);
        _this.onHandleAddSave = _this.onHandleAddSave.bind(_this);
        _this.onHandleAddCancel = _this.onHandleAddCancel.bind(_this);
        // Edit
        _this.onHandleEdit = _this.onHandleEdit.bind(_this);
        _this.onHandleEditSave = _this.onHandleEditSave.bind(_this);
        _this.onHandleEditCancel = _this.onHandleEditCancel.bind(_this);
        // Delete
        _this.onHandleDelete = _this.onHandleDelete.bind(_this);
        _this.onHandleDeleteSave = _this.onHandleDeleteSave.bind(_this);
        _this.onHandleDeleteCancel = _this.onHandleDeleteCancel.bind(_this);

        // Filters
        _this.onFilterChange = _this.onFilterChange.bind(_this);
        return _this;
    }
    // Add Item


    _createClass(renderFilterTable, [{
        key: 'onHandleAdd',
        value: function onHandleAdd() {
            var fields = this.props.fields;

            this.setState({ showAddModal: true, addingIndex: fields.length });
            fields.push();
        }
    }, {
        key: 'onHandleAddSave',
        value: function onHandleAddSave() {
            this.setState({ showAddModal: false, addingIndex: -1 });
        }
    }, {
        key: 'onHandleAddCancel',
        value: function onHandleAddCancel() {
            var fields = this.props.fields;
            var addingIndex = this.state.addingIndex;
            // Remove if it's canceled.

            fields.remove(addingIndex);
            this.setState({ showAddModal: false, addingIndex: -1 });
        }

        // Edit Item

    }, {
        key: 'onHandleEdit',
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
        key: 'onHandleEditSave',
        value: function onHandleEditSave() {
            this.setState({ showEditModal: false, edittingIndex: -1 });
        }
    }, {
        key: 'onHandleEditCancel',
        value: function onHandleEditCancel() {
            var fields = this.props.fields;
            var _state = this.state,
                edittingIndex = _state.edittingIndex,
                edittingInitialValue = _state.edittingInitialValue;
            // Reset value with initialValue

            fields.remove(edittingIndex);
            fields.insert(edittingIndex, edittingInitialValue);
            this.setState({
                showEditModal: false,
                edittingIndex: -1,
                edittingInitialValue: undefined
            });
        }

        // Delete Item

    }, {
        key: 'onHandleDelete',
        value: function onHandleDelete(e) {
            var index = e.target.getAttribute('data-index');
            this.setState({ showDeleteModal: true, deletingIndex: index });
        }
    }, {
        key: 'onHandleDeleteSave',
        value: function onHandleDeleteSave() {
            var fields = this.props.fields;
            var deletingIndex = this.state.deletingIndex;

            fields.remove(deletingIndex);
            this.setState({ showDeleteModal: false, deletingIndex: -1 });
        }
    }, {
        key: 'onHandleDeleteCancel',
        value: function onHandleDeleteCancel() {
            this.setState({ showDeleteModal: false, deletingIndex: -1 });
        }
    }, {
        key: 'getItemFormat',
        value: function getItemFormat() {
            var _this2 = this;

            var _props = this.props,
                questions = _props.questions,
                lang = _props.lang;


            return questions.map(function (q) {
                return {
                    name: q.values[lang].title,
                    display: function display(data) {
                        var values = data[q.id];
                        if (values) {
                            switch (q.type) {
                                case 'listbox':
                                    return (0, _input_hybrid.getValByKey)(values.value, q.values[lang].options);
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
                                            return values[assignedField[0].cid] + '(' + (0, _input_hybrid.getValByKey)(key, q.values[lang].options) + ')';
                                        }
                                        // Get option value by key
                                        return (0, _input_hybrid.getValByKey)(key, q.values[lang].options);
                                    });
                                    return displayValues.sort(function (a, b) {
                                        return a.localeCompare(b);
                                    }).join(', ');
                                default:
                                    return Object.keys(values).map(function (key) {
                                        return values[key];
                                    }).join(', ');
                            }
                        }
                        // console.log(q);

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
                    return _react2.default.createElement(
                        _index.SplitButton,
                        {
                            bsStyle: 'primary',
                            title: 'Edit',
                            'data-index': data.idx,
                            onClick: _this2.onHandleEdit
                        },
                        _react2.default.createElement(
                            _index.MenuItem,
                            {
                                'data-index': data.idx,
                                onClick: _this2.onHandleEdit
                            },
                            'Edit'
                        ),
                        _react2.default.createElement(
                            _index.MenuItem,
                            {
                                'data-index': data.idx,
                                onClick: _this2.onHandleDelete
                            },
                            'Delete'
                        )
                    );
                }
            }]);
        }
    }, {
        key: 'getFilters',
        value: function getFilters() {
            var _props2 = this.props,
                questions = _props2.questions,
                lang = _props2.lang;
            var filterBy = this.state.filterBy;


            return [function (item) {
                var result = false;
                if (Object.keys(filterBy).length) {
                    Object.keys(filterBy).forEach(function (key) {
                        var val = _lodash2.default.get(item, key);
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
        key: 'onFilterChange',
        value: function onFilterChange(e) {
            var filterBy = this.state.filterBy;

            if (e.target.value) {
                this.setState({
                    filterBy: Object.assign({}, filterBy, _defineProperty({}, e.target.getAttribute('data-name'), e.target.value))
                });
            }
        }

        // Filter UI

    }, {
        key: 'generateFilterUI',
        value: function generateFilterUI() {
            var _this3 = this;

            var _props3 = this.props,
                questions = _props3.questions,
                lang = _props3.lang;
            var _state2 = this.state,
                searchTerm = _state2.searchTerm,
                filterBy = _state2.filterBy;


            var filters = [];
            filters.push(_react2.default.createElement(
                'div',
                { key: 'filters-applied', className: 'filters-applied' },
                questions.filter(function (question) {
                    return question.type === 'listbox' || question.type === 'input-hybrid';
                }).map(function (question, i) {
                    var questionInfo = question.values[lang];
                    var field = questionInfo.children && questionInfo.children.filter(function (f) {
                        return f.type === 'hybrid';
                    })[0];
                    var cid = field ? field.cid : 'value';
                    return _react2.default.createElement(
                        'select',
                        {
                            key: i,
                            'data-name': question.id + '.' + cid,
                            onChange: _this3.onFilterChange
                        },
                        _react2.default.createElement(
                            'option',
                            { value: '' },
                            '-- Filter by ',
                            questionInfo.title,
                            ' --'
                        ),
                        questionInfo.options.map(function (option, j) {
                            return _react2.default.createElement(
                                'option',
                                { key: j, value: (0, _input_hybrid.getOptKey)(option) },
                                (0, _input_hybrid.getOptVal)(option)
                            );
                        })
                    );
                })
            ));
            filters.push(_react2.default.createElement(
                'div',
                { key: 'filters-search', className: 'filters-search' },
                _react2.default.createElement('input', {
                    type: 'text',
                    placeholder: 'Enter keywords',
                    value: searchTerm,
                    onChange: function onChange(e) {
                        return _this3.setState({ searchTerm: e.target.value });
                    }
                })
            ));
            return filters;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var _props4 = this.props,
                questions = _props4.questions,
                className = _props4.className,
                fields = _props4.fields,
                childComponent = _props4.childComponent,
                label = _props4.label,
                syncErrors = _props4.syncErrors,
                labelItem = _props4.labelItem,
                labelAddAnother = _props4.labelAddAnother,
                textDeleteConfirm = _props4.textDeleteConfirm,
                help = _props4.help,
                required = _props4.required,
                disabled = _props4.disabled,
                preview = _props4.preview,
                error = _props4.meta.error;
            var _state3 = this.state,
                showAddModal = _state3.showAddModal,
                showEditModal = _state3.showEditModal,
                showDeleteModal = _state3.showDeleteModal,
                addingIndex = _state3.addingIndex,
                edittingIndex = _state3.edittingIndex,
                searchTerm = _state3.searchTerm;


            return _react2.default.createElement(
                'div',
                {
                    className: (0, _classnames2.default)(className, 'wfui-form-item', { 'wfui-form-item-error': error }, { 'wfui-form-disabled': disabled }, { 'wfui-form-preview': preview }, { inactive: fields.length >= 0 })
                },
                _react2.default.createElement(
                    _index.ControlLabel,
                    null,
                    label
                ),
                required && _react2.default.createElement(
                    'b',
                    { className: 'required' },
                    ' *'
                ),
                _react2.default.createElement(
                    _index.FormGroup,
                    {
                        className: 'wfui-form-addAnother',
                        validationState: error ? 'error' : null
                    },
                    _react2.default.createElement(
                        'div',
                        { className: 'col-header' },
                        _react2.default.createElement(
                            'h4',
                            { className: 'col-h4' },
                            'Your ',
                            labelItem,
                            ' ',
                            _react2.default.createElement(
                                'span',
                                null,
                                '(',
                                fields.length,
                                ')'
                            )
                        ),
                        _react2.default.createElement(
                            _index.Button,
                            {
                                bsStyle: 'default',
                                className: 'btn-add-col add-btn',
                                onClick: this.onHandleAdd
                            },
                            labelAddAnother
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'col-table' },
                        fields.length === 0 && _react2.default.createElement(
                            'div',
                            { className: 'inactive-overlay' },
                            _react2.default.createElement(
                                'p',
                                null,
                                'You have not added any ' + labelItem.toLowerCase() + ' yet. To get started, click the blue "' + labelAddAnother + '" button above'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'filters-container' },
                            this.generateFilterUI()
                        ),
                        fields.length !== 0 && _react2.default.createElement(
                            'div',
                            { className: 'table-responsive' },
                            _react2.default.createElement(_FilteredTable2.default, {
                                searchTerm: searchTerm,
                                data: fields.getAll(),
                                filterList: this.getFilters(),
                                itemFormat: this.getItemFormat(),
                                onResultsNumUpdate: function onResultsNumUpdate(count) {
                                    return _this4.setState({ count: count });
                                },
                                simpleSearch: true,
                                searchLogic: 'or'
                            })
                        )
                    ),
                    _react2.default.createElement(FilterTableModal, {
                        id: 'AddModal',
                        name: fields.name,
                        questions: questions,
                        index: addingIndex,
                        show: showAddModal,
                        onHandleCancel: this.onHandleAddCancel,
                        onHandleSave: this.onHandleAddSave,
                        syncErrors: syncErrors,
                        bodyDisplay: _react2.default.createElement(
                            'div',
                            null,
                            childComponent(fields.name + '[' + addingIndex + ']', addingIndex)
                        )
                    }),
                    _react2.default.createElement(FilterTableModal, {
                        id: 'EditModal',
                        name: fields.name,
                        questions: questions,
                        index: edittingIndex,
                        show: showEditModal,
                        onHandleCancel: this.onHandleEditCancel,
                        onHandleSave: this.onHandleEditSave,
                        syncErrors: syncErrors,
                        bodyDisplay: _react2.default.createElement(
                            'div',
                            null,
                            childComponent(fields.name + '[' + edittingIndex + ']', edittingIndex)
                        )
                    }),
                    _react2.default.createElement(DeleteConfirmationModal, {
                        id: 'DeleteModal',
                        show: showDeleteModal,
                        onHandleDeleteSave: this.onHandleDeleteSave,
                        onHandleDeleteCancel: this.onHandleDeleteCancel,
                        bodyDisplay: _react2.default.createElement(
                            'div',
                            null,
                            textDeleteConfirm
                        )
                    }),
                    error && _react2.default.createElement(
                        _index.HelpBlock,
                        { className: 'wfui-form-error' },
                        _react2.default.createElement(
                            'span',
                            null,
                            error
                        )
                    ),
                    help && _react2.default.createElement('div', {
                        className: 'wfui-form-description',
                        dangerouslySetInnerHTML: { __html: help }
                    })
                )
            );
        }
    }]);

    return renderFilterTable;
}(_react2.default.Component);

renderFilterTable.propTypes = {
    label: _propTypes2.default.string,
    lang: _propTypes2.default.string,
    className: _propTypes2.default.string,
    fields: _propTypes2.default.object,
    childComponent: _propTypes2.default.func,
    syncErrors: _propTypes2.default.object,
    questions: _propTypes2.default.arrayOf(_propTypes2.default.object),
    labelAddAnother: _propTypes2.default.string,
    labelItem: _propTypes2.default.string,
    textDeleteConfirm: _propTypes2.default.string
};

renderFilterTable.defaultProps = {
    labelAddAnother: 'Add Another',
    labelItem: 'Items',
    textDeleteConfirm: 'Are you sure you want to delete this item?'
};

exports.default = renderFilterTable;