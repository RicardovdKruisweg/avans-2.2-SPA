import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import io from 'socket.io-client';

// Actions 
import { groupActions, userActions } from '../_actions';

// Constants
import { apiConstants } from '../_constants';

// Components
import { MessageForm } from '../_components';
import { AvailableUsers } from '../_components';
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
    this.props.dispatch(userActions.getAvailableUsers(groupId));
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

  addToGroup = id => {
    this.props.dispatch(groupActions.addUserToGroup(id, this.props.match.params.id))
  }

  render () {
    let groups = this.getItems();
    let group = groups.items;
    if(group !== ''){
      return (
        <div>
          { groups.loading && <em>Loading chat...</em> }
          { groups.error && <span className="text-danger">ERROR: {groups.error}</span> }
          { group &&
            <div>
              <h1>Welkom bij de groep: { group.name } </h1>
              <CommentList group={ group } />
              <MessageForm onSubmit={ this.onSubmit } groupId={ this.props.match.params.id } />
              { this.props.users &&
                <AvailableUsers users={ this.props.users } onSubmit={ this.addToGroup }/>
              }
            </div>
          }
        </div>
      )
    }
    return (<h1></h1>);
  }
}

function mapStateToProps(state){
  const { groups, users } = state;
  return {
      groups,
      users
  };
}

function mapDispatchToProps(dispatch){
  let actions = bindActionCreators({ comment });
  return { ...actions, dispatch };
}

const connectedRoom = connect(mapStateToProps, mapDispatchToProps)(Room);
export { connectedRoom as Room };