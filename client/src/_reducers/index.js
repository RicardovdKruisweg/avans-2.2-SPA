import { combineReducers } from 'redux';
import { users } from './user.reducer';
import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';
import { registration } from './registration.reducer';

export default combineReducers({
    users,
    authentication,
    alert,
    registration
});