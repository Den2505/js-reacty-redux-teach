import {createStore, applyMiddleware} from 'redux';
import {allReducers} from './reducers/index'
import ReduxThunk from 'redux-thunk'
import {friendsReducer} from './reducers/friedsReduser'

 const store = createStore(
    allReducers,
    applyMiddleware(ReduxThunk)
);
//export default createStore(friendsReducer);
export default store;