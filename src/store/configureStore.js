import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import daysRedoucer from '../reducers/days';
import userNameRedoucer from '../reducers/userName';
import filtersRedoucer from '../reducers/filters';
import noteRedoucer from '../reducers/notes';
import serverMsgRedouce from '../reducers/serverMsg';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose

export default () => {
    const store = createStore(
        combineReducers({
            UserName: userNameRedoucer,
            days: daysRedoucer,
            filters: filtersRedoucer,
            notes: noteRedoucer,
            msg: serverMsgRedouce
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    
    return store;
}


// Store creation
