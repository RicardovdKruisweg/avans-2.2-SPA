import React, { Component } from 'react';
import { groupActions } from '../_actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { userId } from '../_helpers';

// Components
import { MessageForm } from '../_components';
import { CommentList } from '../_components';

const comment = groupActions.comment;

class Room extends Component{

  componentDidMount () {
    const groupId = this.props.match.params.id;
    this.props.dispatch(groupActions.getById(groupId));
  }

  render () {
    const { groups } = this.props;
    const group = groups.items;
    if(group !== ''){
      return (
        <div>
          { groups.loading && <em>Loading groupss...</em> }
          { groups.error && <span className="text-danger">ERROR: {groups.error}</span> }
          { group &&
            <div>
              <h1>Welkom bij de groep: { group.name } </h1>
              <CommentList group={ group } />
              <MessageForm groupId={ this.props.match.params.id } />
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