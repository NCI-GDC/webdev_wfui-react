import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import {
    Modal,
    Button,
    FormGroup,
    ControlLabel,
    HelpBlock,
    SplitButton,
    MenuItem,
} from '../index';
import FilteredTable from '../FilteredTable/1/FilteredTable';

import { getValByKey, getOptKey, getOptVal } from './input_hybrid';

/**
 * Editing form.
 */
const FilterTableModal = props => {
    /**
     * Check if there are errors, if yes, disable save button.
     */
    let invalid = false;
    if (props.index >= 0) {
        const localErrors = props.syncErrors[props.name][props.index];
        const globalErrors = props.syncErrors.global;
        props.questions.forEach(question => {
            // Global errors.
            if (globalErrors[`${question.id}[${props.index}]`]) invalid = true;
            // Local Errors
            if (localErrors) {
                const localError = localErrors[question.id];
                if (Object.keys(localError).length) {
                    Object.keys(localError).map(key => {
                        if (localError[key]) invalid = true;
                    });
                }
            }
        });
    }

    return (
        <Modal
            show={props.show}
            onHide={props.onHandleCancel}
            bsSize="large"
            className="add-modal"
        >
            <Modal.Header closeButton>
                <h2 className="modaltitle">{props.label}</h2>
            </Modal.Header>
            <Modal.Body>
                {props.bodyDisplay && React.cloneElement(props.bodyDisplay, {})}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type="submit"
                    variant="primary"
                    className="text-uppercase"
                    onClick={props.onHandleSave}
                    disabled={invalid}
                >
                    Save
                </Button>
                <Button
                    className="text-uppercase"
                    onClick={props.onHandleCancel}
                >
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
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
    questions: PropTypes.arrayOf(PropTypes.object),
};

/**
 * Deleting Confirmation Modal
 */
const DeleteConfirmationModal = props => (
    <Modal
        show={props.show}
        onHide={props.onHandleDeleteCancel}
        bsSize="large"
        className="add-modal"
    >
        <Modal.Header closeButton>
            <h2 className="modaltitle">{props.label}</h2>
        </Modal.Header>
        <Modal.Body>
            {props.bodyDisplay && React.cloneElement(props.bodyDisplay, {})}
        </Modal.Body>
        <Modal.Footer>
            <Button
                type="submit"
                variant="primary"
                className="text-uppercase"
                onClick={props.onHandleDeleteCancel}
            >
                No Cancel
            </Button>
            <Button
                className="text-uppercase"
                onClick={props.onHandleDeleteSave}
            >
                Yes, Delete
            </Button>
        </Modal.Footer>
    </Modal>
);
DeleteConfirmationModal.propTypes = {
    label: PropTypes.string,
    show: PropTypes.bool,
    onHandleDeleteCancel: PropTypes.func,
    onHandleDeleteSave: PropTypes.func,
    bodyDisplay: PropTypes.element,
};

class renderFilterTable extends React.Component {
    constructor() {
        super();
        this.state = {
            showAddModal: false,
            showEditModal: false,
            showDeleteModal: false,
            addingIndex: -1,
            edittingIndex: -1,
            currentValue: undefined,
            searchTerm: '',
            filterBy: {},
        };
        // Add
        this.onHandleAdd = this.onHandleAdd.bind(this);
        this.onHandleAddSave = this.onHandleAddSave.bind(this);
        this.onHandleAddCancel = this.onHandleAddCancel.bind(this);
        // Edit
        this.onHandleEdit = this.onHandleEdit.bind(this);
        this.onHandleEditSave = this.onHandleEditSave.bind(this);
        this.onHandleEditCancel = this.onHandleEditCancel.bind(this);
        // Delete
        this.onHandleDelete = this.onHandleDelete.bind(this);
        this.onHandleDeleteSave = this.onHandleDeleteSave.bind(this);
        this.onHandleDeleteCancel = this.onHandleDeleteCancel.bind(this);

        // Filters
        this.onFilterChange = this.onFilterChange.bind(this);
    }

    // Add Item
    onHandleAdd() {
        const { fields } = this.props;
        this.setState({ showAddModal: true, addingIndex: fields.length });
        fields.push();
    }

    onHandleAddSave() {
        this.setState({ showAddModal: false, addingIndex: -1 });
    }

    onHandleAddCancel() {
        const { fields } = this.props;
        const { addingIndex } = this.state;
        // Remove if it's canceled.
        fields.remove(addingIndex);
        this.setState({ showAddModal: false, addingIndex: -1 });
    }

    // Edit Item
    onHandleEdit(e) {
        const { fields } = this.props;
        const index = e.target.getAttribute('data-index');
        this.setState({
            showEditModal: true,
            edittingIndex: index,
            edittingInitialValue: fields.get(index),
        });
    }

    onHandleEditSave() {
        this.setState({ showEditModal: false, edittingIndex: -1 });
    }

    onHandleEditCancel() {
        const { fields } = this.props;
        const { edittingIndex, edittingInitialValue } = this.state;
        // Reset value with initialValue
        fields.remove(edittingIndex);
        fields.insert(edittingIndex, edittingInitialValue);
        this.setState({
            showEditModal: false,
            edittingIndex: -1,
            edittingInitialValue: undefined,
        });
    }

    // Delete Item
    onHandleDelete(e) {
        const index = e.target.getAttribute('data-index');
        this.setState({ showDeleteModal: true, deletingIndex: index });
    }

    onHandleDeleteSave() {
        const { fields } = this.props;
        const { deletingIndex } = this.state;
        fields.remove(deletingIndex);
        this.setState({ showDeleteModal: false, deletingIndex: -1 });
    }

    onHandleDeleteCancel() {
        this.setState({ showDeleteModal: false, deletingIndex: -1 });
    }

    getItemFormat() {
        const { questions, lang } = this.props;

        return questions
            .map(q => ({
                name: q.values[lang].title,
                display: data => {
                    const values = data[q.id];
                    if (values) {
                        switch (q.type) {
                            case 'listbox':
                                return getValByKey(
                                    values.value,
                                    q.values[lang].options
                                );
                            case 'input-hybrid':
                                const hybridField = q.values[
                                    lang
                                ].children.filter(f => f.type === 'hybrid')[0];
                                const displayValues = values[
                                    hybridField.cid
                                ].map(key => {
                                    const assignedField = q.values[
                                        lang
                                    ].children.filter(f => f.input_id === key);
                                    if (assignedField.length) {
                                        // Get option value & assigned input field value.
                                        return `${
                                            values[assignedField[0].cid]
                                        }(${getValByKey(
                                            key,
                                            q.values[lang].options
                                        )})`;
                                    }
                                    // Get option value by key
                                    return getValByKey(
                                        key,
                                        q.values[lang].options
                                    );
                                });
                                return displayValues
                                    .sort((a, b) => a.localeCompare(b))
                                    .join(', ');
                            default:
                                return Object.keys(values)
                                    .map(key => values[key])
                                    .join(', ');
                        }
                    }
                    // console.log(q);

                    // if (values) {
                    // console.log(values, 'getItemFormat');
                    // console.log(Object.keys(values).map((key) => (values[key])).join(', '));
                    // }
                    // return JSON.stringify(values);
                },
            }))
            .concat([
                {
                    name: 'Actions',
                    display: data => {
                        return (
                            <SplitButton
                                variant="primary"
                                title="Edit"
                                data-index={data.idx}
                                onClick={this.onHandleEdit}
                            >
                                <MenuItem
                                    data-index={data.idx}
                                    onClick={this.onHandleEdit}
                                >
                                    Edit
                                </MenuItem>
                                <MenuItem
                                    data-index={data.idx}
                                    onClick={this.onHandleDelete}
                                >
                                    Delete
                                </MenuItem>
                            </SplitButton>
                        );
                    },
                },
            ]);
    }

    getFilters() {
        const { questions, lang } = this.props;
        const { filterBy } = this.state;

        return [
            item => {
                let result = false;
                if (Object.keys(filterBy).length) {
                    Object.keys(filterBy).forEach(key => {
                        const val = _.get(item, key);
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
            },
        ];
    }

    onFilterChange(e) {
        const { filterBy } = this.state;
        if (e.target.value) {
            this.setState({
                filterBy: {
                    ...filterBy,
                    [e.target.getAttribute('data-name')]: e.target.value,
                },
            });
        }
    }

    // Filter UI
    generateFilterUI() {
        const { questions, lang } = this.props;
        const { searchTerm, filterBy } = this.state;

        const filters = [];
        filters.push(
            <div key="filters-applied" className="filters-applied">
                {questions
                    .filter(
                        question =>
                            question.type === 'listbox' ||
                            question.type === 'input-hybrid'
                    )
                    .map((question, i) => {
                        const questionInfo = question.values[lang];
                        const field =
                            questionInfo.children &&
                            questionInfo.children.filter(
                                f => f.type === 'hybrid'
                            )[0];
                        const cid = field ? field.cid : 'value';
                        return (
                            <select
                                key={i}
                                data-name={`${question.id}.${cid}`}
                                onChange={this.onFilterChange}
                            >
                                <option value="">
                                    -- Filter by {questionInfo.title} --
                                </option>
                                {questionInfo.options.map((option, j) => (
                                    <option key={j} value={getOptKey(option)}>
                                        {getOptVal(option)}
                                    </option>
                                ))}
                            </select>
                        );
                    })}
            </div>
        );
        filters.push(
            <div key="filters-search" className="filters-search">
                <input
                    type="text"
                    placeholder="Enter keywords"
                    value={searchTerm}
                    onChange={e =>
                        this.setState({ searchTerm: e.target.value })
                    }
                />
            </div>
        );
        return filters;
    }

    render() {
        const {
            questions,
            className,
            fields,
            childComponent,
            label,
            syncErrors,
            labelItem,
            labelAddAnother,
            textDeleteConfirm,
            help,
            required,
            disabled,
            preview,
            descDisplay,
            meta: { error },
        } = this.props;
        const {
            showAddModal,
            showEditModal,
            showDeleteModal,
            addingIndex,
            edittingIndex,
            searchTerm,
        } = this.state;

        return (
            <div
                className={classNames(
                    className,
                    'wfui-form-item',
                    { 'wfui-form-item-error': error },
                    { 'wfui-form-disabled': disabled },
                    { 'wfui-form-preview': preview },
                    { inactive: fields.length >= 0 }
                )}
            >
                {label && (
                    <div className="wfui-form-label">
                        <ControlLabel>
                            {label}
                            {required && <b className="required"> *</b>}
                        </ControlLabel>
                    </div>
                )}
                <FormGroup
                    className={`wfui-form-field ${
                        descDisplay
                            ? 'wfui-form-field-with-description'
                            : 'wfui-form-field-no-description'
                    } wfui-form-addAnother`}
                    validationState={error ? 'error' : null}
                >
                    <div className="col-header">
                        <h4 className="col-h4">
                            {`Your ${labelItem} (${fields.length})`}
                        </h4>
                        <div className="col-header-btn-container">
                            <Button
                                variant="primary"
                                className="btn-add-col add-btn"
                                onClick={this.onHandleAdd}
                                plus
                            >
                                {labelAddAnother}
                            </Button>
                        </div>
                    </div>

                    <div className="col-table">
                        {fields.length === 0 && (
                            <div className="inactive-overlay-wrapper">
                                <div className="inactive-overlay">
                                    <p>{`You have not added any ${labelItem.toLowerCase()} yet. To get started, click the blue "${labelAddAnother}" button above.`}</p>
                                </div>
                            </div>
                        )}
                        <div className="filters-container">
                            {this.generateFilterUI()}
                        </div>
                        {fields.length !== 0 && (
                            <div className="table-responsive">
                                <FilteredTable
                                    searchTerm={searchTerm}
                                    data={fields.getAll()}
                                    filterList={this.getFilters()}
                                    itemFormat={this.getItemFormat()}
                                    onResultsNumUpdate={count =>
                                        this.setState({ count })
                                    }
                                    simpleSearch
                                    searchLogic="or"
                                />
                            </div>
                        )}
                    </div>
                    <FilterTableModal
                        id="AddModal"
                        name={fields.name}
                        questions={questions}
                        index={addingIndex}
                        show={showAddModal}
                        onHandleCancel={this.onHandleAddCancel}
                        onHandleSave={this.onHandleAddSave}
                        syncErrors={syncErrors}
                        bodyDisplay={
                            <div>
                                {childComponent(
                                    `${fields.name}[${addingIndex}]`,
                                    addingIndex
                                )}
                            </div>
                        }
                    />
                    <FilterTableModal
                        id="EditModal"
                        name={fields.name}
                        questions={questions}
                        index={edittingIndex}
                        show={showEditModal}
                        onHandleCancel={this.onHandleEditCancel}
                        onHandleSave={this.onHandleEditSave}
                        syncErrors={syncErrors}
                        bodyDisplay={
                            <div>
                                {childComponent(
                                    `${fields.name}[${edittingIndex}]`,
                                    edittingIndex
                                )}
                            </div>
                        }
                    />
                    <DeleteConfirmationModal
                        id="DeleteModal"
                        show={showDeleteModal}
                        onHandleDeleteSave={this.onHandleDeleteSave}
                        onHandleDeleteCancel={this.onHandleDeleteCancel}
                        bodyDisplay={<div>{textDeleteConfirm}</div>}
                    />
                    {error && (
                        <HelpBlock className="wfui-form-error">
                            {Array.isArray(error)
                                ? error.map(item => <div>{item}</div>)
                                : error}
                        </HelpBlock>
                    )}
                    {help && (
                        <div
                            className="wfui-form-help"
                            dangerouslySetInnerHTML={{ __html: help }}
                        />
                    )}
                </FormGroup>
                {descDisplay ? cloneElement(descDisplay) : ''}
            </div>
        );
    }
}
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
    textDeleteConfirm: PropTypes.string,
};

renderFilterTable.defaultProps = {
    labelAddAnother: 'Add Another',
    labelItem: 'Items',
    textDeleteConfirm: 'Are you sure you want to delete this item?',
};

export default renderFilterTable;
