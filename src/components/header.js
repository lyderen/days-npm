import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => (
    <div>
      <h1>Expensify</h1>
      <NavLink to='/' activeClassName='is-active' exact={true}>Go home</NavLink>  <br />     
      <NavLink to='/create' activeClassName='is-active'>Go Create</NavLink> <br />     
      <NavLink to='/help' activeClassName='is-active'>Go Help</NavLink>
      <NavLink to='/edit' activeClassName='is-active'>Go Edit</NavLink>
      <NavLink to='/calendar' activeClassName='is-active'> Calendar </NavLink>
    </div>
    ); 

    export default Header;