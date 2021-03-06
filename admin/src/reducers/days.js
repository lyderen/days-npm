// Expenses redoucer
const daysRedoucerDefaultState = [];

export default (state = daysRedoucerDefaultState , action) => {
  switch (action.type){
      case 'ADD_DAY':
      return [
          ...state,
          action.day
      ];
      case 'REMOVE_DAY':
       return  state.filter((value) => value._id !== action.id);
       case 'EDIT_DAY':
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
       case 'GET_DAYS':
          return action.days;
      default:
      return state;
  }
};
