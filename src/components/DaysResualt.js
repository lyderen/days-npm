import React from 'react';
import {connect } from 'react-redux';
import axios from 'axios'; 
// mongo/bin ***./mongod --dbpath ~/mongo-data

import hebrewDate from '../calendar/hebrew-dateFUN.js';
import numberYearHebrew from '../javaScriptFiles/numbertYearHebrew';
import selectDays from '../selectors/days';
import {startUpdateDay,startAddDay,startUpdateHaflaga} from '../actions/days';
import calcNextSuspicious from '../javaScriptFiles/calcNextSuspicious';
import createObjectDaySuspicios from '../javaScriptFiles/createObjectDaySuspicios';
import Alert from './Alert';

const geocoder = new google.maps.Geocoder();

const lastTd = {
    borderColor: 'white'
  };
  
  class DaysResualt extends React.Component{
     constructor(props){
       super(props);
        this.state = {
          days: this.props.days,
          length: undefined,
           applyAlert: false,
           alertMsg: '',
           alertStyle: '',
           applayHaflaga: true
        }
     }
     componentWillMount(){
         this.state.length = this.props.days.length;
     }
    
 createObjectDaySuspicios =  (obj, citi) =>{ 
       const suspiciousDayDate = new Date(obj.targetDay);
       obj.hebrew.year = numberYearHebrew(obj.hebrew.year);
     
       const yearA = suspiciousDayDate.getFullYear(),
             monthA = suspiciousDayDate.getMonth(),
             dayA = suspiciousDayDate.getDate(),
             timeForLocatin = new Date(yearA,monthA,dayA).getTime();
          
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
                            sourceDate: obj.sourceDate,
                            typeSuspc: obj.typeSus,
                            timeSuspc: obj.timeSuspc,
                            date:suspiciousDayDate.getTime(),
                            hebrewDate: obj.hebrew,
                            createAt: new Date().getTime(),
                            sunRise: sliceRise,
                            sunSet: sliceSet,
                            citi: citi ? citi : 'ירושלים'
                        };  
                        this.props.dispatch(startAddDay(finalDay,this.props.userName));   
                           if(this.props.originalDays.filter((day) => day.append == true && !day.haflagaAppend).length >= 2 && this.state.applayHaflaga){
                                this.setState(() => ({applayHaflaga: false}))
                             this.calcNextHaflaga();
                           }
                        
                    }).catch(console.error)  
                }
                });    
                
 }
 calcNextHaflaga = () => {
   
         const daysSuspicuios = [];
           this.props.originalDays.forEach(day => {
             if(day.append == true && !day.haflagaAppend){
                if(daysSuspicuios.length < 2){
                  daysSuspicuios.push(day);
                }
             }
         });    

            if(daysSuspicuios.length == 2){
           
                 let firstHaflaga = daysSuspicuios[0].date, 
                     secondHaflaga = daysSuspicuios[1].date, 
                     calculateDaysBetween = (secondHaflaga - firstHaflaga) + secondHaflaga,
                     targetDay = new Date(calculateDaysBetween),
                     hebrew = hebrewDate(targetDay.getFullYear(),targetDay.getMonth() + 1,targetDay.getDate()),
                     dayTime = daysSuspicuios[1].timeSuspc;
                 
                 let sourceDate = {
                    theDay: targetDay.getTime(),
                    hebrew: hebrewDate(targetDay.getFullYear(),targetDay.getMonth() + 1,targetDay.getDate())
                };
     
                    const obj = {
                      typeSus: 'הפלגה',
                      timeSuspc: dayTime,
                      hebrew,
                      targetDay,
                      sourceDate
                    }

                  this.createObjectDaySuspicios(obj,daysSuspicuios[1].citi );
                    const idS = daysSuspicuios.map((day) => day._id);
                    this.props.dispatch(startUpdateHaflaga(idS));              
      
  }
}
  heandelHoverToolTip = (e) => {
    if(e.theDay){
     let originalDay = new Date(e.theDay),
                    day = `${originalDay.getFullYear()}-${originalDay.getMonth() + 1}-${originalDay.getDate()}`,
                    hebrew = `${e.hebrew.date}/${e.hebrew.month_name}`;
  
      return `${day} ${hebrew}:תאריך ווסת`;
    }else {
     let hebrew = `${e.hebrew.date}/${e.hebrew.month_name}`;
       return `${hebrew}:תאריך ווסת` ;
    }
  }
  heandelUpdate = (e) => {
    if(this.props.sendDayTime){
      this.setState(() => ({ applyAlert: false}));

    const id = e.target.value,
          day = this.props.days.filter((value) => value._id == id),

          theDay = new Date(day[0].date),
          dayPick = day[0].hebrewDate.date,
          timeSuspc = this.props.sendDayTime,
          citi = day[0].citi;

    // take the day taht update and calculate onthem the next supicus day & update the sore and the user DB
    for(let i = 1; i<3;i++){
        let susDay = calcNextSuspicious(dayPick,theDay,timeSuspc, i);
        this.createObjectDaySuspicios(susDay,citi);  
    }
 

    // if the moor then one day make anthue calulate to get the next haflaga suspuioc
    this.props.dispatch(startUpdateDay(id,this.props.sendDayTime));
           this.setState(() => ({ applyAlert: true, alertMsg:"יום חשש עודכן בהצלחה", alertStyle: 'alert-info'}));

             setTimeout(() => {
              this.setState(() => ({ applyAlert: false}));
           },2000);
           this.props.callBackToParent('')
          } else {
            this.setState(() => ({applyAlert: true, alertMsg:"צייני בבקשה זמן ווסת", alertStyle: 'alert-warning'}) )
          }
  }
  checkUser = (user,append) => {
        if(user){
           if(!append){
            return true;
           }
        }  
          return false;
  }
    render(){
      return(
        <div className='container '>
        {this.state.applyAlert && <Alert msg={this.state.alertMsg} cls={this.state.alertStyle} />}
    <table  className="table table-bordered">
    <thead>
       <tr>
         <th scope='col'>סוג חשש</th>
         <th scope='col'>זמן עונה</th>
         <th scope='col'>תאריך</th>
         <th scope='col'>תאריך עברי</th>
         <th scope='col'>זריחה</th>
         <th scope='col'>שקיעה</th>
       </tr>
    </thead>
    <tbody>
  
         {
        this.props.days.map((day,i) => {
          return(<tr data-toggle="tooltip" data-placement="top"  title={this.heandelHoverToolTip(day.sourceDate)} key={i}>
           <td>{day.typeSuspc}</td>
           <td>{day.timeSuspc}</td>
           <td>{new Date(parseInt(day.date)).toLocaleDateString()}</td>
           <td>{day.hebrewDate.month_name} {day.hebrewDate.date}</td>
           <td>{day.sunRise}</td>
           <td>{day.sunSet}</td>
           { this.checkUser(this.props.userName,day.append) && <td className='lastTd' style={lastTd}><button type="button" className="btn btn-info"  value={day._id}
            onClick={this.heandelUpdate}>עדכון</button></td>}
            </tr>
            
        )})
        }
        
   
    </tbody>
    </table>
  </div>
      )
    }
  }

const mapStateToProps = (state,props) => {
    return {
        days: selectDays(state.days, 'Date').filter((day) => day.hebrewDate.month == props.sendMonthYear.month && day.hebrewDate.year == numberYearHebrew(props.sendMonthYear.year)),
        userName: state.UserName.userName,
        originalDays: state.days
    }
}

// const mapDispatchToProps = (dispatch, props) => ({)
//   startEditDay: (id) => dispatch(startUpdateDay(id))
// });

export default connect(mapStateToProps)(DaysResualt);

