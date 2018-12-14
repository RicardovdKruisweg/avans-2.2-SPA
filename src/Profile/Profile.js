import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Form, FormGroup, Label, Button, Input } from 'reactstrap';
import { userActions } from '../_actions';

const update = userActions.update

class Profile extends Component {

  state = {
    displayname: this.props.user.displayname,
    updatePassword: false,
    oldPassword: null,
    newPassword: null
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  showPasswordUpdate = () => {
    const newState = !this.state.updatePassword
    this.setState({
      updatePassword: newState
    });
    // Check if password update is false and reset old and new password values
    if(newState === false){
      this.setState({
        oldPassword: null,
        newPassword: null
      })
    }
  }

  onSubmit = e => {
    e.preventDefault();
    //get values
    const userId = this.props.user._id;
    const displayname = this.state.displayname;
    const oldPassword = this.state.oldPassword
    const newPassword = this.state.newPassword
    // Add User via addUser action
    this.props.update(userId, displayname, oldPassword, newPassword);
  }

  render () {
    const pp = {
      'border-radius' : '50%',
      'max-width' : '64px'
    }
    const user = this.props.user;
    return (
      <Container >
        { user &&
          <div>
            <h1>Profile van { user.username }</h1>
            <img style={pp} src={user.profilePicture } />
            <br/>
            <Button
              onClick={this.showPasswordUpdate}
            >Change Password</Button>
            <Form onSubmit={ this.onSubmit }>
              <FormGroup>
                <Label for="displayname">Displayname</Label>
                <Input 
                type="text"
                name="displayname"
                id="displayname"
                value={ this.state.displayname }
                onChange={ this.onChange }
                />
              </FormGroup>
              <FormGroup style={{display: this.state.updatePassword ? 'block' : 'none' }}>
                <Label for="oldPassword">Huidig wachtwoord</Label>
                <Input 
                type="password"
                name="oldPassword"
                id="oldPassword"
                placeholder="Typ hier uw huidige wachtwoord"
                onChange={ this.onChange }
                />
              </FormGroup>
              <FormGroup style={{display: this.state.updatePassword ? 'block' : 'none' }}>
                <Label for="newPassword">Nieuw wachtwoord</Label>
                <Input 
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="Typ hier uw nieuwe wachtwoord"
                onChange={ this.onChange }
                />
              </FormGroup>
              <Button
                color="dark"
                style={{ marginTop: '2rem' }}
                block
                >Update</Button>
            </Form>
          </div>
        }
      </Container>
    )
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  return {
      user
  };
}

const connectedProfile = connect(mapStateToProps, { update })(Profile);
export { connectedProfile as Profile };