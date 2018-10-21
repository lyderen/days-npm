
const dayMillisecond =  24*60*60*1000;
  
const getDate = (date,hebrewMonthDay) => {
    let cauonterDays = date + days28,     
     nextTimeDay = new Date(cauonterDays),
     hebrewDay;
        
    for (let i = 1; i < 35 ; i++){
          hebrewDay = hebrewDate(nextTimeDay.getFullYear(), nextTimeDay.getMonth() + 1 ,nextTimeDay.getDate());
         if(hebrewDay.date != hebrewMonthDay){
             nextTimeDay = new Date(cauonterDays + (dayMillisecond * i));
             hebrewDay = hebrewDate(nextTimeDay.getFullYear(), nextTimeDay.getMonth() + 1 ,nextTimeDay.getDate());
         } else if(hebrewDay.date == hebrewMonthDay){
             break;
         }
    }
    let nextDayNum = nextTimeDay.getTime();
      return {nextDayNum,hebrewDay};     
  };

  const getNextHflagaDay = (susDay) => {
     const cuorentDay = susDay;


  }
  const getDayOfMonth = (susDay) => {
      let dateSuspicous = [];
          
          dateSuspicous.push(getDate(susDay.date.date,susDay.date.hebrew.date));

      for(let i = 1; i < 3; i++){
          dateSuspicous.push(getDate(dateSuspicous[i -1].nextDayNum,susDay.date.hebrew.date));       
      }
      return dateSuspicous;
  };

  const getNextDaysBetween = (susDay) => {
      let dateSuspicous = [];
     
 for (let i = 1; i <= 3; i ++) {
    let nextDayNum = susDay.date.date + (susDay.calculate * i * dayMillisecond),
    day = new Date(nextDayNum),
    hebrewDay = hebrewDate(day.getFullYear(), day.getMonth() + 1 ,day.getDate());

      dateSuspicous.push({nextDayNum,hebrewDay});
      }

      return dateSuspicous;
  }
 
 const getNextWeekDay = (susDay) =>{
    let dateSuspicous = [];
        
        for(let i = 1; i <= 3; i++){
           let nextDayNum = susDay.date.date + (susDay.calculate * i * 7 * dayMillisecond),
            day = new Date(nextDayNum),
            hebrewDay = hebrewDate(day.getFullYear(), day.getMonth() + 1 ,day.getDate());
    
            dateSuspicous.push({nextDayNum,hebrewDay});
        }
        return dateSuspicous;
  }
  
  const getNextDaysFixedJumps  = (susDay) => {
      let dateSuspicous = [],
         nextDayNum = susDay.date.date + (susDay.calculate  * dayMillisecond * susDay.daysBetween),
         day  = new Date(nextDayNum),
         hebrewDay = hebrewDate(day.getFullYear(), day.getMonth() + 1 ,day.getDate());
          
         dateSuspicous.push({nextDayNum,hebrewDay});

      for(let i = 1; i < 3; i++){
             nextDayNum = dateSuspicous[dateSuspicous.length -1].nextDayNum + ((susDay.calculate * dayMillisecond) + (susDay.daysBetween * i * dayMillisecond)),
             day  = new Date(nextDayNum),
             hebrewDay = hebrewDate(day.getFullYear(), day.getMonth() + 1 ,day.getDate());

             dateSuspicous.push({nextDayNum,hebrewDay});

      }
      return dateSuspicous;

  }

  const getNextMonthFixedJumpe = (susDay) => {
       let dateSuspicous = [],
           numDay = susDay.date.date + (28 * dayMillisecond);
              
           dateSuspicous.push(getDate(numDay,susDay.date.hebrew.date));
       for(let i = 1; i < 3; i++){
            numDay = dateSuspicous[dateSuspicous.length -1].nextDayNum + (28  * dayMillisecond);

           dateSuspicous.push(getDate(numDay,susDay.date.hebrew.date));
       }
       return dateSuspicous;
  }

  const getNextDayOfMonthFixedJumpe = (susDay) => {
      let dateSuspicous = [],  
          firstTime = susDay.firstDay,
          secondDay = susDay.date;

          dateSuspicous.push(getDate(secondDay.date,firstTime.hebrew.date))

          for(let i = 1; i < 6; i++) { 
                if(i % 2 != 0){
                    dateSuspicous.push(getDate(dateSuspicous[i - 1].nextDayNum,secondDay.hebrew.date));
                } else if(i % 2 == 0) {
                    dateSuspicous.push(getDate(dateSuspicous[i - 1].nextDayNum,firstTime.hebrew.date));
                }
          }
          return dateSuspicous;
  }


  // ***make shoor that eche supisuco got the right time of day thet is goona hpeend apper to the original suspicus***
  const getNextDayOfMonthFixedJumpeTimeDay = (susDay) => {
      let dateSuspicous = [],
          firstTime = susDay.firstDay,
          secondTime = susDay.date;

          dateSuspicous.push(getDate(susDay.date.date,susDay.date.hebrew.date));
          dateSuspicous[0].timeSuspc = firstTime.timeSuspc;

          for(let i = 1; i < 6; i++){
              if( i % 2 != 0){
                  dateSuspicous.push(getDate(dateSuspicous[ i - 1].nextDayNum,susDay.date.hebrew.date));
                  dateSuspicous[i].timeSuspc = susDay.timeSuspc;
              }else if(i % 2 == 0){
                dateSuspicous.push(getDate(dateSuspicous[ i - 1].nextDayNum,susDay.date.hebrew.date));
                dateSuspicous[i].timeSuspc = firstTime.timeSuspc;
              }
          }
          return dateSuspicous;
  }

export default calcNextSuspicuos = (sus) => {
    
let suspicuos;
      switch (sus.typeCalc){
          case 'haflaga':{
              suspicuos = getNextHflagaDay(sus);
              break;
          }
        case 'dayOfMonth':{
           suspicuos =  getDayOfMonth(sus);
           break;
        }
        case 'daysBetween': {
            suspicuos = getNextDaysBetween(sus);
            break;
        } 
        case 'weekDay': {
            suspicuos = getNextWeekDay(sus);
            break;
        }
        case 'daysFixedJump':{
            suspicuos = getNextDaysFixedJumps(sus);
            break;
        }
        case 'monthFixedJumpe':{
            suspicuos = getNextMonthFixedJumpe(sus);
            break;
        }
        case 'dayOfMonthFixedJumpe': {
            suspicuos = getNextDayOfMonthFixedJumpe(sus);
            break;
        }
        case 'dayOfMonthFixedJumpeTimeDay':{
            suspicuos =  getNextDayOfMonthFixedJumpeTimeDay(sus);
            break;
        }

        default:
        return sus;
    
    }
  
    return suspicuos;
  
};