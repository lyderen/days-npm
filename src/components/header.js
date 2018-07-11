import React from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import {connect } from 'react-redux';
import { Button, Nav, Navbar, NavDropdown, MenuItem, NavItem } from 'react-bootstrap';


class Header extends React.Component{
     constructor(props){
         super(props)
         this.state = {
             userName: this.props.userName
         }
    
     }
    logOut = () => {
        axios.delete('users/logout').then((response) => {
            response.data === "cant find user" ?console.log('u r logout alrady'): console.log('LogOff');    
            console.log(response)
            this.props.dispatch({
                type: 'USER_NAME',
                userName: 'Helo Guest'
            })
            
        }).catch((e) => {
            console.log(e);
        })
    }
    render(){
        return(
            <div className="header">
            <ul className="nav nav-tabs ">
            <li className="nab-item"><NavLink to='/' className="nav-link" activeClassName='is-active' exact={true}>Go home</NavLink></li>   
            <li className="nab-item"><NavLink to='/about' className="nav-link" activeClassName='is-active'>About</NavLink></li>
            <li className="nab-item"><NavLink to='/help' className="nav-link" activeClassName='is-active'>Go Help</NavLink></li>
            <li className="nab-item"><NavLink to='/edit' className="nav-link" activeClassName='is-active'>Go Edit</NavLink></li>
            <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle account-btn" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              My Account
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
            <li className="nab-item"><NavLink to='/signin' className="nav-link" activeClassName='is-active'>SignIn </NavLink></li>
             <li className="nab-item"><NavLink to='/signup' className="nav-link" activeClassName='is-active'>SignUp</NavLink></li>
             <li className="nab-item"><NavLink to='' className="nav-link" onClick={this.logOut} >logOut</NavLink></li>
            </div>
          </div>
            </ul>
            
            </div>
        )
    }
}

const mapStateToProps = (state,props) => {
    return {
        days   : state.days,
        userName: state.userName  
    }
}


export default connect(mapStateToProps)(Header);