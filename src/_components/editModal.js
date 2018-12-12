import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

export class EditModal extends Component {
  state = {
    modal: false,
    name: this.props.editValue
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = e => { 
    e.preventDefault();
    // Submit to Componenent that called this Modal
    console.log("mdoal"+ this.props.editId  )
    if(typeof this.props.onSubmit === 'function' && this.state.name !== '') this.props.onSubmit(this.state.name, this.props.editId);
    this.toggle();  
  }

  render() {
    const { editType, EditMessage } = this.props
    return (
      <div>
        <Button
          color="success"
          style={{ marginRight: '5px' }}
          onClick={ this.toggle }
        >Edit</Button>

        <Modal
          isOpen={ this.state.modal }
          toggle={ this.toggle }
        >
          <ModalHeader toggle={ this.toggle }>Edit { editType }</ModalHeader>
          <ModalBody>
            <Form onSubmit={ this.onSubmit }>
              <FormGroup>
              <Label for="name">{ EditMessage } </Label>
              <Input 
                type="text"
                name="name"
                id="name"
                value={ this.state.name }
                onChange={ this.onChange }
              />
              <Button
                color="dark"
                style={{ marginTop: '2rem' }}
                block
              >Edit { editType }</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}
