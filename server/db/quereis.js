const {Day,DayGuest} = require('../models/days');


const queries = (data) => {
    let resualt;
    
    if(data.typeSuspc == 'בינונית' || data.typeSuspc == 'החודש' || data.typeSuspc == 'הפלגה'){
      resualt =  DayGuest.find({$and : [{ date: { $gt: data.startDay, $lt: data.endDay } } , { typeSuspc: data.typeSuspc } ] } )
           
      } else {
         resualt = DayGuest.find( { date: { $gt: data.startDay, $lt: data.endDay } } )
        } 
        
  return resualt
}


module.exports = {queries};