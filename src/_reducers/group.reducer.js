import { groupConstants } from '../_constants';

const initialState = {
  items: [],
  loading: false,
  error: null
};

export function groups(state = initialState, action) {
  switch (action.type) {
    case groupConstants.CREATE_REQUEST:
      return { 
        ...state,
        loading: true 
      };
    case groupConstants.CREATE_SUCCESS:
      return {  
        ...state,
        loading: false,
        items: [action.group, ...state.items]
      };
    case groupConstants.CREATE_FAILURE:
      return {};
    case groupConstants.GETMY_REQUEST:
      return {
        loading: true
      };
    case groupConstants.GETMY_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.groups
      };
    case groupConstants.GETMY_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case groupConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true
      };
    case groupConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.groups
      };
    case groupConstants.GETBYID_FAILURE:
      return { 
        ...state,
        loading: false,
        error: action.error
      };
    case groupConstants.COMMENT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case groupConstants.COMMENT_SUCCESS:
      console.log("reducer");
      console.log(action.groups);
      return {
        ...state,
        items: action.groups,
        loading: false
      };
    case groupConstants.COMMENT_FAILURE:
      return { 
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state
  }
}