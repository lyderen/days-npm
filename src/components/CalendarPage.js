import React from 'react'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';


import {days,callToNextmonthClick ,callToPreviousMonthClick} from '../calendar/hebrew-date';
import ControlCalendar from './ControlCalendar.js';
import DaysResualt from './DaysResualt'; 
import  Citis from './Citis'; 
import {addDays,startAddDay}  from '../actions/days.js';
import AcordingTtoButtons from './AcordingToButtons';
import HaflagaTime from './HaflagaTime';
import SuspiciousDayTime from './SuspiciousDayTime';
import Alert from './Alert';





class CalendarPage extends React.Component{
       constructor(props){
           super(props);

           this.state={
            suspiciousDay: [],
               length: props.days.length,
               citi: "",
               dayTime: "",
               applay: false,
               startDay: false,
               endDay: false ,
               startDayShow: '',
               endDayShow: '',
               load: false,
               alertTime: false,
               monthYear: {}
               
           };
       };  
       onCheckClik = (suspiciousDay) => {
         
               this.props.dispatch(startAddDay(suspiciousDay.finalDay,this.props.userName));
            
            this.setState(() => {
                this.state.suspiciousDay.push(suspiciousDay);     
            })
            this.setState(() => ({citi:"",dayTime:"",startDayShow:"",endDayShow:""}));
            if(this.state.suspiciousDay.length > 0){
                this.setState(() => ({load: false}));
            }
       };
       getCitiName = (e) => {
           const citi = e
           this.setState(() => ({ citi }))
       }
       haflagaArea = (applay) => {
      this.setState(() => ({ applay }))
       };
       getDaysHaflaga = (day) => {
            if(!this.state.startDay){
                const startDayShow = `${day.month_name} ${day.date}`;
                this.setState(() => ({startDay:day,startDayShow}));
            }else if(!this.state.endDay) {
                const endDayShow = `${day.month_name} ${day.date}`;
                this.setState(() => ({endDay:day,endDayShow}));

            }
       };
       getDayTime = (dayTime) => {
          this.setState(() => ({ dayTime , applayAlert: false}))
       }
       clearHaflaga = (num) => {
           this.setState(() => ({startDay:"",endDay: "",startDayShow:"",endDayShow:""}));
                  if(num <2){
                  this.clickChild(1);
                }
       }
       applayLoad = () => {
            this.setState(() => ({ load: true})) 
       }
       applayAlert = () => {
        this.setState(() => ({applayAlert: true}));
       }
       sendMonthYear = (month,year) => {
         let monthYear = {month,year};
       this.setState(() => ( {monthYear}));
       }
     render(){
        return(
            <div className="calendar-page">
            <Citis callbBacktoSelectCiti={(citi) => this.getCitiName(citi)} sendCiti={this.state.citi} />
            <SuspiciousDayTime callBackToParent={(dayTime) => this.getDayTime(dayTime)} sendDayTime={this.state.dayTime} />
            {this.state.applayAlert && <Alert msg={"את נדרשת לבחור יום או לילה של העונה."} cls={'alert-warning'}/>}
            <AcordingTtoButtons callBackToParent={(applay) => this.haflagaArea(applay)} sendApply={this.state.applay} 
            callBackToParentClearHaflaga={this.clearHaflaga}/>
            {this.state.applay && <HaflagaTime sendStartDay={this.state.startDayShow} sendEndDay={this.state.endDayShow} />}
            <ControlCalendar callBackToParent={(suspiciousDay) => this.onCheckClik(suspiciousDay)} 
            sendCiti={this.state.citi}
            sendApplay={this.state.applay}
            callToApplayDaysHaflaga={(day) => this.getDaysHaflaga(day)}
            sendStartDay={this.startDay} sendEndDay={this.state.endDay}
            sendDayTime={this.state.dayTime}
            callBackToParentClearHaflaga={this.clearHaflaga}
            setClick={click => this.clickChild = click}
            callBackToApplyLoadEle={this.applayLoad}
            callBackToApplyAlertTime={this.applayAlert}
            callBackToSendMonthYear={(month,year) => this.sendMonthYear(month,year)}
            />
            {this.state.load  && <h4 className='loadMessage'> loading....</h4>}
            {this.props.days.length > 0 && <DaysResualt sendDayTime={this.state.dayTime} 
             callBackToParent={(dayTime) => this.getDayTime(dayTime)} 
             sendMonthYear={this.state.monthYear}
             /> } 
            </div>
            
        )
    }
}

const mapStateToProps = (state,props) => {
    return {
        days   : state.days,
        userName : state.UserName.userName
    
      }
} 

export default connect(mapStateToProps)(CalendarPage);