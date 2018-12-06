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
    default:
      return state
  }
}