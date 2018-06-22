import hebrewDate from './hebrew-dateFUN';
import moment from 'moment';
// get the hebrew date from npm libary hebrew-date >
// and get the courent month - prevoius month - next month >
// for each pressing button previous/next month 
//
// get the current month and printrd
// get the next month and printed
// get the prevous month and printed 

// get the all hebrew-date at courent month
function currentMonthDays () {
    var allDays = [],
   year = new Date().getFullYear(),
   month = new Date().getMonth() + 1,
   day = new Date().getDate();
  
  var collectDays,
   DayObj = hebrewDate(year,month,day);
  
    //all hebrew day from the beginng the month till today
  for(var i = DayObj.date; i > 0; i--){
  
      var momentDay = moment().subtract(i - 1,'days').format("YYYY/MM/DD");
      
      var dateSplit = momentDay.split('/');
      var yearSplit = parseInt(dateSplit[0]);
      var monthSplit = parseInt(dateSplit[1]);
      var daySplit = parseInt(dateSplit[2]);
      var weekDay  = new Date(momentDay).getDay() + 1;
      
  var DAY = moment(momentDay);
  
      var collectDays = hebrewDate(yearSplit,monthSplit,daySplit);
      collectDays.weekDay = weekDay;
      collectDays.DAY = DAY._d;
      allDays.push(collectDays);
  }
  
  // geting the length to know hwo many day allrady have the arry to subtruct from the 30 days of the hebrew month
  var lastDay = allDays[allDays.length-1].date;
  
  // all days from now till the end of the month 
  for (var i = 1; i <= 30 - lastDay ; i++){ 
      var momentDay = moment().add(i,'d').format('YYYY/MM/DD');
      var DAY = moment(momentDay);
  
      var dateSplit = momentDay.split('/');
      var yearSplit = parseInt(dateSplit[0]);
      var monthSplit = parseInt(dateSplit[1]);
      var daySplit = parseInt(dateSplit[2]);
      var weekDay  = new Date(momentDay).getDay() + 1;
  
      var collectDays = hebrewDate(yearSplit,monthSplit,daySplit);
      collectDays.weekDay = weekDay;
      collectDays.DAY = DAY._d;
      allDays.push(collectDays);
  }
     if(allDays[allDays.length -1].month != allDays[allDays.length -2].month ){
         allDays.pop();
      }
     
  return allDays;
  };
  
     // get all hebrew days at the current month
    export const days = currentMonthDays();
      var displayMonthToUi = days;
      console.log(displayMonthToUi);

      // geting all hebrew day of next month
     var clickToNextMonth = (month) =>  {
          var NextMonthDays = [];
          var firstDayNextMonth = month[month.length - 1].DAY;
          
          for(var i = 1; i <= 30;i++){                
               var year = firstDayNextMonth.getFullYear();
               var month =  firstDayNextMonth.getMonth() + 1;
               var monthDay =  firstDayNextMonth.getDate() + i;
               
               var collectDays = hebrewDate(year,month, monthDay)
               collectDays.DAY = new Date(firstDayNextMonth.getFullYear(),firstDayNextMonth.getMonth(),
                                         firstDayNextMonth.getDate()+ i); 
               collectDays.weekDay = collectDays.DAY.getDay() + 1;          
               NextMonthDays.push(collectDays);
           }     
             if(NextMonthDays[NextMonthDays.length -1].month != NextMonthDays[NextMonthDays.length -2].month ){
                    NextMonthDays.pop();
                  }
                  return NextMonthDays;
     };
    
    
   export const callToNextmonthClick = () => {
        displayMonthToUi = clickToNextMonth(displayMonthToUi);
         return displayMonthToUi;
     };
     
     // get all hebrew-date of previous nonth
  var clickToPreviousMonth = (month) => {
         var previousMonthDays = [];
         var day = month[0].DAY;
         var firstDayPreviousMonth = moment(day).subtract(30,'days');

        for(var i = 0; i < 30;i++){
             var year = firstDayPreviousMonth._d.getFullYear();
             var month =  firstDayPreviousMonth._d.getMonth() +1 ;
             var monthDay =  firstDayPreviousMonth._d.getDate() + i;
             
             var collectDays = hebrewDate(year,month, monthDay)
             collectDays.DAY = new Date(year,month -1, monthDay); 
             collectDays.weekDay = collectDays.DAY.getDay() + 1;
             previousMonthDays.push(collectDays);
      }
         if(previousMonthDays[0].month != previousMonthDays[1].month ){
              previousMonthDays.shift();
          }
             return previousMonthDays;
     };
   
    
     // print previous days 
  export const  callToPreviousMonthClick = () => {
      displayMonthToUi = clickToPreviousMonth(displayMonthToUi)
      return displayMonthToUi;
    };
    
    //module.exports = {days,NextMonth,previousMonth};