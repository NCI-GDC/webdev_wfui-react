/* global i18n */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import deepEqual from 'deep-equal';
import * as modalReducers from './reducer';
import * as modalSelectors from './selector';
import * as modalActions from './action';

class ModalDialog extends React.Component {
    constructor() {
        super();
        this.onHandleSubmit = this.onHandleSubmit.bind(this);
        this.onHandleCancel = this.onHandleCancel.bind(this);
    }
    componentWillMount() {
        const { initialize, initialValues } = this.props;
        initialize(initialValues);
    }
    componentWillReceiveProps(nextProps) {
        const { destroy, initialize } = this.props;
        if (!deepEqual(this.props.initialValues, nextProps.initialValues)) {
            destroy();
            initialize(nextProps.initialValues);
        }
    }
    onHandleSubmit(values) {
        const { id, onSubmit, hideModal, destroy, initialize, initialValues } = this.props;
        onSubmit(values, this.props);
        hideModal(id);
        destroy();
        initialize(initialValues);
    }
    onHandleCancel() {
        const { id, hideModal, onHide, destroy, initialize, initialValues } = this.props;
        hideModal(id);
        onHide();
        destroy();
        initialize(initialValues);
    }
    render() {
        const {
            show,
            label,
            id,
            bodyDisplay,
            txtSubmit,
            txtCancel,
            handleSubmit,
            invalid,
            submitting,
            notForm,
            btnSubmitStyle,
            className
        } = this.props;

        return (
            <Modal
                show={show}
                onHide={this.onHandleCancel}
                bsSize="large"
                className={classNames(`modal-${id}`, className)}
            >
                <Modal.Header closeButton>
                    <h2 className="modaltitle">{label}</h2>
                </Modal.Header>
                <Modal.Body>
                    {bodyDisplay &&
                        React.cloneElement(
                            bodyDisplay,
                            Object.assign({}, this.props, {
                                setValues: this.setValues,
                            }),
                        )}
                </Modal.Body>
                <Modal.Footer>
                    {notForm ? (
                        <div>
                            <Button className="text-uppercase" onClick={this.onHandleCancel}>
                                {txtCancel}
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <Button
                                type="submit"
                                variant={btnSubmitStyle || 'primary'}
                                onClick={
                                    handleSubmit
                                        ? handleSubmit(this.onHandleSubmit)
                                        : this.onHandleSubmit
                                }
                                disabled={invalid || submitting}
                            >
                                {txtSubmit}
                            </Button>
                            <Button onClick={this.onHandleCancel}>{txtCancel}</Button>
                        </div>
                    )}
                </Modal.Footer>
            </Modal>
        );
    }
}

ModalDialog.propTypes = {
    show: PropTypes.bool,
    id: PropTypes.string,
    label: PropTypes.string,
    bodyDisplay: PropTypes.element,
    txtSubmit: PropTypes.string,
    txtCancel: PropTypes.string,
    onSubmit: PropTypes.func,
    onHide: PropTypes.func,
    hideModal: PropTypes.func,
    handleSubmit: PropTypes.func,
    destroy: PropTypes.func,
    initialize: PropTypes.func,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
    initialValues: PropTypes.object,
    notForm: PropTypes.bool,
    btnSubmitStyle: PropTypes.string,
    className: PropTypes.string,
};

ModalDialog.defaultProps = {
    show: false,
    id: '',
    label: '',
    txtSubmit: 'Submit',
    txtCancel: 'Cancel',
    onSubmit: f => f,
    onHide: f => f,
    invalid: false,
    submitting: false,
    destroy: f => f,
    initialize: f => f,
};

const ModalDialogContainer = connect(
    (state, props) => ({
        ...modalSelectors.modalsSelector(props.id)(state),
    }),
    modalActions,
)(ModalDialog);

ModalDialogContainer.actions = modalActions;
ModalDialogContainer.selectors = modalSelectors;
ModalDialogContainer.reducers = modalReducers;

export default ModalDialogContainer;
