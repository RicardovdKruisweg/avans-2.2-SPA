import React, { Component } from 'react';

export class CommentList extends Component{

  constructor(props){
    super(props)
  }

  render () {
    // Check if messages is defined before rendering
    const group = this.props.group;
    return (
      <ul>
        { typeof group.messages !== 'undefined' && 
          group.messages.map((message, index) =>
            <li key={index}>
              <b>Author: </b>{message.content}
            </li>
          )
        }
      </ul>
    )
  }
}