import React from 'react';

import {connect} from 'react-redux';

const ExpenseDashboardPage = (props) => (
  <div>
    <h1>Woelcom to My Days</h1>
     {props.days.length}
     {props.days.typeSuspc}
  </div>
);


const mapStateToProps = (state) => {
    return {
        days   : state.days
      }
} 



export default connect(mapStateToProps)(ExpenseDashboardPage);
