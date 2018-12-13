import { userConstants } from '../_constants';

const initialState = {
  items: [],
  loading: false,
  error: null
};

export function users(state = initialState, action) {
  switch (action.type) {
    case userConstants.GETAVAILABLE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GETAVAILABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.users
      };
    case userConstants.GETAVAILABLE_FAILURE:
      return { 
        ...state,
        error: action.error
      };
    case userConstants.DELAVAILABLE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.DELAVAILABLE_SUCCESS:
      console.log(state);
      return {
        ...state,
        loading: false,
        items: state.items.filter(item => item._id !== action.payload)
      };
    case userConstants.DELAVAILABLE_FAILURE:
      return { 
        ...state,
        error: action.error
      };
    default:
      return state
  }
}