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
        loading: false,
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
    case groupConstants.ADDUSER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case groupConstants.ADDUSER_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload
      };
    case groupConstants.ADDUSER_FAILURE:
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
    case groupConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case groupConstants.UPDATE_SUCCESS:
      const newItems = updateObjectInArray(state.items, action);
      return {
        ...state,
        loading: false,
        items: newItems
      }
    case groupConstants.UPDATE_FAILURE:
      return { 
        ...state,
        loading: false,
        error: action.error
      };
    case groupConstants.DELETE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case groupConstants.DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.filter(item => item._id !== action.payload)
      }
    case groupConstants.DELETE_FAILURE:
      return { 
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state
  }
}

function updateObjectInArray(array, action) {
  return array.map((item, index) => {
    if (item._id !== action.payload._id) {
      // This isn't the item we care about - keep it as-is
      return item
    }

    // Otherwise, this is the one we want - return an updated value
    return {
      ...item,
      ...action.payload
    }
  });
}