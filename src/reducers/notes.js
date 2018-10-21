// notes redoucer
const notesRedoucerDefaultState = '';

export default (state = notesRedoucerDefaultState , action) => {
  switch (action.type){
    case 'USER_SEND_NOTE':
    const note = action.note;
    return note;
      default:
      return state;
  }
};
