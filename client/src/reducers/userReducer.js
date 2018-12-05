import { GET_USERS, ADD_USER, DELETE_USER, USERS_LOADING, USER_LOGIN, USER_LOGINFAILED } from '../actions/types';

const initialState = {
  users: [],
  loading: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_USERS:
      return { 
        ...state,
        users: action.payload,
        loading: false
      }
    case ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users]
      }
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload)
      }
    case USERS_LOADING:
      return {
        ...state,
        loading: true
      }
    case USER_LOGIN:
      return {
        ...state
      }
    default: 
      return state;
  }
}