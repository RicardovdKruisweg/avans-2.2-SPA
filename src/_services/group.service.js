import axios from 'axios';
import request from '../_helpers/request';
import { authHeader } from '../_helpers/auth-header';
import { apiConstants } from '../_constants';
import socketIOClient from "socket.io-client";

export const groupService = {
  getMy,
  comment,
  create,
  getById,
  update,
  delete: _delete,
  getAvailableUsers,
  addUserToGroup
};

function getMy (id) {
  return request({
    url:      `/groups/user/${id}`,
    method:   'GET',
    headers:  authHeader()
  })  
  .then(groups => {
    console.log("Gropupss" + groups);
    return groups;
  });
}

function getById (id) {
  return request({
    url:      `/groups/${id}`,
    method:   'GET',
    headers:  authHeader()
  })  
  .then(group => {
    console.log("Service: "+ group);
    return group;
  });
}

function update(groupname, groupId){
  return request({
    url:      `/groups/${groupId}`,
    method:   'PUT',
    headers:  authHeader(),
    data: {
      name: groupname
    }
  })
}

function getAvailableUsers(groupId){
  return request({
    url:      `/groups/users/${groupId}`,
    method:   'GET',
    headers:  authHeader(),
  })
}

function addUserToGroup(userId, groupId){
  return request({
    url:      `/groups/users/`,
    method:   'PUT',
    headers:  authHeader(),
    data: {
      userId: userId,
      groupId: groupId
    }
  }).then( groups => groups)
}

function _delete(groupId) {
  console.log(groupId);
  return request({
    url:      `/groups/${groupId}`,
    method:   'POST' ,
    headers:   authHeader()
  })
}

function comment (comment, groupId, socket) {
  return socket.emit('comment', comment ,groupId)
  
  /*
  return request({
    url:    `/groups/comment/${groupId}`,
    method: 'POST',
    headers:  authHeader(),
    data:   {
      comment
    }
  })
  .then(comment => {
    return comment;
  });*/

}

function create (group) {
  return request({
    url:      '/groups/',
    method:   'POST',
    headers:  authHeader(),
    data:     group
  })
}