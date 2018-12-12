import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';

import { userId } from '../_helpers/user-id';
import { groupActions } from '../_actions';

import  { GroupModal, EditModal, DeleteModal }  from '../_components';

class Group extends Component {

  componentDidMount() {
    this.props.dispatch(groupActions.getMy(userId()));
  }

  onSubmit = (newName, groupId) => {
    this.props.dispatch(groupActions.update(newName, groupId));
  }

  onDelete = (groupId) => {
    this.props.dispatch(groupActions.delete(groupId));
  }

  render() {
    const { groups } = this.props;
    const { user } = this.props;
    return (
      <Container>
        <h3 >Dit zijn jouw groepen: </h3 >
        { groups.loading && <em>Loading groups...</em> }
        { groups.error && <span className="text-danger">ERROR: {groups.error}</span> }
        { groups.items && typeof(groups.items.map) !== 'undefined' &&
          <ListGroup>
            {groups.items.map((group, index) =>
            <ListGroupItem key={ group.id }>
              <NavLink to={`/group/${group._id}`} activeClassName="room-selected">
                <div className='room-name'>{ group.name }</div>
              </NavLink>
              { group.owner === user._id && 
                <div style={{ display: 'flex' }}>
                  <EditModal editType="group" editMessage="New name" editValue={ group.name } editId={ group._id } onSubmit={ this.onSubmit } />
                  <DeleteModal
                    deleteType="group" 
                    deleteMessage="Weet je zeker dat je deze group wilt verwijderen" 
                    deleteId={ group._id } 
                    onSubmit={ this.onDelete } 
                  />
                </div>
              }
            </ListGroupItem>
            )}
          </ListGroup>
        }
        { groups.items == '' && <li>Helaas zit je nog niet in een group</li> }
        <GroupModal />
      </Container>
    );
    
  }
}

function mapStateToProps(state){
  const { groups } = state;
  const { user } = state.authentication 
  return {
      groups,
      user
  };
}

const connectedGroup = connect(mapStateToProps)(Group);
export { connectedGroup as Group };