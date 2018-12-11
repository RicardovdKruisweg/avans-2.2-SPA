/*
import axios from 'axios';
import { GET_USERS, ADD_USER, DELETE_USER, USERS_LOADING, USER_LOGIN, USER_LOGINFAILED } from './types';

export const getUsers = () => dispatch =>{
  dispatch(setUsersLoading());
  axios
    .get('/api/users')
    .then(res => 
      dispatch({
        type: GET_USERS,    
        payload: res.data
      })
    );
};

export const addUser = user => dispatch =>{
  axios
    .post('/api/users', user)
    .then(res => 
      dispatch({
        type: ADD_USER,
        payload: res.data
      })
    );
};

export const deleteUser = (id, user) => dispatch => {
  console.log('test' + user.password);
  axios
    .delete(`/api/users/${id}`, { data: { username: user.username, password: user.password }})
    .then(res => 
      dispatch({
        type: DELETE_USER,
        payload: id
      })
    );
};

export const setUsersLoading = () => {
  return {
    type: USERS_LOADING
  }
}

export const login = (username, password) => dispatch => {
  console.log('test' + username + password);
  axios
    .post('/api/users/signin', { username: username, password: password})
    .then(res => {
      if(res.success === true){
        dispatch({
          type: USER_LOGIN,
          payload: res.data
        });
      }
      else{
        dispatch({
          type: USER_LOGINFAILED,
          payload: res.data
        })
      }
    });
}

*/