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
       return  state.filter(({id}) => id !== action.id);
       case 'EDIT_DAY':
       return state.map((day) => {
           if(day._id === action.id){
               return {
                   ...day,
                   ...action.updates
               }
           }else{
               return day
           }
       });
       case 'EDIT_HAFLAGA_DAY':
          return state.map((day,i) => {
               if(day._id == action.id[0] ||day._id == action.id[1]){
                    let index = action.id.indexOf(day._id);
                   return {
                       ...day,
                       ...action.updates[index]
                   }
               } else {
                   return day
               }
          })
       // make as array that updat all much id to a new haflga append
       case 'GET_DAYS':
          return action.days;
      default:
      return state;
  }
};
