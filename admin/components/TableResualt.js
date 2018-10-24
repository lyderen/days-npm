import React from 'react';
import {connect } from 'react-redux';
import selectDays from '../src/selectors/days';
import {startRemoveDay} from  '../src/actions/days';


const lastTd = {
  borderColor: 'white'
};

class TableResualt extends React.Component{
   constructor(props){
     super(props);
      this.state = {

      }
   }
heandelHoverToolTip = (e) => {
  if(e.theDay){
   let originalDay = new Date(e.theDay),
                  day = `${originalDay.getFullYear()}-${originalDay.getMonth() + 1}-${originalDay.getDate()}`,
                  hebrew = `${e.hebrew.date}/${e.hebrew.month_name}`;

    return `:תאריך ווסת ${day} ${hebrew}`;
  }else {
   let hebrew = `${e.hebrew.date}/${e.hebrew.month_name}`;
     return `תאריך מקור: ${hebrew}` ;
  }
}
  heandelDeleteIteam = (e) => {
   let item = e.target.value,
         creator = this.props.days.filter((day) => day._creator);
            creator = creator.length > 0 ? 1 : 0;

          if(item) {

            this.props.dispatch(startRemoveDay(item, creator)).then(() => {
              console.log('delete');
            })
          }
  }
  
  render(){
    return(
      <div className='container '>
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
        return( <tr data-toggle="tooltip" data-placement="top"  title={this.heandelHoverToolTip(day.sourceDate)} key={i}>
         <td>{day.typeSuspc}</td>
         <td>{day.timeSuspc}</td>
         <td>{new Date(parseInt(day.date)).toLocaleDateString()}</td>
         <td>{day.hebrewDate.month_name} {day.hebrewDate.date}</td>
         <td>{day.sunRise}</td>
         <td>{day.sunSet}</td>
         <td className='lastTd' style={lastTd}><button type="button" className="btn btn-warning"  value={day._id} onClick={this.heandelDeleteIteam}>Remove</button></td>
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
        days: selectDays(state.days, 'Date')
    }
}

export default connect(mapStateToProps)(TableResualt);

