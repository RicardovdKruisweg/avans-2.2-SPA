import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    update,
    delete: _delete,
    getAvailableUsers
};

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
                    //console.log("Error: "+ error);
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.data.message));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function getAvailableUsers ( groupId) {
  return dispatch => {
    dispatch(request(userConstants.GETAVAILABLE_REQUEST));

    userService.getAvailableUsers(groupId)
        .then(
            users => { 
              dispatch(success(users));
            },
            error => {
                dispatch(failure( error));
                dispatch(alertActions.error(error.data.message));
            }
        );
  };

  function request(user) { return { type: userConstants.GETAVAILABLE_REQUEST, user } }
  function success(users) { return { type: userConstants.GETAVAILABLE_SUCCESS, users } }
  function failure(error) { return { type: userConstants.GETAVAILABLE_FAILURE, error } }
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
        dispatch(success());
        history.push('/login');
        dispatch(alertActions.success('Registration successful'));
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error.data.message));
      }
    );
  };

  function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
  function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
  function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function update(userId, displayname, oldPassword, newPassword){
  return dispatch => {
    dispatch(request());

    userService.update(userId, displayname, oldPassword, newPassword)
      .then(
      user => { 
        dispatch(success(user));
        dispatch(alertActions.success('Update successful'));
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error.data.message));
      }
    );
  };

  function request(user) { return { type: userConstants.UPDATE_REQUEST, user } }
  function success(user) { return { type: userConstants.UPDATE_SUCCESS, user } }
  function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }
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
}