import React from 'react';
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';


import ExpenseDashBord from '../components/ExpenseDashBord';
import Header from '../components/header';
import helpExpensePage from '../components/helpExpensePage';
import notFounfPage from '../components/notFounfPage'
import AccountPage from '../components/AccountPage';
import  CalendarPage from '../components/CalendarPage';
  const AppRoute = () => (
  <BrowserRouter>
    <div className="container"> 
      <Header/>
       <Switch>
          <Route path='/' component={ExpenseDashBord} exact={true}/>
          <Route path='/help' component={helpExpensePage} />
          <Route path='/account' component={AccountPage} />
          <Route path="/calendar" component={CalendarPage}/>
          <Route component={notFounfPage} />
       </Switch>
    </div> 
  </BrowserRouter>
  );

  export default AppRoute;