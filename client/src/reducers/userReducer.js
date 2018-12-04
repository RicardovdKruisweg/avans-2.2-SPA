import uuid from 'uuid';
import { GET_USERS, ADD_USER, DELETE_USER } from '../actions/types';

const initialState = {
    users: [
        { id: uuid(), username: "Ricardo" },
        { id: uuid(), username: "kappa" },
        { id: uuid(), username: "lmao" },
        { id: uuid(), username: "kek" }
    ]
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_USERS:
            return { 
                ...state
            }
        case ADD_USER:
            return {
                ...state,
                users: [action.payload, ...state.users]
            }
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.payload)
            }
        default: 
            return state;
    }
}