// userName redoucer
const userNameRedoucerDefaultState = '';

export default (state = userNameRedoucerDefaultState , action) => {
  switch (action.type){
    // case 'USER_LOG_IN':
    // const userName = action.userName;
    // return{
    //     ...state,
    //     userName
    // }
      case 'USER_LOG_OFF':
           return 'Helo Guest';
      default:
      return state;
  }
};
