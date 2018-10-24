const {Day,DayGuest} = require('../models/days');
const {User} = require('../models/user');

const queries = (data) => {
    let resualt,
        creator,
        id,
        ari = [],
        daysCollection; // reprozent collection DayGuest || Days
        
        if(data.email) {
           id =  findUserId(data.email);
             
             if(data.typeSuspc == 'בינונית' || data.typeSuspc == 'החודש' || data.typeSuspc == 'הפלגה'){
                 resualt = id.then(async (user) => {
                   const day = await Day.find({ $and: [{ _creator: user._id }, { date: { $gt: data.startDay, $lt: data.endDay } }, { typeSuspc: data.typeSuspc }] });
                return day;       
             })
            
          } else {
                 resualt = id.then(async (user) => {
                  const day = await Day.find( { date: { $gt: data.startDay, $lt: data.endDay } } )
                     return day;       
               })
          }
            resualt = id.then(async (user) => {

           const day = await Day.find({ $and: [{ _creator: user._id }, { date: { $gt: data.startDay, $lt: data.endDay } }] });
            return day;       
          })
        } else {         
          //  creator = id.then((user) => {
            //    return  Day.find({$and : [{_creator:user._id},{ date: { $gt: data.startDay, $lt: data.endDay } } , { typeSuspc: data.typeSuspc } ] } ).then((day) => {
              //      return day
              //    })
              
              //   })          
              if(data.typeSuspc == 'בינונית' || data.typeSuspc == 'החודש' || data.typeSuspc == 'הפלגה'){
                resualt =  DayGuest.find({$and : [{ date: { $gt: data.startDay, $lt: data.endDay } } , { typeSuspc: data.typeSuspc } ] } )
                
              } else {
                resualt = DayGuest.find( { date: { $gt: data.startDay, $lt: data.endDay } } )
              } 
              
            }
  return resualt
}

const findUserId =  (email) => {
    
    return  User.findOne({email});
    
} 




module.exports = {queries};