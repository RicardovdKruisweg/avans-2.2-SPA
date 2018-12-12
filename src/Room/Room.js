import React, { Component } from 'react';
import { groupActions } from '../_actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import socketIOClient from "socket.io-client";
import { userId } from '../_helpers';
import { apiConstants } from '../_constants';

import io from 'socket.io-client';


// Components
import { MessageForm } from '../_components';
import { CommentList } from '../_components';

const comment = groupActions.comment;
let socket;

class Room extends Component{

  constructor(props) {
    super(props)

    socket = io.connect(apiConstants.URL)

    socket.on('new comment', (groupInfo) => {
      this.addNewCommment(groupInfo);
    })
  }

  componentDidMount () {
    const groupId = this.props.match.params.id;
    this.props.dispatch(groupActions.getById(groupId));
  }

  getItems = () => {
    const { groups } = this.props;
    return groups;
  }

  addNewCommment = groups => {
    this.props.dispatch(groupActions.addComment(groups));
  }

  onSubmit = comment => {
    this.props.dispatch(groupActions.comment(comment ,this.props.match.params.id, socket));
  }

  render () {
    let groups = this.getItems();
    let group = groups.items;
    if(group !== ''){
      return (
        <div>
          { groups.loading && <em>Loading groupss...</em> }
          { groups.error && <span className="text-danger">ERROR: {groups.error}</span> }
          { group &&
            <div>
              <h1>Welkom bij de groep: { group.name } </h1>
              <CommentList group={ group } />
              <MessageForm onSubmit={ this.onSubmit } groupId={ this.props.match.params.id } />
            </div>
          }
        </div>
      )
    }
    return (<h1></h1>);
  }
}

function mapStateToProps(state){
  const { groups } = state;
  return {
      groups
  };
}

function mapDispatchToProps(dispatch){
  let actions = bindActionCreators({ comment });
  return { ...actions, dispatch };
}

const connectedRoom = connect(mapStateToProps, mapDispatchToProps)(Room);
export { connectedRoom as Room };