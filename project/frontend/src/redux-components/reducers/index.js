import {combineReducers} from 'redux';
import {friendsReducer, authenticatedUserReducer} from './friedsReduser'

export const allReducers = combineReducers({
    friends: friendsReducer,
    AuthenticatedUser:authenticatedUserReducer
});

