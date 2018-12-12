import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';

export class DeleteModal extends Component {
  state = {
    modal: false,
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  activateDelete = e => {
    e.preventDefault();
    if(typeof this.props.onSubmit === 'function') this.props.onSubmit(this.props.deleteId);
    this.toggle();  
  }

  render() {
    const { deleteType, deleteMessage } = this.props
    return (
      <div>
        <Button style={{ marginRight: '5px' }} color="danger" onClick={ this.toggle }>Delete</Button>
        <Modal isOpen={ this.state.modal } toggle={ this.toggle } >
          <ModalHeader toggle={ this.toggle }>Delete { deleteType }</ModalHeader>
          <ModalBody>
            <p>{ deleteMessage }</p>
            <Button style={{ marginRight: '5px' }} color="danger" onClick={ this.activateDelete }>Delete</Button>
            <Button style={{ marginRight: '5px' }} onClick={ this.toggle }>Cancel</Button>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}
