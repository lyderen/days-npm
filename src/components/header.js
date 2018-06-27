import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => (
    <div className="header">
    <ul className="nav nav-tabs ">
        <li className="nab-item"><NavLink to='/' className="nav-link" activeClassName='is-active' exact={true}>Go home</NavLink></li>   
        <li className="nab-item"><NavLink to='/create' className="nav-link" activeClassName='is-active'>Go Create</NavLink></li>
        <li className="nab-item"><NavLink to='/help' className="nav-link" activeClassName='is-active'>Go Help</NavLink></li>
        <li className="nab-item"><NavLink to='/edit' className="nav-link" activeClassName='is-active'>Go Edit</NavLink></li>
        <li className="nab-item"><NavLink to='/calendar' className="nav-link" activeClassName='is-active'> Calendar </NavLink></li>
    </ul>
         
    </div>
    ); 

    export default Header;