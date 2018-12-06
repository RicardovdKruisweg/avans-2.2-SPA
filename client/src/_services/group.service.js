import axios from 'axios';
import { authHeader } from '../_helpers/auth-header';

export const groupService = {
  getMy,
  comment,
  create
};

function getMy (id) {
  const requestOptions = {
    headers: authHeader()
  };

  const group = axios.get(`/groups/${id}`, requestOptions);
  console.log(group)
  return group
}

function comment () {

}

function create (group) {

}