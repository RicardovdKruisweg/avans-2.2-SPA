import { groupConstants } from '../_constants';
import { userConstants } from '../_constants';
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
    addComment,
    getAvailableUsers,
    addUserToGroup
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
  return dispatch => {
      const value = groupService.comment(comment, groupId, socket);
  };
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

function update (groupname, groupId) {
  return dispatch => {
    dispatch(request(groupConstants.UPDATE_REQUEST));

    groupService.update(groupname, groupId)
        .then(
            group => { 
              dispatch(success(groupConstants.UPDATE_SUCCESS, group));
                dispatch(alertActions.success('Group successfully editted'));
            },
            error => {
                dispatch(failure(groupConstants.UPDATE_FAILURE, error));
                dispatch(alertActions.error(error.data.message));
            }
        );
  };
}

function addUserToGroup (userId, groupId) {
  return dispatch => {
    dispatch(request(groupConstants.ADDUSER_REQUEST));
    dispatch(request(userConstants.DELAVAILABLE_REQUEST));

    groupService.addUserToGroup(userId, groupId)
        .then(
            groups => { 
              dispatch(success(groupConstants.ADDUSER_SUCCESS, groups));
              dispatch(success(userConstants.DELAVAILABLE_SUCCESS, userId))
              dispatch(alertActions.success('User successfully added to group'));
            },
            error => {
              dispatch(failure(groupConstants.ADDUSER_FAILURE, error));
              dispatch(failure(userConstants.DELAVAILABLE_FAILURE, error));
              dispatch(alertActions.error(error.data.message));
            }
        );
  };
}

function getAvailableUsers ( groupId) {
  return dispatch => {
    dispatch(request(groupConstants.GETAVAILABLEUSERS_REQUEST));

    groupService.getAvailableUsers(groupId)
        .then(
            group => { 
              dispatch(success(groupConstants.GETAVAILABLEUSERS_SUCCESS, group));
              dispatch(alertActions.success('Group successfully editted'));
            },
            error => {
              dispatch(failure(groupConstants.GETAVAILABLEUSERS_FAILURE, error));
              dispatch(alertActions.error(error.data.message));
            }
        );
  };
}

function _delete (groupId) {
  return dispatch => {
    dispatch(request(groupConstants.DELETE_REQUEST));

    groupService.delete(groupId)
      .then(
        group => { 
          dispatch(success(groupConstants.DELETE_SUCCESS, groupId));
          dispatch(alertActions.success('Group successfully deleted'));
        },
        error => {
          dispatch(failure(groupConstants.DELETE_FAILURE, error));
          dispatch(alertActions.error(error.data.message));
        }
      );
  };
}


function addComment(groups){
  return {
    type: groupConstants.COMMENT_SUCCESS,
    groups: groups
  }
}

function request(type, payload){
  return { type: type, payload }
}

function success(type, payload){
  return { type: type, payload }
}

function failure(type, error){
  return { type: type, error }
}
