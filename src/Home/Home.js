import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Group } from '../Group';

class Home extends React.Component {

  render() {
    const { user } = this.props;
    return (
      <div>
        <h1>Welkom {user.displayname}!</h1>
        <Group />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users
  };
}

const connectedHome = connect(mapStateToProps)(Home);
export { connectedHome as Home };