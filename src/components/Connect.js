import React from 'react';
import axios from 'axios';
import { applyMiddleware } from 'redux';
import {connect } from 'react-redux';

import Alert from './Alert';
import {startGetNote} from '../actions/notes';
import LastName from '../components/LastName';

const style = {
    border: 'none',
    display: 'none'
};

class Connect extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            lastName: '',
            title: '',
            topic: '',
            applyAlert: false,
            msg: ''
        }
    }
    onEmailChange = (e) => {
       const email = e.target.value;
       this.setState(() => ({ email }))
    }
    onTitleChange = (e) => {
     const title = e.target.value;
     this.setState(() => ({ title }))
    }
    onTopicChange = (e) => {
     const topic = e.target.value;
     this.setState(() => ({ topic }));

       if(this.state.title && this.state.topic){
        this.setState(() =>( {applyAlert: false}))  
      }
    }
    heandelClick = (e) => {
        e.preventDefault();
      if(this.state.title && this.state.topic){
            const note = {
                email: this.state.email,
                title: this.state.title,
                topic: this.state.topic
            }

            this.props.dispatch(startGetNote(note))
                 this.setState(() => ({msg: this.props.msg}))
            this.setState(() => ({email: '', title: '', topic: ''}))
      }else 
      this.setState(() => ({applyAlert: true}))

    }
    onLastNameCng = (e) => {
        const lastName = e.target.value;
        this.setState(() => ({lastName}))
       }
    render(){
        return(
            <div className='container connect-area'>
            {this.props.msg && <Alert msg={this.props.msg} cls={'alert-info'} />}
             <form onSubmit={this.heandelClick}>
             <input type="text" className="form-control lastName" aria-label="Small"
             value={this.state.LastName} onChange={this.onLastNameCng} aria-describedby="inputGroup-sizing-sm" style={style} />
             <div className="form-group">
             <label>כתובת מייל</label>
            <input type="email" className="form-control" value={this.state.email} onChange={this.onEmailChange} autoFocus />
            </div>
            {this.state.applyAlert && <Alert msg={"את נדרשת להזין כותרת ונושא"} cls={'alert-warning'}/>}
            <div className="form-group">
            <label>כותרת</label>
            <textarea className="form-control" value={this.state.title} onChange={this.onTitleChange} rows="1" />
            <label>נושא</label>
            <textarea className="form-control"  value={this.state.topic} onChange={this.onTopicChange} rows="3"/>
            </div> 
            <button type="submit" className="btn btn-primary btn-lg send-btn">שלח</button>
             </form>
            </div>
        )
    }
}

const mapStateToProps = (state,props) => {
    return {
        msg   : state.notes
    }
}

export default connect(mapStateToProps)(Connect);