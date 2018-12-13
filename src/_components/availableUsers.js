import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';


export class AvailableUsers extends Component{

  activateAdd = id => {
    if(typeof this.props.onSubmit === 'function') this.props.onSubmit(id);
  }

  render () {
    const users = this.props.users;
    return (
      <div>
        <b>Gebruikers toevoegen aan deze groep</b>
        { typeof users.items !== 'undefined' && 
          <ListGroup>
            { users.items.map((user, index) =>
              <ListGroupItem key={ user._id }>
                <img style={{ borderRadius: '50%', maxWidth: '30px', marginRight: '5px'}} src={ user.profilePicture }/><b>{ user.username }: </b>
                <Button color="primary" onClick={() => this.activateAdd(user._id)}>+</Button>
              </ListGroupItem>
            )}
          </ListGroup>     
        }
      </div>
    )
  }
}