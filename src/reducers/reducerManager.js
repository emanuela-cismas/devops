import loginReducer from './loginState';
import roleReducer from './roleState';
import userIdReducer from './userIdState';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    isLogged: loginReducer,
    isAdmin: roleReducer,
    userId: userIdReducer
});

export default allReducers;