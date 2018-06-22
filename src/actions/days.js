import uuid from 'uuid'

// ADD_DAYS

export const addDays = (
    {
        typeSuspc = '',
       timeSuspc = '',
        date = '',
        hebrewDate = '',
        createAt = 0,
        city = '',
        sunRise = '',
        sunSet = '',
    } = {}
    ) => ({
        type: 'ADD_DAY',
        day:{
            id: 1234,
            typeSuspc, 
            timeSuspc,
            date,
            hebrewDate,
            city,
            sunRise, 
            sunSet,
            createAt,
        }
    });

//ADD_EXPENSES
// export const addExpenses = (
//     {
//       description = '', 
//       note = '',
//       amount = 0,
//       createAt = 0
//     } = {}
//     ) => ({
//       type: 'ADD_EXPENSE',
//        expense: {
//         id: uuid(),
//         description,
//         note,
//         amount,
//         createAt,
//        } 
//     });
    
   export const removeDay = ({ id } = {}) => ({
        type: 'REMOVE_DAY',
            id
    });
    
   export const editDay = (id , updates) => ({
       type: 'EDIT_DAY',
       id,
       updates
    });
    