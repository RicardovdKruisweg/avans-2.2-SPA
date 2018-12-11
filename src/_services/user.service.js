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
    delete: _delete
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

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${serverLink()}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${serverLink()}/users/${id}`, requestOptions).then(handleResponse);
}

// Post To Node With User Object
function register(user) {
  return request({
    url:    '/users/register',
    method: 'POST',
    data:   user
  })
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${serverLink()}/users/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${serverLink()}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  console.error(response);
  if (!response.ok) {
    if (response.status === 401) {
      // auto logout if 401 response returned from api
      logout();
      window.location.reload(true);
    }

    const error = (response && response.message) || response.statusText;
    return Promise.reject(error);
  }
  return response;
}