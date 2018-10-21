import React from 'react';
import axios from 'axios';
import {connect } from 'react-redux';

import {userLogin} from '../actions/userName.js';
import LastName from '../components/LastName';

const style = {
    border: 'none',
    display: 'none'
};

class SignUP extends React.Component{
    constructor(props){
         super(props);
         this.state = {
            userName:  '',
            lastName: '',
            password: props.password ? props.password : '',
            email: props.email ? props.email : '',
            erorr: undefined,
            erorrExsistEmail: undefined,
            counfrium: undefined,
            usernNameShow: undefined,
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
          email: this.state.email,
          userName: this.state.userName
      }
      
       axios.post('/user/signup',{body:user}).then((response) => {
           console.log(response);
           if(response.data.code === 11000){
               this.setState(() => ({ erorrExsistEmail: 'אימיל קיים במערכת בחרי כתובת מייל שונה'}));
           }else{
               this.setState(() => ({usernNameShow: response.data.userName}));
                this.props.dispatch(userLogin(this.state.usernNameShow));
            
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
             <label>User Name</label>
             <input type="text" className="form-control" placeholder="UserName" value={this.state.userName}
                    onChange={this.onUserNameChange} autoFocus/>
           </div>
           <input type="text" className="form-control lastName" aria-label="Small" 
           value={this.state.LastName} onChange={this.onLastNameCng} aria-describedby="inputGroup-sizing-sm" style={style} />
          <div className="form-group">
              <label>Email address</label>
              <input type="email" className="form-control"  aria-describedby="emailHelp" placeholder="Enter email" value={this.state.email}
               onChange={this.onEamilChange}/>
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              {this.state.erorrExsistEmail && this.state.erorrExsistEmail}
          </div>
          <div className="form-group">
               <label>Password</label>
               <input  type="password" className="form-control" placeholder="Password" value={this.state.password} 
              onChange={this.onPasswordChange}/>
          </div>
          <button type="submit" className="btn btn-primary">הירשם</button>
    </form>
 </div>
          )
      }
}

const mapStateToProps = (state,props) => {
    return {
        userName: state.userName 
    }
}




export default connect(mapStateToProps)(SignUP);



