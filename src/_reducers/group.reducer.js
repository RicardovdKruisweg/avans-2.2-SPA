import { groupConstants } from '../_constants';

export function groups(state = {}, action) {
  switch (action.type) {
    case groupConstants.CREATE_REQUEST:
      return { registering: true };
    case groupConstants.CREATE_SUCCESS:
      return {};
    case groupConstants.CREATE_FAILURE:
      return {};
    case groupConstants.GETMY_REQUEST:
      return {
        loading: true
      };
    case groupConstants.GETMY_SUCCESS:
      return {
        items: action.groups
      };
    case groupConstants.GETMY_FAILURE:
      return { 
        error: action.error
      };
    case groupConstants.GETBYID_REQUEST:
      return {
        loading: true
      };
    case groupConstants.GETBYID_SUCCESS:
      return {
        items: action.groups
      };
    case groupConstants.GETBYID_FAILURE:
      return { 
        error: action.error
      };
    case groupConstants.COMMENT_REQUEST:
      return {
        loading: true
      };
    case groupConstants.COMMENT_SUCCESS:
      return {
        items: action.groups
      };
    case groupConstants.COMMENT_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}