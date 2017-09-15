import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, FormGroup, ControlLabel, HelpBlock, SplitButton, MenuItem } from '../index';
import FilteredTable from '../FilteredTable/FilteredTable';
import classNames from 'classnames';

/**
 * Editing form.
 */
const FilterTableModal = props => (
    <Modal show={props.show} onHide={props.onHandleCancel} bsSize="large" className={`add-modal`}>
        <Modal.Header closeButton>
            <h2 className="modaltitle">{props.label}</h2>
        </Modal.Header>
        <Modal.Body>
            { props.bodyDisplay && React.cloneElement(props.bodyDisplay, {})}
        </Modal.Body>
        <Modal.Footer>
            <Button
                type="submit"
                bsStyle="primary"
                className="text-uppercase"
                onClick={props.onHandleSave}
                disabled={props.disabled}
            >Save</Button>
            <Button className="text-uppercase" onClick={props.onHandleCancel}>Cancel</Button>
        </Modal.Footer>
    </Modal>
);
FilterTableModal.propTypes = {
    label: PropTypes.string,
    show: PropTypes.bool,
    disabled: PropTypes.bool,
    onHandleCancel: PropTypes.func,
    onHandleSave: PropTypes.func,
    bodyDisplay: PropTypes.element,
};

/**
 * Deleting Confirmation Modal
 */
const DeleteConfirmationModal = props => (
    <Modal show={props.show} onHide={props.onHandleDeleteCancel} bsSize="large" className={`add-modal`}>
        <Modal.Header closeButton>
            <h2 className="modaltitle">{props.label}</h2>
        </Modal.Header>
        <Modal.Body>
            { props.bodyDisplay && React.cloneElement(props.bodyDisplay, {})}
        </Modal.Body>
        <Modal.Footer>
            <Button
                type="submit"
                bsStyle="primary"
                className="text-uppercase"
                onClick={props.onHandleDeleteCancel}
            >No Cancel</Button>
            <Button className="text-uppercase" onClick={props.onHandleDeleteSave}>Yes, Delete</Button>
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
        this.setState({ showEditModal: true, edittingIndex: index, edittingInitialValue: fields.get(index) });
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
        this.setState({ showEditModal: false, edittingIndex: -1, edittingInitialValue: undefined });
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

        return questions.map(q => (
            {
                name: q.values[lang].title,
                display: (data) => {
                    const values = data[q.id];
                    return JSON.stringify(values);
                },
            }
        )).concat([
            {
                name: 'Actions',
                display: (data) => {
                    return (
                        <SplitButton
                            bsStyle="primary"
                            title="Edit"
                            data-index={data.idx}
                            onClick={this.onHandleEdit}
                        >
                            <MenuItem data-index={data.idx} onClick={this.onHandleEdit}>Edit</MenuItem>
                            <MenuItem data-index={data.idx} onClick={this.onHandleDelete}>Delete</MenuItem>
                        </SplitButton>
                    );
                },
            },
        ]);
    }
    getFilters() {
        const { filteredCGP, filteredDLP } = this.state;
        return [
            item => (!filteredCGP ||
                    (item.cgp === filteredCGP)),
            item => (!filteredDLP ||
                    (item.dlp === filteredDLP)),
        ];
    }
    
    // Filter UI
    generateFilterUI() {
        const { filterBy } = this.props;
        const { searchTerm } = this.state;
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

        return (
            <div>
                <input
                    type="text"
                    placeholder="Enter keywords"
                    value={searchTerm}
                    onChange={e => this.setState({ searchTerm: e.target.value })}
                />
            </div>
        );
    }

    render() {
        const { className, fields, childComponent, label, help, required, disabled, meta: { error } } = this.props;
        const { showAddModal, showEditModal, showDeleteModal, addingIndex, edittingIndex, searchTerm } = this.state;
        
        console.log(this.props, 'rendefFilterTable props');

        return (
            <div className={classNames(className, 'wfui-form-item', { 'wfui-form-item-error': error })}>
                <ControlLabel>{label}</ControlLabel>{required && <b className="required"> *</b>}
                <FormGroup className="wfui-form-addAnother" validationState={error ? 'error' : null}>
                    { fields.length !== 0 &&
                        <div>
                            {this.generateFilterUI()}
                            <FilteredTable
                                searchTerm={searchTerm}
                                data={fields.getAll()}
                                filterList={this.getFilters()}
                                itemFormat={this.getItemFormat()}
                                onResultsNumUpdate={count => this.setState({ count })}
                                simpleSearch
                                searchLogic={'or'}
                            />
                        </div>
                    }
                    <FilterTableModal
                        id="AddModal"
                        show={showAddModal}
                        onHandleCancel={this.onHandleAddCancel}
                        onHandleSave={this.onHandleAddSave}
                        bodyDisplay={
                            <div>{childComponent(`${fields.name}[${addingIndex}]`, addingIndex)}</div>
                        }
                    />
                    <FilterTableModal
                        id="EditModal"
                        show={showEditModal}
                        onHandleCancel={this.onHandleEditCancel}
                        onHandleSave={this.onHandleEditSave}
                        bodyDisplay={
                            <div>{childComponent(`${fields.name}[${edittingIndex}]`, edittingIndex)}</div>
                        }
                    />
                    <DeleteConfirmationModal
                        id="DeleteModal"
                        show={showDeleteModal}
                        onHandleDeleteSave={this.onHandleDeleteSave}
                        onHandleDeleteCancel={this.onHandleDeleteCancel}
                        bodyDisplay={
                            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed velit arcu, ullamcorper a interdum eget, congue nec nibh.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed velit arcu, ullamcorper a interdum eget, congue nec nibh.</div>
                        }
                    />
                    <Button bsStyle="default" className="add-btn" onClick={this.onHandleAdd}>Add Another Item</Button>
                    {error && <HelpBlock className="wfui-form-error"><span>{error}</span></HelpBlock>}
                    {help && <div className="wfui-form-description" dangerouslySetInnerHTML={{ __html: help }} />}
                </FormGroup>
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
    questions: PropTypes.arrayOf(PropTypes.object),
};

export default renderFilterTable;
