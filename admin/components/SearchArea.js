import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {startGetDays,startAddDay}  from '../src/actions/days';


class SearchArea extends React.Component{
   constructor(props){
       super(props);
       this.state = {
           typeSuspc: '',
           startDayShoo: '',
           endDayShoo: '',
           startDay: undefined,
           endDay: undefined,
           email: ''
       }
   }
   onEamilChange = (e) => {
    const email = e.target.value;
     this.setState(() => ({ email }))
   }
   getTimeOfDay = (day) => {
       const orignalDay = day,
             year = parseFloat(orignalDay.split('-')[0]),
             month = parseFloat(orignalDay.split('-')[1]) - 1,
             dayy = parseFloat(orignalDay.split('-')[2]),
             numDay = new Date(year,month,dayy).getTime();
     return numDay;        
   }
   selectType = (e) => {
     const typeSuspc = e.target.value;
     this.setState(() => ({ typeSuspc }));
   }
   heandelStart = (e) => {
       const startDayShoo = e.target.value,
            startDay = this.getTimeOfDay(startDayShoo);
       this.setState(() => ({ startDayShoo , startDay }))         

   }
   heandelEnd = (e) => {
       const endDayShoo = e.target.value,
             endDay = this.getTimeOfDay(endDayShoo);
        this.setState(() => ({ endDayShoo, endDay}));     
   } 
   heandelClick = (e) => {
       e.preventDefault();
       if(this.state.typeSuspc) {
           this.props.callBackToApplyLoadEle();
           const search = {
               email    : this.state.email,
              typeSuspc : this.state.typeSuspc,
              startDay  : this.state.startDay,
              endDay    : this.state.endDay
           };
            
            this.props.dispatch(startGetDays(search)).then(() => {
                this.props.callbBackToGetDays(this.props.days);
          })
          this.setState(() => ({typeSuspc: '', startDayShoo: '', endDayShoo: '', email: ''})); 
       }
   }
   render() {
       return (
       <div className='conteinor searchArea searchAreaInputs'>
         <form onSubmit={this.heandelClick}>
         <div className="form-group selectTypeSuspicus">
         <label className='admin-Header' > חיפוש לפי סוגי חשש</label>
              <input type="email" className="form-control emailInput" placeholder="Enter email" value={this.state.email}
                      onChange={this.onEamilChange}
                    />
         <select className="form-control" value={this.state.typeSuspc} onChange={this.selectType}> 
         <option value='none'>בחר סוג חשש</option>
           <option value="allSus">כל החששות</option>
           <option value="בינונית">עונה בינונית</option>
           <option value="החודש">עונת החודש</option>
           <option value="הפלגה">עונת הפלגה</option>
         </select>
       </div>
            <input className="form-control startDate" type="date" placeholder="תאריך התחלה" value={this.state.startDayShoo} onChange={this.heandelStart} />
            <input className="form-control endDate" type="date" placeholder=" תאריך סיום" value={this.state.endDayShoo} onChange={this.heandelEnd}/>
            <button type="submit" className="btn btn-primary  btn-lg btn-block enter-btn cunfiormBtn">שלח</button>
            
         </form>
       </div>
       )
    }
}

const mapStateToProps = (state,props) => {
    return {
        days   : state.days,
      }
} 

export default connect(mapStateToProps)(SearchArea);