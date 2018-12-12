import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

import { Group } from '../Group';

class Home extends React.Component {
    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
        const { user } = this.props;
        return (
            <div>
                <h1>Welkom {user.displayname}!</h1>
                <Group />
                <p>
                    <Link to="/login">Logout</Link>
                </p>
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