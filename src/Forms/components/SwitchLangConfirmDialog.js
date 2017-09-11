import React from 'react';
import { connect } from 'react-redux';
import {Button, Form, FormGroup, Col, FormControl, ControlLabel, Modal } from 'react-bootstrap/lib/index';

export default class SwitchLangConfirmDialog extends React.Component{
    constructor(){
        super()
        this.state = { show: false }
    }
    save(){
        const {clickEvent} = this.state;
        window.onbeforeunload = undefined;
        window.location.href = $(clickEvent.target).parent('a').attr('href');
    }
    hideModal(e) {
        if(e) e.preventDefault();
        this.setState({show: false});
    }
    showModal(clickEvent){
        this.setState({show: true, clickEvent: clickEvent});
    }
    render(){
        const {title} = this.props;
        
        return(
            <Modal className="modal-custom-small switch-lang-confirm-dialog" bsSize="large" show={this.state.show} onHide={this.hideModal.bind(this)}>
                <Modal.Header>
                    <div>{i18n('Warning')}</div>
                </Modal.Header>
                <Modal.Body>
                    <p>{i18n("Switching the questionnaire language will erase your answers.")}</p>
                </Modal.Body>
                <Modal.Footer>
                    <div className="question-preview-footer">
                        <div className="footer-action-container">
                            <Button bsStyle="info" onClick={this.hideModal.bind(this)}>{i18n('Cancel')}</Button>
                            <Button bsStyle="default" onClick={this.save.bind(this)}>{i18n('Change')}</Button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        )
    }

}