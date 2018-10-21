import moment from 'moment';
import hebrewDate from '../calendar/hebrew-dateFUN.js';

import createObjectDaySuspicious from './createObjectDaySuspicios';

export default (dayPick,theDay, timeSuspc, index) => {  

    let nextTimeSus = [];
    const day = theDay.getDate(),
    month = theDay.getMonth(),
    year = theDay.getFullYear(),  
    getDay = new Date(year,month,day),
    sourceDate = {
        theDay: theDay.getTime(),
        hebrew: hebrewDate(theDay.getFullYear(),theDay.getMonth() + 1,theDay.getDate())
    };  // add hebrewDate ethier


      // day of suspicious of benonint & hachoudesh
      let targetDay = moment(getDay).add(29,'days');
      let hebrew = hebrewDate(targetDay._d.getFullYear(),targetDay._d.getMonth() + 1,targetDay._d.getDate());
      
     if(index == 1){
        nextTimeSus = {
            typeSus: 'בינונית',
            timeSuspc: 'יממה',
            targetDay,
            hebrew,
            sourceDate
          }
     }else {
        if (dayPick === hebrew.date){
             nextTimeSus = {
                 typeSus: 'החודש',
                 timeSuspc,
                 targetDay,
                 hebrew,
                 sourceDate
               }
           } else {
               // fix the day!!!  || make a caunter days between thr tow days if the have a 30 days between
               targetDay = moment(getDay).add(30,'days');
                hebrew = hebrewDate(targetDay._d.getFullYear(),targetDay._d.getMonth() + 1,targetDay._d.getDate());
                   // check if the days between last suspicuos days and new day(target day) theer a 30 days between
                     if(parseInt((new Date(targetDay._d).getTime() - new Date(targetDay._i).getTime()) / (24*60*60*1000)) == 30 || dayPick === hebrew.date){
                     nextTimeSus = {
                         typeSus: 'החודש',
                         timeSuspc,
                         targetDay,
                         hebrew,
                         sourceDate
                       }
               }  
           }
     }
  return nextTimeSus;
}