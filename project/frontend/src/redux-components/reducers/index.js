import {combineReducers} from 'redux';
import {friendsReducer} from './friedsReduser'

export const allReducers = combineReducers({
    friends: friendsReducer
});

