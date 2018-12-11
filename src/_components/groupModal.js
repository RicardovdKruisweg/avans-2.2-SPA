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
import { groupActions } from '../_actions';
import { userId } from '../_helpers/user-id';

const create = groupActions.create;

class GroupModal extends Component {
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

        const newGroup = {
            name: this.state.name,
            owner: userId()
        }

        // Add User via addUser action
        this.props.create(newGroup);

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
                >Add Group</Button>

                <Modal
                    isOpen={ this.state.modal }
                    toggle={ this.toggle }
                >
                    <ModalHeader toggle={ this.toggle }>Add To Group List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={ this.onSubmit }>
                            <FormGroup>
                                <Label for="group">Group</Label>
                                <Input 
                                    type="text"
                                    name="name"
                                    id="group"
                                    placeholder="Add new group"
                                    onChange={ this.onChange }
                                />
                                <Button
                                    color="dark"
                                    style={{ marginTop: '2rem' }}
                                    block
                                >Add Group</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    group: state.group
})

export default connect(mapStateToProps, { create })(GroupModal);
