const moment = require ('moment');
const hebrewDate = require ('./hebrewFUN');
const suorce = require('./suorce');
const axios  = require('axios');

const calcNextSuspicuos = './calcSuspicousDays';
const getMonthString = (day) => {
       return day.getFullYear() + '-' + day.getMonth() + 1 + '-' + day.getDate();  
}

const dayMillisecond =  24*60*60*1000,
      hour = 1000 * 60 * 60,
      days28 = 2419200000,
      days30 = 2592000000,
      days31 = 2678400000,
      days57 = 4924800000,
      days62 = 5356800000;

// To DO 1 במידה ויש ווסת קבוע שהתבטלה ואחרי זמן מה חזרה לראות באותו זמן נקבעה לה ןןס תקבוע חדש
// 1.2 : במידה והיה לה ווסת ןנעקר ונקבע לה ווסת אחרת נעקר כליל הווסת הקודמת והסעיף הקודם מתבטל
 // 2: במידה ויש ווסת ועדין לא התבטלה הקביעות ראתה בזמן אחר חוששת לווסת החדש שראתב אבל עונה בינוינת לרא חושש מפני שיש לה קביעות
 // 3 : במידה ויש חשש לעונה בינונית שיקרא לאחר חשש הווסת הקבוע האחרון כתוצאה מהווסת האחרונה שקרתה בתוך ימי הקבעיות צריכה לחשוש לעונה בינונית הזו
 // 4:   חישוב ווסת במידה ונקבע לה ווסת ההפלגה שונה היא לא חוששת במידה ונקבע ווסת לסוף אוצו הזמן כל פעם מחדש דוגמא ווסת ל20 יום היא לא צריכה
//        לחשןש כל 20 יום אלא במידה ויש לה ווסת שתתקים אחקי שנקבע לה אז היא תחשוש מזמן ההוא 20 יום 
//       אלא שעקירת ווסת כזו ההיא תיהיה אכן לא שצריכה לחכות אחרי שלוש פעמים של ווסת ותבדוק אחרי 20 יום ואם לא ראתה אין קביועת וחוזרת 
//       אלא שאחרי זמן ה 60 יום (20* 3)היא חוזרת לאשה שאין לה ווסת וחוששת להכל כרגיל


// by monthDay V
// by daysBetween V
// by same Day in week V
// by time in day night day night day night day V 
// by days fixed jumpe V 
// by month fixed jumpe V
// by month day jump  15-16 V     -- 15-16-17  -- 15-16-17-18



// calculat all the type of suospicuosStrong that alpy halach and check if the susArrayDays is't have one or moore 
class calcSuspicousHachodesh {
    constructor(suspicusArray){
      this.month = suspicusArray;
    }

    // make http request to Db to save the new suspicuosStrong that allred calculated
   
     calcNextHaflaga(){
         if(this.month.length >= 2){
             if(!this.month[this.month.length - 1].haflagaAppend && !this.month[this.month.length - 2].haflagaAppend ) 
             const suspicuosDays = [],
                    firstHaflaga = this.month[this.month.length -2].sourceDate.theDay, 
                    secondHaflaga = this.month[this.month.length -1].sourceDate.theDay, 
                    nextTimeHaflaga = (secondHaflaga - firstHaflaga) + secondHaflaga,
                    suspicuosDay = {
                        typeCalc:"haflaga",
                        nextTimeHaflaga
                    };

            calcNextSuspicuos(suspicuosDay)
         }
     }


    // check if the suspicuos day hava mauch with the day of month and return array of 3 suspicuosc 
    // the BIG if is chech if day of manth mauch && that suspicuos day is't append && time of in the day is mauch && that month ist consecutive
    calcByMontDay () {
        if(this.month.length >= 3 ){
               suspicusStrong = [],
               monthNumber = this.month.map((i) => i.hebrewDate.month);

            for (let i = 0; i <= this.month.length - 1; i++ ){
                if (suspicusStrong.length === 3) {
                    break;
                }
                     while(suspicusStrong.length){
                           suspicusStrong.pop();
                      }
                 const firstime = this.month[i].hebrewDate.date; // move to next line inseide the if 
                     if(this.month[i].append == true){
                          suspicusStrong.push(this.month[i]);

                       for(let index = 1 ; index <= this.month.length -1 ; index++){
                            if(this.month[index].hebrewDate.date === firstime && this.month[index].append === true &&
                                 suspicusStrong[0].timeSuspc === this.month[index].timeSuspc &&       
                            monthNumber.indexOf(suspicusStrong[suspicusStrong.length -1].hebrewDate.month) + 1 == monthNumber.indexOf(this.month[index].hebrewDate.month)){
                                 suspicusStrong.push(this.month[index]);
                                  if (suspicusStrong.length === 3) {
                                      break;
                                  }
                            } 
                       }
                     }
            } 
            if(suspicusStrong.length < 3){
                suspicusStrong.length = 0;
            } else if(suspicusStrong == 3) {

                suspicusStrong.typeStrong = 'equalDayOfMonth';
                let objSuspicuos = {
                    typeCalc: 'dayOfMonth',
                    calculate: false,
                    date : {
                        date:suspicusStrong[suspicusStrong.length -1 ].date,
                        hebrew: suspicusStrong[suspicusStrong.length -1 ].hebrewDate,
                        timeSuspc: suspicusStrong[suspicusStrong.length -1 ].timeSuspc,
                        typeSuspc: suspicusStrong[suspicusStrong.length -1 ].typeSuspc,
                    }
                }
                let nextDaysSuspicuos = calcNextSuspicuos(objSuspicuos);
                return suspicusStrong;
            }
        }
    }

    // check in the days suspicuss to know the days between one suspicuss to next time and chheck if the next 3 also have same days between &&
    // make as strongSuspicus return a array with new 3 suspicus for the next 3 times.!
    // the Big if check 1: that suspicus appeend - 2: time suspicus in day if ist much to first - 3: the days between suspicus  -> 
    //  if ist mach the all way - 4: check if the  curent suspicus day if ist actuley ist the next time suspicus and if not 
   calcByDaysBetweenSuspicuss(){
       if(this.month.length >= 4){
           let suspicusStrong = [],
               daysBetween,
               monthNumber = this.month.map((i) => i.hebrewDate.month);

           for (let i = 0; i < this.month.length -1; i ++){
                 if (suspicusStrong.length === 4) {
                     break;
                 }
                      while(suspicusStrong.length){
                            suspicusStrong.pop();
                       }
                  if(this.month[i].append && this.month[i + 1].append && this.month[i].timeSuspc == this.month[i + 1].timeSuspc ){
                      let firsTime = this.month[i].date,
                          secondTime = this.month[ i + 1].date;
                          daysBetween = parseInt((secondTime - firsTime) / dayMillisecond);
                          suspicusStrong.push(this.month[i], this.month[i + 1]);

                      for(let index = i + 2;index <= this.month.length -1; index ++){
                           if(this.month[index].append && this.month[index].timeSuspc == suspicusStrong[0].timeSuspc){
                             if(parseInt((this.month[index].date  - suspicusStrong[suspicusStrong.length -1].date) / dayMillisecond) == daysBetween || 
                                parseInt((this.month[index].date  - suspicusStrong[suspicusStrong.length -1].date + hour) / dayMillisecond) == daysBetween){
                                  if( monthNumber.indexOf(suspicusStrong[suspicusStrong.length -1].hebrewDate.month) + 1 == monthNumber.indexOf(this.month[index].hebrewDate.month)){
                                        
                                  suspicusStrong.push(this.month[index]);
                                  if(suspicusStrong.length == 4){
                                      break;
                                  }
                                }
            
                             }
                          } 
                       }     
                  }                
              }
              if(suspicusStrong.length < 4){
                suspicusStrong.length = 0;
            } else if (suspicusStrong.length == 4) {

                suspicusStrong.typeStrong = 'DaysBetweenSuspicuss';
               let objSuspicuos = {
                    typeCalc: 'daysBetween',                
                    timeSuspc: suspicusStrong[suspicusStrong.length -1 ].timeSuspc,
                    typeSuspc: suspicusStrong[suspicusStrong.length -1 ].typeSuspc,
                    calculate: daysBetween,
                    date : {
                        date:suspicusStrong[suspicusStrong.length -1 ].date,
                        hebrew: suspicusStrong[suspicusStrong.length -1 ].hebrewDate,
                    }
                }
                let nextDaysSuspicuos = calcNextSuspicuos(objSuspicuos);
            }
            return suspicusStrong;
           } 
    }
  
    // check in the days suspicuss in week day if ist 3 time same week day  &&
    // make as strongSuspicus return a array with new 3 suspicus for the next 3 times.!
    // the Big if check 1: that suspicus appeend - 2: time suspicus in day if ist much to first  -> 
    //   3: check if the  curent suspicus day if ist actuley ist the next time suspicus and if not 
     calcByWeekDaySuspicuss (){
         if(this.month.length >= 4){
             let suspicusStrong = [],
                 weekBetween,
             monthNumber = this.month.map((i) => i.hebrewDate.month);
              for(let i = 0; i < this.month.length - 1; i++){ // make less the hieget iiteraiton not to be 2 from the lass 
                   if (suspicusStrong.length === 4) {
                       break;
                   }
                        while(suspicusStrong.length){
                              suspicusStrong.pop();
                         }
                  if(this.month[i].append && this.month[i + 1].append){
                       if(this.month[i].timeSuspc === this.month[i + 1].timeSuspc){
                           if(new Date(this.month[i].date).getDay() == new Date(this.month[i + 1].date).getDay()){
                               weekBetween = (this.month[i + 1].date - this.month[i].date)  / dayMillisecond / 7;
                                suspicusStrong.push(this.month[i],this.month[i + 1]);
                                for(let index = i +2; index <= this.month.length - 1; index++){
                                    if(this.month[index].append){
                                        if(this.month[index].timeSuspc == suspicusStrong[0].timeSuspc){
                                            if(new Date(this.month[index].date).getDay() == new Date(suspicusStrong[suspicusStrong.length -1].date).getDay()){
                                                if((this.month[index].date - suspicusStrong[suspicusStrong.length -1].date) / dayMillisecond / 7 == weekBetween || 
                                                    (this.month[index].date - suspicusStrong[suspicusStrong.length -1].date + hour) / dayMillisecond / 7 == weekBetween ||
                                                (this.month[index].date - suspicusStrong[suspicusStrong.length -1].date - hour) / dayMillisecond / 7 == weekBetween){
                                                    
                                                    if(monthNumber.indexOf(suspicusStrong[suspicusStrong.length -1].hebrewDate.month) + 1 == monthNumber.indexOf(this.month[index].hebrewDate.month)){
                                                        suspicusStrong.push(this.month[index]);
                                                        if(suspicusStrong.length == 4){
                                                            break;
                                                        }
                                                    }
                                                }
                                          }
                                        }
                                    }
                                }
                           }
                       }
                  }
              }
              if(suspicusStrong.length < 4){
                suspicusStrong.length = 0;
            }else if (suspicusStrong.length == 4) {    
                 suspicusStrong.typeStrong = 'WeekDaySuspicuos';
                let objSuspicuos = {
                     typeCalc: 'weekDay',                
                     timeSuspc: suspicusStrong[suspicusStrong.length -1 ].timeSuspc,
                     typeSuspc: suspicusStrong[suspicusStrong.length -1 ].typeSuspc,
                     calculate: weekBetween,
                     date : {
                         date:suspicusStrong[suspicusStrong.length -1 ].date,
                         hebrew: suspicusStrong[suspicusStrong.length -1 ].hebrewDate,
                     }
                 }
                 let nextDaysSuspicuos = calcNextSuspicuos(objSuspicuos);
             }
                  suspicusStrong.typeStrong = 'equalDayInWeekSuspicus';
              return suspicusStrong;
         }
         
     }
     

     // check the days between suspicuos the test is fo finde the days between one to next ist evrey time is groow up exmepel > 
     // the first time between tow suspicuos is 31 days the next between tow ist 32 the next ist 33 == asum the next groo and groo
     // the LONG IF chek 1 - the day ist append -- 2 - the time in day ist mach -- 3 the cuorent suspicuos ist realy the next time > 
     // suspicuos that append next if check if is 3 then check days between if is FixedJumps
     calcByDaysFixedJumps(){
         if(this.month.length >= 4){
             let suspicusStrong = [],
                 monthNumber = this.month.map((i) => i.hebrewDate.month),
                 daysBetweenArray = [],
                 isMach = false;

                 for(let i = 0; i < this.month.length - 1; i++){
                    if (suspicusStrong.length === 4 && isMach) {
                        break;
                    }
                         while(suspicusStrong.length){
                               suspicusStrong.pop();
                          }
                          daysBetweenArray.length = 0;
                     if(this.month[i].append && this.month[i + 1].append){
                         if(this.month[i].timeSuspc == this.month[i + 1].timeSuspc){
                             let firstsDaysBetween = (this.month[i + 1].date - this.month[i].date) / dayMillisecond;
                                 daysBetweenArray.push(parseInt(firstsDaysBetween));
                               suspicusStrong.push(this.month[i], this.month[i + 1]);

                                for(let index = i + 2; index < this.month.length -1; index++) {
                                     if(this.month[index].append){
                                         if(this.month[index].timeSuspc == suspicusStrong[0].timeSuspc){
                                             if(monthNumber.indexOf(suspicusStrong[suspicusStrong.length -1].hebrewDate.month) + 1 == monthNumber.indexOf(this.month[index].hebrewDate.month)){
                                                 daysBetweenArray.push(parseInt((this.month[index].date - suspicusStrong[suspicusStrong.length -1 ].date)/ dayMillisecond));
                                                 suspicusStrong.push(this.month[index]);
                                                 if(daysBetweenArray.length == 3){
                                                     if(daysBetweenArray[1] - daysBetweenArray[0] == daysBetweenArray[2] - daysBetweenArray[1] &&
                                                        daysBetweenArray[1] - daysBetweenArray[0] != 0 && daysBetweenArray[2] - daysBetweenArray[1] != 0){
                                                         isMach = true;
                                                         if(suspicusStrong.length == 4 ){
                                                             break;
                                                         }
                                                     }else {
                                                        break;
                                                     }
                                                 }
                                             }
                                         }
                                     }   
                                }
                         }
                     }
                 }
                 if(suspicusStrong.length < 4){
                    suspicusStrong.length = 0;
                }else if (suspicusStrong.length == 4) {    
                   let objSuspicuos = {
                        typeCalc: 'daysFixedJumps',                
                        timeSuspc: suspicusStrong[suspicusStrong.length -1 ].timeSuspc,
                        typeSuspc: suspicusStrong[suspicusStrong.length -1 ].typeSuspc,
                        calculate: daysBetweenArray[daysBetweenArray.length -1],
                        daysBetween: daysBetweenArray[daysBetweenArray.length -1] - daysBetweenArray[daysBetweenArray.length -2],
                        date : {
                            date:suspicusStrong[suspicusStrong.length -1 ].date,
                            hebrew: suspicusStrong[suspicusStrong.length -1 ].hebrewDate,
                        }
                    }
                    let nextDaysSuspicuos = calcNextSuspicuos(objSuspicuos);
                }
                 suspicusStrong.typeStrong = 'DaysFixedJumpsSuspicuss';
                 return suspicusStrong;
         }
     }

     // check the day of month if ist same day evry timr and ist also jumpe mmonth evry time 1/1/2018 - 1/3/2018 - 1/5/2018
     // then havaing suspicuosStrong and returen array strong suspicuos
     // the Big if  1: check if the actualy days between ist actult moor then 50 days == that min 2 month between the times
     //              2: time in day same? - 3: they ar month actualy one after anthur - 4: check the hebrew date ist same
     calcByMonthFixedJumpe () {
         if(this.month.length >= 3 ){
            let suspicusStrong = [],
            monthNumber = this.month.map((i) => i.hebrewDate.month);
            const intervalDays = 4320000000;

             for(let i = 0; i <= this.month.length -1; i++){
                if (suspicusStrong.length === 3) {
                    break;
                }
                     while(suspicusStrong.length){
                           suspicusStrong.pop();
                      }
                    if(this.month[i].append){
                        suspicusStrong.push(this.month[i]);
                         for(let index = i +1; index <= this.month.length -1; index++){
                             if(this.month[index].append){
                                 if(this.month[index].date - suspicusStrong[suspicusStrong.length -1].date > days57 && this.month[index].date - suspicusStrong[suspicusStrong.length -1].date < days6){
                                     if(this.month[index].timeSuspc == suspicusStrong[suspicusStrong.length -1 ].timeSuspc){
                                         if(monthNumber.indexOf(suspicusStrong[suspicusStrong.length -1].hebrewDate.month) + 1 == monthNumber.indexOf(this.month[index].hebrewDate.month)){
                                             if(this.month[index].hebrewDate.date == suspicusStrong[suspicusStrong.length -1].hebrewDate.date){
                                                 suspicusStrong.push(this.month[index]);
                                                     if(suspicusStrong.length == 3 ){
                                                         break;
                                                        }
                                                }
                                         }
                                     }
                                 }
                             }
                         }
                    }

             }
             if(suspicusStrong.length < 3){
                 suspicusStrong.length = 0;
             } else if (suspicusStrong.length == 3) {    
                let objSuspicuos = {
                     typeCalc: 'monthFixedJumpe',                
                     timeSuspc: suspicusStrong[suspicusStrong.length -1 ].timeSuspc,
                     typeSuspc: suspicusStrong[suspicusStrong.length -1 ].typeSuspc,
                     date : {
                         date:suspicusStrong[suspicusStrong.length -1 ].date,
                         hebrew: suspicusStrong[suspicusStrong.length -1 ].hebrewDate,
                     }
                 }
                 let nextDaysSuspicuos = calcNextSuspicuos(objSuspicuos);
             }
             suspicusStrong.typeStrong = 'monthFixedJumpeSuspicuos';
             return suspicusStrong;
         }
     }

     // check if the suspicuos return evrey tow month at same day of month: first month second day of month -- 1/14 2/15 3/14 4/15 5/14 5/15
     // 
     calcByDayOfMonthFixedJumpe (){
         if(this.month.length >= 6 ){
            let suspicusStrong = [],                                                                                                                                                  
            monthNumber = this.month.map((i) => i.hebrewDate.month);
              let checkDaysBetween = this.month.filter((val)  => val.hebrewDate.date == this.month[0].hebrewDate.date);
                        const dateOfsuspicuosDays = [];

                        for(let i = 0; i <= this.month.length -3; i++){
                            if (suspicusStrong.length === 6) {
                                break;
                            }
                                 while(suspicusStrong.length){
                                       suspicusStrong.pop();
                                  }

                            if(this.month[i].hebrewDate.date + 1 == this.month[i + 1].hebrewDate.date){ //add moor if to check if between this 2 sus 1 month
                                if(this.month[i].append && this.month[i + 1].append){
                                    if(this.month[i].timeSuspc == this.month[i +1].timeSuspc){
                                        suspicusStrong.push(this.month[i],this.month[i + 1]);
                                        for(let index = i +2; index < this.month.length - 1; ){
                                              if(this.month[index].append && this.month[index + 1].append){
                                                  if(this.month[index].hebrewDate.date + 1 == this.month[index +1].hebrewDate.date ){
                                                      if(this.month[index].timeSuspc == suspicusStrong[suspicusStrong.length -1].timeSuspc){
                                                          if(this.month[index + 1].timeSuspc == suspicusStrong[suspicusStrong.length -1].timeSuspc){
                                                             if(monthNumber.indexOf(suspicusStrong[suspicusStrong.length -1].hebrewDate.month) + 1 == monthNumber.indexOf(this.month[index].hebrewDate.month)){
                                                                 if(this.month[index].hebrewDate.date == suspicusStrong[0].hebrewDate.date && this.month[index +1].hebrewDate.date == suspicusStrong[1].hebrewDate.date){
                                                                     if(suspicusStrong.length == 6){
                                                                         break;
                                                                     }
                                                                     suspicusStrong.push(this.month[index],this.month[index +1]);
                                                                     index += 2;
                                                                     continue;
                                                                 }
                                                             }  
                                                        }
                                                    }
                                                }
                                            }
                                            index++;
                                        }
                                    }
                                }
                            }
                        }
              if(suspicusStrong.length < 6){
                  suspicusStrong.length = 0;
              }else if (suspicusStrong.length == 6){    
                let objSuspicuos = {
                     typeCalc: 'dayOfMonthFixedJumpe',                
                     timeSuspc: suspicusStrong[suspicusStrong.length -1 ].timeSuspc,
                     typeSuspc: suspicusStrong[suspicusStrong.length -1 ].typeSuspc,
                    firstDay: {
                        date:suspicusStrong[suspicusStrong.length -2 ].date,
                        hebrew: suspicusStrong[suspicusStrong.length -2 ].hebrewDate,  
                    },
                     date : {
                         date:suspicusStrong[suspicusStrong.length -1 ].date,
                         hebrew: suspicusStrong[suspicusStrong.length -1 ].hebrewDate,
                     }
                 }
                 let nextDaysSuspicuos = calcNextSuspicuos(objSuspicuos);
             }
              suspicusStrong.typeStrong = 'dayOfMonthFixedJumpeSuspicuos';
              return suspicusStrong;
            
         }

      }
      
      // check the suspicuos if the have jupe at the time of day exm: 1tim - day 2tim - night 3time - day, 4time - night, 5tim - day, 6tim - night
      // then return the suspucous & caculat at diftretnt file the next suspicuos that will be prepr for theam 
      // the BIG if check 1: suspisuos ist append. 2: the suspicuos that looking have a sa,m hebrwe day. 3: the suspcius actuly 1 after 1 
      //                  4: the suspicuos time in day 
      calcByMonthFixedJumpeTimeDay (){
          if(this.month.length >= 6){
            let suspicusStrong = [],                                                                                                                                                  
            monthNumber = this.month.map((i) => i.hebrewDate.month);
              let checkDaysBetween = this.month.filter((val)  => val.hebrewDate.date == this.month[0].hebrewDate.date);
                        const dateOfsuspicuosDays = [];
            for(let i = 0; i <= this.month.length - 2; i ++){
                if (suspicusStrong.length === 6) {
                    break;
                }
                     while(suspicusStrong.length){
                           suspicusStrong.pop();
                      }
            if(this.month[i].append && this.month[i + 1].append){
                if(this.month[i].hebrewDate.date == this.month[i + 1].hebrewDate.date){
                    if(this.month[i].timeSuspc != this.month[i + 1].timeSuspc){
                        if(this.month[i +1].date - this.month[i].date  <= days30){
                            suspicusStrong.push(this.month[i],this.month[i +1]);
                            for(let index = i +2; index < this.month.length -2;){
                                  if(this.month[index].append && this.month[index].append){
                                      if(this.month[index].hebrewDate.date == suspicusStrong[0].hebrewDate.date && this.month[index +1].hebrewDate.date == suspicusStrong[0].hebrewDate.date){
                                             if(this.month[index +1].date - this.month[index].date  <= days30){
                                                if(this.month[index].timeSuspc == suspicusStrong[0].timeSuspc && this.month[index +1].timeSuspc == suspicusStrong[1].timeSuspc){
                                                    suspicusStrong.push(this.month[index],this.month[index +1]);
                                                    if(suspicusStrong.length == 6){
                                                        break;
                                                    }
                                                    index += 2;
                                                    continue;
                                                }
                                             }                                        
                                      }
                                  }
                                  index++;
                            }
                        }
                    }
                 }

              }
            }
            if(suspicusStrong.length < 6){
                suspicusStrong.length = 0;
            }else if (suspicusStrong.length == 6){    
                let objSuspicuos = {
                     typeCalc: 'dayOfMonthFixedJumpeTimeDay',                
                     timeSuspc: suspicusStrong[suspicusStrong.length -1 ].timeSuspc,
                     typeSuspc: suspicusStrong[suspicusStrong.length -1 ].typeSuspc,
                    firstDay: {
                        date:suspicusStrong[suspicusStrong.length -2 ].date,
                        hebrew: suspicusStrong[suspicusStrong.length -2 ].hebrewDate,
                        timeSuspc: suspicusStrong[suspicusStrong.length -2 ].timeSuspc, 
                    },
                     date : {
                         date:suspicusStrong[suspicusStrong.length -1 ].date,
                         hebrew: suspicusStrong[suspicusStrong.length -1 ].hebrewDate,
                     }
                 }
                 let nextDaysSuspicuos = calcNextSuspicuos(objSuspicuos);
             }
            suspicusStrong.typeStrong = 'dayOfMonthFixedJumpeTimeDaySuspicuos';
            return suspicusStrong;

          }
      }
      
    }

console.log(suorce.length)

 const hachudeshArray = suorce.filter((value) => value.typeSuspc == 'החודש'),
      beinonintArray = suorce.filter((value) => value.typeSuspc == 'בינונית');
      haflagaArray = suorce.filter((value) => value.typeSuspc == 'הפלגה'); 
      
      const hachudesh = new calcSuspicousHachodesh(hachudeshArray);
      
   console.log(hachudesh.calcByMontDay());
   console.log(hachudesh.calcByDaysBetweenSuspicuss())
   console.log(hachudesh.calcByWeekDaySuspicuss())
   console.log(hachudesh.calcByDaysFixedJumps())
   console.log(hachudesh.calcByMonthFixedJumpe()); // if is true full then cancel the calcByMantDay
   console.log(hachudesh.calcByDayOfMonthFixedJumpe());
   console.log(hachudesh.calcByMonthFixedJumpeTimeDay())



























