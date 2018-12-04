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
import { connect } from 'react-redux';
import uuid from 'uuid';
import { addUser } from '../actions/userActions';

class UserModal extends Component {
    state = {
        modal: false,
        name: ''
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

        const newUser = {
            id: uuid(),
            username: this.state.name
        }

        // Add User via addUser action
        this.props.addUser(newUser);

        // Close Modal
        this.toggle();
    }

    render() {
        return (
            <div>
                <Button
                    color="dark"
                    style={{ marginBottom: '2rem' }}
                    onClick={ this.toggle }
                >Add User</Button>

                <Modal
                    isOpen={ this.state.modal }
                    toggle={ this.toggle }
                >
                    <ModalHeader toggle={ this.toggle }>Add To User List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={ this.onSubmit }>
                            <FormGroup>
                                <Label for="user">User</Label>
                                <Input 
                                    type="text"
                                    name="name"
                                    id="user"
                                    placeholder="Add new user"
                                    onChange={ this.onChange }
                                />
                                <Button
                                    color="dark"
                                    style={{ marginTop: '2rem' }}
                                    block
                                >Add User</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, { addUser })(UserModal);
