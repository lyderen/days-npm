import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import daysRedoucer from '../reducers/days';
import filtersRedoucer from '../reducers/filters';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose

export default () => {
    const store = createStore(
        combineReducers({
            days: daysRedoucer,
            filters: filtersRedoucer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    
    return store;
}


// Store creation
