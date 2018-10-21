// errors redoucer
const serverMsgRedoucerDefaultState = '';

export default (state = serverMsgRedoucerDefaultState , action) => {
  switch (action.type){
    case 'RECEIVE_MSG':
    const note = action.msg;
    return{
        ...state,
        msg
    }
      default:
      return state;
  }
};
