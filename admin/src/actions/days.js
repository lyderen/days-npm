import uuid from 'uuid'
import axios from 'axios';

// ADD_DAYS

export const addDays = (day) => ({
     type: 'ADD_DAY',
     day
    });

    export const startAddDay = (dayData = {}) => {
       return (dispatch) => {
         const {
            sourceDate = '',
            typeSuspc = '',
            timeSuspc = '',
             date = '',
             hebrewDate = '',
             createAt = 0,
             city = '',
             sunRise = '',
             sunSet = ''
         } = dayData;
         const day = {sourceDate,typeSuspc, timeSuspc, date, hebrewDate, createAt, city, sunRise, sunSet}
         console.log(day);
         axios.post('/days/guest',{body:day}).then((response) => {
             dispatch(addDays({
                 ...response.data
             }));
            console.log(response);
        }).catch((e) => {
            console.log(e);
        });
    }
 }


    
   export const removeDay = ( id ) => ({
        type: 'REMOVE_DAY',
            id
    });
    
    export const startRemoveDay = (id, creator) => {
        console.log(id,creator);
       return (dispatch) => {
           
           return axios.post('/admindashbord/data/delete',{body: { id, creator }}).then(() => {
                dispatch(removeDay(id));
           });
       }
    }

   export const editDay = (id , updates) => ({
       type: 'EDIT_DAY',
       id,
       updates
    });
    
export const getDays = (days) => ({
   type:'GET_DAYS',
   days
});

export  const startGetDays = (search) => {
    console.log(search)
    return(dispatch) => {
        return axios.post('/admindashbord/data/guest',{body: search}).then((response) => {
            const days = [];

              response.data.days.forEach((day) => {
                days.push(day);
              });
              dispatch(getDays(days));  
        });  
    };
};
    
