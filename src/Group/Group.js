import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';

import { userId } from '../_helpers/user-id';
import { groupActions } from '../_actions';

import  GroupModal  from '../_components/groupModal';

class Group extends Component {

  componentDidMount() {
    this.props.dispatch(groupActions.getMy(userId()));
  }

  render() {
    const { groups } = this.props;
    return (
      <Container>
        <h3 >Dit zijn jouw groepen: </h3 >
        { groups.loading && <em>Loading groups...</em> }
        { groups.error && <span className="text-danger">ERROR: {groups.error}</span> }
        { groups.items &&
          <ListGroup>
            {groups.items.map((group, index) =>
            <ListGroupItem key={ group.id }>
              <NavLink to={`/group/${group._id}`} activeClassName="room-selected"><div className='room-name'>{ group.name }</div></NavLink>
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
  return {
      groups
  };
}

const connectedGroup = connect(mapStateToProps)(Group);
export { connectedGroup as Group };