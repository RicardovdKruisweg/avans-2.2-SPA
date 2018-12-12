import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';

export class CommentList extends Component{

  constructor(props){
    super(props)
  }

  render () {
    // Check if messages is defined before rendering
    const group = this.props.group;
    return (
      <ListGroup>
        { typeof group.messages !== 'undefined' && 
          group.messages.map((message, index) =>
            <ListGroupItem key={index}>
              <img style={{ borderRadius: '50%', maxWidth: '30px', marginRight: '5px'}} src={ message.author.profilePicture }/><b>{ message.author.displayname }: </b>{message.content}
            </ListGroupItem>
          )
        }
      </ListGroup>
    )
  }
}