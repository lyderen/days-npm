import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import daysRedoucer from '../reducers/days';
import notesRedoucer from '../reducers/notes';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose

export default () => {
    const store = createStore(
        combineReducers({
            days: daysRedoucer,
            notes: notesRedoucer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    
    return store;
}


// Store creation
