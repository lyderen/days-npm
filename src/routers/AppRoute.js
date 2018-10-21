import React from 'react';
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';


import ExpenseDashBord from '../components/ExpenseDashBord';
import Header from '../components/header';
import Help from '../components/Help';
import notFounfPage from '../components/notFounfPage'

import  CalendarPage from '../components/CalendarPage';
import Footer from '../components/Footer';
import About from '../components/About';
import SignUP from '../components/SignUP';
import SignIn from '../components/SignIn';
import Connect from '../components/Connect';

  const AppRoute = () => (
  <BrowserRouter>
    <div className="container mainConttainer"> 
      <Header/>
       <Switch>
          <Route path='/' component={CalendarPage} exact={true}/>
          <Route path='/help' component={Help} />
          <Route path='/about' component={About} />
          <Route path="/signup" component={SignUP}/>
          <Route path="/signin" component={SignIn}/>
          <Route path="/connect" component={Connect}/>
          <Route component={notFounfPage} />
       </Switch>
       <Footer />
    </div> 
  </BrowserRouter>
  );

  export default AppRoute;