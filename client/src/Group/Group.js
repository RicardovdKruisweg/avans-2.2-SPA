import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Input, Button } from 'reactstrap';

import { userId } from '../_helpers/user-id';
import { groupActions } from '../_actions';

import  GroupModal  from '../components/groupModal';

class Group extends Component {

  componentDidMount() {
    this.props.dispatch(groupActions.getMy(userId()));
  }

  render() {
    const { groups } = this.props;
    const groupLength = groups.items;
    console.log(groupLength);
    return (
      <div>
        <h3 >Dit zijn jouw groepen: </h3 >
        { groups.loading && <em>Loading groups...</em> }
        { groups.error && <span className="text-danger">ERROR: {groups.error}</span> }
        { groups.items &&
          <ul>
            {groups.items.map((group, index) =>
            <li key={ group.id }>
              <h1>{ group.name }</h1>
   
            </li>
            )}
          </ul>
        }
        { groups.items == '' && <li>Helaas zit je nog niet in een group</li> }
        <GroupModal />
      </div>
    );
    
  }
}

function mapStateToProps(state){
  const { groups } = state;
  //const { user } = authentication;
  return {
      groups
  };
}

const connectedGroup = connect(mapStateToProps)(Group);
export { connectedGroup as Group };