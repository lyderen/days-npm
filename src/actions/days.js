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
         axios.post('/days',{body:day}).then((response) => {
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
    
   export const editDay = (id , updates) => ({
       type: 'EDIT_DAY',
       id,
       updates
    });
    
export const getDays = (days) => ({
   type:'GET_DAYS',
   days
});

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
    
