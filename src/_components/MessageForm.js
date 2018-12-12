import React, { Component } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

import { connect } from 'react-redux';
import { groupActions } from '../_actions';
import { userId } from '../_helpers/user-id';

const comment = groupActions.comment;

class MessageForm extends Component {
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => { 
        e.preventDefault();
        const newComment = {
            content: this.state.message,
            author: userId()
        } 
        //this.props.comment(newComment, this.props.groupId);
        if(typeof this.props.onSubmit === 'function') this.props.onSubmit(newComment);
    }

    render() {
        return (
           <Form onSubmit={ this.onSubmit }>
            <FormGroup>
              <Label for="group">Message</Label>
              <Input 
                type="text"
                name="message"
                id="message"
                placeholder="Message"
                onChange={ this.onChange }
              />
              <Button
                color="dark"
                style={{ marginTop: '2rem' }}
                block
              >Send</Button>
            </FormGroup>
          </Form>
        )
    }
}

const mapStateToProps = state => ({
    group: state.group
})

const connnectedMessage = connect(mapStateToProps, { comment })( MessageForm );
export { connnectedMessage as MessageForm } 
