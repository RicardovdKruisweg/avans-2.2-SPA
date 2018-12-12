import { groupConstants } from '../_constants';
import { groupService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const groupActions = {
    getMy,
    create,
    update,
    delete: _delete,
    getById,
    comment,
    addComment
};

function getMy (id) {
  return dispatch => {
    dispatch(request(id));

    groupService.getMy(id)
        .then(
            groups => dispatch(success(groups)),
            error => dispatch(failure(error.data.message))
        );
  };

  function request() { return { type: groupConstants.GETMY_REQUEST } }
  function success(groups) { return { type: groupConstants.GETMY_SUCCESS, groups } }
  function failure(error) { return { type: groupConstants.GETMY_FAILURE, error } }
}

function getById (id) {
  return dispatch => {
    dispatch(request(id));
    groupService.getById(id)
        .then(
            groups => dispatch(success(groups)),
            error => dispatch(failure(error.data.message))
        );
  };

  function request() { return { type: groupConstants.GETBYID_REQUEST } }
  function success(groups) { return { type: groupConstants.GETBYID_SUCCESS, groups } }
  function failure(error) { return { type: groupConstants.GETBYID_FAILURE, error } }
}

function comment(comment, groupId, socket) {
  console.log(comment)
  return dispatch => {
      //dispatch(request(comment));
      const value = groupService.comment(comment, groupId, socket);
      //dispatch(success());
  };

  function request(value) { return { type: groupConstants.COMMENT_REQUEST, value } }
  function success(value) { return { type: groupConstants.COMMENT_SUCCESS, value } }
  function failure(error) { return { type: groupConstants.COMMENT_FAILURE, error } }
}

function create (group) {
  return dispatch => {
    dispatch(request(group));

    groupService.create(group)
        .then(
            group => { 
                dispatch(success(group));
                dispatch(alertActions.success('group successful'));
            },
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error.data.message));
            }
        );
  };
  function request(group) { return { type: groupConstants.CREATE_REQUEST, group } }
  function success(group) { return { type: groupConstants.CREATE_SUCCESS, group } }
  function failure(error) { return { type: groupConstants.CREATE_FAILURE, error } }
}

function update () {

}

function _delete () {

}


function addComment(groups){
  return {
    type: groupConstants.COMMENT_SUCCESS,
    groups: groups
  }
}



/*
function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    console.log(user);
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                  console.log(error);
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => { 
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}*/