import axios from 'axios';

export const userLogin = (userName) => ({
    type: 'USER_LOG_IN',
    userName
});

export const startUserLogin = (user) => {
    
    // return axios.post('/user/login',{body:user});
  
    // // let msg = undefined;
    // //       axios.post('/user/login',{body:user}).then((response) => {
    // //         console.log(response);
    // //         if(response.data === ""){
    // //           msg =  'כתובת מייל או ססימא שגוי נסה שנית';
    // //         }else{
    // //             userLogin(response.data.userName);
    // //             msg = response.data.userName;
    // //         }    
    // //     }).catch((e) => {
    // //        msg = e; 
    // //     })
    // // return msg;
}


export const userLogOff = (userName) => ({
    type: 'USER_LOG_OFF',
    userName
});