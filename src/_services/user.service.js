import { authHeader } from '../_helpers';
import { serverLink } from '../_helpers';
import request from '../_helpers/request';
import axios from 'axios';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete,
    getAvailableUsers
};
/*
function login(username, password) {
    console.log(`${serverLink()}/users/authenticate`);
    return axios.post(`${serverLink()}/users/authenticate`, { username: username, password: password }, {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'})
        .then(user => {
            if (user.data.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user.data));
            }
            return user;
        });
}*/

function login(username, password) {
  return request({
    url:    '/users/authenticate',
    method: 'POST',
    data:   {
      username,
      password
    }
  })
  .then(user => {
    console.log(user);
    if (user.token) {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));
    }
    return user;
  });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAvailableUsers(groupId){
  return request({
    url:      `/groups/users/${groupId}`,
    method:   'GET',
    headers:  authHeader(),
  })
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

}

// Post To Node With User Object
function register(user) {
  return request({
    url:    '/users/register',
    method: 'POST',
    data:   user
  })
}

function update(userId, displayname, oldPassword, newPassword) {
  return request({
    url: `users/${userId}`,
    method: 'PUT',
    headers: authHeader(),
    data: {
      displayname,
      oldPassword,
      newPassword
    }
  })
}


// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

}