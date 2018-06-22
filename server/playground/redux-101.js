import {createStore} from 'redux';

const incrementCount = ({incrementBy = 1} = {}) => ({
    type: 'INCREMENT',
    incrementBy   
});

const decremenetCount = ({decremenetBy = 1} = {}) => ({
   type: 'DECREMENT',
   decremenetBy
});

const setCount = ({count = 1} = {}) => ({
 type: 'SET',
 count 
});

const resetCount = () => ({
    type: 'RESET'
});

const countReducer = (state = {count : 0}, action) => {
    switch(action.type){
        case 'INCREMENT':
         return {
             count: state.count + action.incrementBy
         };
         case 'DECREMENT':
         return {
             count: state.count - action.decremenetBy
         };
         case 'RESET':
          return{
              count : 0
          };
          case 'SET':
          return {
              count : action.count
          }
         default:
         return state;
     } 
     
 };

const store = createStore(countReducer);

store.subscribe(() => {
    console.log(store.getState());
    console.log();
});

store.dispatch(decremenetCount({decremenetBy: 5}));

store.dispatch(incrementCount({incrementBy: 2}));

store.dispatch(incrementCount({incrementBy: 5}));

store.dispatch(resetCount());

store.dispatch(setCount({ count: 1000 }));


