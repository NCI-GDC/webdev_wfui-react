/* global i18n */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import deepEqual from 'deep-equal';
import { modalsSelector } from './selector';
import * as actionCreators from './action';

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
        const { id, onSubmit, hideModal } = this.props;
        onSubmit(values);
        hideModal(id);
    }
    onHandleCancel() {
        const {
            id,
            hideModal,
            onHide,
            destroy,
            initialize,
            initialValues,
        } = this.props;
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
        } = this.props;

        return (
            <Modal
                show={show}
                onHide={this.onHandleCancel}
                bsSize="large"
                className={`modal-${id}`}
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
                    <Button
                        type="submit"
                        bsStyle="primary"
                        className="text-uppercase"
                        onClick={
                            handleSubmit
                                ? handleSubmit(this.onHandleSubmit)
                                : this.onHandleSubmit
                        }
                        disabled={invalid || submitting}
                    >
                        {txtSubmit}
                    </Button>
                    <Button
                        className="text-uppercase"
                        onClick={this.onHandleCancel}
                    >
                        {txtCancel}
                    </Button>
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

export default connect(
    (state, props) => ({
        ...modalsSelector(props.id)(state),
    }),
    actionCreators,
)(ModalDialog);
