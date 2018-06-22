import React from 'react';
import axios from 'axios';

export default class AccountPage extends React.Component {
    constructor(props) {
          super(props);

          this.state = {
            password: props.password ? props.password : '',
              email: props.email ? props.email : '',
              erorr: undefined,
              counfrium: undefined,
              text: props.text ? props.text : ''
          }
    };
    onPasswordChange = (e) => {
         const password = e.target.value;
          this.setState(() => ({password}))
    };
    onEamilChange = (e) => {
       const email = e.target.value;
       this.setState(() => ({email})); 
    }
    heandleClick = (e)  => { 
         e.preventDefault();

         if(!this.state.password || !this.state.email ){
             this.setState(() => ({erorr: 'plase add password & email'}));
         }else {
           const user = {
            password: this.state.password,
               email: this.state.email
           }
           
            axios.post('/account',{body:user}).then((response) => {
                console.log(response);
               //this.setState(() => ({counfrium:response.data }))
            }).catch((e) => {
                console.log(e);
            })
         }
    };
    onTextChange = (e) => {
        const text = e.target.value;
        this.setState(() => ({ text }));
    };
    sendText = (e) => {
        e.preventDefault();
        const text = {
            text: this.state.text
        };
        axios.post('/todos',{body:text}).then((response) => {
            console.log(response);
        }).catch((e) => {
            console.log(e);
        });
    }  
    onGetTodos = (e) => {
      e.preventDefault();

      axios.get('/todos').then((response) => {
              console.log(response);
      }).catch((e) => {
          console.log(e);
      })
    }
    signIn = (e) => {
        e.preventDefault();
        
          if(!this.state.password || !this.state.email ){
              this.setState(() => ({erorr: 'plase add password & email'}));
          }else {
            const user = {
             password: this.state.password,
                email: this.state.email
            }
            
             axios.post('/user/login',{body:user}).then((response) => {
                 console.log(response);
                 if(response.data === ''){
                     console.log('u must signUp befor');
                 }
                //this.setState(() => ({counfrium:response.data }))
             }).catch((e) => {
                 console.log(e);
             });
      }
};
   onLogOff = () => {
           axios.delete('users/me/token').then((response) => {
               response.data === "cant find user" ?console.log('u r logout alrady'): console.log('LogOff');
                   
               console.log(response)
           }).catch((e) => {
               console.log(e);
           })
   };
    render (){
    return (
       <div> 
        <h1>Woelcome {!!this.state.counfrium ? this.state.password : 'guest' }</h1>
        {this.state.erorr && <p>{this.state.erorr}</p>}
        <form onSubmit={this.heandleClick}> 
        Password:
        <input type='text' placeholder="password" value={this.state.password} onChange={this.onPasswordChange} />
        Eamil:
        <input type='text' placeholder="email"  value={this.state.email} onChange={this.onEamilChange}/>
        <button>singup</button>
        {this.state.counfrium && <p>{this.state.counfrium}</p>}
        </form>
        <form onSubmit={this.sendText}>
          <input type='text' placeholder='text' value={this.state.text} onChange={this.onTextChange} />
          <button>send </button>
        </form>
        <button onClick={this.onGetTodos}>Get todo</button>
        <form onSubmit={this.signIn}>
        SIGNin
        Password:
        <input type='text' placeholder="password" value={this.state.password} onChange={this.onPasswordChange} />
        Eamil:
        <input type='text' placeholder="email"  value={this.state.email} onChange={this.onEamilChange}/>
        <button>signIn </button>
        </form>
        <button onClick={this.onLogOff}>Log off</button>
       </div>
       )
    }
};

