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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Editing form.
 */
var FilterTableModal = function FilterTableModal(props) {
    return _react2.default.createElement(
        _index.Modal,
        { show: props.show, onHide: props.onHandleCancel, bsSize: 'large', className: 'add-modal' },
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
                    disabled: props.disabled
                },
                'Save'
            ),
            _react2.default.createElement(
                _index.Button,
                { className: 'text-uppercase', onClick: props.onHandleCancel },
                'Cancel'
            )
        )
    );
};
FilterTableModal.propTypes = {
    label: _propTypes2.default.string,
    show: _propTypes2.default.bool,
    disabled: _propTypes2.default.bool,
    onHandleCancel: _propTypes2.default.func,
    onHandleSave: _propTypes2.default.func,
    bodyDisplay: _propTypes2.default.element
};

/**
 * Deleting Confirmation Modal
 */
var DeleteConfirmationModal = function DeleteConfirmationModal(props) {
    return _react2.default.createElement(
        _index.Modal,
        { show: props.show, onHide: props.onHandleDeleteCancel, bsSize: 'large', className: 'add-modal' },
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
                { className: 'text-uppercase', onClick: props.onHandleDeleteSave },
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
            searchTerm: ''
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
            this.setState({ showEditModal: true, edittingIndex: index, edittingInitialValue: fields.get(index) });
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
            this.setState({ showEditModal: false, edittingIndex: -1, edittingInitialValue: undefined });
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
                        return JSON.stringify(values);
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
                            { 'data-index': data.idx, onClick: _this2.onHandleEdit },
                            'Edit'
                        ),
                        _react2.default.createElement(
                            _index.MenuItem,
                            { 'data-index': data.idx, onClick: _this2.onHandleDelete },
                            'Delete'
                        )
                    );
                }
            }]);
        }
    }, {
        key: 'getFilters',
        value: function getFilters() {
            var _state2 = this.state,
                filteredCGP = _state2.filteredCGP,
                filteredDLP = _state2.filteredDLP;

            return [function (item) {
                return !filteredCGP || item.cgp === filteredCGP;
            }, function (item) {
                return !filteredDLP || item.dlp === filteredDLP;
            }];
        }

        // Filter UI

    }, {
        key: 'generateFilterUI',
        value: function generateFilterUI() {
            var _this3 = this;

            var filterBy = this.props.filterBy;
            var searchTerm = this.state.searchTerm;
            // const CGPList = [];
            // const DLPList = [];
            // for (const item of this.state.data) {
            //     const CGP = item.cgp;
            //     const DLP = item.dlp;
            //     if (CGPList.indexOf(CGP) === -1) {
            //         CGPList.push(CGP);
            //     }
            //     if (DLPList.indexOf(DLP) === -1) {
            //         DLPList.push(DLP);
            //     }
            // }
            // const contributorOptions = CGPList.map(
            //     CGP => <option key={CGP} value={CGP}>{CGP}</option>,
            // );
            // const topicOptions = DLPList.map(
            //     DLP => <option key={DLP} value={DLP}>{DLP}</option>,
            // );

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement('input', {
                    type: 'text',
                    placeholder: 'Enter keywords',
                    value: searchTerm,
                    onChange: function onChange(e) {
                        return _this3.setState({ searchTerm: e.target.value });
                    }
                })
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var _props2 = this.props,
                className = _props2.className,
                fields = _props2.fields,
                childComponent = _props2.childComponent,
                label = _props2.label,
                help = _props2.help,
                required = _props2.required,
                disabled = _props2.disabled,
                error = _props2.meta.error;
            var _state3 = this.state,
                showAddModal = _state3.showAddModal,
                showEditModal = _state3.showEditModal,
                showDeleteModal = _state3.showDeleteModal,
                addingIndex = _state3.addingIndex,
                edittingIndex = _state3.edittingIndex,
                searchTerm = _state3.searchTerm;


            console.log(this.props, 'rendefFilterTable props');

            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)(className, 'wfui-form-item', { 'wfui-form-item-error': error }) },
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
                    { className: 'wfui-form-addAnother', validationState: error ? 'error' : null },
                    fields.length !== 0 && _react2.default.createElement(
                        'div',
                        null,
                        this.generateFilterUI(),
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
                    ),
                    _react2.default.createElement(FilterTableModal, {
                        id: 'AddModal',
                        show: showAddModal,
                        onHandleCancel: this.onHandleAddCancel,
                        onHandleSave: this.onHandleAddSave,
                        bodyDisplay: _react2.default.createElement(
                            'div',
                            null,
                            childComponent(fields.name + '[' + addingIndex + ']', addingIndex)
                        )
                    }),
                    _react2.default.createElement(FilterTableModal, {
                        id: 'EditModal',
                        show: showEditModal,
                        onHandleCancel: this.onHandleEditCancel,
                        onHandleSave: this.onHandleEditSave,
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
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed velit arcu, ullamcorper a interdum eget, congue nec nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed velit arcu, ullamcorper a interdum eget, congue nec nibh.'
                        )
                    }),
                    _react2.default.createElement(
                        _index.Button,
                        { bsStyle: 'default', className: 'add-btn', onClick: this.onHandleAdd },
                        'Add Another Item'
                    ),
                    error && _react2.default.createElement(
                        _index.HelpBlock,
                        { className: 'wfui-form-error' },
                        _react2.default.createElement(
                            'span',
                            null,
                            error
                        )
                    ),
                    help && _react2.default.createElement('div', { className: 'wfui-form-description', dangerouslySetInnerHTML: { __html: help } })
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
    questions: _propTypes2.default.arrayOf(_propTypes2.default.object)
};

exports.default = renderFilterTable;