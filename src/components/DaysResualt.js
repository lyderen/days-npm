import React from 'react';
import {connect } from 'react-redux';
import selectDays from '../selectors/days';

const DaysResualt =  (days) => (
    <div className='container'>
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
                    days.days.map((day,i) => {
                      return(  <tr key={i}>
                       <td>{day.typeSuspc}</td>
                       <td>{day.timeSuspc}</td>
                       <td>{new Date(parseInt(day.date)).toLocaleDateString()}</td>
                       <td>{day.hebrewDate.month_name} {day.hebrewDate.date}</td>
                       <td>{day.sunRise}</td>
                       <td>{day.sunSet}</td>
                        </tr>
                    )})
                    }
                   
               
                </tbody>
                </table>
         </div>
);

const mapStateToProps = (state,props) => {
    return {
        days: selectDays(state.days, 'Date')
    }
}

export default connect(mapStateToProps)(DaysResualt);

