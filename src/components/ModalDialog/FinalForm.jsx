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
        const { initialize, initialValues, form } = this.props;
        form.initialize(initialValues);
    }

    componentWillReceiveProps(nextProps) {
        const { destroy, initialize, form } = this.props;
        if (!deepEqual(this.props.initialValues, nextProps.initialValues)) {
            form.reset();
            form.initialize(nextProps.initialValues);
        }
    }

    onHandleSubmit(values) {
        const {
            id,
            onSubmit,
            hideModal,
            destroy,
            initialize,
            initialValues,
            form,
        } = this.props;

        onSubmit(values, this.props);
        hideModal(id);
        form.reset();
        form.initialize(initialValues);
    }

    onHandleCancel() {
        const {
            id,
            hideModal,
            onHide,
            destroy,
            initialize,
            initialValues,
            form,
        } = this.props;
        hideModal(id);
        onHide();
        form.destroy();
        form.initialize(initialValues);
    }

    render() {
        const {
            show,
            label,
            id,
            bodyDisplay,
            txtSubmit,
            txtCancel,
            invalid,
            submitting,
            notForm,
            btnSubmitStyle,
            btnCancelStyle,
            className,
            values,
            size,
        } = this.props;

        return (
            <Modal
                show={show}
                onHide={this.onHandleCancel}
                size={size}
                className={classNames(`modal-${id}`, className)}
            >
                <Modal.Header closeButton>
                    <h2 className="modaltitle">{label}</h2>
                </Modal.Header>
                <Modal.Body>
                    {bodyDisplay &&
                        React.cloneElement(bodyDisplay, {
                            ...this.props,
                            setValues: this.setValues,
                        })}
                </Modal.Body>
                <Modal.Footer>
                    {notForm ? (
                        <>
                            <Button
                                variant={btnCancelStyle || 'outline-primary'}
                                className="text-uppercase"
                                onClick={this.onHandleCancel}
                            >
                                {txtCancel}
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                type="submit"
                                variant={btnSubmitStyle || 'primary'}
                                onClick={() => this.onHandleSubmit(values)}
                                disabled={invalid || submitting}
                            >
                                {txtSubmit}
                            </Button>
                            <Button
                                variant={btnCancelStyle || 'outline-primary'}
                                onClick={this.onHandleCancel}
                            >
                                {txtCancel}
                            </Button>
                        </>
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
    btnCancelStyle: PropTypes.string,
    className: PropTypes.string,
    form: PropTypes.object,
    size: PropTypes.string,
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
    size: 'lg',
};

const ModalDialogContainer = connect(
    (state, props) => ({
        ...modalSelectors.modalsSelector(props.id)(state),
    }),
    modalActions
)(ModalDialog);

ModalDialogContainer.actions = modalActions;
ModalDialogContainer.selectors = modalSelectors;
ModalDialogContainer.reducers = modalReducers;

export default ModalDialogContainer;
