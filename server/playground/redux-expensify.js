import {createStore, combineReducers} from 'redux';
import uuid from 'uuid';

//ADD_EXPENSES
const addExpenses = (
{
  description = '', 
  note = '',
  amount = 0,
  createAt = 0
} = {}
) => ({
  type: 'ADD_EXPENSE',
   expense: {
    id: uuid(),
    description,
    note,
    amount,
    createAt,
   } 
});

const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
        id
});

const editExpense = (id , updates) => ({
   type: 'EDIT_EXPENSE',
   id,
   updates
});

// Expenses redoucer
const expensesRedoucerDefaultState = [];

const expensesRedoucer = (state = expensesRedoucerDefaultState , action) => {
  switch (action.type){
      case 'ADD_EXPENSE':
      return [
          ...state,
          action.expense
      ];
      case 'REMOVE_EXPENSE':
       return  state.filter(({id}) => id !== action.id);
       case 'EDIT_EXPENSE':
       return state.map((expense) => {
           if(expense.id === action.id){
               return {
                   ...expense,
                   ...action.updates
               }
           }else{
               return expense
           }
       });
      default:
      return state;
  }
};

 // filters redoucer 
const filtersRedoucerDefaultState = {
    text: '',
    sortBy: 'date', 
    startDate: undefined,
    endDate: undefined
}
 
const setTextFilter = (updates) => ({
  type: 'SET_TEXT_FILTER',
  updates
});

const sortByAmount = (updates) => ({
  type: 'SORT_BY_AMOUNT',
  updates
});

const sortByDate = () => ({
    type: 'SORT_BY_DATE',
    sortBy: 'Date'
});

const setStartDate = (update) => ({
    type: 'START_DATE',
    update
});

const setEndDate = (update) => ({
    type: 'END_DATE',
    update
});

const filtersRedoucer = (state = filtersRedoucerDefaultState ,action) => {
    switch (action.type){
        case 'SET_TEXT_FILTER':
        return {
            ...state,
            text:action.updates
        };
        case 'SORT_BY_AMOUNT':
         return {
             ...state,
             sortBy: action.updates
         };
         case 'SORT_BY_DATE':
         return {
            ...state,
            sortBy: action.sortBy
         };
         case 'START_DATE':
         return {
             ...state,
             startDate: action.update
         };
         case 'END_DATE':
         return {
             ...state,
             endDate: action.update
         };
        default:
        return state;
    }
     
}

//GET VISIBALE EXPENSES
const getVisibleState = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())
        
           return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b) => {
        if(sortBy === 'date'){
            return a.createAt < b.createAt ? 1 : -1;
        }else if (sortBy === 'amount'){
            return a.amount < b.amount ? 1 : -1;
        }
    });
};

const store = createStore(
    combineReducers({
        expenses: expensesRedoucer,
        filters: filtersRedoucer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleState(state.expenses, state.filters);
    console.log(visibleExpenses);;
});

const expenseOne = store.dispatch(addExpenses({description: 'Rent', amount: 20560, createAt: -2000}));
const expenseTow = store.dispatch(addExpenses({description: 'Coffe', amount: 2340, createAt: -240}));

// //store.dispatch(removeExpense({ id: expenseOne.expense.id}));
// store.dispatch(editExpense(expenseTow.expense.id, {amount: 1000}));

 //store.dispatch(setTextFilter('Rent'));
// store.dispatch(setTextFilter());
//store.dispatch(sortByAmount('amount'));
// store.dispatch(sortByDate());

//store.dispatch(setStartDate(11));
 store.dispatch(setStartDate());
//  store.dispatch(setEndDate(2000));

const demoState = {
    expenses: [{
        id: 'abc',
        description: 'Jenuar rent',
        note: 'this a finnal payment for that address',
        amount: 54400,
        createAt : 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', // date or amunt
        startDate: undefined,
        endDate : undefined
    }
}

