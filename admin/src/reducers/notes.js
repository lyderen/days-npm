// Expenses redoucer
const notesRedoucerDefaultState = [];

export default (state = notesRedoucerDefaultState , action) => {
  switch (action.type){
     
       case 'GET_NOTES':
          return action.notes;
        case 'NOTE_DONE':
          return state.filter((value) => value._id !== action.id);  
      default:
      return state;
  }
};
