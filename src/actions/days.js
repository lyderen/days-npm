
import axios from 'axios';

// ADD_DAYS

export const addDays = (day) => ({
     type: 'ADD_DAY',
     day
    });

    export const startAddDay = (dayData = {},user) => {
       return (dispatch) => {
         const {
            sourceDate = '',
            typeSuspc = '',
            timeSuspc = '',
             date = '',
             hebrewDate = '',
             createAt = 0,
             citi = '',
             sunRise = '',
             sunSet = '',
             haflagaAppend = false
         } = dayData;
         const day = {sourceDate,typeSuspc, timeSuspc, date, hebrewDate, createAt, citi, sunRise, sunSet, haflagaAppend}
         let urlServer = '/days/guest'
         console.log(day);
         if(user){
             urlServer = '/days';
         }
         axios.post(urlServer,{body:day}).then((response) => {
             dispatch(addDays({
                 ...response.data
             }));
            console.log(response);
        }).catch((e) => {
            console.log(e);
        });
    }
 }


    
   export const removeDay = ({ id } = {}) => ({
        type: 'REMOVE_DAY',
            id
    });
    

    
    export const getDays = (days) => ({
        type:'GET_DAYS',
   days
});

export const UpdateHaflaga = (id , updates) => ({
    type: 'EDIT_HAFLAGA_DAY',
    id,
    updates
 });
// make a new store acording the ids that nedd to be change acording the user req
export const startUpdateHaflaga = (idS) => {
    return (dispatch) => {
        return axios.post('/user/edithaflaga',{body: idS}).then((response) => {
            const updates = response.data;
            dispatch(UpdateHaflaga(idS,updates))
        })
    }
    
}


    export const editDay = (id , updates) => ({
        type: 'EDIT_DAY',
        id,
        updates
     });

export const startUpdateDay = (id,time) => {
   return (dispatch) => {
       return axios.post('/user/edit',{body: {id,time}}).then((response) => {
           const updates = response.data;
            dispatch(editDay(id,updates))
       })
   }

}

export  const startGetDays = () => {
    
    return(dispatch) => {
        return axios.get('days').then((response) => {
            const days = [];

              response.data.days.forEach((day) => {
                days.push(day);
              });
              dispatch(getDays(days));  
        });  
    };
};
    
    
