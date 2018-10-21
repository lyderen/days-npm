import React from 'react';
import moment from 'moment';
import axios from 'axios';


 import {days,callToNextmonthClick ,callToPreviousMonthClick} from '../calendar/hebrew-date';
 import TableDescription from '../calendar/tableDescription.js';
 import EmptyDescription from '../calendar/EmptyDescription.js';
 import hebrewDate from '../calendar/hebrew-dateFUN.js';
 import numberYearHebrew from '../javaScriptFiles/numbertYearHebrew.js';
 import convertNumMonthToName from '../javaScriptFiles/convertNumMonthToName.js';
 import convertNumberDateToABC from '../javaScriptFiles/convetNumberDateToABC.js';
 import Citis from './Citis.js';

 const geocoder = new google.maps.Geocoder();

 
export default class ControlCalendar  extends React.Component{
    constructor(props){
        super(props);
        
    this.state ={
         month: days,
         SWD:days[0].weekDay -1,
         rangeSliceLastDay :30,
         firstEmptySquares:undefined,
         lastEmptySquares: undefined,
         boli: false,
         simpleMonth:true,
         citi: this.props.sendCiti,
         haflgaStart: undefined,
         haflgaEnd: undefined,
         currentMonth: null,
         currentYear: null
     };
    };
    componentWillMount(){
        if(this.state.month[0].weekDay === 7 && this.state.month[this.month.length - 1].weekDay === 1 ){
                   let currentMonth = this.state.month[0].month,
                   currentYear = this.state.month[0].year;
            this.setState(() => ({ rangeSliceLastDay: 29, currentMonth, currentYear}));
        }
        this.setState(() => ({firstEmptySquares:this.state.month[0].weekDay- 1,
                            lastEmptySquares:7 - this.state.month[this.state.month.length -1 ].weekDay}))

         
         
        }
        componentDidMount() {
            this.props.setClick(this.clearHaflagh);

            let currentMonth = this.state.month[0].month,
                currentYear = this.state.month[0].year;
            this.sendYearMonth(currentMonth, currentYear);
     }

   sendYearMonth = (month,year) => {
       this.props.callBackToSendMonthYear(month, year);
   }
    emptyFirstSquares = (days)=> {
        const daysSquares = days;
     const emptyDays = Array.from(Array(daysSquares));
        return emptyDays;
    };
   nextMonth = () => {
     const month = callToNextmonthClick();
     this.monthWillChange(month);

     let currentMonth = month[0].month,
         currentYear = month[0].year;
         this.sendYearMonth(currentMonth, currentYear);
   };
   previousMonth = () => {
    const month = callToPreviousMonthClick();
    this.monthWillChange(month);

    let currentMonth = month[0].month,
         currentYear = month[0].year; 
         this.sendYearMonth(currentMonth, currentYear);                
   };
   monthWillChange = (month) => {
    this.setState(() => ({ month,SWD:month[0].weekDay - 1}));

    this.setState(() => ({ boli: false, rangeSliceLastDay: 30, simpleMonth:true }));

         if(month[0].weekDay === 7 && month[month.length - 1].weekDay === 1 ){
                console.log('yes');
                this.setState(() => ({ boli: true,rangeSliceLastDay: 29, simpleMonth: false }));
            }
            this.setState(() => ({firstEmptySquares:month[0].weekDay- 1,
                                  lastEmptySquares: 7 - month[month.length -1 ].weekDay}))
   }
 createObjectDaySuspicious = (typeSus,timeSuspc,targetDay,hebrew,sourceDate) =>{

    // call parent to applay the loading.. element 
    this.props.callBackToApplyLoadEle();

    const suspiciousDayDate = new Date(targetDay);
    hebrew.year = numberYearHebrew(hebrew.year);
     let citi = this.props.sendCiti ? this.props.sendCiti : 'ירושלים';
                
       const yearA = suspiciousDayDate.getFullYear();
       const monthA = suspiciousDayDate.getMonth();
       const dayA = suspiciousDayDate.getDate();
      const timeForLocatin = new Date(yearA,monthA,dayA).getTime();
          
       let timeOFSet = new Date().getTimezoneOffset();
       if(timeOFSet < 0){
           timeOFSet = Math.abs(timeOFSet);
         }    
                geocoder.geocode( { "address": citi }, (results, status) => {
                    if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
                        const location = results[0].geometry.location,
                            lat      = location.lat(),
                            lng      = location.lng();
                    
                    const URLsunShine = `https://safe-wave-98290.herokuapp.com/getingsunshinetimeaccordinglocation/${timeForLocatin}/${lat}/${lng}`;
                        
                    return new axios.get(URLsunShine)  
                    .then((response) => {   
                        let sliceRise = `${parseInt(response.data.sunriseStr.split(':')[0]) + timeOFSet / 60}:${response.data.sunriseStr.split(':')[1] < 10 ? response.data.sunriseStr.split(':')[1] = 0+response.data.sunriseStr.split(':')[1]:response.data.sunriseStr.split(':')[1] }`;
                        let sliceSet = `${parseInt(response.data.sunsetstr.split(':')[0]) + timeOFSet / 60}:${response.data.sunsetstr.split(':')[1]  < 10 ? response.data.sunsetstr.split(':')[1] = 0+response.data.sunsetstr.split(':')[1]:response.data.sunsetstr.split(':')[1]}`;
                        const finalDay = {
                            sourceDate: sourceDate,
                            typeSuspc: typeSus,
                            timeSuspc: timeSuspc,
                            date:suspiciousDayDate.getTime(),
                            hebrewDate: hebrew,
                            createAt: new Date().getTime(),
                            sunRise: sliceRise,
                            sunSet: sliceSet,
                            citi: citi
                        };  
                        this.props.callBackToParent({finalDay}); 
                    }).catch(console.error)  
                }
                });          
 }
   pickDay = (e)=> {
       if(this.props.sendDayTime){
          if(e.target.textContent != " "){
           
            
                const dayPick = parseInt(e.target.attributes.name.value);
                
                const theDay = this.state.month[dayPick - 1].DAY;
                
                const day = theDay.getDate(),
                      month = theDay.getMonth(),
                      year = theDay.getFullYear(),  
                      getDay = new Date(year,month,day),
                      sourceDate = {
                          theDay: theDay.getTime(),
                          hebrew: hebrewDate(theDay.getFullYear(),theDay.getMonth() + 1,theDay.getDate())
                      };  // add hebrewDate ethier
                console.log(sourceDate);
          if(!this.props.sendApplay){
             
            // day of suspicious of benonint & hachoudesh
            let targetDay = moment(getDay).add(29,'days');

             let hebrew = hebrewDate(targetDay._d.getFullYear(),targetDay._d.getMonth() + 1,targetDay._d.getDate());
               
             this.createObjectDaySuspicious('בינונית','יממה',targetDay,hebrew,sourceDate)
             
             if (dayPick === hebrew.date){
                 this.createObjectDaySuspicious('החודש',this.props.sendDayTime,targetDay,hebrew,sourceDate)
                }else{
                    targetDay = moment(getDay).add(30,'days');
                    hebrew = hebrewDate(targetDay._d.getFullYear(),targetDay._d.getMonth() + 1,targetDay._d.getDate());
                    
                        if(parseInt((new Date(targetDay._d).getTime() - new Date(targetDay._i).getTime()) / (24*60*60*1000)) == 30){
                         this.createObjectDaySuspicious('החודש',this.props.sendDayTime,targetDay,hebrew,sourceDate)
               }  
        }
       } else {
           let haflgaDay = this.state.month[dayPick - 1];
        
                if(!this.state.haflgaStart){
                    this.state.haflgaStart = haflgaDay;
                }else if(!this.state.haflgaEnd){
                    this.state.haflgaEnd = haflgaDay;
                }
        this.props.callToApplayDaysHaflaga(haflgaDay);
       }
    } 
    }else {
       this.props.callBackToApplyAlertTime();
    }
};
caclulateHaflaga = () => {

    if(this.state.haflgaEnd){
        if(this.props.sendEndDay){
            

            const dayMillisecond =  24*60*60*1000;
            
            const startHaflaga = this.state.haflgaStart.DAY.getTime();
            //  const betweenStart = new Date(startHaflaga.getFullYear(),startHaflaga.getMonth(),startHaflaga.getDate()).getTime();
            
            const endHaflaga = this.state.haflgaEnd.DAY.getTime();
            
            let calculateDaysBetween = (endHaflaga - startHaflaga) + endHaflaga;
            
            const nextHaflagaDay = new Date(calculateDaysBetween); 
            const haflagaHebrewDay = hebrewDate(nextHaflagaDay.getFullYear(),nextHaflagaDay.getMonth() + 1,nextHaflagaDay.getDate());
            
            this.createObjectDaySuspicious('הפלגה',this.props.sendDayTime,nextHaflagaDay,haflagaHebrewDay);
            //         console.log(calculateDaysBetween,nextHaflagaDay);
            this.clearHaflagh();
        }
         
    }
    
   
}
  clearHaflagh = (num) => {
       num += num;
    this.setState(() => ({haflgaStart: "",haflgaEnd: ""}));
    this.props.callBackToParentClearHaflaga(num);
    
  };
    render() {
        return (
            <div className='container calendar-area'> 
            {this.state.statusBar && <Line percent="10" strokeWidth="4" strokeColor="#D3D3D3" />}
            {this.props.sendApplay &&<div className="control-haflaga-btn"><button className='btn btn-primary calc-haflaga calc-haflaga-calcualet ' onClick={this.caclulateHaflaga} >חשב הפלגה</button>
            <button className='btn btn-primary calc-haflaga calc-haflaga-clear' onClick={this.clearHaflagh} >נקה בחירה</button></div>}
            <p className='month-name'>{this.state.month[0].month_name}</p>
            <div className='control-month'>  
            <button className=' btn btn-primary button-next' onClick={this.nextMonth} >Next</button>
            <button className=' btn btn-primary button-previous' onClick={this.previousMonth} >Previos</button>  
         </div>                
 <form className="form-calendar">
     <table className="table table-bordered calander">
         <thead>
               <tr>
                 <th scope="col">Sunday</th>
                 <th scope="col">Monday</th>
                 <th scope="col">Tuesday</th>
                 <th scope="col">Wensday</th>
                 <th scope="col">Thursday</th>
                 <th scope="col">Fraiday</th>
                 <th scope="col">Satarday</th>
               </tr>
         </thead>
         <tbody  onClick={this.pickDay}>
             <tr>
             {this.emptyFirstSquares(this.state.firstEmptySquares).map((val,i) => {
                i += 32;
                return <EmptyDescription key={i}  />  })}
               { (this.state.month.slice(0,7 - this.state.SWD)).map((val,i) => {
                   return <TableDescription key={val.date} {...val} /> 
               })}
                </tr>
                <tr>
                {this.state.month.slice(7 - this.state.SWD, 14 - this.state.SWD).map((val,i) => {
                    return <TableDescription key={val.date} {...val}/>
                })}
                </tr>
                <tr>
                {this.state.month.slice(14 - this.state.SWD, 21 - this.state.SWD).map((val,i) => {
                    return <TableDescription key={val.date} {...val} />
                })}
                </tr>
                <tr>
                {this.state.month.slice(21 - this.state.SWD, 28 - this.state.SWD).map((val,i) => {
                    return <TableDescription key={val.date} {...val} />
                })}
                </tr>
                <tr>
                {this.state.month.slice(28 - this.state.SWD, this.state.rangeSliceLastDay).map((val,i) => {
                    return <TableDescription key={val.date} {...val} />
                })}
                {this.state.simpleMonth && this.emptyFirstSquares(this.state.lastEmptySquares).map((val,i) => {
                    i += 32;
                    return <EmptyDescription key={i}/>})}
                </tr>
                {this.state.boli && <tr>{this.state.month.slice(this.state.rangeSliceLastDay,30).map((val,i) => {
                    return <TableDescription key={val.date} {...val} />
                })} 
                {this.emptyFirstSquares(this.state.lastEmptySquares).map((val,i) => {
                    i += 40;
                    return <EmptyDescription key={i}/>})}
                </tr>}
            </tbody>
     </table>
  </form>
             </div>
        )
    }
}