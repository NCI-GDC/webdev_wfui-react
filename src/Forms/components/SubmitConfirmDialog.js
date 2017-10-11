import React from 'react';
import { connect } from 'react-redux';
import {Button, Form, FormGroup, Col, FormControl, ControlLabel, Modal } from 'react-bootstrap/lib/index';

export default class SubmitConfirmDialog extends React.Component{
    constructor(){
        super()
        this.state = { show: false }
    }
    save(){
        const {survey, onHandleSubmit} = this.props;
        this.setState({show: false});
        if(typeof onHandleSubmit === 'function') onHandleSubmit();
    }
    hideModal(e) {
        if(e) e.preventDefault();
        this.setState({show: false});
    }
    showModal(all_answered){
        this.setState({show: true, all_answered: all_answered});
    }
    render(){
        const {title} = this.props;
        const {all_answered} = this.state || false;
        
        return(
            <Modal className="modal-custom-small confirm-dialog" bsSize="large" show={this.state.show} onHide={this.hideModal.bind(this)}>
                <Modal.Header>
                    <div>{i18n('Before you submit...')}</div>
                </Modal.Header>
                <Modal.Body>
                    { !all_answered ? <p>{i18n("We have noticed that you did not answer all of the survey questions. The survey cannot be edited once you submit your answers.")}</p> : ""}
                    <p>{i18n("Every piece of information that you share is helpful. We would appreciate if you answer all of the survey questions that you feel comfortable with.")}</p>
                </Modal.Body>
                <Modal.Footer>
                    <div className="question-preview-footer">
                        <div className="footer-action-container">
                            <Button bsStyle="info" onClick={this.hideModal.bind(this)}>{i18n('Cancel and answer more questions')}</Button>
                            <Button bsStyle="default" onClick={this.save.bind(this)}>{i18n('Submit anyway')}</Button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        )
    }

}