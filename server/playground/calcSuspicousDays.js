const moment = require ('moment');
const hebrewDate = require ('./hebrewFUN');
const suorce = require('./suorce');

const getMonthString = (day) => {
       return day.getFullYear() + '-' + day.getMonth() + 1 + '-' + day.getDate();  
}

const dayMillisecond =  24*60*60*1000;

// calculat all the type of suospicuosStrong that alpy halach and check if the susArrayDays is't have one or moore 
class calcSuspicousHachodesh {
    constructor(suspicusArray){
      this.month = suspicusArray;
    }
    
    // check if the suspicuos day hava mauch with the day of month and return array of 3 suspicuosc 
    // the BIG if is chech if day of manth mauch && that suspicuos day is't append && time of in the day is mauch && that month ist consecutive
    calcByMontDay () {
        if(this.month.length >= 3 ){
            let suspicusStrong = [{typeStrong:'samDayOfMonth'}];
            let monthNumber = this.month.map((i) => i.hebrewDate.month);

            for (let i = 0; i <= this.month.length - 1; i++ ){
                if (suspicusStrong.length === 3) {
                    break;
                }
                     while(suspicusStrong.length){
                           suspicusStrong.pop();
                      }
                 const firstime = this.month[i].hebrewDate.date;
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
            return suspicusStrong;
        }
    }

    // check in the days suspicuss to know the days between one suspicuss to next time and chheck if the next 3 also have same days between &&
    // make as strongSuspicus return a array with new 3 suspicus for the next 3 times.!
    // the Big if check 1: that suspicus appeend - 2: time suspicus in day if ist much to first - 3: the days between suspicus  -> 
    //  if ist mach the all way - 4: check if the  curent suspicus day if ist actuley ist the next time suspicus and if not the next next one
   calcByDaysBetweenSuspicuss(){
       if(this.month.length >= 4){
           let suspicusStrong = [{typeStrong:"DaysBetweenSuspicuss"}];
           let monthNumber = this.month.map((i) => i.hebrewDate.month);

           for (let i = 0; i <= this.month.length -1; i ++){
                 if (suspicusStrong.length === 4) {
                     break;
                 }
                      while(suspicusStrong.length){
                            suspicusStrong.pop();
                       }
                  if(this.month[i].append && this.month[i + 1].append && this.month[i].timeSuspc == this.month[i + 1].timeSuspc ){
                      let firsTime = this.month[i].date,
                          secondTime = this.month[ i + 1].date,
                          daysBetween = parseInt((secondTime - firsTime) / dayMillisecond);
                          suspicusStrong.push(this.month[i], this.month[i + 1]);

                      for(let index = i + 2;index <= this.month.length -1; index ++){
                           if(this.month[index].append && this.month[index].timeSuspc == suspicusStrong[0].timeSuspc &&
                            (parseInt(this.month[index].date  - suspicusStrong[index -1].date)) / dayMillisecond == daysBetween && 
                               monthNumber.indexOf(suspicusStrong[suspicusStrong.length -1].hebrewDate.month) + 1 == monthNumber.indexOf(this.month[index].hebrewDate.month)){
                                  suspicusStrong.push(this.month[index]);
                                  if(suspicusStrong.length == 4){
                                      break;
                                  }
                               } 
                       }     
                  }                
       }
       return suspicusStrong;
   }
}
  
     calcByBetweenWeeks (){
         
     }
    // calcByBetweenWeeks() {
    //     if(this.month.length >= 3 ){
    //         let suspicusStrong = [];
    //         for (var i = 0; i <= this.month.length - 1; i++ ){
    //              let firstimeWeek = moment(getMonthString(this.month[i].date)).week(),
    //                    secondTimeWeek = moment(getMonthString(this.month[i + 1].date)).week();
    //                    betweenWeek = secondTimeWeek - firstimeWeek;
    //                  for(let index = 0; index <= this.month.length -1; index++){
    //                      let firstDay =  moment(getMonthString(this.month[index].date)).week(),
    //                          secondDay = moment(getMonthString(this.month[index +1].date)).week();
    //                       if(secondDay - firstDay == betweenWeek){
    //                            suspicusStrong.push(this.month[index]);
    //                       } 
    //                  }
    //         } 
    //         return suspicusStrong;
    //     }
    // }
         
} 

console.log(suorce.length)

 const hachudeshArray = suorce.filter((value) => value.typeSuspc == 'החודש'),
      beinonintArray = suorce.filter((value) => value.typeSuspc == 'בינונית');
      haflagaArray = suorce.filter((value) => value.typeSuspc == 'הפלגה'); 
      
      const hachudesh = new calcSuspicousHachodesh(hachudeshArray);
      
   console.log(hachudesh.calcByMontDay());
   console.log(hachudesh.calcByDaysBetweenSuspicuss())



























