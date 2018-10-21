import React from 'react';
import axios from 'axios';
import {connect } from 'react-redux';

import {startGetDays} from '../actions/days';
import {startUserLogin,userLogin} from '../actions/userName';
import LastName from '../components/LastName';

const style = {
    border: 'none',
    display: 'none'
}

class SignIn extends React.Component{
    constructor(props){
         super(props);
         this.state = {
            password: props.password ? props.password : '',
            email: props.email ? props.email : '',
            LastName: '',
            erorr: undefined,
            erorrExsistEmail: undefined,
            counfrium: undefined,
            usernNameShow: '',
            register: false
         }
    } 
    onPasswordChange = (e) => {
        const password = e.target.value;
       
          this.setState(() => ({password}))
        
   };
   onEamilChange = (e) => {
      const email = e.target.value;
      this.setState(() => ({email})); 
   }
   onUserNameChange = (e) => {
       const userName = e.target.value;
       this.setState(() => ({ userName }))
   }
   heandleClick = (e)  => { 
    e.preventDefault();

    if(!this.state.password || !this.state.email ){
        this.setState(() => ({erorr: 'הכנסי מייל - סיסמא לפחות 6 תווים  - שם משתמש'}));
    }else {
      const user = {
       password: this.state.password,
          email: this.state.email
      };
      
          axios.post('/user/login',{body:user}).then((response) => {
           console.log(response);
           if(response.data === ""){
               this.setState(() => ({ erorrExsistEmail: 'כתובת מייל או ססימא שגוי נסה שנית'}));
           }else{
               this.setState(() => ({usernNameShow: response.data.userName}));
               this.props.dispatch(userLogin(this.state.usernNameShow));
        
               this.props.dispatch(startGetDays());
               this.props.history.push('/');
           }
       }).catch((e) => {
           console.log(e);
       })
    }
};
onLastNameCng = (e) => {
 const lastName = e.target.value;
 this.setState(() => ({lastName}))
}
      render(){
          return(
   <div className='account-details'>
      {this.state.erorr && <p>{this.state.erorr}</p>} 
     <form onSubmit={this.heandleClick}>
          <div className="form-group">
          <input type="text" className="form-control lastName" aria-label="Small"
           aria-describedby="inputGroup-sizing-sm" value={this.state.LastName} onChange={this.onLastNameCng} style={style} />
              <label>Email address</label>
              <input type="email" className="form-control"  aria-describedby="emailHelp" placeholder="Enter email" value={this.state.email}
               onChange={this.onEamilChange} autoFocus/>
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              {this.state.erorrExsistEmail && this.state.erorrExsistEmail}
          </div>
          <div className="form-group">
               <label>Password</label>
               <input  type="password" className="form-control" placeholder="Password" value={this.state.password} 
              onChange={this.onPasswordChange}/>
          </div>
          <button type="submit" className="btn btn-primary enter-btn">כניסה</button>
    </form>
 </div>
          )
      }
}

const mapStateToProps = (state,props) => {
    return {
        days: state.days,
        userName: state.UserName
    }
}



export default connect(mapStateToProps)(SignIn);



